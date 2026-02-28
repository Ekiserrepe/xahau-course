import React, { useState, useEffect } from 'react'

export default function SlideViewer({ slides, lang, labels, onExit, theme }) {
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
  const isLight = theme === 'light'

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #f0f1f5 0%, #e8eaf0 50%, #f0f1f5 100%)'
          : 'linear-gradient(135deg, #080818 0%, #0d0d2b 50%, #0a0a1f 100%)',
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ background: 'var(--color-overlay)' }}>
        <span className="text-xs sm:text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
          {current + 1} {labels.slideOf} {slides.length}
        </span>
        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium"
          style={{
            background: 'var(--color-button-bg)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
          }}
        >
          {labels.exitSlides} <span className="hidden sm:inline">(Esc)</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 overflow-y-auto py-4">
        <div className="text-center w-full max-w-4xl">
          <div className="text-5xl sm:text-7xl mb-4 sm:mb-8">{slide.visual}</div>
          <h2
            className="text-2xl sm:text-4xl font-black mb-4 sm:mb-8 tracking-tight font-mono"
            style={{ color: 'var(--color-text-heading)' }}
          >
            {slide.title[lang]}
          </h2>
          <div
            className="text-base sm:text-xl leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {slide.content[lang]}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 pb-5 sm:pb-6 px-4">
        <button
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all text-sm"
          style={{
            background: current === 0 ? 'var(--color-button-disabled-bg)' : 'var(--color-button-bg)',
            color: current === 0 ? 'var(--color-text-faint)' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          ← {labels.prev}
        </button>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all"
              style={{
                background: idx === current ? 'var(--color-accent)' : 'var(--color-border)',
                transform: idx === current ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((c) => Math.min(c + 1, slides.length - 1))}
          disabled={current === slides.length - 1}
          className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all text-sm"
          style={{
            background: current === slides.length - 1 ? 'var(--color-button-disabled-bg)' : 'var(--color-accent)',
            color: current === slides.length - 1 ? 'var(--color-text-faint)' : '#000',
          }}
        >
          {labels.next} →
        </button>
      </div>
    </div>
  )
}
