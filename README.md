# ⬡ Learn Xahau

A free, open-source **basic course on Xahau**, in eight languages — from your first wallet to your first Hook.

[https://learnxahau.inftf.org](https://learnxahau.inftf.org).

![License](https://img.shields.io/badge/license-MIT-green)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN%20%7C%20JP%7C%20KO%7C%20ZH-blue)

## Features

- 📖 **Theory** — Formatted content with markdown support
- 💻 **Code Blocks** — Copyable code examples with syntax highlighting (C, JavaScript, Bash)
- 📊 **Presentation Mode** — Fullscreen slides with keyboard navigation
- 🌐 **Multilingual** — English, Spanish, French, Portuguese, Japanese, Korean, Simplified Chinese and Arabic (RTL)
- 🔎 **Search** — Full-text across every lesson title and body (⌘K / Ctrl-K)
- ✅ **Module checks** — Optional self-assessment at the end of a module
- 📈 **Progress Tracking** — Marked lessons persist in the browser
- 🔌 **Modular** — Easy to add new modules and lessons


## Design

The interface follows the [xahau.network](https://xahau.network) design system, so the
course reads as part of the Xahau family rather than a separate product:

- **Canvas** `#f7f7f7`, white editorial cards at `24px` radius with a soft lifted shadow
- **Type** Onest for everything, `ui-monospace` for micro-labels, chips and counters
- **Accent** Xahau green (`#007a28` on light, `#5de48c` on dark) with a teal secondary
- **Modules** cycle through four brand tints — green, teal, sand, sage
- **Buttons** `6px` radius, never pills

Shared primitives (`.x-card`, `.x-btn`, `.x-chip`, `.x-act-label`) and the token set live in
`src/styles/index.css`; the wordmark lockup, icon set and module themes live in
`src/components/Brand.jsx`. Light is the default; a dark counterpart built on the brand's
`#0f2328` ink is available from the header toggle.

## Before going live

`site.config.js` holds a placeholder URL. Replace `SITE_URL` with the real
host — it feeds the canonical link, the Open Graph and Twitter image URLs,
`robots.txt` and `sitemap.xml`, and all four are wrong until you do.

`.github/workflows/deploy.yml` is manual-trigger only until someone confirms
GitHub Pages is the right target.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- No backend required — all content is static JS modules

## How the course data loads

The twelve modules total roughly 3 MB. Importing them all up front meant every
visitor downloaded the entire curriculum before the index page painted, so the
data is split in three:

| Artefact | Generated | Loaded |
|---|---|---|
| `src/data/generated/manifest.js` | at build | bundled — module and lesson titles, so the overview renders instantly |
| `src/data/modules/*.js` | hand-written | one dynamic `import()` per module, on open (next module prefetched) |
| `public/search/<lang>.json` | at build | fetched the first time search opens |

`npm run prebuild` (and `predev`) runs `scripts/build-course-data.mjs`, which
writes the manifest, the per-language search indexes and `public/sitemap.xml`.
Never edit `src/data/generated/` by hand.

Result: the index page loads one ~100 KB script instead of 3.1 MB.

## Adding a module

1. Create `src/data/modules/mXX-your-slug.js` (copy `_template.js`)
2. Register the filename in `src/data/module-list.js`
3. Add a line icon for its `id` to `ICON_PATHS` in `src/components/Brand.jsx`
4. Optionally add `src/data/quizzes/<module id>.js` for an end-of-module check

`npm run dev` regenerates everything derived.

## Project Structure

```
src/
├── components/     # React UI components
│   └── Brand.jsx   # Wordmark, icon set, module colour themes
├── data/
│   ├── i18n.js        # UI translations
│   ├── locales.js     # Language registry (internal code -> BCP-47 tag)
│   ├── courses.js     # Manifest + lazy module loaders
│   ├── module-list.js # Course running order
│   ├── modules/       # Individual course modules
│   ├── quizzes/       # Optional end-of-module checks
│   └── generated/     # Build output — do not edit
└── styles/         # Global CSS

scripts/
├── build-course-data.mjs  # manifest, search indexes, sitemap, robots.txt
└── make-og-image.py       # social card

tests/
└── course-data.test.js    # smoke tests for the data pipeline
```

## Scripts

| | |
|---|---|
| `npm run dev` | regenerates course data, then serves |
| `npm run build` | regenerates course data, then builds |
| `npm run lint` | ESLint |
| `npm test` | regenerates course data, then runs the smoke tests |

## Contributing

Contributions welcome! Whether it's new modules, translations, or UI improvements.

1. Fork the repo
2. Create a branch (`git checkout -b feature/new-module`)
3. Commit your changes
4. Push and open a PR

## License

MIT — Use freely for education and community building.

## Credits

Built by [INFTF](https://inftf.org). Learn more about Xahau at [xahau.network](https://xahau.network).
