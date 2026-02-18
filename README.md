# ⬡ Xahau Academy

Open-source, multilingual training portal for learning Xahau blockchain development.

![License](https://img.shields.io/badge/license-MIT-green)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN%20%7C%20JP-blue)

## Features

- 📖 **Theory** — Formatted content with markdown support
- 💻 **Code Blocks** — Copyable code examples with syntax highlighting (C, JavaScript, Bash)
- 📊 **Presentation Mode** — Fullscreen slides with keyboard navigation
- 🌐 **Multilingual** — Spanish, English, and Japanese
- 📈 **Progress Tracking** — Mark lessons as completed
- 🔌 **Modular** — Easy to add new modules and lessons

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/xahau-academy.git
cd xahau-academy
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

See [docs/ADDING_MODULES.md](docs/ADDING_MODULES.md) for a step-by-step guide.

Quick version:
1. Copy `src/data/modules/_template.js` → `src/data/modules/mXX-your-topic.js`
2. Fill in content for all 3 languages (es, en, jp)
3. Import in `src/data/courses.js`

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- No backend required — all content is static JS modules

## Project Structure

```
src/
├── components/     # React UI components
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

Built for the Xahau developer community. Learn more about Xahau at [xahau.network](https://xahau.network).
