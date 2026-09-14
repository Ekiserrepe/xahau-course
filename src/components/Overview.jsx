import React from 'react'
import { ActLabel, CheckIcon, themeFor } from './Brand'

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

/* ── Stats strip ──────────────────────────────────────────────────────────
   The 9-column tile grid from xahau.network's home page, carrying the four
   facts that actually matter about a course, plus a dashed CTA tile.
─────────────────────────────────────────────────────────────────────────── */

function StatTile({ label, value, span, tint, line, ink }) {
  return (
    <div
      className="flex flex-col justify-end rounded-xl px-5 py-5"
      style={{
        gridColumn: `span ${span}`,
        minHeight: 132,
        background: tint,
        border: `1.5px solid ${line}`,
      }}
    >
      <span
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] mb-2"
        style={{ color: ink, opacity: 0.75 }}
      >
        {label}
      </span>
      <span
        className="font-extrabold leading-none"
        style={{ fontSize: 'clamp(30px,4.4vw,46px)', letterSpacing: '-0.03em', color: 'var(--color-text-heading)' }}
      >
        {value}
      </span>
    </div>
  )
}

function StatsStrip({ labels, stats, theme, onStart }) {
  const t = (i) => themeFor(i, theme)

  return (
    <div className="x-stats-grid">
      <StatTile label={labels.statModules} value={stats.modules} span={2} {...t(0)} />
      <StatTile label={labels.statLessons} value={stats.lessons} span={2} {...t(1)} />
      <StatTile label={labels.statLanguages} value={stats.languages} span={2} {...t(2)} />

      <button
        type="button"
        onClick={onStart}
        className="x-stats-cta group flex flex-row flex-wrap items-end justify-between gap-2 rounded-xl px-5 py-5 text-left transition-colors"
        style={{
          gridColumn: 'span 3',
          minHeight: 132,
          background: 'transparent',
          border: '1.5px dashed var(--color-border)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-hover-bg)'
          e.currentTarget.style.borderColor = 'var(--color-accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'var(--color-border)'
        }}
      >
        <span
          className="x-stats-cta-label text-[17px] font-bold leading-snug max-w-[18ch]"
          style={{ color: 'var(--color-text-heading)', letterSpacing: '-0.01em' }}
        >
          {labels.ctaTileLabel}
        </span>
        <span
          className="text-[26px] leading-none transition-transform group-hover:translate-x-1"
          style={{ color: 'var(--color-accent)' }}
        >
          →
        </span>
      </button>
    </div>
  )
}

/* ── Module card ────────────────────────────────────────────────────────── */

function ModuleCard({ mod, mIdx, lang, labels, completedLessons, onOpenLesson, theme }) {
  const mt = themeFor(mIdx, theme)
  const total = mod.lessons.length
  const completed = mod.lessons.filter((l) => completedLessons[l.id]).length
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  const isDone = completed === total && total > 0

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'var(--color-surface)',
        border: `1.5px solid ${isDone ? mt.line : 'var(--color-border-subtle)'}`,
        boxShadow: 'var(--shadow-soft)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = mt.line
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDone ? mt.line : 'var(--color-border-subtle)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Head */}
      <div
        className="flex items-start gap-4 px-5 pt-5 pb-4"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div
          className="flex items-center justify-center shrink-0 rounded-xl text-2xl"
          style={{
            width: 48,
            height: 48,
            background: mt.tint,
            border: `1px solid ${mt.line}`,
          }}
          aria-hidden="true"
        >
          {mod.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: mt.ink }}
            >
              {labels.module} {String(mIdx).padStart(2, '0')}
            </span>
            {isDone && (
              <span style={{ color: mt.ink, display: 'inline-flex' }} title={labels.completed}>
                <CheckIcon size={12} />
              </span>
            )}
          </div>

          <h3
            className="text-[16.5px] font-bold leading-snug"
            style={{ color: 'var(--color-text-heading)', letterSpacing: '-0.015em' }}
          >
            {localized(mod.title, lang)}
          </h3>

          <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--color-text-muted)' }}>
            {total} {labels.lessons}
            {completed > 0 && (
              <>
                {' · '}
                <span style={{ color: mt.ink, fontWeight: 600 }}>
                  {completed} {labels.done}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Lessons */}
      <ul className="flex-1 list-none m-0 px-3 py-3 flex flex-col gap-0.5">
        {mod.lessons.map((lesson, lIdx) => {
          const done = !!completedLessons[lesson.id]
          return (
            <li key={lesson.id}>
              <button
                type="button"
                onClick={() => onOpenLesson(mIdx, lIdx)}
                className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors"
                style={{ background: 'transparent', border: '1px solid transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-hover-bg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span
                  className="flex items-center justify-center shrink-0 rounded-md font-mono text-[10px] font-bold tabular-nums"
                  style={{
                    width: 22,
                    height: 22,
                    background: done ? mt.tint : 'var(--color-surface-alt)',
                    color: done ? mt.ink : 'var(--color-text-dim)',
                    border: `1px solid ${done ? mt.line : 'var(--color-border-subtle)'}`,
                  }}
                >
                  {done ? <CheckIcon size={10} /> : lIdx + 1}
                </span>
                <span
                  className="flex-1 text-[13.5px] leading-snug truncate"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {localized(lesson.title, lang)}
                </span>
                <span
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  style={{ color: mt.ink }}
                >
                  →
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Progress */}
      <div className="px-5 pt-3 pb-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-text-dim)' }}
          >
            {labels.progress}
          </span>
          <span
            className="text-[11.5px] font-bold tabular-nums"
            style={{ color: pct > 0 ? mt.ink : 'var(--color-text-dim)' }}
          >
            {pct}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: mt.ink }}
          />
        </div>
      </div>
    </article>
  )
}

/* ── Overview ───────────────────────────────────────────────────────────── */

export default function Overview({
  courseData,
  lang,
  labels,
  completedLessons,
  onOpenLesson,
  theme,
  stats,
}) {
  return (
    <div className="mx-auto max-w-shell px-4 sm:px-6 pb-16">
      <section className="x-card px-5 py-9 sm:px-12 sm:py-12">
        {/* Card header */}
        <ActLabel>{labels.curriculum}</ActLabel>

        <div className="mt-7 mb-9 max-w-[42ch]">
          <h2 className="x-title">
            {labels.curriculumTitle}
            <br />
            <em className="not-italic x-gradient-ink">{labels.curriculumTitleEm}</em>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {labels.curriculumSub}
          </p>
        </div>

        <StatsStrip
          labels={labels}
          stats={stats}
          theme={theme}
          onStart={() => onOpenLesson(0, 0)}
        />

        {/* Module grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courseData.map((mod, mIdx) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              mIdx={mIdx}
              lang={lang}
              labels={labels}
              completedLessons={completedLessons}
              onOpenLesson={onOpenLesson}
              theme={theme}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
