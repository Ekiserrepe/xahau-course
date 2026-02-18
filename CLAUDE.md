# CLAUDE.md — Xahau Academy Course Portal

## Project Overview
Xahau Academy is an open-source, multilingual (ES/EN/JP) web-based training portal for teaching Xahau blockchain development. It features theory content, copyable code blocks, fullscreen presentation slides, and student progress tracking.

## Tech Stack
- **React 18** + Vite
- **Tailwind CSS** for styling
- **No backend** — all content is stored as JSON/JS modules in `src/data/`

## Project Structure
```
xahau-academy/
├── CLAUDE.md              # This file — project context for Claude Code
├── README.md              # Public documentation
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx           # App entry point
│   ├── App.jsx             # Main app component (router, state)
│   ├── components/
│   │   ├── Header.jsx      # Top bar with lang switcher + progress
│   │   ├── Overview.jsx    # Module listing / course overview
│   │   ├── LessonView.jsx  # Theory + Code + Slides tabs
│   │   ├── CodeBlock.jsx   # Copyable code block with syntax highlighting
│   │   ├── SlideViewer.jsx # Fullscreen presentation mode
│   │   ├── ProgressBar.jsx # Visual progress indicator
│   │   └── Markdown.jsx    # Simple markdown renderer
│   ├── data/
│   │   ├── courses.js      # Main course data index (imports all modules)
│   │   ├── i18n.js         # UI labels in ES/EN/JP
│   │   └── modules/
│   │       ├── m01-introduction.js
│   │       ├── m02-dev-environment.js
│   │       ├── m03-first-hook.js
│   │       ├── m04-deployment.js
│   │       └── _template.js   # Template for creating new modules
│   └── styles/
│       └── index.css       # Global styles + Tailwind imports
└── docs/
    └── ADDING_MODULES.md   # Guide for contributors adding content
```

## Key Conventions

### Adding a New Module
1. Copy `src/data/modules/_template.js`
2. Rename to `mXX-slug-name.js`
3. Fill in the content following the template structure
4. Import and add to the array in `src/data/courses.js`
5. Every text field must have `{ es: "", en: "", jp: "" }`

### Content Structure (per module)
```js
{
  id: "m5",
  icon: "🔮",
  title: { es: "...", en: "...", jp: "..." },
  lessons: [
    {
      id: "m5l1",
      title: { es, en, jp },
      theory: { es, en, jp },       // Markdown-ish text
      codeBlocks: [                  // Array of code examples
        { title: { es, en, jp }, language: "c|javascript|bash|python", code: "..." }
      ],
      slides: [                      // Array of presentation slides
        { title: { es, en, jp }, content: { es, en, jp }, visual: "emoji" }
      ]
    }
  ]
}
```

### Multilingual
- All user-facing strings must exist in ES, EN, and JP
- UI labels are in `src/data/i18n.js`
- Course content translations are inline in each module file

### Styling
- Dark theme with accent color `#c8ff00` (Xahau green-yellow)
- Background: `#080818` → `#0e0e24` gradients
- Font: Outfit (headings), Fira Code (code/monospace)
- Use Tailwind utilities; avoid inline styles when possible

## Common Tasks

### Run dev server
```bash
npm install
npm run dev
```

### Build for production
```bash
npm run build
```

### Add a new module
Follow the guide in `docs/ADDING_MODULES.md` or copy `src/data/modules/_template.js`.

### Add a new language
1. Add language key to all module content objects
2. Add UI labels in `src/data/i18n.js`
3. Add language button in `Header.jsx`

## Code Quality
- Keep components small and focused
- All content in `src/data/`, never hardcode text in components
- Test multilingual: switch through ES/EN/JP to verify all strings render
- Code blocks should be real, working examples tested on Xahau testnet
