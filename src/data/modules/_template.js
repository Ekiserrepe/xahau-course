/**
 * Module Template — Copy this file to create a new module
 *
 * Instructions:
 * 1. Copy this file and rename to mXX-your-module-slug.js
 * 2. Fill in all { es, en, jp } fields
 * 3. Import in src/data/courses.js and add to the COURSE_DATA array
 *
 * Tips:
 * - Theory supports basic markdown: **bold**, `code`, ###headings, - lists, [links](url)
 * - Code blocks: use language "javascript", "bash", "c", "json" or "html".
 *   Anything else must first be registered in src/components/CodeBlock.jsx —
 *   the highlighter only loads the languages the course actually uses.
 * - Slides: keep content short, use \n for line breaks, visual is a single emoji
 * - Each lesson needs a unique id (e.g., "m5l1", "m5l2")
 * - Module icon: the card and sidebar draw a line icon from the set in
 *   src/components/Brand.jsx, matched on this module's `id`. Add an entry to
 *   ICON_PATHS there for a new module; the `icon` emoji below is only the
 *   fallback used when no entry matches.
 * - Add new locales in src/data/locales.js, not here.
 */

export default {
  id: "mXX",           // Unique module id
  icon: "🔮",          // Fallback only — see note below
  title: {
    es: "Título del Módulo",
    pt: "Título do Módulo",
    en: "Module Title",
    jp: "モジュールタイトル",
  },
  lessons: [
    {
      id: "mXXl1",     // Unique lesson id
      title: {
        es: "Título de la lección",
        pt: "Título da lição",
        en: "Lesson Title",
        jp: "レッスンタイトル",
      },
      theory: {
        es: `Contenido teórico en español.

### Subtítulo
- Punto 1
- Punto 2

Texto con **negrita** y \`código inline\`.`,
        pt: `Contenido teórico em español.
### Subtítulo
- Punto 1
- Punto 2
Texto com **negrita** e \`código inline\`.`,
        en: `Theory content in English.

### Subtitle
- Point 1
- Point 2

Text with **bold** and \`inline code\`.`,
        jp: `日本語の理論コンテンツ。

### サブタイトル
- ポイント1
- ポイント2

**太字**と\`インラインコード\`のテキスト。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Ejemplo de código",
            pt: "Exemplo de código",
            en: "Code example",
            jp: "コード例",
          },
          language: "javascript",  // "c" | "javascript" | "bash" | "python"
          code: `// Your code here
console.log("Hello Xahau!");`,
        },
      ],
      slides: [
        {
          title: {
            es: "Título del slide",
            pt: "Título do slide",
            en: "Slide Title",
            jp: "スライドタイトル",
          },
          content: {
            es: "Contenido del slide\n\n• Punto clave 1\n• Punto clave 2",
            pt: "Conteúdo do slide\n\n• Punto chave 1\n• Punto chave 2",
            en: "Slide content\n\n• Key point 1\n• Key point 2",
            jp: "スライド内容\n\n• キーポイント1\n• キーポイント2",
          },
          visual: "🔮",  // Single emoji as visual element
        },
      ],
    },
  ],
}
