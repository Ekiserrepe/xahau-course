import React, { useState } from 'react'
import Markdown from './Markdown'
import CodeBlock from './CodeBlock'

export default function LessonView({
  module: mod,
  moduleIdx,
  lesson,
  lessonIdx,
  lang,
  labels,
  isCompleted,
  onToggleComplete,
  onShowSlides,
  onBack,
  onPrev,
  onNext,
  onGoToLesson,
  hasPrev,
  hasNext,
  theme,
  onToggleTheme,
  totalModules,
}) {
  const [activeTab, setActiveTab] = useState('theory')

  const tabs = [
    { key: 'theory', icon: '📖', label: labels.theory, disabled: false },
    { key: 'code', icon: '💻', label: labels.code, disabled: !lesson.codeBlocks?.length },
    { key: 'slides', icon: '📊', label: labels.slides, disabled: !lesson.slides?.length },
  ]

  const lessonNumber = lessonIdx + 1
  const totalLessons = mod.lessons.length

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Lesson header */}
      <header
        className="px-6 py-4 border-b"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-light)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              ← {labels.allModules}
            </button>
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all"
                style={{
                  background: 'var(--color-button-bg)',
                  border: '1px solid var(--color-border)',
                }}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              {/* Lesson position indicator */}
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'var(--color-icon-bg)', color: 'var(--color-text-muted)' }}>
                {labels.module} {moduleIdx}/{totalModules} — {labels.theory} {lessonNumber}/{totalLessons}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">{mod.icon}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                {mod.title[lang]}
              </div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-heading)' }}>{lesson.title[lang]}</h2>
            </div>
          </div>

          {/* Lesson navigation pills */}
          <div className="flex items-center gap-2 mt-3">
            {mod.lessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => onGoToLesson(idx)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: idx === lessonIdx ? 'var(--color-accent)' : 'var(--color-button-bg)',
                  color: idx === lessonIdx ? '#000' : 'var(--color-text-muted)',
                  border: `1px solid ${idx === lessonIdx ? 'var(--color-accent)' : 'var(--color-border)'}`,
                }}
              >
                {idx + 1}. {l.title[lang]}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key && tab.key !== 'slides'
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === 'slides' && lesson.slides?.length) {
                      onShowSlides()
                    } else if (!tab.disabled) {
                      setActiveTab(tab.key)
                    }
                  }}
                  disabled={tab.disabled}
                  className="px-4 py-2 rounded-t-lg text-sm font-medium transition-all flex items-center gap-2"
                  style={{
                    background: isActive ? 'var(--color-surface-alt)' : 'transparent',
                    color: tab.disabled ? 'var(--color-text-faint)' : isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                    opacity: tab.disabled ? 0.4 : 1,
                  }}
                >
                  {tab.icon} {tab.label}
                  {tab.key === 'slides' && ' ↗'}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'theory' && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: `linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-alt) 100%)`,
              border: '1px solid var(--color-border)',
            }}
          >
            <Markdown text={lesson.theory[lang]} />
          </div>
        )}

        {activeTab === 'code' && lesson.codeBlocks && (
          <div>
            {lesson.codeBlocks.map((block, idx) => (
              <CodeBlock key={idx} block={block} lang={lang} labels={labels} />
            ))}
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: !hasPrev ? 'var(--color-button-disabled-bg)' : 'var(--color-button-bg)',
              color: !hasPrev ? 'var(--color-text-faint)' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              opacity: !hasPrev ? 0.4 : 1,
            }}
          >
            ← {labels.prev}
          </button>

          <button
            onClick={onToggleComplete}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background: isCompleted ? 'var(--color-complete-bg)' : 'var(--color-accent)',
              color: isCompleted ? 'var(--color-accent)' : '#000',
              border: isCompleted ? '1px solid var(--color-complete-border)' : '1px solid transparent',
            }}
          >
            {isCompleted ? labels.lessonCompleted : labels.markComplete}
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: !hasNext ? 'var(--color-button-disabled-bg)' : 'var(--color-accent)',
              color: !hasNext ? 'var(--color-text-faint)' : '#000',
              opacity: !hasNext ? 0.4 : 1,
            }}
          >
            {labels.next} →
          </button>
        </div>
      </div>
    </div>
  )
}
