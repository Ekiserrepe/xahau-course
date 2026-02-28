import React from 'react'

export default function Overview({ courseData, lang, labels, completedLessons, onOpenLesson }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid gap-4">
        {courseData.map((mod, mIdx) => (
          <div
            key={mod.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-alt) 100%)`,
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                  style={{ background: 'var(--color-icon-bg)' }}
                >
                  {mod.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                    {labels.module} {mIdx}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold truncate" style={{ color: 'var(--color-text-heading)' }}>{mod.title[lang]}</h3>
                </div>
              </div>
              <div className="grid gap-2 sm:ml-16">
                {mod.lessons.map((lesson, lIdx) => {
                  const done = completedLessons[lesson.id]
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onOpenLesson(mIdx, lIdx)}
                      className="flex items-center justify-between p-3 rounded-xl text-left transition-all group"
                      style={{
                        background: done ? 'var(--color-done-bg)' : 'var(--color-hover-bg)',
                        border: `1px solid ${done ? 'var(--color-done-border)' : 'var(--color-border)'}`,
                      }}
                    >
                      <span
                        className="text-sm font-medium group-hover:translate-x-1 transition-transform"
                        style={{ color: done ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                      >
                        {done ? '✓ ' : ''}{lesson.title[lang]}
                      </span>
                      <span className="text-xs shrink-0 ml-2" style={{ color: 'var(--color-text-muted)' }}>→</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
