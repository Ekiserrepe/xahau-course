/**
 * Line-by-line translations of the course code for languages whose code is
 * derived from the English (French and Arabic): the code stays identical, and
 * only its prose is translated through a dictionary keyed by the English text.
 *
 * Prose means three things, found by the same rules when translating and when
 * testing for gaps:
 *   - comments (//, #, /* *\/ lines, <!-- -->, and comments after code)
 *   - string literals in messages: console.log/error/warn/info, new Error,
 *     alert, React setters (setError("…")), res.json({ error: "…" }), showErr
 *   - UI text in JSX/HTML: text between tags, and placeholder/title/alt values
 * A dictionary entry equal to its key keeps the text as it is (an identifier,
 * a result code, a URL). A text with no entry stays in English, and
 * tests/course-data.test.js lists it.
 */

import { FR } from "./code-i18n-fr.js"
import { AR } from "./code-i18n-ar.js"
import { KO } from "./code-i18n-ko.js"

/** Index of the first `marker` outside a string literal, or -1. */
function outsideStrings(line, marker) {
  let quote = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quote) {
      if (ch === '\\') i++
      else if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'" || ch === '`') quote = ch
    else if (line.startsWith(marker, i)) return i
  }
  return -1
}

const DIRECTIVE = /^#\s*(include|define|undef|if|ifdef|ifndef|elif|else|endif|pragma)\b/

/** The comment in one line as [before, text, after], or null. */
export function commentOf(line, language) {
  const t = line.trim()
  const indent = line.slice(0, line.length - line.trimStart().length)
  if (!t || DIRECTIVE.test(t)) return null
  if (/^\/\/ (File: |node )/.test(t)) return null
  let m
  if ((m = t.match(/^(\/\/+\s?)(.*)$/))) return [indent + m[1], m[2], '']
  if ((m = t.match(/^(\/\*\*?\s?|\*\s?)(.*?)(\s*\*\/)?$/)) && !t.startsWith('*/')) return [indent + m[1], m[2], m[3] ?? '']
  if ((m = t.match(/^(<!--\s?)(.*?)(\s?-->)$/))) return [indent + m[1], m[2], m[3]]
  if ((m = t.match(/^(\{\/\*\s?)(.*?)(\s?\*\/\})$/))) return [indent + m[1], m[2], m[3]]
  if (language === 'bash' && (m = t.match(/^(#+\s?)(.*)$/))) return [indent + m[1], m[2], '']
  const marker = language === 'bash' ? ' #' : '//'
  const at = outsideStrings(line, marker)
  if (at > 0 && line.slice(0, at).trim() && !/https?:$/.test(line.slice(0, at))) {
    const rest = line.slice(at + marker.length)
    const lead = rest.match(/^\s*/)[0]
    return [line.slice(0, at + marker.length) + lead, rest.slice(lead.length), '']
  }
  return null
}

const MESSAGE = /\b(console\.(?:log|error|warn|info)|new Error|alert|set[A-Z]\w*|showErr|json)\s*\(/
const JSXISH = /<\/?[A-Za-z][\w.-]*[\s>/]|\/>/
const HAS_WORD = /[A-Za-zÀ-ɏ؀-ۿ]{2}/

/**
 * Translatable segments of one line: [{ start, end, text, quote? }], where
 * line.slice(start, end) === text. Comments first, then strings and UI text
 * in the code before the comment.
 */
export function segmentsOf(line, language) {
  const out = []
  const c = commentOf(line, language)
  // The code before the comment: none for a whole-line comment
  let scan = line
  if (c) {
    out.push({ start: c[0].length, end: c[0].length + c[1].length, text: c[1] })
    const marker = language === 'bash' ? ' #' : '//'
    const at = c[0].lastIndexOf(marker)
    const wholeLine = /^\s*(\/\/|\/\*|\*|#|<!--|\{\/\*)/.test(line)
    scan = wholeLine || at < 0 ? '' : line.slice(0, at)
  }
  if (language === 'bash' || language === 'json') return out
  if (MESSAGE.test(scan)) {
    for (const m of scan.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/g)) {
      if (HAS_WORD.test(m[2]) && !/^https?:\/\/\S*$/.test(m[2])) out.push({ start: m.index + 1, end: m.index + 1 + m[2].length, text: m[2], quote: m[1] })
    }
  } else if (language === 'html' || JSXISH.test(scan)) {
    for (const m of scan.matchAll(/\b(placeholder|title|alt|aria-label)=(["'])((?:(?!\2).)*)\2/g)) {
      if (HAS_WORD.test(m[3])) { const s = m.index + m[1].length + 2; out.push({ start: s, end: s + m[3].length, text: m[3], quote: m[2] }) }
    }
    for (const m of scan.matchAll(/>([^<>{}]*)</g)) {
      const t = m[1].trim()
      if (HAS_WORD.test(t)) { const s = m.index + 1 + m[1].indexOf(t); out.push({ start: s, end: s + t.length, text: t }) }
    }
  }
  return out
}

const escapeFor = (quote, s) => (quote ? s.replace(new RegExp(`(?<!\\\\)${quote === '`' ? '`' : quote}`, 'g'), '\\' + quote) : s)

/** Translate the prose in `code` with `dict`; everything else stays byte for byte. */
export function localizeCode(code, language, dict) {
  return code
    .split('\n')
    .map((line) => {
      // The label of a file-name line; the file name itself stays as it is
      const label = line.match(/^(\s*(?:\/\/|#)\s*)File:/)
      if (label && dict['File:']) return line.replace(/File:/, dict['File:'])
      const segs = segmentsOf(line, language).sort((a, b) => b.start - a.start)
      for (const s of segs) {
        const key = s.text.trim()
        const tr = dict[key]
        if (tr === undefined || tr === key) continue
        const lead = s.text.slice(0, s.text.indexOf(key))
        const trail = s.text.slice(s.text.indexOf(key) + key.length)
        line = line.slice(0, s.start) + lead + escapeFor(s.quote, tr) + trail + line.slice(s.end)
      }
      return line
    })
    .join('\n')
}

/** Prose in `code` that `dict` doesn't cover (for the test). */
export function untranslatedIn(code, language, dict) {
  const miss = []
  for (const line of code.split('\n')) {
    for (const s of segmentsOf(line, language)) {
      const key = s.text.trim()
      if (key && HAS_WORD.test(key) && dict[key] === undefined) miss.push(key)
    }
  }
  return miss
}

/** Blocks whose Korean code was derived, because they had none of their own (for the test). */
export const derivedKorean = new WeakSet()

/**
 * Give every code block of a module its French and Arabic code: the English
 * code with its prose translated. A block with no Korean code gets it the same
 * way. Blocks marked `manual` carry all their languages already (the
 * course-accounts and token-distribution scripts).
 */
export function deriveCodeTranslations(module) {
  for (const lesson of module.lessons) {
    for (const block of lesson.codeBlocks ?? []) {
      if (block.manual) continue
      if (typeof block.code === 'string') block.code = { en: block.code }
      const en = block.code.en ?? block.code.es
      block.code.fr = localizeCode(en, block.language, FR)
      block.code.ar = localizeCode(en, block.language, AR)
      if (!block.code.ko) {
        block.code.ko = localizeCode(en, block.language, KO)
        derivedKorean.add(block)
      }
    }
  }
}
