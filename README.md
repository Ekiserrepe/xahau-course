# ⬡ Learn Xahau

Open-source, multilingual training portal for learning Xahau blockchain development.

[https://learnxahau.inftf.org](https://learnxahau.inftf.org).

![License](https://img.shields.io/badge/license-MIT-green)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN%20%7C%20JP%7C%20KO-blue)

## Features

- 📖 **Theory** — Formatted content with markdown support
- 💻 **Code Blocks** — Copyable code examples with syntax highlighting (C, JavaScript, Bash)
- 📊 **Presentation Mode** — Fullscreen slides with keyboard navigation
- 🌐 **Multilingual** — English, Spanish, Japanese and Korean
- 📈 **Progress Tracking** — Mark lessons as completed
- 🔌 **Modular** — Easy to add new modules and lessons


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

Built by [INFTF](https://inftf.org). Learn more about Xahau at [xahau.network](https://xahau.network).
