# Adding Modules to Xahau Academy

## Step-by-Step Guide

### 1. Create the Module File

Copy the template:
```bash
cp src/data/modules/_template.js src/data/modules/m05-your-topic.js
```

### 2. Fill in the Content

Edit the new file. Every text field must have translations in all 3 languages:

```js
title: {
  es: "Título en español",
  en: "Title in English",
  jp: "日本語のタイトル",
}
```

### 3. Content Types

#### Theory (Markdown-ish)
Supports: `**bold**`, `` `inline code` ``, `### headings`, `- bullet lists`, `1. numbered lists`, `[links](url)`

#### Code Blocks
```js
codeBlocks: [
  {
    title: { es: "...", en: "...", jp: "..." },
    language: "c",        // "c" | "javascript" | "bash" | "python"
    code: `your code here`
  }
]
```

#### Slides
```js
slides: [
  {
    title: { es: "...", en: "...", jp: "..." },
    content: { es: "Line 1\nLine 2", en: "...", jp: "..." },
    visual: "🔮"          // Single emoji
  }
]
```

### 4. Register the Module

Edit `src/data/courses.js`:

```js
import m05 from './modules/m05-your-topic.js'

export const COURSE_DATA = [
  m01,
  m02,
  m03,
  m04,
  m05,  // ← Add here
]
```

### 5. Test

```bash
npm run dev
```

Switch through all 3 languages (ES/EN/JP) to verify all strings render correctly.

## Naming Convention

- File: `mXX-slug-name.js` (e.g., `m05-state-management.js`)
- Module id: `"m5"` 
- Lesson id: `"m5l1"`, `"m5l2"`, etc.

## Tips

- Keep slide content short — it's for live presentation, not reading
- Code examples should be tested on Xahau testnet
- Theory supports basic formatting, not full markdown
- One emoji per slide visual
