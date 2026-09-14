import React, { useState, useEffect } from 'react'
import { ActLabel } from './Brand'

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

/**
 * SlideViewer — presentation mode.
 *
 * Same editorial grammar as the rest of the course: the brand canvas behind,
 * one white card holding the slide, and the chrome pushed to the extremes of
 * the screen so the room only ever looks at the content.
 */
export default function SlideViewer({ slides, lang, labels, onExit }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrent((c) => Math.min(c + 1, slides.length - 1))
      }
      if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(c - 1, 0))
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [slides.length, onExit])

  const slide = slides[current]
  const pct = ((current + 1) / slides.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Thin progress rail across the very top */}
      <div style={{ height: 3, background: 'var(--color-border-subtle)' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--color-accent)',
            transition: 'width 0.35s ease',
          }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-3.5">
        <ActLabel>{labels.slideMode}</ActLabel>

        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[11px] tabular-nums tracking-[0.1em]"
            style={{ color: 'var(--color-text-dim)' }}
          >
            {String(current + 1).padStart(2, '0')} {labels.slideOf}{' '}
            {String(slides.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={onExit} className="x-btn x-btn-ghost" style={{ height: 34, padding: '0 14px', fontSize: 12.5 }}>
            {labels.exitSlides}
            <span className="hidden sm:inline" style={{ opacity: 0.6 }}>Esc</span>
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-8 pb-4">
        <div
          className="x-card w-full max-w-4xl h-full flex flex-col items-center justify-center text-center px-6 py-10 sm:px-16 sm:py-14 overflow-y-auto"
        >
          {slide.visual && (
            <div className="text-6xl sm:text-7xl mb-8 leading-none" aria-hidden="true">
              {slide.visual}
            </div>
          )}
          <h2
            className="x-title max-w-[20ch]"
            style={{ fontSize: 'clamp(28px, 4.6vw, 48px)' }}
          >
            {localized(slide.title, lang)}
          </h2>
          <div
            className="mt-7 text-base sm:text-xl leading-relaxed whitespace-pre-line max-w-[60ch]"
            style={{ color: 'var(--color-text)' }}
          >
            {localized(slide.content, lang)}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 px-4 pb-6">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          className="x-btn x-btn-ghost"
          style={{ height: 42 }}
        >
          ← <span className="hidden sm:inline">{labels.prev}</span>
        </button>

        <div className="flex gap-1.5 flex-wrap justify-center max-w-[40vw]">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`${idx + 1}`}
              className="rounded-full transition-all"
              style={{
                width: idx === current ? 22 : 8,
                height: 8,
                background: idx === current ? 'var(--color-accent)' : 'var(--color-border)',
                border: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrent((c) => Math.min(c + 1, slides.length - 1))}
          disabled={current === slides.length - 1}
          className="x-btn x-btn-primary"
          style={{ height: 42 }}
        >
          <span className="hidden sm:inline">{labels.next}</span> →
        </button>
      </div>
    </div>
  )
}
