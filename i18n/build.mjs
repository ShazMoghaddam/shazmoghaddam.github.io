#!/usr/bin/env node
/*
 * i18n build
 * ----------
 * English (locales/en.json) is the single source of truth.
 * This script translates only the keys that are new or whose English text
 * changed since the last run, protects glossary terms and HTML tags, then
 * regenerates ../i18n.js from all the locale files + runtime.js.
 *
 * Usage:
 *   DEEPL_API_KEY=xxxx node i18n/build.mjs           # translate changes + rebuild i18n.js
 *   node i18n/build.mjs --emit-only                  # just rebuild i18n.js from existing JSON (no API calls)
 *   node i18n/build.mjs --lang fr                     # limit to one target language
 *   node i18n/build.mjs --force                       # re-translate everything, ignore cache
 *
 * Requires Node 18+ (uses global fetch). No dependencies to install.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOCALES = path.join(__dirname, 'locales');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const CACHE_PATH = path.join(__dirname, '.cache.json');
const RUNTIME_PATH = path.join(__dirname, 'runtime.js');
const OUT_PATH = path.join(ROOT, 'i18n.js');

const args = process.argv.slice(2);
const EMIT_ONLY = args.includes('--emit-only');
const FORCE = args.includes('--force');
const ONE_LANG = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null;

const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
const readJSON = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback);
const writeJSON = (p, obj) => fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');

/* ---------- glossary protection ---------- */
// Wrap glossary terms so DeepL leaves them untouched, then unwrap after.
// Longest terms first so "Claude API" is protected before "Claude".
const GLOSSARY = [...(CONFIG.glossary || [])].sort((a, b) => b.length - a.length);

function protectGlossary(text) {
  let out = text;
  for (const term of GLOSSARY) {
    // whole-word-ish: term not immediately flanked by a letter/digit
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])(${escapeRe(term)})(?=$|[^\\p{L}\\p{N}])`, 'gu');
    out = out.replace(re, (_, pre, t) => `${pre}<span translate="no">${t}</span>`);
  }
  return out;
}
function unprotectGlossary(text) {
  return text.replace(/<span translate="no">(.*?)<\/span>/g, '$1');
}
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* ---------- providers ---------- */
async function translateBatch(texts, targetLang) {
  if (CONFIG.provider === 'deepl') return deeplBatch(texts, targetLang);
  throw new Error(`Unknown provider: ${CONFIG.provider}`);
}

async function deeplBatch(texts, targetLang) {
  const key = process.env[CONFIG.deepl.apiKeyEnv];
  if (!key) throw new Error(`Missing API key. Set ${CONFIG.deepl.apiKeyEnv} in your environment.`);
  const body = new URLSearchParams();
  body.append('target_lang', targetLang.toUpperCase());
  body.append('source_lang', CONFIG.sourceLang.toUpperCase());
  body.append('tag_handling', 'html');          // keeps <em>, <br>, <strong>, <span> intact
  body.append('ignore_tags', 'span');           // never translate inside our translate="no" spans
  for (const t of texts) body.append('text', t);

  const res = await fetch(CONFIG.deepl.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!res.ok) throw new Error(`DeepL ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.translations.map((t) => t.text);
}

/* ---------- translate step ---------- */
async function translateLang(lang, en, cache) {
  const target = readJSON(path.join(LOCALES, `${lang}.json`), {});
  const langCache = cache[lang] || (cache[lang] = {});

  // Decide which keys need translating
  const todo = [];
  for (const key of Object.keys(en)) {
    const enHash = hash(en[key]);
    const missing = !(key in target);
    const changed = langCache[key] !== enHash;
    if (FORCE || missing || changed) todo.push(key);
  }
  // Drop keys that no longer exist in English
  for (const key of Object.keys(target)) {
    if (!(key in en)) { delete target[key]; delete langCache[key]; }
  }

  if (todo.length === 0) {
    console.log(`  ${lang}: up to date (${Object.keys(target).length} keys)`);
    writeJSON(path.join(LOCALES, `${lang}.json`), sortLike(en, target));
    return;
  }

  console.log(`  ${lang}: translating ${todo.length} key(s)...`);
  const protectedTexts = todo.map((k) => protectGlossary(en[k]));

  // DeepL handles up to 50 texts per request; chunk to be safe
  const CHUNK = 40;
  const results = [];
  for (let i = 0; i < protectedTexts.length; i += CHUNK) {
    const chunk = protectedTexts.slice(i, i + CHUNK);
    const out = await translateBatch(chunk, lang);
    results.push(...out);
  }

  todo.forEach((key, idx) => {
    target[key] = unprotectGlossary(results[idx]);
    langCache[key] = hash(en[key]);
  });

  writeJSON(path.join(LOCALES, `${lang}.json`), sortLike(en, target));
  console.log(`  ${lang}: done (${Object.keys(target).length} keys)`);
}

// Keep target key order matching English for clean diffs
function sortLike(en, target) {
  const out = {};
  for (const k of Object.keys(en)) if (k in target) out[k] = target[k];
  for (const k of Object.keys(target)) if (!(k in out)) out[k] = target[k];
  return out;
}

/* ---------- emit i18n.js ---------- */
function emit() {
  const en = readJSON(path.join(LOCALES, `${CONFIG.sourceLang}.json`), {});
  const allLangs = [CONFIG.sourceLang, ...CONFIG.targetLangs];

  const resources = {};
  for (const lang of allLangs) {
    const t = readJSON(path.join(LOCALES, `${lang}.json`), null);
    if (!t) { console.warn(`  ! missing locales/${lang}.json, skipping`); continue; }
    resources[lang] = { translation: t };
  }

  // Auto-derive which keys carry HTML (so this list is never hand-maintained)
  const htmlKeys = Object.keys(en).filter((k) => /<[a-z][\s\S]*>|&[a-z]+;|&#\d+;/i.test(en[k]));

  const runtime = fs.readFileSync(RUNTIME_PATH, 'utf8');

  const banner =
    '/* AUTO-GENERATED by i18n/build.mjs — do not edit by hand.\n' +
    ' * Edit i18n/locales/en.json (English is the source of truth),\n' +
    ' * then run:  DEEPL_API_KEY=xxx node i18n/build.mjs\n' +
    ' */\n';

  const out =
    banner +
    '(function() {\n' +
    '    const resources = ' + JSON.stringify(resources, null, 4).replace(/\n/g, '\n    ') + ';\n\n' +
    '    const htmlKeys = new Set(' + JSON.stringify(htmlKeys) + ');\n\n' +
    runtime + '\n';

  fs.writeFileSync(OUT_PATH, out, 'utf8');
  console.log(`  wrote ${path.relative(ROOT, OUT_PATH)}  (${allLangs.length} langs, ${Object.keys(en).length} keys, ${htmlKeys.length} html keys)`);
}

/* ---------- main ---------- */
(async () => {
  const en = readJSON(path.join(LOCALES, `${CONFIG.sourceLang}.json`), null);
  if (!en) throw new Error(`Missing source locales/${CONFIG.sourceLang}.json`);

  if (!EMIT_ONLY) {
    const cache = readJSON(CACHE_PATH, {});
    const langs = ONE_LANG ? [ONE_LANG] : CONFIG.targetLangs;
    console.log('Translating changed keys:');
    for (const lang of langs) await translateLang(lang, en, cache);
    writeJSON(CACHE_PATH, cache);
  }

  console.log('Emitting i18n.js:');
  emit();
  console.log('Done.');
})().catch((e) => { console.error('\nBuild failed:', e.message); process.exit(1); });
