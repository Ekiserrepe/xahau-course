import React from 'react'

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold" style={{ color: 'var(--color-text-heading)' }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: 'var(--color-inline-code-bg)', color: 'var(--color-accent)' }}>
          {part.slice(1, -1)}
        </code>
      )
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
          {linkMatch[1]}
        </a>
      )
    }
    return part
  })
}

export default function Markdown({ text }) {
  if (!text) return null
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code blocks (``` ... ```)
    if (line.trimStart().startsWith('```')) {
      const codeLines = []
      i++ // skip opening ```
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="rounded-xl p-4 my-3 overflow-x-auto text-sm leading-relaxed font-mono"
          style={{
            background: 'var(--color-code-bg)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-code-text)',
          }}
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    // Table rows (|...|...|)
    if (line.trimStart().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      // Parse table
      const rows = tableLines
        .filter((row) => !/^\|\s*-+/.test(row)) // skip separator rows like |---|---|
        .map((row) =>
          row
            .split('|')
            .slice(1, -1) // remove empty first/last from split
            .map((cell) => cell.trim())
        )

      if (rows.length > 0) {
        const headerRow = rows[0]
        const bodyRows = rows.slice(1)
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse" style={{ borderColor: 'var(--color-border)' }}>
              <thead>
                <tr>
                  {headerRow.map((cell, ci) => (
                    <th
                      key={ci}
                      className="text-left px-3 py-2 font-bold text-xs uppercase tracking-wider"
                      style={{
                        background: 'var(--color-code-header)',
                        borderBottom: '2px solid var(--color-border)',
                        color: 'var(--color-text-heading)',
                      }}
                    >
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-3 py-2"
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold mt-5 mb-2" style={{ color: 'var(--color-accent)' }}>
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold mt-6 mb-3" style={{ color: 'var(--color-accent)' }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 ml-4 mb-1">
          <span style={{ color: 'var(--color-accent)' }}>•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)/)
      elements.push(
        <div key={i} className="flex gap-2 ml-4 mb-1">
          <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{match[1]}.</span>
          <span>{renderInline(match[2])}</span>
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-3" />)
    } else {
      elements.push(
        <p key={i} className="mb-2 leading-relaxed">
          {renderInline(line)}
        </p>
      )
    }

    i++
  }

  return <div>{elements}</div>
}
