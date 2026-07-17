// ── Phone obfuscation — wired at runtime so crawlers can't harvest ──
document.querySelectorAll('.contact-phone').forEach(el => {
    const p = el.dataset.p;
    if (p) {
        el.href = 'tel:+' + p;
        el.removeAttribute('data-p');
    }
});

let userLat = 51.5074, userLon = -0.1278;
let sunriseTime = null, sunsetTime = null;
const DIM_BRIGHTNESS = 0.72;

// ── Geolocation ────────────────────────────────────────────
function initLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                userLat = pos.coords.latitude;
                userLon = pos.coords.longitude;
                updateCoordinates(userLat, userLon);
                updateWeather();
                fetchSunTimes(userLat, userLon);
            },
            () => {
                // Permission denied or unavailable — keep London default
                updateCoordinates(userLat, userLon);
                updateWeather();
                fetchSunTimes(userLat, userLon);
            },
            { timeout: 6000 }
        );
    } else {
        updateCoordinates(userLat, userLon);
        updateWeather();
        fetchSunTimes(userLat, userLon);
    }
}

// ── Accordion helpers ──────────────────────────────────────
function collapseBody(el, bodySelector) {
    const b = el.querySelector(bodySelector);
    const innerSel = bodySelector === '.what-body' ? '.what-body-inner' : '.accordion-body-inner';
    const inner = b.querySelector(innerSel);
    if (inner) { inner.style.opacity = '0'; inner.style.transform = 'translateY(-4px)'; }
    b.style.height = b.scrollHeight + 'px';
    requestAnimationFrame(() => requestAnimationFrame(() => { b.style.height = '0px'; }));
    el.classList.remove('open');
    if (el.tagName === 'BUTTON') el.setAttribute('aria-expanded', 'false');
}

function expandBody(el, bodySelector) {
    const b = el.querySelector(bodySelector);
    const innerSel = bodySelector === '.what-body' ? '.what-body-inner' : '.accordion-body-inner';
    const inner = b.querySelector(innerSel);
    el.classList.add('open');
    if (el.tagName === 'BUTTON') el.setAttribute('aria-expanded', 'true');
    b.style.height = '0px';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        b.style.height = b.scrollHeight + 'px';
        if (inner) { inner.style.opacity = ''; inner.style.transform = ''; }
        b.addEventListener('transitionend', function handler(e) {
            if (e.propertyName !== 'height') return;
            b.style.height = 'auto';
            b.removeEventListener('transitionend', handler);
        });
    }));
}

function toggleWhat(item) {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.what-item.open').forEach(el => collapseBody(el, '.what-body'));
    if (!isOpen) expandBody(item, '.what-body');
}

function toggleAccordion(header) {
    const item = header.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item.open').forEach(el => {
        collapseBody(el, '.accordion-body');
        const btn = el.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
        expandBody(item, '.accordion-body');
        header.setAttribute('aria-expanded', 'true');
    }
}

// ── Theme toggle ───────────────────────────────────────────
function toggleTheme() {
    const body = document.body;
    const flash = document.getElementById('theme-flash');
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    flash.style.background = newTheme === 'light' ? 'rgba(244,241,235,0.2)' : 'rgba(14,15,11,0.2)';
    flash.classList.add('active');

    // Spin each 'a' with a stagger
    document.querySelectorAll('.spin-a').forEach((el, i) => {
        setTimeout(() => {
            el.classList.remove('spinning');
            void el.offsetWidth;
            el.classList.add('spinning');
            el.addEventListener('animationend', () => el.classList.remove('spinning'), { once: true });
        }, i * 120);
    });

    // Spin the tagline dots (twirl) — staggered between each other
    document.querySelectorAll('.dot').forEach((el, i) => {
        setTimeout(() => {
            el.classList.remove('spinning');
            void el.offsetWidth;
            el.classList.add('spinning');
            el.addEventListener('animationend', () => el.classList.remove('spinning'), { once: true });
        }, i * 150);
    });

    setTimeout(() => {
        body.setAttribute('data-theme', newTheme);
        const themeText = document.getElementById('theme-text');
        const themeIcon = document.getElementById('theme-icon');
        if (newTheme === 'dark') {
            themeText.textContent = 'Light';
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        } else {
            themeText.textContent = 'Dark';
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        }
        setTimeout(() => flash.classList.remove('active'), 400);
    }, 120);
}

// ── Random highlight colour — picked once per visit ────────
(function() {
    const hlPairs = [
        { dark: '#FFC300', light: '#FF4400' },  // originals
        { dark: '#FF7EE2', light: '#FF7EE2' }   // pink
    ];
    let hlIndex = NaN;
    try { hlIndex = parseInt(sessionStorage.getItem('hlIndex'), 10); } catch (e) {}
    if (isNaN(hlIndex) || hlIndex < 0 || hlIndex >= hlPairs.length) {
        hlIndex = Math.floor(Math.random() * hlPairs.length);
        try { sessionStorage.setItem('hlIndex', hlIndex); } catch (e) {}
    }
    const pair = hlPairs[hlIndex];
    document.documentElement.style.setProperty('--hl-dark', pair.dark);
    document.documentElement.style.setProperty('--hl-light', pair.light);
})();


// ── Clock ──────────────────────────────────────────────────

function updateTime() {
    const n = new Date();
    const pad = v => String(v).padStart(2, '0');
    document.getElementById('time').textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}

// ── Coordinates display ────────────────────────────────────
function updateCoordinates(lat, lon) {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    const latStr = Math.abs(lat).toFixed(4) + '° ' + latDir;
    const lonStr = Math.abs(lon).toFixed(4) + '° ' + lonDir;
    const el = document.getElementById('coordinates');
    if (el) el.textContent = latStr + ', ' + lonStr;
}

// ── Weather ────────────────────────────────────────────────
async function updateWeather() {
    try {
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLon}&current=temperature_2m,weather_code&timezone=auto`);
        const d = await r.json();
        document.getElementById('temp').textContent = `${Math.round(d.current.temperature_2m)}°`;
        const wc = d.current.weather_code;
        const wi = document.getElementById('weather-icon');
        wi.setAttribute('stroke', 'currentColor');
        wi.setAttribute('fill', 'none');
        wi.setAttribute('stroke-width', '2');
        wi.setAttribute('stroke-linecap', 'round');
        wi.setAttribute('stroke-linejoin', 'round');
        if (wc === 0)
            wi.innerHTML = '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>';
        else if (wc <= 3)
            wi.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>';
        else if (wc <= 67 || (wc >= 80 && wc <= 82))
            wi.innerHTML = '<line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>';
        else if (wc <= 77 || (wc >= 85 && wc <= 86))
            wi.innerHTML = '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/>';
        else if (wc >= 95)
            wi.innerHTML = '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/>';
        else
            wi.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>';
    } catch(e) {
        document.getElementById('temp').textContent = '--°';
    }
}

// ── Auto brightness dimming ────────────────────────────────
function parseHHMM(isoStr) {
    const d = new Date(isoStr), today = new Date();
    today.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), 0);
    return today;
}

async function fetchSunTimes(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto&forecast_days=1`);
        const data = await res.json();
        sunriseTime = parseHHMM(data.daily.sunrise[0]);
        sunsetTime  = parseHHMM(data.daily.sunset[0]);
        applyAutoBrightness();
    } catch(e) {}
}

function easeInOut(t) {
    t = Math.max(0, Math.min(1, t));
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function applyAutoBrightness() {
    if (!sunriseTime || !sunsetTime) return;
    const nowMs  = Date.now();
    const riseMs = sunriseTime.getTime();
    const setMs  = sunsetTime.getTime();
    const W = 45 * 60 * 1000;
    let b = 1.0;
    if (nowMs < riseMs - W || nowMs > setMs + W)
        b = DIM_BRIGHTNESS;
    else if (nowMs >= riseMs - W && nowMs <= riseMs + W)
        b = DIM_BRIGHTNESS + (1 - DIM_BRIGHTNESS) * easeInOut((nowMs - (riseMs - W)) / (2 * W));
    else if (nowMs >= setMs - W && nowMs <= setMs + W)
        b = 1 - (1 - DIM_BRIGHTNESS) * easeInOut((nowMs - (setMs - W)) / (2 * W));
    const dl = document.getElementById('dim-layer');
    if (dl) dl.style.opacity = (1 - b).toFixed(3);
    updateDimIndicator(b, nowMs < riseMs || nowMs > setMs);
}

function updateDimIndicator(b, isNight) {
    const el   = document.getElementById('dim-indicator');
    const icon = document.getElementById('dim-icon');
    const pct  = document.getElementById('dim-pct');
    if (!el || !icon || !pct) return;
    if (b < 0.99) {
        pct.textContent = `${Math.round(b * 100)}%`;
        icon.innerHTML = isNight
            ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
            : '<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>';
        el.style.opacity = '1';
    } else {
        el.style.opacity = '0';
    }
}

// ── Scroll to top visibility ───────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
}, { passive: true });

// ── Init ───────────────────────────────────────────────────
function init() {
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(updateWeather, 600000);
    setInterval(applyAutoBrightness, 60000);
    initLocation();
}

// ── Cert drag-to-scroll ───────────────────────────────────
const certScroll = document.querySelector('.cert-scroll-container');
if (certScroll) {
    let isDown = false, startX, scrollLeft;
    certScroll.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - certScroll.offsetLeft;
        scrollLeft = certScroll.scrollLeft;
    });
    certScroll.addEventListener('mouseleave', () => isDown = false);
    certScroll.addEventListener('mouseup', () => isDown = false);
    certScroll.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - certScroll.offsetLeft;
        certScroll.scrollLeft = scrollLeft - (x - startX);
    });
}

init();

// ── Writing mind-map — radial layout with SVG lines ──────
(function() {
    const hub    = document.getElementById('mindmapHub');
    const inner  = document.getElementById('mindmapInner');
    const svg    = document.getElementById('mindmapLines');
    if (!hub || !inner || !svg) return;

    const nodes  = inner.querySelectorAll('.mindmap-node');

    /* ── Draw SVG lines from hub-circle-edge → node-pill-edge ──
       When nodes are scale(0), getBoundingClientRect collapses
       the element to its centre point (transform-origin:50% 50%).
       So nRect.left / top == the node's centre in viewport space.
       offsetWidth / offsetHeight give layout size, unaffected by
       the CSS transform, so we can compute edge offsets correctly. */
    function buildLines() {
        svg.innerHTML = '';
        const cRect = inner.getBoundingClientRect();
        const hRect = hub.getBoundingClientRect();

        // Hub centre + radius
        const hx = hRect.left + hRect.width  / 2 - cRect.left;
        const hy = hRect.top  + hRect.height / 2 - cRect.top;
        const hr = hRect.width / 2;

        const isOpen = inner.classList.contains('is-open');
        const GAP    = 7; // px gap so line never overlaps border

        nodes.forEach((node, i) => {
            const nRect = node.getBoundingClientRect();

            // Node centre — when scale(0) rect collapses to centre point
            const nx = isOpen
                ? nRect.left + nRect.width  / 2 - cRect.left
                : nRect.left - cRect.left;
            const ny = isOpen
                ? nRect.top  + nRect.height / 2 - cRect.top
                : nRect.top  - cRect.top;

            // Pill half-dimensions (offsetWidth/Height ignore CSS transforms)
            const hw2 = node.offsetWidth  / 2;
            const hh2 = node.offsetHeight / 2;

            const dx  = nx - hx;
            const dy  = ny - hy;
            const len = Math.hypot(dx, dy);
            if (len < 1) return;

            // ── Start point: just outside the hub circle ──
            const x1 = hx + (hr + GAP) * dx / len;
            const y1 = hy + (hr + GAP) * dy / len;

            // ── End point: on the nearest edge of the pill ──
            // Parametrise from node centre toward hub (-dx,-dy direction).
            // t_x = half-width  / |cos θ|  (steps to reach x-boundary)
            // t_y = half-height / |sin θ|  (steps to reach y-boundary)
            // Smallest t wins → closest face.
            let t = Infinity;
            if (Math.abs(dx) > 0.001) t = Math.min(t, hw2 * len / Math.abs(dx));
            if (Math.abs(dy) > 0.001) t = Math.min(t, hh2 * len / Math.abs(dy));

            // Walk from node centre to its edge, then pull back GAP px
            const x2 = nx - t * dx / len + GAP * dx / len;
            const y2 = ny - t * dy / len + GAP * dy / len;

            const lineLen = Math.hypot(x2 - x1, y2 - y1);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'mm-line');
            line.setAttribute('x1', x1.toFixed(1));
            line.setAttribute('y1', y1.toFixed(1));
            line.setAttribute('x2', x2.toFixed(1));
            line.setAttribute('y2', y2.toFixed(1));
            line.setAttribute('stroke-dasharray',  lineLen.toFixed(1));
            // If the map is already open (e.g. rebuild triggered by a
            // mobile address-bar resize on touch), keep the line drawn
            // instead of resetting it back to hidden.
            line.setAttribute('stroke-dashoffset', isOpen ? '0' : lineLen.toFixed(1));
            line.dataset.len = lineLen.toFixed(1);
            svg.appendChild(line);
        });
    }

    /* Debounced resize rebuild */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildLines, 120);
    }, { passive: true });

    /* ── Reveal — fires once, the moment the map scrolls into
       view. The hub is now a plain link straight to the Medium
       profile, so there's no separate open/close interaction to
       gate the cards behind; they simply appear as you scroll to
       them, the same way the rest of the page's content does. */
    let revealed = false;
    function reveal() {
        if (revealed) return;
        revealed = true;

        buildLines();
        inner.classList.add('is-open');

        const svgLines = svg.querySelectorAll('.mm-line');

        nodes.forEach((node, i) => {
            const delay = parseInt(node.dataset.popDelay || 200, 10);
            const dur   = parseInt(node.dataset.popDur   || 480, 10);
            const ease  = node.dataset.popEase || 'cubic-bezier(0.34,1.56,0.64,1)';

            node.style.transition = [
                `opacity  ${dur * 0.55}ms ease ${delay}ms`,
                `transform ${dur}ms ${ease} ${delay}ms`,
                `border-color 0.3s ease`,
                `color        0.3s ease`,
                `box-shadow   0.3s ease`
            ].join(', ');

            /* Animate SVG line — starts a touch after node pops */
            const line = svgLines[i];
            if (line) {
                const lineDelay = delay + 40;
                const lineDur   = Math.round(dur * 0.7);
                line.style.transition = `stroke-dashoffset ${lineDur}ms cubic-bezier(0.4,0,0.2,1) ${lineDelay}ms, stroke 0.3s ease`;
                line.style.strokeDashoffset = '0';
            }
        });
    }

    /* Hover accent on lines + hub glow — card, line, and circle
       light up together so the whole path reads as one element. */
    function accentOn(i) {
        const line = svg.querySelectorAll('.mm-line')[i];
        if (line) line.style.stroke = 'var(--accent)';
        hub.classList.add('hub-glow');
    }
    function accentOff(i) {
        const line = svg.querySelectorAll('.mm-line')[i];
        if (line) line.style.stroke = '';
        hub.classList.remove('hub-glow');
    }
    nodes.forEach((node, i) => {
        node.addEventListener('mouseenter', () => accentOn(i));
        node.addEventListener('mouseleave', () => accentOff(i));
        /* Keyboard navigation */
        node.addEventListener('focus',  () => accentOn(i));
        node.addEventListener('blur',   () => accentOff(i));
        /* Touch — glow on tap (link navigation follows) */
        node.addEventListener('touchstart', () => accentOn(i), { passive: true });
        node.addEventListener('touchend',   () => setTimeout(() => accentOff(i), 350), { passive: true });
        node.addEventListener('touchcancel',() => accentOff(i), { passive: true });
    });

    /* Build the (hidden) lines once fonts + layout settle, so
       they're ready the instant reveal() fires. */
    if (document.readyState === 'complete') {
        requestAnimationFrame(buildLines);
    } else {
        window.addEventListener('load', () => requestAnimationFrame(buildLines));
    }
    if (window.document.fonts && window.document.fonts.ready) {
        window.document.fonts.ready.then(buildLines).catch(() => {});
    }

    /* Reveal the map the moment it scrolls into view */
    const revealTrigger = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reveal();
                revealTrigger.disconnect();
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTrigger.observe(inner);
})();


// ── Scroll progress bar ────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
const topBar = document.querySelector('.top-bar');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    // Top-bar blur — kick in after a small scroll so hero text never bleeds through
    if (topBar) {
        if (scrollTop > 80) topBar.classList.add('scrolled');
        else topBar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── Scroll-reveal (IntersectionObserver) ──────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Section nav dots ──────────────────────────────────────
const navDots = document.querySelectorAll('.nav-dot');
const sections = [
    document.querySelector('.skills'),
    document.querySelector('.about'),
    document.querySelector('.certifications'),
    document.querySelector('.projects'),
    document.querySelectorAll('.products')[0],
    document.querySelectorAll('.products')[1],
    document.querySelector('.writing'),
    document.querySelector('.contact'),
];

navDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        if (sections[i]) sections[i].scrollIntoView({ behavior: 'smooth' });
    });
});

// Default: activate first dot on load (before any scroll)
if (navDots[0]) navDots[0].classList.add('active');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            navDots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => { if (s) sectionObserver.observe(s); });

// ── Scramble heading animation ─────────────────────────────
(function () {
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*?!';

    // Wrap every non-space character in a text node with a span
    function prepareHeading(el) {
        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const frag = document.createDocumentFragment();
                for (const ch of text) {
                    if (ch === ' ' || ch === '\n') {
                        frag.appendChild(document.createTextNode(ch));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'scramble-char';
                        span.dataset.final = ch;
                        span.textContent = ch;
                        frag.appendChild(span);
                    }
                }
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
                [...node.childNodes].forEach(processNode);
            }
        }
        [...el.childNodes].forEach(processNode);
        el.dataset.scrambleReady = '1';
    }

    function triggerScramble(el) {
        // Respect reduced-motion preference — show final chars immediately
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.querySelectorAll('.scramble-char').forEach(span => {
                span.textContent = span.dataset.final;
            });
            return;
        }
        const spans = el.querySelectorAll('.scramble-char');
        spans.forEach(span => {
            const finalChar = span.dataset.final;
            // Each letter gets its own random duration between 600–1000ms
            const duration    = 600 + Math.random() * 400;
            const tickRate    = 65 + Math.random() * 45; // 65–110ms per flicker
            const start       = performance.now();

            const id = setInterval(() => {
                const elapsed = performance.now() - start;
                if (elapsed >= duration) {
                    span.textContent = finalChar;
                    clearInterval(id);
                } else {
                    // Very gradual settle — stays chaotic for longer,
                    // then gently drifts toward the real character near the end
                    const progress = elapsed / duration;
                    const settleProbability = Math.pow(progress, 4);
                    if (Math.random() < settleProbability) {
                        span.textContent = finalChar;
                    } else {
                        span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    }
                }
            }, tickRate);
        });
    }

    // Prepare all scramble headings
    document.querySelectorAll('[data-scramble]').forEach(prepareHeading);

    // Expose prepare function so i18next can re-prepare after language change
    window._scramblePrepare = prepareHeading;

    // Fire when heading enters viewport — once only
    const scrambleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerScramble(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-scramble]').forEach(el => scrambleObserver.observe(el));

    // Expose observer so i18next can re-observe re-prepared headings
    window._scrambleObserver = scrambleObserver;
})();


// ═══════════════════════════════════════════════════════
// KNOK MATRIX — stamp geometric glyphs into .knok-slot
// DOMContentLoaded used because the <template> block sits
// after this <script> tag and isn't parsed until then.
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
    const tmpl = document.getElementById('digit-templates');
    if (!tmpl) return;
    const svgs = Array.from(tmpl.content.querySelectorAll('.art-digit'));
    document.querySelectorAll('.knok-slot').forEach(slot => {
        const d = parseInt(slot.dataset.digit, 10);
        if (!isNaN(d) && svgs[d]) slot.appendChild(svgs[d].cloneNode(true));
    });
});


// ═══════════════════════════════════════════════════════
// TYPOGRAPHY DIGITS — generative word-cloud (light mode)
// Runs after Roboto loads; renders unique digit art into
// every .typo-slot[data-digit] using canvas pixel masking
// + AABB collision detection → SVG clipPath.
// ═══════════════════════════════════════════════════════
(function () {

    /* ── Mobile detection: use lighter tiers, not a bail-out ──
       We still render the word-cloud on mobile — it's the expected
       visual — but we dramatically reduce the work per digit so it
       stays smooth on iOS / Android WKWebView.
       Desktop: 4 tiers, ~197 words, ~10200 tries per digit.
       Mobile:  3 tiers,  ~55 words,  ~2200 tries per digit.      */
    const isMobile = window.innerWidth <= 900 ||
        /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    /* ── Geometry ── */
    const VW = 300, VH = 400;
    const CLIP_FS   = Math.round(VH * 0.96);
    const CLIP_X    = VW / 2;
    const CLIP_Y    = VH - 5;
    const CLIP_FONT = `900 ${CLIP_FS}px Roboto, "Arial Black", Arial, sans-serif`;
    const WORD_PADDING   = 1.5;
    const SOFT_THRESHOLD = 0.50;

    /* ── Placement tiers (large anchors → tiny gap-fill) ── */
    const TIERS = isMobile ? [
        /* Mobile-lite: 3 tiers, ~55 words total, ~2200 tries */
        { minFs: 16, maxFs: 26, weight: 700, target: 8,  tries:  600, lineH: 1.10 },
        { minFs: 10, maxFs: 16, weight: 700, target: 22, tries:  900, lineH: 1.12 },
        { minFs:  7, maxFs: 10, weight: 400, target: 25, tries:  700, lineH: 1.15 },
    ] : [
        /* Desktop-full: 4 tiers, ~197 words total */
        { minFs: 18, maxFs: 26, weight: 700, target: 12,  tries:  900, lineH: 1.10 },
        { minFs: 11, maxFs: 18, weight: 700, target: 35,  tries: 1800, lineH: 1.12 },
        { minFs:  7, maxFs: 11, weight: 400, target: 80,  tries: 3500, lineH: 1.15 },
        { minFs:  5, maxFs:  7, weight: 400, target: 70,  tries: 3000, lineH: 1.18 },
    ];

    /* ── Per-digit background tint ── */
    const DIGIT_TINTS = {
        0:'#6DE1D2',1:'#FFC81E',2:'#EA2264',3:'#36ADA3',
        4:'#0046FF',5:'#FF4400',6:'#CB9DF0',7:'#FA8112',
        8:'#6A9C89',9:'#FF6500',
    };

    /* ── Vocabulary pool ── */
    const WORDS = [
        'Shaz Moghaddam','Shaz Moghaddam','Shaz Moghaddam','Shaz Moghaddam',
        'Shaz','Moghaddam',
        'data science','machine learning','deep learning',
        'app development','data analysis','neural network',
        'algorithm','Python','API',
        'AI','ML','NLP','LLM','SQL','CSS','HTML','Git',
        'ETL','GCP','AWS','OOP','GPT','BERT','CI/CD',
        'DevOps','MLOps','AUC','F1','R',
        'JavaScript','TypeScript','React','Node.js','Vue.js',
        'TensorFlow','PyTorch','scikit-learn','pandas','NumPy',
        'Flask','Django','FastAPI','GraphQL','JSON',
        'Scala','Next.js','Svelte','R lang',
        'MongoDB','PostgreSQL','Redis','Hadoop','Spark',
        'Kafka','Tableau','Power BI','big data','data viz',
        'Docker','Kubernetes','Terraform','Azure','cloud','GitHub',
        'transformer','embedding','attention','encoder','decoder',
        'pipeline','training','validation','regression','clustering',
        'gradient','backprop','dropout','epoch','accuracy',
        'precision','recall','overfitting','inference','forecasting',
        'statistics','probability','Bayesian','linear algebra',
        'debugging','testing','refactoring','agile','scrum',
        'microservices','automation',
    ];

    /* ── Colour rules: keyword → CSS class ── */
    const COLOUR_RULES = [
        ['shaz moghaddam','w-crimson'],['moghaddam','w-crimson'],['shaz','w-crimson'],
        ['transformer','w-crimson'],['bert','w-crimson'],['gpt','w-crimson'],['llm','w-crimson'],
        ['data science','w-gold'],['data analysis','w-gold'],['data viz','w-gold'],['epoch','w-gold'],
        ['scikit','w-lavender'],['algorithm','w-lavender'],['regression','w-lavender'],
        ['clustering','w-lavender'],['overfitting','w-lavender'],['validation','w-lavender'],
        ['python','w-blue'],['docker','w-blue'],['kubernetes','w-blue'],['gcp','w-blue'],
        ['azure','w-blue'],['cloud','w-blue'],['github','w-blue'],
        ['javascript','w-amber'],['typescript','w-amber'],['node','w-amber'],['react','w-amber'],
        ['app development','w-amber'],
        ['deep learning','w-vermillion'],['neural network','w-vermillion'],['tensorflow','w-vermillion'],
        ['pytorch','w-vermillion'],['backprop','w-vermillion'],['gradient','w-vermillion'],
        ['sql','w-orange'],['aws','w-orange'],['pipeline','w-orange'],['etl','w-orange'],
        ['kafka','w-orange'],['spark','w-orange'],['hadoop','w-orange'],
        ['nlp','w-aqua'],['gpt','w-aqua'],['embedding','w-aqua'],['attention','w-aqua'],
        ['encoder','w-aqua'],['decoder','w-aqua'],
        ['kubernetes','w-teal'],['ci/cd','w-teal'],['terraform','w-teal'],
        ['pytorch','w-red'],['tensorflow','w-red'],
        ['debugging','w-coral'],['testing','w-coral'],['refactoring','w-coral'],
        ['statistics','w-sage'],['probability','w-sage'],['bayesian','w-sage'],
        ['forecasting','w-sage'],['inference','w-sage'],['f1','w-sage'],['auc','w-sage'],
        ['linear algebra','w-sage'],
        ['devops','w-olive'],['mlops','w-olive'],['microservices','w-olive'],
        ['automation','w-olive'],['agile','w-olive'],['scrum','w-olive'],
        ['html','w-tangerine'],['big data','w-tangerine'],['tableau','w-tangerine'],
        ['power bi','w-tangerine'],
        ['pandas','w-gold-deep'],['numpy','w-gold-deep'],['mongodb','w-gold-deep'],['redis','w-gold-deep'],
        ['scala','w-slate'],['oop','w-slate'],['r','w-slate'],
    ];

    const COLOUR_POOL = [
        'w-gold','w-gold-deep','w-amber','w-vermillion','w-orange','w-red',
        'w-coral','w-tangerine','w-blue','w-slate','w-crimson','w-lavender',
        'w-aqua','w-sage','w-teal','w-olive',
    ];

    /* ── Helpers ── */
    function pickColour(word) {
        const lc = word.toLowerCase();
        for (const [key, cls] of COLOUR_RULES) { if (lc.includes(key)) return cls; }
        return COLOUR_POOL[Math.floor(Math.random() * COLOUR_POOL.length)];
    }
    function rndWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

    /* ── Step 1: pixel mask ── */
    function buildMask(digit) {
        const c = document.createElement('canvas');
        c.width = VW; c.height = VH;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, VW, VH);
        ctx.fillStyle = '#fff';
        ctx.font = CLIP_FONT;
        ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(String(digit), CLIP_X, CLIP_Y);
        return ctx.getImageData(0, 0, VW, VH);
    }

    /* ── Step 2a: two-gate mask test ── */
    function isInsideMask(mask, x, y, w, h) {
        const cx = Math.round(x + w * 0.5), cy = Math.round(y + h * 0.5);
        if (cx < 0 || cx >= VW || cy < 0 || cy >= VH) return false;
        if (mask.data[(cy * VW + cx) * 4] < 128) return false;
        const ROWS = 5, COLS = 5; let inside = 0, total = 0;
        for (let r = 0; r <= ROWS; r++) {
            for (let c = 0; c <= COLS; c++) {
                const px = Math.round(x + w * c / COLS);
                const py = Math.round(y + h * r / ROWS);
                total++;
                if (px < 0 || px >= VW || py < 0 || py >= VH) continue;
                if (mask.data[(py * VW + px) * 4] > 128) inside++;
            }
        }
        return inside / total >= SOFT_THRESHOLD;
    }

    /* ── Step 2b: AABB collision ── */
    function collides(rect, placed) {
        const P = WORD_PADDING;
        return placed.some(p =>
            rect.x < p.x + p.w + P && rect.x + rect.w + P > p.x &&
            rect.y < p.y + p.h + P && rect.y + rect.h + P > p.y
        );
    }

    /* ── Step 3: place words ── */
    function placeWords(mask) {
        const mc = document.createElement('canvas');
        mc.width = VW; mc.height = VH;
        const mCtx = mc.getContext('2d');
        const placed = [], result = [];
        for (const tier of TIERS) {
            const { minFs, maxFs, weight, target, tries, lineH } = tier;
            let count = 0;
            for (let attempt = 0; attempt < tries && count < target; attempt++) {
                const word = rndWord();
                const fs   = minFs + Math.random() * (maxFs - minFs);
                mCtx.font  = `${weight} ${fs}px Roboto, Arial, sans-serif`;
                const tw   = mCtx.measureText(word).width;
                const th   = fs * lineH;
                if (tw < 1) continue;
                const x = 1 + Math.random() * Math.max(1, VW - tw - 2);
                const y = 1 + Math.random() * Math.max(1, VH - th - 2);
                const box = { x, y, w: tw, h: th };
                if (!isInsideMask(mask, x, y, tw, th)) continue;
                if (collides(box, placed)) continue;
                placed.push(box);
                result.push({ word, x, svgY: y + fs * 0.78, fs: fs.toFixed(1), fw: weight, col: pickColour(word) });
                count++;
            }
        }
        return result;
    }

    /* ── Step 4: build SVG ── */
    let _uid = 0;
    function buildSVG(digit, words) {
        const clipId  = `sc-${digit}-${++_uid}`;
        const shimId  = `sg-${clipId}`;
        const shimDel = (Math.random() * 7).toFixed(2);
        const wordEls = words.map(w => {
            const wo  = (0.75 + Math.random() * 0.25).toFixed(2);
            const dur = (4    + Math.random() * 5   ).toFixed(2);
            const del = (Math.random() * 5          ).toFixed(2);
            return `<text class="word ${w.col}" x="${w.x.toFixed(2)}" y="${w.svgY.toFixed(2)}" font-size="${w.fs}" font-weight="${w.fw}" font-family="Roboto,Arial,sans-serif" data-dur="${dur}" style="--wo:${wo};animation:wordLife ${dur}s ${del}s ease-in-out infinite both">${w.word}</text>`;
        }).join('');
        return (
            `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" class="digit-svg" role="img" aria-label="Digit ${digit} as word cloud">` +
            `<defs>` +
            `<clipPath id="${clipId}"><text x="${CLIP_X}" y="${CLIP_Y}" font-size="${CLIP_FS}" font-weight="900" text-anchor="middle" font-family="Roboto,'Arial Black',Arial,sans-serif">${digit}</text></clipPath>` +
            `<linearGradient id="${shimId}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="white" stop-opacity="0"/><stop offset="42%" stop-color="white" stop-opacity="0"/><stop offset="50%" stop-color="white" stop-opacity="0.55"/><stop offset="58%" stop-color="white" stop-opacity="0"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient>` +
            `</defs>` +
            `<g clip-path="url(#${clipId})">` +
            `<rect x="0" y="0" width="${VW}" height="${VH}" fill="${DIGIT_TINTS[digit]||'#fff'}" opacity="0.07"/>` +
            wordEls +
            `<rect class="shimmer-rect" x="-${VW}" y="0" width="${VW}" height="${VH}" fill="url(#${shimId})" style="animation-delay:${shimDel}s"/>` +
            `</g></svg>`
        );
    }

    /* ── Render after Roboto loads ── */
    document.fonts.ready.then(() => {
        const slots = Array.from(document.querySelectorAll('.typo-slot'));
        function processNext(i) {
            if (i >= slots.length) return;
            const slot = slots[i];
            const d = parseInt(slot.dataset.digit, 10);
            if (!isNaN(d)) {
                const mask  = buildMask(d);
                const words = placeWords(mask);
                slot.innerHTML = buildSVG(d, words);
            }
            // Yield back to browser between each digit to avoid blocking
            const schedule = typeof requestIdleCallback === 'function'
                ? cb => requestIdleCallback(cb, { timeout: 3000 })
                : cb => setTimeout(cb, 0);
            schedule(() => processNext(i + 1));
        }
        processNext(0);
    });

})();

