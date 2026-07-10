import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

const LANG_META = {
  javascript: { label: 'JS',     color: '#f7df1e', text: '#000' },
  typescript: { label: 'TS',     color: '#3178c6', text: '#fff' },
  bash:        { label: 'BASH',   color: '#4eaa25', text: '#fff' },
  sh:          { label: 'SH',     color: '#4eaa25', text: '#fff' },
  c:           { label: 'C',      color: '#00599c', text: '#fff' },
  python:      { label: 'PY',     color: '#3776ab', text: '#fff' },
  json:        { label: 'JSON',   color: '#888',    text: '#fff' },
  html:        { label: 'HTML',   color: '#e34c26', text: '#fff' },
  css:         { label: 'CSS',    color: '#264de4', text: '#fff' },
}

export default function CodeBlock({ block, lang, labels, theme }) {
  const [copied, setCopied] = useState(false)

  const code = typeof block.code === 'object'
    ? (block.code[lang] ?? block.code.en ?? block.code.es ?? '')
    : (block.code ?? '')

  const language = block.language || 'text'
  const meta = LANG_META[language] || { label: language.toUpperCase(), color: '#555', text: '#fff' }
  const isDark = theme !== 'light'
  const lineCount = code.split('\n').length

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--color-code-bg)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 gap-3"
        style={{
          background: 'var(--color-code-header)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>

          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 tracking-wider"
            style={{ background: meta.color, color: meta.text }}
          >
            {meta.label}
          </span>

          <span
            className="text-sm truncate"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {block.title?.[lang] || block.title?.en || ''}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all shrink-0"
          style={{
            background: copied ? 'var(--color-copy-active-bg)' : 'var(--color-button-bg)',
            color: copied ? '#4eaa25' : 'var(--color-text-muted)',
            border: `1px solid ${copied ? '#4eaa25' : 'var(--color-border)'}`,
          }}
        >
          {copied ? (
            <><svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg> {labels.copied}</>
          ) : (
            <><svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" /><path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" /></svg> {labels.copy}</>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        showLineNumbers={lineCount > 4}
        lineNumberStyle={{
          color: isDark ? '#3a4a5a' : '#bcc4cc',
          paddingRight: '1.5em',
          minWidth: '2.8em',
          userSelect: 'none',
          fontSize: '12px',
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          direction: 'ltr',
          textAlign: 'left',
          fontSize: '13.5px',
          lineHeight: '1.65',
          overflowX: 'auto',
        }}
        codeTagProps={{ style: { fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
