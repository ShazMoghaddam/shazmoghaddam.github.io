# Changelog

All notable changes to [shazmoghaddam.github.io](https://shazmoghaddam.github.io) are listed here, newest first.

The site uses date versions (`vYYYY.MM`). Changes merged since the last release sit under **Unreleased** until the next one is cut, and each release's notes on GitHub are taken from its section here.

## [Unreleased]

### Added
- Projects: PerilMap, the climate risk checker for London homes, with links to the live site and GitHub.
- What I've Shipped: Bezel Charts now has a View on npm link and an npm tag.
- Skills: TensorFlow, Next.js, Vercel, geospatial (rasterio and MapLibre), and publishing to npm and PyPI. GCP now names Cloud Run.
- Available on: npm and Vercel. Built with: Next.js, rasterio, MapLibre and the Environment Agency as a data source.
- Stats bar: PerilMap added to the shipping timeline.

### Changed
- Projects are ordered by how strong they are, not by date: LedgerLet, PerilMap, VoltEdge, VoltScope, Jobs & the Economy, ClinIQ, SalaryAxis, House Prices & the Economy.
- Bezel Charts: rewritten for sixteen charts, npm and PyPI, data from JavaScript, click events and about 26 kB gzipped.
- What I've Shipped: World Map removed, leaving the four strongest pieces of open-source work.
- Downloadable CV replaced with the November 2026 data scientist CV.
- README: projects in the same order as the site, PerilMap added, Bezel Charts updated, signature footer.

### Fixed
- Writing: the lines linking each article card to the "Published on Medium" hub now redraw when a card changes size, so they stay attached to the cards after switching language or when a web font loads late. ([#31](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/31))
- Writing: lines now stop just short of each card's border, matching the gap at the hub, instead of running slightly into the card. ([#31](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/31))

## [v2026.10] - 2026-10-31

The first tagged release, and the first month built through pull requests (#1 to #30).

### Added
- Projects: LedgerLet ([#1](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/1)), House Prices & the Economy ([#27](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/27)) and Jobs & the Economy ([#30](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/30)).
- What I've Shipped: Bezel Charts ([#22](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/22)), later with its Python package and a View on PyPI link ([#30](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/30)), and Bezel ([#14](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/14)).
- Digital Products: Strata Symbol Kit ([#9](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/9)).
- Stats bar: a backdrop chart drawn from real, dated project data, one bar per quarter since 2022, that highlights what each number counts on hover, focus or tap ([#17](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/17)).
- Writing: on touch screens the first tap lights a card's path to the hub and a second tap opens the article ([#5](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/5)).
- Available on: DEV, Reddit, GitHub Pages, jsDelivr and PyPI.
- Built with and Skills: JavaScript, pytest, SQLite, Alembic, Jupyter, Tableau, Web Components, SVG, Node.js, fontTools, Shapely, Bezel Charts and Matplotlib, among others.
- Footer: the open data sources behind the projects (ONS, GOV.UK, Data.gov) ([#13](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/13)).
- README screenshots and a sixth certification.

### Changed
- The whole site is translated into French, German, Spanish and Dutch, with new and changed strings translated by hand ([#2](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/2)).
- Section order: all work first (Projects, What I've Built, What I've Shipped), then Skills & Tools, About, Certifications, Writing and Contact ([#3](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/3)).
- About and What I Do rewritten to lead with deployed, tested B2B platforms, with the Design card linked to work I've built ([#9](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/9), [#12](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/12)).
- Stats: 50+ projects and 25 digital products, numbers reordered, KNOK digits made smaller with plus signs ([#14](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/14), [#18](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/18), [#23](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/23)).
- Test counts updated to match the CV: LedgerLet 600+, VoltEdge 911 ([#10](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/10), [#28](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/28)).
- VoltEdge, VoltScope, ClinIQ and SalaryAxis now link to the Moghaddam-Labs GitHub organization ([#29](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/29)).
- Downloadable CV updated three times, with a version tag on the link so browsers fetch the latest copy ([#6](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/6), [#24](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/24), [#26](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/26)).
- Licence: the site and repo are now all rights reserved ([#25](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/25)).

### Fixed
- Phones: the time strip no longer covers the open language menu, and landscape phones keep the vertical side rail ([#4](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/4)).
- The footer's rights line is set in the source translation files, so rebuilding translations no longer reverts it ([#27](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/27)).

### Removed
- KNOK Matrix from What I've Shipped, replaced by Bezel Charts ([#22](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/22)).
- The orbiting dots on the stats bar ([#9](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/pull/9)), TensorFlow from Skills, and Power BI from the CV.

## Before v2026.10

The site went live in January 2026 and was updated through direct uploads until early October 2026, before changes moved to pull requests. That history is in the [commit log](https://github.com/ShazMoghaddam/shazmoghaddam.github.io/commits/main).

[Unreleased]: https://github.com/ShazMoghaddam/shazmoghaddam.github.io/compare/v2026.10...HEAD
[v2026.10]: https://github.com/ShazMoghaddam/shazmoghaddam.github.io/releases/tag/v2026.10

---

Shaz Moghaddam · [shazmoghaddam.github.io](https://shazmoghaddam.github.io) · London
