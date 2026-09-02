    const savedLang = localStorage.getItem('lang') || 'en';

    i18next.init({
        lng: savedLang,
        fallbackLng: 'en',
        resources,
        interpolation: { escapeValue: false }
    }, function() {
        applyTranslations(false);
        setLangActive(savedLang);
    });

    function applyTranslations(animate) {
        const els = document.querySelectorAll('[data-i18n]');

        function doSwap() {
            els.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const val = i18next.t(key);
                if (!val || val === key) return;

                if (el.hasAttribute('data-scramble')) {
                    const currentLang = el.getAttribute('data-translated-lang') || 'en';
                    if (currentLang === i18next.language) return;
                    el.innerHTML = val;
                    el.setAttribute('data-translated-lang', i18next.language);
                    delete el.dataset.scrambleReady;
                    if (window._scramblePrepare) {
                        window._scramblePrepare(el);
                        if (window._scrambleObserver) window._scrambleObserver.observe(el);
                    }
                } else if (htmlKeys.has(key)) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            });
            document.documentElement.lang = i18next.language;
        }

        if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Fade out non-scramble elements, swap, fade back in
            const targets = [...els].filter(el => !el.hasAttribute('data-scramble'));
            targets.forEach(el => { el.style.opacity = '0'; });
            setTimeout(() => {
                doSwap();
                targets.forEach(el => { el.style.opacity = ''; });
            }, 180);
        } else {
            doSwap();
        }
    }

    function setLangActive(lang) {
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.toggle('current', btn.dataset.lang === lang);
        });
    }

    /* ── Globe toggle ── */
    const globeBtn = document.getElementById('langGlobeBtn');
    const dropdown = document.getElementById('langDropdown');
    let _closeTimer = null;

    function closeDropdown() {
        dropdown.classList.remove('open');
        globeBtn.classList.remove('active');
        globeBtn.setAttribute('aria-expanded', 'false');
    }

    function scheduleClose(delay) {
        clearTimeout(_closeTimer);
        _closeTimer = setTimeout(closeDropdown, delay);
    }

    function cancelClose() {
        clearTimeout(_closeTimer);
    }

    globeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cancelClose();
        const open = dropdown.classList.toggle('open');
        globeBtn.classList.toggle('active', open);
        globeBtn.setAttribute('aria-expanded', String(open));
        // Auto-dismiss after 4s if user doesn't interact
        if (open) scheduleClose(4000);
    });

    // Hovering the button or dropdown keeps it alive
    [globeBtn, dropdown].forEach(el => {
        el.addEventListener('mouseenter', cancelClose);
        el.addEventListener('mouseleave', function() {
            if (dropdown.classList.contains('open')) scheduleClose(800);
        });
    });

    // Outside click — close immediately
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && e.target !== globeBtn) {
            cancelClose();
            closeDropdown();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { cancelClose(); closeDropdown(); }
    });

    /* ── Language option selection ── */
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            i18next.changeLanguage(lang, function() {
                applyTranslations(true);
                setLangActive(lang);
                localStorage.setItem('lang', lang);
                /* Re-apply theme button text based on current theme */
                const themeEl = document.getElementById('theme-text');
                if (themeEl) {
                    const isLight = document.body.getAttribute('data-theme') === 'light';
                    themeEl.textContent = i18next.t(isLight ? 'theme_dark' : 'theme_light');
                }
            });
            cancelClose();
            closeDropdown();
        });
    });

    /* ── Skills column dropdowns ── */
    document.querySelectorAll('.skills-col-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const col = this.closest('.skills-col');
            const isOpen = col.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
        });
    });

    /* ── Patch toggleTheme so button label stays translated ── */
    const _origToggleTheme = window.toggleTheme;
    window.toggleTheme = function() {
        if (_origToggleTheme) _origToggleTheme();
        setTimeout(function() {
            const themeEl = document.getElementById('theme-text');
            if (themeEl) {
                const isLight = document.body.getAttribute('data-theme') === 'light';
                themeEl.textContent = i18next.t(isLight ? 'theme_dark' : 'theme_light');
            }
        }, 50);
    };
})();