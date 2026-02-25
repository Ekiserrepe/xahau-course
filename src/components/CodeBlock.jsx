import React, { useState } from 'react'

const LANG_COLORS = {
  javascript: '#f7df1e',
  bash: '#4eaa25',
  c: '#00599c',
  python: '#3776ab',
}

export default function CodeBlock({ block, lang, labels }) {
  const [copied, setCopied] = useState(false)

  const code = typeof block.code === 'object'
    ? (block.code[lang] ?? block.code.es ?? '')
    : block.code

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="rounded-xl overflow-hidden mb-5"
      style={{ background: 'var(--color-code-bg)', border: '1px solid var(--color-border)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: 'var(--color-code-header)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold uppercase px-2 py-0.5 rounded"
            style={{ background: LANG_COLORS[block.language] || '#666', color: '#000' }}
          >
            {block.language}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{block.title[lang]}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
          style={{
            background: copied ? 'var(--color-copy-active-bg)' : 'var(--color-button-bg)',
            color: copied ? '#4eaa25' : 'var(--color-text-muted)',
            border: `1px solid ${copied ? '#4eaa25' : 'var(--color-border)'}`,
          }}
        >
          {copied ? `✓ ${labels.copied}` : labels.copy}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono" style={{ color: 'var(--color-code-text)' }}>{code}</code>
      </pre>
    </div>
  )
}
