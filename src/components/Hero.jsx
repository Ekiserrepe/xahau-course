import React from 'react'
import { ActLabel, Chip } from './Brand'

/**
 * Hero — the opening act, built on the same bones as xahau.network's index:
 * a faint world map behind centred type, two 6px-radius buttons, and a row
 * of monospace chips carrying the hard facts.
 */
export default function Hero({
  labels,
  stats,
  completedCount = 0,
  totalLessons = 0,
  onStart,
  onReset,
}) {
  const started = completedCount > 0
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)
  return (
    <section className="relative overflow-hidden">
      {/* World map — the brand's quiet backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/worldmap.svg"
          alt=""
          className="x-hero-map w-full h-full object-contain"
          style={{ maxHeight: 620 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-shell px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          <ActLabel className="justify-center mb-6">{labels.heroKicker}</ActLabel>

          <h1 className="x-display max-w-[16ch]">{labels.heroTitle}</h1>

          <p
            className="mt-6 text-lg sm:text-xl leading-relaxed max-w-[52ch]"
            style={{ color: 'var(--color-text)' }}
          >
            {labels.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onStart} className="x-btn x-btn-primary">
              {started ? labels.continueLesson : labels.heroStart}
            </button>
            <a
              href="https://docs.xahau.network"
              target="_blank"
              rel="noopener noreferrer"
              className="x-btn x-btn-secondary"
            >
              {labels.heroDocs} ↗
            </a>
          </div>

          {/* Returning learner: say where they are, and offer a way back to zero */}
          {started && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                {labels.continueAt} — {completedCount}/{totalLessons} ({pct}%)
              </span>
              <button
                type="button"
                onClick={onReset}
                className="text-[13px] underline underline-offset-2 transition-colors"
                style={{
                  color: 'var(--color-text-dim)',
                  background: 'none',
                  border: 0,
                  padding: 0,
                  cursor: 'pointer',
                  font: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-heading)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-dim)'
                }}
              >
                {labels.resetProgress}
              </button>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Chip>
              {stats.modules} {labels.statModules}
            </Chip>
            <Chip>
              {stats.lessons} {labels.statLessons}
            </Chip>
            <Chip>
              {stats.languages} {labels.statLanguages}
            </Chip>
            <Chip>MIT · Open Source</Chip>
          </div>
        </div>
      </div>
    </section>
  )
}
