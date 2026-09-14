import React from 'react'

/**
 * Stable, URL-safe id for a heading. Shared with LessonView, which builds the
 * "on this page" rail from the same text, so both sides agree on the anchor.
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\u0600-\u06ff\u3000-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Pull the section headings out of a lesson body, in order.
 *
 * The curriculum writes its sections as `###` — there isn't a single `##` in
 * the twelve modules — so both levels count, and the level is kept so the
 * rail can indent if a lesson ever mixes them.
 */
export function headingsOf(text) {
  const out = []
  for (const line of String(text ?? '').split('\n')) {
    const m = line.match(/^(#{2,3}) (.+)$/)
    if (!m) continue
    const label = m[2].replace(/[*`]/g, '').trim()
    if (!label) continue
    out.push({ label, id: slugify(label), level: m[1].length })
  }
  return out
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Recurse: the bold branch swallows the whole run, so `code` and links
      // nested inside it would otherwise render their markers literally.
      return <strong key={i}>{renderInline(part.slice(2, -2))}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
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

  // The lesson title is an <h1>, so its sections must be <h2> or the document
  // skips a level. The curriculum writes them as `###` — there isn't a single
  // `##` in the twelve modules — so the shallowest level present is promoted
  // to h2, and anything below it follows. A lesson that mixes both still
  // nests correctly.
  const hasH2 = lines.some((l) => l.startsWith('## '))
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trimStart().startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <pre
          key={`pre-${i}`}
          style={{
            background: 'var(--color-code-bg)',
            border: '1px solid var(--color-code-border)',
            borderRadius: '14px',
            padding: '18px 20px',
            margin: '1.5rem 0',
            overflowX: 'auto',
            direction: 'ltr',
            textAlign: 'left',
            fontSize: '13.5px',
            lineHeight: '1.7',
            color: 'var(--color-code-text)',
          }}
        >
          <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace" }}>
            {codeLines.join('\n')}
          </code>
        </pre>
      )
      continue
    }

    // Table
    if (line.trimStart().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const rows = tableLines
        .filter(row => !/^\|\s*-+/.test(row))
        .map(row => row.split('|').slice(1, -1).map(cell => cell.trim()))

      if (rows.length > 0) {
        const [headerRow, ...bodyRows] = rows
        elements.push(
          <div
            key={`tbl-${i}`}
            className="overflow-x-auto my-6 rounded-xl"
            style={{ border: '1px solid var(--color-border-subtle)' }}
          >
            <table
              style={{
                width: '100%',
                fontSize: '13.5px',
                borderCollapse: 'collapse',
                minWidth: 420,
              }}
            >
              <thead>
                <tr>
                  {headerRow.map((cell, ci) => (
                    <th
                      key={ci}
                      style={{
                        textAlign: 'start',
                        padding: '10px 14px',
                        fontFamily: "'Fira Code', ui-monospace, monospace",
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        background: 'var(--color-surface-alt)',
                        borderBottom: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                        whiteSpace: 'nowrap',
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
                        style={{
                          padding: '10px 14px',
                          borderBottom: '1px solid var(--color-border-subtle)',
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

    if (line.startsWith('## ')) {
      const raw = line.slice(3)
      elements.push(
        <h2 key={i} id={slugify(raw.replace(/[*`]/g, '').trim())}>
          {renderInline(raw)}
        </h2>,
      )
    } else if (line.startsWith('### ')) {
      const raw = line.slice(4)
      const id = slugify(raw.replace(/[*`]/g, '').trim())
      elements.push(
        hasH2 ? (
          <h3 key={i} id={id}>{renderInline(raw)}</h3>
        ) : (
          <h2 key={i} id={id} className="prose-h3">{renderInline(raw)}</h2>
        ),
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', marginInlineStart: '2px' }}>
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: 6,
              height: 6,
              marginTop: '0.62em',
              borderRadius: '50%',
              background: 'var(--color-accent)',
            }}
          />
          <span>{renderInline(line.slice(2))}</span>
        </div>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)/)
      elements.push(
        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', marginInlineStart: '2px' }}>
          <span
            style={{
              color: 'var(--color-accent)',
              fontFamily: "'Fira Code', ui-monospace, monospace",
              fontWeight: 700,
              flexShrink: 0,
              fontSize: '0.82em',
              minWidth: '1.4rem',
              lineHeight: '1.95',
            }}
          >
            {String(match[1]).padStart(2, '0')}
          </span>
          <span>{renderInline(match[2])}</span>
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '0.5rem' }} />)
    } else {
      elements.push(<p key={i}>{renderInline(line)}</p>)
    }

    i++
  }

  return <div>{elements}</div>
}
