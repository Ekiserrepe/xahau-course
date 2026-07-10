import React from 'react'

const MODULE_ACCENT_COLORS = [
  '#c8ff00', '#00e5ff', '#ff6b6b', '#ffd93d',
  '#6bcb77', '#4d96ff', '#ff922b', '#cc5de8',
  '#20c997', '#f06595', '#74c0fc', '#a9e34b',
]

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

export default function Overview({ courseData, lang, labels, completedLessons, onOpenLesson }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Page heading */}
      <div className="mb-8">
        <h2
          className="text-2xl font-black tracking-tight"
          style={{ color: 'var(--color-text-heading)' }}
        >
          Course modules
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {courseData.length} modules · {courseData.reduce((a, m) => a + m.lessons.length, 0)} lessons
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courseData.map((mod, mIdx) => {
          const accent = MODULE_ACCENT_COLORS[mIdx % MODULE_ACCENT_COLORS.length]
          const completedInModule = mod.lessons.filter(l => completedLessons[l.id]).length
          const totalInModule = mod.lessons.length
          const pct = totalInModule === 0 ? 0 : Math.round((completedInModule / totalInModule) * 100)

          return (
            <div
              key={mod.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Card header */}
              <div
                className="px-5 pt-5 pb-4 flex items-start gap-4"
                style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'var(--color-surface-alt)' }}
                >
                  {mod.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {labels.module} {mIdx}
                  </div>
                  <h3
                    className="text-base font-bold leading-tight truncate"
                    style={{ color: 'var(--color-text-heading)' }}
                  >
                    {localized(mod.title, lang)}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: 'var(--color-surface-raised)',
                        color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {totalInModule} lessons
                    </div>
                    {completedInModule > 0 && (
                      <div
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'var(--color-done-bg)',
                          color: accent,
                          border: '1px solid var(--color-done-border)',
                        }}
                      >
                        {completedInModule}/{totalInModule} done
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson list */}
              <div className="px-4 py-3 flex-1 flex flex-col gap-1">
                {mod.lessons.map((lesson, lIdx) => {
                  const done = completedLessons[lesson.id]
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onOpenLesson(mIdx, lIdx)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group"
                      style={{
                        background: done ? 'var(--color-done-bg)' : 'transparent',
                        border: `1px solid ${done ? 'var(--color-done-border)' : 'transparent'}`,
                      }}
                      onMouseEnter={e => {
                        if (!done) e.currentTarget.style.background = 'var(--color-hover-bg)'
                      }}
                      onMouseLeave={e => {
                        if (!done) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span
                        className="text-[11px] font-bold tabular-nums w-5 text-right shrink-0"
                        style={{ color: done ? accent : 'var(--color-text-dim)' }}
                      >
                        {done ? '✓' : lIdx + 1}
                      </span>
                      <span
                        className="text-sm flex-1 truncate"
                        style={{ color: done ? 'var(--color-text-secondary)' : 'var(--color-text-secondary)' }}
                      >
                        {localized(lesson.title, lang)}
                      </span>
                      <span
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Progress bar */}
              <div
                className="px-4 pb-4 pt-2"
                style={{ borderTop: '1px solid var(--color-border-subtle)' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                    Progress
                  </span>
                  <span
                    className="text-[11px] font-semibold tabular-nums"
                    style={{ color: pct > 0 ? accent : 'var(--color-text-dim)' }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-1 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: accent }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
