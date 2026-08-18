# shazmoghaddam.github.io

Personal website and landing page for **Shaz Moghaddam** — Data Scientist, Python Developer & App Developer.

---

## About

This repository contains the source code for my personal website, hosted on **GitHub Pages**.

The site showcases my work across data science, Python development, Android apps, digital products, generative design, photography, and writing — built as a modern, responsive, single-page experience.

---

## Live Site

➡️ **https://shazmoghaddam.github.io**

---

## Built With

- **HTML5**
- **CSS3**
- **JavaScript (vanilla)**
- **i18next** — internationalisation / language switching
- **GitHub Pages**

---

## Features

- Responsive, minimal single-page layout with smooth scrolling
- **Light / Dark mode** toggle with persistent preference
- **Multilingual support** — EN, FR, DE, ES, NL via i18next; language persists across sessions via `localStorage`
- Live **location**, **clock**, and **weather** display in the header
- **Auto-brightness dimming** — adjusts screen brightness based on local sunrise/sunset times
- **Scroll-triggered scramble animation** on all section headings
- **Scroll-reveal** animations with `IntersectionObserver`
- Accessible side **navigation dots** with active state tracking
- `prefers-reduced-motion` support — all animations gracefully disabled for users who prefer it
- `aria-hidden` on all decorative SVG art for screen reader compatibility
- **Skills & Tools** section covering languages, frameworks, cloud & design
- **Projects** accordion — featuring ML, NLP, data analysis, and enterprise platforms
- **Apps** section — 7 Android apps published on the Google Play Store
- **Digital Products** section — products across Gumroad, Lemon Squeezy, and Envato
- **Available on / Built with**: dual auto-scrolling marquees near the foot of the page — one for the platforms the work ships on, one for the stack it's built with, with edge fades and reduced-motion support
- **Certifications** — 6 credentials including Imperial College London, Udemy, and NHS
- **Writing / Mindmap** — interactive radial mindmap linking to 6 Medium publications
- **Contact** section with GitHub, LinkedIn, Instagram, and CV download
- Auto-dismissing language dropdown with hover-aware timeout

---

## Structure

```
index.html              # Page structure and content — markup, SVG templates, structured data
styles.css              # All styling — themes, layout, animations
main.js                 # Site logic — theme toggle, clock, weather, scroll effects, highlight picker
i18n.js                 # Translations and language switching (EN, FR, DE, ES, NL)
headshot-dark.webp      # About section headshot (dark mode)
headshot-light.webp     # About section headshot (light mode)
Shaz-Moghaddam-CV.pdf   # CV download
sitemap.xml             # XML sitemap for search engines (submitted to Google Search Console)
```

> No build step, no frameworks — four plain files served directly by GitHub Pages. Styles and scripts are split out so each cache independently and content changes stay small.

---

## Search & SEO

Setup that helps the site get found and indexed by search engines. Added August 2026.

- **Structured data:** a `Person` JSON-LD block in `index.html` (schema.org), with `alumniOf` (Imperial College London) and `sameAs` links to LinkedIn, GitHub, Medium, Gumroad, Google Play, and Instagram, so search engines tie all the profiles to one identity.
- **Google Search Console:** property verified for `https://shazmoghaddam.github.io/` using the HTML meta-tag method. The `google-site-verification` tag lives in the `<head>` of `index.html` and must stay there to keep the property verified.
- **Sitemap:** `sitemap.xml` at the repo root, submitted in Search Console. Lists the homepage and the WC2026 demo. To add a new page later, copy a `<url>` block, change the address, and update the date.
- **Backlinks:** the site URL is linked from external profiles (LinkedIn, GitHub, Medium, Google Play, Gumroad, Envato) so trusted domains point back to the site.

> Deployment note: the site is served by GitHub Pages with Jekyll left on (no `.nojekyll` file). If a future commit ever fails to deploy with a build error, add an empty `.nojekyll` file to the repo root to skip the Jekyll step, since the site is plain static files.

---

## Stats (as shown on site)

| Stat | Count |
|------|-------|
| Android Apps | 7 |
| Digital Products | 13 |
| Projects | 46 |
| Certifications | 6 |
| Publications | 7 |

---

## Projects Highlighted

- **VoltEdge** — Enterprise energy intelligence platform with causal AI anomaly detection and CSRD-ready ESG reporting
- **SalaryAxis** — UK salary intelligence platform built on ONS open data
- **CVLens** — AI CV reader & analyser using NLP and spaCy
- **Stock Tracker Dashboard** — Real-time stock dashboard with Streamlit and Plotly
- **Lending Club Loan Project** — Loan data analysis & ML prediction (Python, scikit-learn, pandas)
- **FAO & FDI Data Analysis** — Global agricultural and investment trend analysis
- **FIFA World Cup 2026 Predictor** — Interactive bracket predictor with 188-question trivia quiz and PNG export
- **World Map** — Interactive choropleth map covering 172 countries across 7 data layers with custom data import and a JS API
- **SearchWars** — Flutter mobile game: which gets more Google searches?
- **KNOK Matrix / Mono** — Geometric SVG typographic system and live digital clock
- **Typography Digits** — Generative word-cloud art using canvas pixel masking and SVG clipPath

---

## Android Apps

| App | Platform |
|-----|----------|
| Bingo Maths | Google Play Store |
| Math Adventure — Maths for Kids | Google Play Store |
| Animated Month Wallpaper | Google Play Store |
| Animated Weekday Wallpaper | Google Play Store |
| Split Flap World Clock | Google Play Store |
| World Builders | Google Play Store |
| SearchWars — Which Gets More Google Searches? | Google Play Store |

---

## Digital Products

| Product | Platform |
|---------|----------|
| Market Pulse — Minimal Economic Calendar for Traders | Gumroad |
| TradeHours Pro — Live Global Market Hours | Gumroad |
| KNOK Matrix / Mono — Geometric SVG Typographic System | Gumroad |
| Typography Digits — Generative Word-Cloud Art | Gumroad |
| Animated Live Wallpapers — Months & Weekdays | Lemon Squeezy |
| Aero Atlas — Terminal Time Screensaver | Envato |

---

## Certifications

| Credential | Issuer | Date |
|-----------|--------|------|
| Data Science Online Bootcamp (96% avg) | Imperial College London / HyperionDev | June 2025 |
| 100 Days of Code: Complete Python Pro Bootcamp | Udemy | July 2023 |
| The Data Science Course: Complete Data Science Bootcamp 2025 | Udemy | Oct 2025 |
| Google Play Store Listing Certificate | Google Play Academy | April 2026 |
| iOS & Swift: The Complete iOS App Development Bootcamp | Udemy | Jan 2024 |
| 50 Blood Donations Certificate | NHS Blood & Transplant | 2026 |

---

## Writing

Six personal essays published on [Medium](https://medium.com/@shaz.moghaddam), displayed as an interactive radial mindmap on the site (with a mobile list fallback).

| Article | Theme |
|---------|-------|
| [The Art of Becoming](https://medium.com/@shaz.moghaddam/the-art-of-becoming-440d736a68fc) | Growth, identity, and the person you're still becoming |
| [The Art of Unlearning](https://medium.com/@shaz.moghaddam/the-art-of-unlearning-1b14d5be3985) | Letting go of what no longer fits |
| [Building Resilience in the Face of Change](https://medium.com/@shaz.moghaddam/building-resilience-in-the-face-of-change-d2f7bc777314) | Continuing forward when life doesn't go to plan |
| [The Road Is Always Calling](https://medium.com/@shaz.moghaddam/the-road-is-always-calling-252fc652420f) | On riding, growing up, and the things we pass on without realising it |
| [One Ear, Two Kids, and Fifty Pints of Gratitude](https://medium.com/@shaz.moghaddam/one-ear-two-kids-and-fifty-pints-of-gratitude-328e444b2126) | On hearing loss, fatherhood, and counting what counts |
| [Co-Evolving](https://medium.com/@shaz.moghaddam/co-evolving-5e9567d9bcfb) | On AI, socialising, and the quiet search for connection |

---

## Internationalisation

The site ships with full translations in **5 languages**, covering every visible text element — section labels, headings, body copy, article titles, navigation hints, and UI controls.

| Code | Language |
|------|----------|
| `en` | English (default) |
| `fr` | Français |
| `de` | Deutsch |
| `es` | Español |
| `nl` | Nederlands |

Language is selected via the globe icon in the header and persists across page refreshes via `localStorage`. The `html[lang]` attribute updates on every switch for accessibility.

---

## Contact

- **Email:** shaz.moghaddam@gmail.com
- **GitHub:** [ShazMoghaddam](https://github.com/ShazMoghaddam)
- **LinkedIn:** [shazmoghaddam](https://www.linkedin.com/in/shazmoghaddam/)
- **Instagram:** [@shaz.0098](https://instagram.com/shaz.0098)

---

## Availability

Open to **freelance**, **contract**, and **full-time** opportunities in data science, Python development, and digital product work — in London or internationally.

---

⭐ If you find this project useful or interesting, feel free to star the repository.
