import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import cLang from 'react-syntax-highlighter/dist/esm/languages/prism/c'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import { CheckIcon } from './Brand'

/**
 * The default `Prism` export bundles every language Prism ships — roughly 300
 * of them — for a course that uses five. PrismLight registers only these.
 * Adding a new `language:` to a lesson means adding it here too.
 */
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sh', bash)
SyntaxHighlighter.registerLanguage('c', cLang)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('html', markup)

/**
 * Language badges — a monospace tag rather than a coloured chip, so a page
 * with six snippets still reads as one calm document.
 */
const LANG_LABEL = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  bash: 'Bash',
  sh: 'Shell',
  c: 'C',
  python: 'Python',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
}

function CopyIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
      <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
    </svg>
  )
}

/**
 * CodeBlock — an ink panel that sits inside the white editorial card.
 * The contrast is deliberate: code is the one place on the page allowed to
 * go dark, which makes snippets scannable without any extra decoration.
 */
export default function CodeBlock({ block, lang, labels }) {
  const [copied, setCopied] = useState(false)

  const code =
    typeof block.code === 'object'
      ? block.code[lang] ?? block.code.en ?? block.code.es ?? ''
      : block.code ?? ''

  const language = block.language || 'text'
  const label = LANG_LABEL[language] || language.toUpperCase()
  const title = block.title?.[lang] || block.title?.en || ''
  const lineCount = code.split('\n').length

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <figure
      className="m-0 rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-code-bg)',
        border: '1px solid var(--color-code-border)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <figcaption
        className="flex items-center justify-between gap-3 px-4 py-2.5"
        style={{
          background: 'var(--color-code-header)',
          borderBottom: '1px solid var(--color-code-border)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] shrink-0"
            style={{ color: 'var(--xahau-green)' }}
          >
            {label}
          </span>
          {title && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>|</span>
              <span
                className="text-[13px] truncate"
                style={{ color: 'rgba(228,237,239,0.7)', direction: 'ltr' }}
              >
                {title}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-md text-[11.5px] font-semibold transition-colors"
          style={{
            background: copied ? 'var(--color-copy-active-bg)' : 'rgba(255,255,255,0.06)',
            color: copied ? 'var(--xahau-green)' : 'rgba(228,237,239,0.65)',
            border: `1px solid ${copied ? 'rgba(93,228,140,0.4)' : 'rgba(255,255,255,0.1)'}`,
            cursor: 'pointer',
          }}
        >
          {copied ? <CheckIcon size={11} /> : <CopyIcon />}
          {copied ? labels.copied : labels.copy}
        </button>
      </figcaption>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={lineCount > 4}
        lineNumberStyle={{
          color: 'rgba(228,237,239,0.22)',
          paddingInlineEnd: '1.5em',
          minWidth: '2.8em',
          userSelect: 'none',
          fontSize: '12px',
        }}
        customStyle={{
          margin: 0,
          padding: '1.15rem 1rem',
          background: 'transparent',
          direction: 'ltr',
          textAlign: 'left',
          fontSize: '13.5px',
          lineHeight: '1.7',
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: { fontFamily: "'Fira Code', ui-monospace, Consolas, monospace" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </figure>
  )
}
