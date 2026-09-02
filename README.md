# shazmoghaddam.github.io

Personal website and portfolio for Shaz Moghaddam, a London-based Data Scientist, Python Developer, and App & Automation Developer, trained at Imperial College London.

Live site: https://shazmoghaddam.github.io

## About

This repository holds the source for my personal site, hosted on GitHub Pages. It's a single-page, responsive portfolio covering my work across data science, Python development, Android apps, digital products, photography, and design.

## Built with

- HTML5, CSS3, and vanilla JavaScript
- i18next for multi-language support (English, French, German, Spanish, Dutch)
- GitHub Pages

## Features

- Responsive single-page layout with smooth scrolling and light/dark mode
- Skills and tools spanning data, frameworks, cloud, and design
- Projects, apps, digital products, certifications, and writing sections
- Live location, clock, and weather in the header
- Five-language switcher, with translations generated from a single English source (see below)

## Multi-language setup

English is the single source of truth. Copy lives in `i18n/locales/en.json`, and the French, German, Spanish, and Dutch versions are generated from it by a build script rather than maintained by hand. Everything stays baked into the page, so the site loads instantly and works offline with no live translation service at view time.

To update any text on the site, edit `i18n/locales/en.json` and run:

```bash
DEEPL_API_KEY=your-key node i18n/build.mjs
```

Only the strings that changed get re-translated, and `i18n.js` regenerates automatically. Full details in [`i18n/README.md`](i18n/README.md).

## Structure

```
index.html          # Main content and structure
styles.css          # Styling
main.js             # Interactions and animations
i18n.js             # Generated translation bundle (do not edit by hand)
i18n/               # Translation source, build script, and locale files
```

## Selected projects

- **VoltEdge** — Enterprise energy intelligence platform with ML anomaly detection, causal AI root-cause analysis, and CSRD-ready ESG reporting (Python, FastAPI, Plotly Dash, scikit-learn, Claude API)
- **ClinIQ** — B2B clinical trial site performance intelligence for mid-market CROs (Python, FastAPI, SQLAlchemy, spaCy, Claude API)
- **SalaryAxis** — UK salary intelligence platform built on ONS open data (Python, Flask, React, pandas)
- **CVLens** — AI CV reader and analyser using NLP and spaCy
- **Stock Tracker Dashboard** — Real-time stock dashboard with Streamlit and Plotly

## Apps and digital products

Android apps published on the Google Play Store, plus digital products across Gumroad, Envato, and Lemon Squeezy. Full list on the live site.

## Certifications

- Data Science Online Bootcamp — Imperial College London / HyperionDev (96% average)
- The Data Science Course: Complete Data Science Bootcamp — Udemy
- 100 Days of Code: The Complete Python Pro Bootcamp — Udemy
- iOS & Swift: The Complete iOS App Development Bootcamp — Udemy
- Google Play Store Listing Certificate — Google Play Academy

## Contact

- Email: shaz.moghaddam@gmail.com
- GitHub: [ShazMoghaddam](https://github.com/ShazMoghaddam)
- LinkedIn: [shazmoghaddam](https://www.linkedin.com/in/shazmoghaddam/)
- Instagram: [@shaz.0098](https://instagram.com/shaz.0098)

## Availability

Open to freelance, contract, and full-time opportunities in data science, Python development, and digital product work, in London or internationally.
