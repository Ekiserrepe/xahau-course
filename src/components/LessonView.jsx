import React, { useState, useEffect, useMemo } from 'react'
import Markdown, { headingsOf } from './Markdown'
import CodeBlock from './CodeBlock'
import Quiz from './Quiz'
import { hasQuiz } from '../data/quizzes'
import Header from './Header'
import {
  ActLabel,
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ModuleIcon,
  Spinner,
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

  // `mod` is manifest metadata and is always present; `lesson` is the loaded
  // content, which is null for as long as the module chunk is in flight.
  const meta = mod.lessons[lessonIdx]
  const ready = !!lesson

  // A new lesson always opens on Theory. Adjusting during render beats an
  // effect that would paint the previous lesson's tab for one frame first.
  const lessonKey = `${moduleIdx}:${lessonIdx}`
  const [tabFor, setTabFor] = useState(lessonKey)
  if (tabFor !== lessonKey) {
    setTabFor(lessonKey)
    setActiveTab('theory')
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [moduleIdx, lessonIdx])

  const tabs = [
    { key: 'theory', label: labels.theory, disabled: false },
    { key: 'code', label: labels.code, disabled: !meta?.hasCode },
    { key: 'slides', label: labels.slides, disabled: !meta?.hasSlides },
  ]

  const handleTab = (tab) => {
    if (tab.key === 'slides' && meta?.hasSlides) onShowSlides()
    else if (!tab.disabled) setActiveTab(tab.key)
  }

  const [copied, setCopied] = useState(false)

  const headings = useMemo(
    () => (ready ? headingsOf(localized(lesson.theory, lang)) : []),
    [ready, lesson, lang],
  )

  const mixedLevels = headings.some((h) => h.level === 2) && headings.some((h) => h.level === 3)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const doneInModule = mod.lessons.filter((l) => completedLessons[l.id]).length

  // The module check belongs at the end of the module, so it shows under the
  // last lesson's theory — and only for modules that declare one.
  const showQuiz =
    activeTab === 'theory' &&
    ready &&
    lessonIdx === mod.lessons.length - 1 &&
    hasQuiz(mod.id)

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
            {localized(meta?.title, lang)}
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

              <button
                type="button"
                onClick={copyLink}
                className="x-icon-btn"
                title={copied ? labels.linkCopied : labels.copyLink}
                aria-label={copied ? labels.linkCopied : labels.copyLink}
                style={copied ? { color: 'var(--color-accent)', borderColor: 'var(--color-accent-border)' } : undefined}
              >
                {copied ? (
                  <CheckIcon size={13} />
                ) : (
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
                    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
                  </svg>
                )}
              </button>

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

          {/* Content + "on this page" rail */}
          <div className="flex-1 w-full max-w-6xl mx-auto flex gap-10 px-4 sm:px-6">
          <main className="flex-1 min-w-0 max-w-3xl mx-auto w-full py-8 sm:py-12">
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
                  {localized(meta?.title, lang)}
                </h1>
                {ready ? (
                  <div className="prose-content">
                    <Markdown text={localized(lesson.theory, lang)} />
                  </div>
                ) : (
                  <div className="py-12 flex justify-center">
                    <Spinner size={26} />
                  </div>
                )}
              </article>
            )}

            {showQuiz && (
              <Quiz
                key={mod.id}
                moduleId={mod.id}
                moduleIdx={moduleIdx}
                lang={lang}
                labels={labels}
                theme={theme}
              />
            )}

            {activeTab === 'code' && ready && lesson.codeBlocks && (
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

          {/* On this page — only worth the space when there's something to list */}
          {activeTab === 'theory' && headings.length > 1 && (
            <aside
              className="hidden xl:block w-52 shrink-0 py-12"
              aria-label={labels.onThisPage}
            >
              <div className="sticky" style={{ top: 130 }}>
                <ActLabel color={mt.ink}>{labels.onThisPage}</ActLabel>
                <ul className="mt-4 list-none m-0 p-0 flex flex-col gap-2.5">
                  {headings.map((h) => (
                    <li key={h.id} style={mixedLevels && h.level === 3 ? { paddingInlineStart: 12 } : undefined}>
                      <a
                        href={`#${h.id}`}
                        className="block text-[12.5px] leading-snug no-underline transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = mt.ink
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-muted)'
                        }}
                      >
                        {h.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
