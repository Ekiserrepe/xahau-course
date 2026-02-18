import React from 'react'

export default function Overview({ courseData, lang, labels, completedLessons, onOpenLesson }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
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
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'var(--color-icon-bg)' }}
                >
                  {mod.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                    {labels.module} {mIdx}
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-heading)' }}>{mod.title[lang]}</h3>
                </div>
              </div>
              <div className="grid gap-2 ml-16">
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
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>→</span>
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
