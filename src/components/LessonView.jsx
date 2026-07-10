import React, { useState, useEffect } from 'react'
import Markdown from './Markdown'
import CodeBlock from './CodeBlock'
import LanguageSelect from './LanguageSelect'

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function IconBtn({ onClick, href, title, children }) {
  const style = {
    background: 'var(--color-button-bg)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-secondary)',
  }
  const cls = 'w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0'
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style} title={title}>{children}</a>
  return <button onClick={onClick} className={cls} style={style} title={title}>{children}</button>
}

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

export default function LessonView({
  module: mod, moduleIdx, lesson, lessonIdx,
  lang, labels, isCompleted, onToggleComplete,
  onShowSlides, onBack, onPrev, onNext, onGoToLesson,
  hasPrev, hasNext, theme, onToggleTheme,
  totalModules, setLang, completedLessons = {},
}) {
  const [activeTab, setActiveTab] = useState('theory')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setActiveTab('theory')
  }, [lesson.id])

  const tabs = [
    { key: 'theory', label: labels.theory, icon: '📖', disabled: false },
    { key: 'code',   label: labels.code,   icon: '💻', disabled: !lesson.codeBlocks?.length },
    { key: 'slides', label: labels.slides, icon: '📊', disabled: !lesson.slides?.length },
  ]

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ═══════════════════════════════════════════════════
          SIDEBAR  —  visible on lg+
      ═══════════════════════════════════════════════════ */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 overflow-y-auto z-20"
        style={{
          width: 'var(--sidebar-width)',
          background: 'var(--color-sidebar-bg)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Back button */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium transition-colors w-full"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            All modules
          </button>
        </div>

        {/* Module info */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Module {moduleIdx}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">{mod.icon}</span>
            <span className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text-heading)' }}>
              {localized(mod.title, lang)}
            </span>
          </div>
        </div>

        {/* Lesson list */}
        <nav className="flex-1 p-2">
          {mod.lessons.map((l, idx) => {
            const isActive = idx === lessonIdx
            const done = completedLessons[l.id]
            return (
              <button
                key={l.id}
                onClick={() => onGoToLesson(idx)}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-colors"
                style={{
                  background: isActive ? 'var(--color-accent-bg)' : 'transparent',
                  color: isActive ? 'var(--color-accent)' : done ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                  border: `1px solid ${isActive ? 'var(--color-accent-border)' : 'transparent'}`,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span
                  className="text-[11px] font-bold tabular-nums w-4 shrink-0"
                  style={{ color: isActive ? 'var(--color-accent)' : done ? 'var(--color-accent-dim)' : 'var(--color-text-dim)' }}
                >
                  {done && !isActive ? '✓' : idx + 1}
                </span>
                <span className="flex-1 leading-tight">{localized(l.title, lang)}</span>
                {isActive && (
                  <span className="shrink-0" style={{ color: 'var(--color-accent)' }}>›</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Prev / Next */}
        <div
          className="flex gap-2 p-3"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors text-center"
            style={{
              background: 'var(--color-button-bg)',
              color: hasPrev ? 'var(--color-text-secondary)' : 'var(--color-text-dim)',
              border: '1px solid var(--color-border)',
              opacity: hasPrev ? 1 : 0.4,
            }}
          >
            ← {labels.prev}
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors text-center"
            style={{
              background: hasNext ? 'var(--color-accent)' : 'var(--color-button-disabled-bg)',
              color: hasNext ? '#000' : 'var(--color-text-dim)',
              opacity: hasNext ? 1 : 0.4,
            }}
          >
            {labels.next} →
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">

        {/* Top header */}
        <header
          className="sticky top-0 z-10 px-4 sm:px-6 py-3 border-b"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Mobile: back button */}
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium lg:hidden shrink-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ←
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm min-w-0 flex-1 lg:flex-none">
              <span className="hidden lg:block" style={{ color: 'var(--color-text-muted)' }}>
                {localized(mod.title, lang)}
              </span>
              <span className="hidden lg:block" style={{ color: 'var(--color-text-dim)' }}>/</span>
              <span className="truncate font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {localized(lesson.title, lang)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <LanguageSelect lang={lang} setLang={setLang} label={labels.language} compact />
              <IconBtn href="https://github.com/INFTF/xahau-course" title="GitHub">
                <GitHubIcon />
              </IconBtn>
              <IconBtn onClick={onToggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {theme === 'dark' ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </IconBtn>
              <span
                className="hidden sm:block text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              >
                {moduleIdx}/{totalModules - 1} · {lessonIdx + 1}/{mod.lessons.length}
              </span>
            </div>
          </div>

          {/* Mobile: lesson selector */}
          <div className="flex items-center gap-2 mt-3 lg:hidden">
            <span
              className="text-xs font-semibold tabular-nums shrink-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {lessonIdx + 1}/{mod.lessons.length}
            </span>
            <div className="relative flex-1">
              <select
                value={lessonIdx}
                onChange={e => onGoToLesson(parseInt(e.target.value))}
                className="w-full text-sm font-medium rounded-lg px-3 py-2 appearance-none cursor-pointer pr-8"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-heading)',
                  outline: 'none',
                }}
              >
                {mod.lessons.map((l, idx) => (
                  <option key={l.id} value={idx}>
                    {idx + 1}. {localized(l.title, lang)}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                width="12" height="12" viewBox="0 0 20 20" fill="currentColor"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3 border-t pt-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
            {tabs.map(tab => {
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: isActive ? 'var(--color-surface-raised)' : 'transparent',
                    color: tab.disabled
                      ? 'var(--color-text-dim)'
                      : isActive
                      ? 'var(--color-accent)'
                      : 'var(--color-text-muted)',
                    opacity: tab.disabled ? 0.4 : 1,
                  }}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.key === 'slides' && !tab.disabled && <span className="text-xs">↗</span>}
                </button>
              )
            })}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 py-8 max-w-3xl w-full mx-auto">
          {activeTab === 'theory' && (
            <div
              className="rounded-2xl p-5 sm:p-8"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h1 className="text-xl font-bold mb-6 pb-4" style={{ color: 'var(--color-text-heading)', borderBottom: '1px solid var(--color-border)' }}>
                {localized(lesson.title, lang)}
              </h1>
              <div className="prose-content">
                <Markdown text={localized(lesson.theory, lang)} />
              </div>
            </div>
          )}

          {activeTab === 'code' && lesson.codeBlocks && (
            <div className="flex flex-col gap-4">
              {lesson.codeBlocks.map((block, idx) => (
                <CodeBlock key={idx} block={block} lang={lang} labels={labels} theme={theme} />
              ))}
            </div>
          )}
        </main>

        {/* Bottom navigation */}
        <div
          className="px-4 sm:px-6 py-5 border-t max-w-3xl w-full mx-auto"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: 'var(--color-button-bg)',
                color: hasPrev ? 'var(--color-text-secondary)' : 'var(--color-text-dim)',
                border: '1px solid var(--color-border)',
                opacity: hasPrev ? 1 : 0.35,
              }}
            >
              ← <span className="hidden sm:inline">{labels.prev}</span>
            </button>

            <button
              onClick={onToggleComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: isCompleted ? 'var(--color-complete-bg)' : 'var(--color-accent)',
                color: isCompleted ? 'var(--color-accent)' : '#000',
                border: isCompleted ? '1px solid var(--color-complete-border)' : '1px solid transparent',
              }}
            >
              {isCompleted ? (
                <><span>✓</span> <span>{labels.lessonCompleted}</span></>
              ) : (
                <><span>○</span> <span>{labels.markComplete}</span></>
              )}
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: hasNext ? 'var(--color-accent)' : 'var(--color-button-disabled-bg)',
                color: hasNext ? '#000' : 'var(--color-text-dim)',
                opacity: hasNext ? 1 : 0.35,
              }}
            >
              <span className="hidden sm:inline">{labels.next}</span> →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
