import React, { useState, useEffect, useMemo, useRef } from 'react'
import { ModuleIcon, themeFor } from './Brand'

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

/** Fold case and strip diacritics so "codigo" finds "código". */
const fold = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

/**
 * Build a flat, foldable index of every lesson for the active language.
 * The whole curriculum is already in memory — courses.js imports all twelve
 * modules eagerly — so this costs one pass, not a fetch.
 */
function buildIndex(courseData, lang) {
  const entries = []
  courseData.forEach((mod, mIdx) => {
    const moduleTitle = localized(mod.title, lang)
    mod.lessons.forEach((lesson, lIdx) => {
      const lessonTitle = localized(lesson.title, lang)
      const theory = localized(lesson.theory, lang)
      entries.push({
        mIdx,
        lIdx,
        mod,
        moduleTitle,
        lessonTitle,
        theory,
        haystack: fold(`${moduleTitle} ${lessonTitle} ${theory}`),
        titleHaystack: fold(`${moduleTitle} ${lessonTitle}`),
      })
    })
  })
  return entries
}

/** A short window of theory around the first hit, for context in the result. */
function snippetFor(theory, needle) {
  const at = fold(theory).indexOf(needle)
  if (at < 0) return ''
  const start = Math.max(0, at - 40)
  const raw = theory
    .slice(start, at + needle.length + 110)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [label](url) -> label
    .replace(/https?:\/\/\S+/g, '')            // bare URLs add noise, not meaning
    .replace(/[#*`|>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return (start > 0 ? '… ' : '') + raw + ' …'
}

export default function Search({ open, onClose, courseData, lang, labels, theme, onOpenLesson }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const index = useMemo(() => buildIndex(courseData, lang), [courseData, lang])

  const results = useMemo(() => {
    const q = fold(query.trim())
    if (q.length < 2) return []
    // Title matches first — they're what people usually mean — then body hits.
    const inTitle = []
    const inBody = []
    for (const e of index) {
      if (e.titleHaystack.includes(q)) inTitle.push({ ...e, snippet: '' })
      else if (e.haystack.includes(q)) inBody.push({ ...e, snippet: snippetFor(e.theory, q) })
    }
    return [...inTitle, ...inBody].slice(0, 24)
  }, [query, index])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Focus after paint, or the dialog steals it back
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Keep the highlighted row in view while arrowing through
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const choose = (r) => {
    onOpenLesson(r.mIdx, r.lIdx)
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      choose(results[active])
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh]"
      style={{ background: 'rgba(15, 35, 40, 0.35)', backdropFilter: 'blur(2px)' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={labels.search}
        className="x-card w-full max-w-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '72vh' }}
        onKeyDown={onKeyDown}
      >
        {/* Query */}
        <div
          className="flex items-center gap-3 px-5"
          style={{ height: 60, borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"
            style={{ color: 'var(--color-text-dim)', flexShrink: 0 }}
          >
            <circle cx="10.5" cy="10.5" r="6.75" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="flex-1 bg-transparent border-0 outline-none text-[16px]"
            style={{ color: 'var(--color-text-heading)', fontFamily: 'inherit' }}
            aria-label={labels.search}
          />
          <kbd
            className="font-mono text-[10px] px-2 py-1 rounded"
            style={{
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-dim)',
            }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {labels.searchEmpty}
            </p>
          )}

          {results.map((r, i) => {
            const mt = themeFor(r.mIdx, theme)
            const isActive = i === active
            return (
              <button
                key={`${r.mIdx}-${r.lIdx}`}
                type="button"
                data-active={isActive}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(r)}
                className="flex items-start gap-3 w-full text-start px-3 py-2.5 rounded-lg transition-colors"
                style={{
                  background: isActive ? mt.tint : 'transparent',
                  border: `1px solid ${isActive ? mt.line : 'transparent'}`,
                  cursor: 'pointer',
                }}
              >
                <span
                  className="flex items-center justify-center shrink-0 rounded-md mt-0.5"
                  style={{
                    width: 26,
                    height: 26,
                    background: isActive ? 'var(--color-surface)' : 'var(--color-surface-alt)',
                    border: `1px solid ${mt.line}`,
                    color: mt.ink,
                  }}
                >
                  <ModuleIcon module={r.mod} size={14} />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] mb-0.5"
                    style={{ color: mt.ink }}
                  >
                    {labels.module} {String(r.mIdx).padStart(2, '0')} · {r.moduleTitle}
                  </span>
                  <span
                    className="block text-[14px] font-semibold leading-snug"
                    style={{ color: 'var(--color-text-heading)' }}
                  >
                    {r.lessonTitle}
                  </span>
                  {r.snippet && (
                    <span
                      className="block text-[12.5px] leading-snug mt-1 line-clamp-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {r.snippet}
                    </span>
                  )}
                </span>

                {isActive && (
                  <span
                    className="shrink-0 font-mono text-[10px] self-center"
                    style={{ color: mt.ink }}
                  >
                    ↵
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div
            className="flex items-center gap-3 px-5 py-2.5 font-mono text-[10px]"
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-dim)',
            }}
          >
            <span>↑↓</span>
            <span>↵ {labels.searchHint}</span>
            <span className="ms-auto">{results.length}</span>
          </div>
        )}
      </div>
    </div>
  )
}
