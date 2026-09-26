/**
 * Which file a lesson's code block shows, so theory that names it in inline
 * code (`hola-xahau.js`, `src/App.jsx`) can link to it in the Code tab.
 *
 * Read, in order, from:
 *   1. an explicit `file` on the block
 *   2. the first line of its English code, when that line is a comment naming
 *      the file ("// File: hola-xahau.js", "// src/App.jsx — QR login",
 *      "# File: .env.example")
 *   3. the start of its English title ("server.js — Full Express server")
 * Blocks that don't name a file (most one-off query scripts) return null.
 *
 * Shared by the build script (each lesson's file list in the manifest) and the
 * app (theory links that jump to a file in the Code tab), so both sides agree.
 */

/** A token that looks like a file name: "a.js", "src/App.jsx", ".env", ".env.example". */
const FILE_NAME = /^(?:\.[\w-]+(?:\.[\w-]+)*|[\w-][\w./-]*\.[a-z]+)$/i

const asFile = (token) => (token && FILE_NAME.test(token) ? token : null)

export function codeFile(block) {
  if (!block) return null
  if (block.file) return block.file
  const code = typeof block.code === 'string' ? block.code : (block.code?.en ?? '')
  const first = code.split('\n').find((l) => l.trim()) ?? ''
  const comment = first.match(/^\s*(?:\/\/|#)\s*(?:File:\s*)?(\S+)/i)
  const title = (block.title?.en ?? '').trim().split(/\s/)[0]
  return asFile(comment?.[1]) ?? asFile(title)
}

/** The DOM id of a file's code block, the target a theory link scrolls to. */
export const codeAnchor = (file) => `code-${file.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
