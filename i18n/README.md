# i18n build

English is the single source of truth. You edit English once, run one command, and
the French, German, Spanish, and Dutch versions regenerate automatically. You never
hand-edit a translation again unless you want to.

## How it works

```
i18n/
  locales/
    en.json      <-- YOU EDIT THIS. English copy, keyed by data-i18n name.
    fr.json      <-- generated. Your existing translations are preserved.
    de.json      <-- generated.
    es.json      <-- generated.
    nl.json      <-- generated.
  config.json    <-- languages + the glossary of terms that must never translate.
  runtime.js     <-- your i18next runtime logic (unchanged).
  build.mjs      <-- the build script.
  .cache.json    <-- tracks which English text each translation was built from.
../i18n.js       <-- GENERATED output that the site loads. Do not hand-edit.
```

The site still loads `../i18n.js` exactly as before. That file is now produced by the
build instead of maintained by hand. Everything stays baked into the page, so it loads
instantly, works offline, and never depends on a live translation service at view time.

## One-time setup

1. Get a free DeepL API key at https://www.deepl.com/pro-api (the free tier covers
   500,000 characters a month; this whole site is a few thousand, so it is effectively free).
2. Node 18 or newer. No packages to install.

## The everyday workflow

1. Change your English wording, or add a new key, in `locales/en.json`.
   If you add a key, also add the matching `data-i18n="your_key"` in `index.html`.
2. Run:

   ```bash
   DEEPL_API_KEY=your-key-here node i18n/build.mjs
   ```

3. Commit and push. Done.

Only the keys whose English actually changed get sent for translation. Everything else
is left alone, so a typo fix in one sentence costs one tiny translation, not 73.

## Useful variations

```bash
# Rebuild i18n.js from the JSON files without calling the API at all:
node i18n/build.mjs --emit-only

# Re-translate a single language:
DEEPL_API_KEY=xxx node i18n/build.mjs --lang fr

# Force a full re-translation of everything (ignores the cache):
DEEPL_API_KEY=xxx node i18n/build.mjs --force
```

## Glossary (protecting your names)

`config.json` has a `glossary` list. Any term in it is wrapped so DeepL leaves it
untouched: product names (VoltEdge, ClinIQ, SalaryAxis...), proper nouns, and tech
stack (Python, FastAPI, React...). Add or remove terms freely. This is why your project
names never come back mangled.

## Adding a new language

1. Add its code to `targetLangs` in `config.json`, e.g. `"it"` for Italian.
2. Add a button in `index.html`:
   `<button class="lang-option" data-lang="it" role="menuitem">IT — Italiano</button>`
3. Run the build. The new file `locales/it.json` is created and filled in.

## Manual edits

If you hand-tweak a translation in, say, `fr.json`, it survives future builds as long as
the English for that key does not change. If you change the English, that key gets
re-translated and your manual edit is replaced. To keep a manual edit permanently, just
don't touch its English source.
