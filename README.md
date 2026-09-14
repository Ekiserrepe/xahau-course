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
- 📈 **Progress Tracking** — Mark lessons as completed
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

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- No backend required — all content is static JS modules

## Project Structure

```
src/
├── components/     # React UI components
│   └── Brand.jsx   # Wordmark, icon set, module colour themes
├── data/
│   ├── i18n.js     # UI translations
│   ├── courses.js  # Module index
│   └── modules/    # Individual course modules
└── styles/         # Global CSS
```

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
