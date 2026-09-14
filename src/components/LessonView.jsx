import React, { useState, useEffect } from 'react'
import Markdown from './Markdown'
import CodeBlock from './CodeBlock'
import Header from './Header'
import {
  ActLabel,
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ModuleIcon,
  themeFor,
} from './Brand'

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

/* ── Tabs ───────────────────────────────────────────────────────────────────
   A segmented control rather than the old emoji strip: quieter, and it reads
   as one object instead of three competing buttons.
──────────────────────────────────────────────────────────────────────────── */

function Tabs({ tabs, active, onSelect }) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-lg"
      style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)' }}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key && tab.key !== 'slides'
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onSelect(tab)}
            className="px-3.5 py-1.5 rounded-md text-[13px] font-semibold transition-all whitespace-nowrap"
            style={{
              background: isActive ? 'var(--color-surface)' : 'transparent',
              color: tab.disabled
                ? 'var(--color-text-faint)'
                : isActive
                  ? 'var(--color-text-heading)'
                  : 'var(--color-text-muted)',
              border: `1px solid ${isActive ? 'var(--color-border-subtle)' : 'transparent'}`,
              boxShadow: isActive ? 'var(--shadow-bar)' : 'none',
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              opacity: tab.disabled ? 0.45 : 1,
            }}
          >
            {tab.label}
            {tab.key === 'slides' && !tab.disabled && (
              <span style={{ opacity: 0.6 }}> ↗</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ── Lesson view ────────────────────────────────────────────────────────── */

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
  onOpenSearch,
  hasPrev,
  hasNext,
  theme,
  onToggleTheme,
  totalModules,
  setLang,
  completedLessons = {},
  completedCount,
  totalLessons,
}) {
  const [activeTab, setActiveTab] = useState('theory')
  const mt = themeFor(moduleIdx, theme)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setActiveTab('theory')
  }, [lesson.id])

  const tabs = [
    { key: 'theory', label: labels.theory, disabled: false },
    { key: 'code', label: labels.code, disabled: !lesson.codeBlocks?.length },
    { key: 'slides', label: labels.slides, disabled: !lesson.slides?.length },
  ]

  const handleTab = (tab) => {
    if (tab.key === 'slides' && lesson.slides?.length) onShowSlides()
    else if (!tab.disabled) setActiveTab(tab.key)
  }

  const doneInModule = mod.lessons.filter((l) => completedLessons[l.id]).length

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Header
        lang={lang}
        setLang={setLang}
        labels={labels}
        completedCount={completedCount}
        totalLessons={totalLessons}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenSearch={onOpenSearch}
        onBrandClick={onBack}
        compact
      >
        {/* Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-[13px] min-w-0 ps-2">
          <span style={{ color: 'var(--color-text-faint)' }}>/</span>
          <button
            type="button"
            onClick={onBack}
            className="truncate transition-colors"
            style={{ color: 'var(--color-text-muted)', background: 'none', border: 0, cursor: 'pointer', font: 'inherit' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-heading)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-muted)'
            }}
          >
            {localized(mod.title, lang)}
          </button>
          <span style={{ color: 'var(--color-text-faint)' }}>/</span>
          <span className="truncate font-semibold" style={{ color: 'var(--color-text-heading)' }}>
            {localized(lesson.title, lang)}
          </span>
        </div>
      </Header>

      <div className="flex flex-1 min-h-0">
        {/* ══ SIDEBAR ═══════════════════════════════════════════════════════ */}
        <aside
          className="hidden lg:flex flex-col shrink-0 sticky self-start overflow-y-auto"
          style={{
            width: 'var(--sidebar-width)',
            top: 61,
            height: 'calc(100vh - 61px)',
            background: 'var(--color-sidebar-bg)',
            borderInlineEnd: '1px solid var(--color-border-subtle)',
          }}
        >
          <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-semibold transition-colors"
              style={{ color: 'var(--color-text-muted)', background: 'none', border: 0, cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              <ArrowLeftIcon />
              {labels.allModules}
            </button>
          </div>

          {/* Module identity */}
          <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
            <ActLabel color={mt.ink}>
              {labels.module} {String(moduleIdx).padStart(2, '0')}
            </ActLabel>
            <div className="flex items-start gap-2.5 mt-3">
              <span
                className="flex items-center justify-center shrink-0 rounded-lg mt-0.5"
                style={{
                  width: 28,
                  height: 28,
                  background: mt.tint,
                  border: `1px solid ${mt.line}`,
                  color: mt.ink,
                }}
              >
                <ModuleIcon module={mod} size={15} />
              </span>
              <span
                className="text-[14.5px] font-bold leading-snug"
                style={{ color: 'var(--color-text-heading)', letterSpacing: '-0.015em' }}
              >
                {localized(mod.title, lang)}
              </span>
            </div>
            <div className="mt-4">
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: 'var(--color-surface-raised)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round((doneInModule / mod.lessons.length) * 100)}%`,
                    background: mt.ink,
                  }}
                />
              </div>
              <p
                className="mt-2 font-mono text-[10px] tracking-[0.1em]"
                style={{ color: 'var(--color-text-dim)' }}
              >
                {doneInModule}/{mod.lessons.length} {labels.done}
              </p>
            </div>
          </div>

          {/* Lesson list */}
          <nav className="flex-1 px-3 py-3" aria-label={labels.contents}>
            {mod.lessons.map((l, idx) => {
              const isActive = idx === lessonIdx
              const done = !!completedLessons[l.id]
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onGoToLesson(idx)}
                  aria-current={isActive ? 'page' : undefined}
                  className="flex items-start gap-2.5 w-full text-start px-3 py-2.5 rounded-lg mb-0.5 text-[13.5px] transition-colors"
                  style={{
                    background: isActive ? mt.tint : 'transparent',
                    color: isActive ? 'var(--color-text-heading)' : 'var(--color-text-muted)',
                    border: `1px solid ${isActive ? mt.line : 'transparent'}`,
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--color-hover-bg)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span
                    className="font-mono text-[10px] font-bold tabular-nums shrink-0 mt-0.5"
                    style={{ color: done || isActive ? mt.ink : 'var(--color-text-faint)', width: 14 }}
                  >
                    {done ? <CheckIcon size={10} /> : idx + 1}
                  </span>
                  <span className="flex-1 leading-snug">{localized(l.title, lang)}</span>
                </button>
              )
            })}
          </nav>

          {/* Prev / next */}
          <div
            className="flex gap-2 p-3 sticky bottom-0"
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              background: 'var(--color-sidebar-bg)',
            }}
          >
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="x-btn x-btn-ghost flex-1"
              style={{ height: 38, padding: '0 10px', fontSize: 12.5 }}
            >
              ← {labels.prev}
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="x-btn x-btn-primary flex-1"
              style={{ height: 38, padding: '0 10px', fontSize: 12.5 }}
            >
              {labels.next} →
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══════════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Lesson toolbar */}
          <div
            className="px-4 sm:px-8 py-3 flex flex-wrap items-center gap-3 justify-between sticky z-20"
            style={{
              top: 61,
              background: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <Tabs tabs={tabs} active={activeTab} onSelect={handleTab} />

            <div className="flex items-center gap-2 ms-auto">
              {/* Mobile lesson picker */}
              <div className="relative lg:hidden">
                <select
                  value={lessonIdx}
                  onChange={(e) => onGoToLesson(parseInt(e.target.value, 10))}
                  className="appearance-none rounded-md ps-3 pe-8 h-[34px] text-[13px] font-semibold cursor-pointer max-w-[46vw] truncate"
                  style={{
                    background: 'var(--color-button-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-heading)',
                    outline: 'none',
                  }}
                  aria-label={labels.contents}
                >
                  {mod.lessons.map((l, idx) => (
                    <option key={l.id} value={idx}>
                      {idx + 1}. {localized(l.title, lang)}
                    </option>
                  ))}
                </select>
                <span
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <ChevronDownIcon />
                </span>
              </div>

              <span
                className="hidden sm:inline-flex items-center font-mono text-[10.5px] font-bold tracking-[0.1em] px-2.5 h-[34px] rounded-md"
                style={{
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-dim)',
                }}
              >
                {String(moduleIdx).padStart(2, '0')}/{String(totalModules - 1).padStart(2, '0')}
                <span style={{ opacity: 0.4, margin: '0 6px' }}>·</span>
                {lessonIdx + 1}/{mod.lessons.length}
              </span>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {activeTab === 'theory' && (
              <article className="x-card px-5 py-8 sm:px-12 sm:py-12">
                <ActLabel color={mt.ink}>
                  {labels.module} {String(moduleIdx).padStart(2, '0')} · {labels.theory}
                </ActLabel>
                <h1
                  className="mt-5 mb-8 pb-6"
                  style={{
                    fontSize: 'clamp(24px, 3.2vw, 32px)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: 'var(--color-text-heading)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {localized(lesson.title, lang)}
                </h1>
                <div className="prose-content">
                  <Markdown text={localized(lesson.theory, lang)} />
                </div>
              </article>
            )}

            {activeTab === 'code' && lesson.codeBlocks && (
              <div className="flex flex-col gap-5">
                <ActLabel color={mt.ink}>{labels.code}</ActLabel>
                {lesson.codeBlocks.map((block, idx) => (
                  <CodeBlock key={idx} block={block} lang={lang} labels={labels} theme={theme} />
                ))}
              </div>
            )}

            {/* Lesson footer actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                className="x-btn x-btn-ghost"
                style={{ height: 44 }}
              >
                ← <span className="hidden sm:inline">{labels.prev}</span>
              </button>

              <button
                type="button"
                onClick={onToggleComplete}
                className="x-btn"
                style={{
                  height: 44,
                  background: isCompleted ? 'var(--color-complete-bg)' : 'var(--color-accent)',
                  color: isCompleted ? 'var(--color-accent)' : 'var(--color-accent-on)',
                  borderColor: isCompleted ? 'var(--color-complete-border)' : 'transparent',
                }}
              >
                {isCompleted ? <CheckIcon size={13} /> : <span style={{ fontSize: 13 }}>○</span>}
                <span>{isCompleted ? labels.completed : labels.markComplete}</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className="x-btn x-btn-primary"
                style={{ height: 44 }}
              >
                <span className="hidden sm:inline">{labels.next}</span> →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
