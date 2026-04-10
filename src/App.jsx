import React, { useState, useEffect } from 'react'
import { UI_LABELS } from './data/i18n'
import { COURSE_DATA } from './data/courses'
import Header from './components/Header'
import Overview from './components/Overview'
import LessonView from './components/LessonView'
import SlideViewer from './components/SlideViewer'

// ── URL helpers ──────────────────────────────────────────────────────────────

function getStateFromURL() {
  const params = new URLSearchParams(window.location.search)
  const m = parseInt(params.get('m') ?? '-1', 10)
  const l = parseInt(params.get('l') ?? '0', 10)
  if (m >= 0 && m < COURSE_DATA.length) {
    const mod = COURSE_DATA[m]
    const lIdx = l >= 0 && l < mod.lessons.length ? l : 0
    return { view: 'lesson', activeModuleIdx: m, activeLessonIdx: lIdx }
  }
  return { view: 'overview', activeModuleIdx: 0, activeLessonIdx: 0 }
}

function buildURL(view, mIdx, lIdx) {
  if (view === 'lesson') return `${window.location.pathname}?m=${mIdx}&l=${lIdx}`
  return window.location.pathname
}

// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState('en')
  const [showSlides, setShowSlides] = useState(false)
  const [completedLessons, setCompletedLessons] = useState({})
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('xahau-theme') || 'dark'
  })

  // Initialise navigation state from URL so deep links and refreshes work
  const initialState = getStateFromURL()
  const [view, setView] = useState(initialState.view)
  const [activeModuleIdx, setActiveModuleIdx] = useState(initialState.activeModuleIdx)
  const [activeLessonIdx, setActiveLessonIdx] = useState(initialState.activeLessonIdx)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('xahau-theme', theme)
  }, [theme])

  // Sync browser back/forward buttons with app state
  useEffect(() => {
    const handlePopState = () => {
      const s = getStateFromURL()
      setView(s.view)
      setActiveModuleIdx(s.activeModuleIdx)
      setActiveLessonIdx(s.activeLessonIdx)
      setShowSlides(false)
    }
    window.addEventListener('popstate', handlePopState)
    // Replace the current history entry so the initial URL is canonical
    window.history.replaceState(null, '', buildURL(initialState.view, initialState.activeModuleIdx, initialState.activeLessonIdx))
    return () => window.removeEventListener('popstate', handlePopState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const t = UI_LABELS[lang]
  const totalLessons = COURSE_DATA.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = Object.values(completedLessons).filter(Boolean).length

  const currentModule = COURSE_DATA[activeModuleIdx]
  const currentLesson = currentModule?.lessons[activeLessonIdx]

  // Central navigation: updates state AND pushes a browser history entry
  const navigate = (nextView, mIdx, lIdx) => {
    window.history.pushState(null, '', buildURL(nextView, mIdx, lIdx))
    setView(nextView)
    setActiveModuleIdx(mIdx)
    setActiveLessonIdx(lIdx)
  }

  const openLesson = (mIdx, lIdx) => navigate('lesson', mIdx, lIdx)

  const toggleComplete = (lessonId) => {
    setCompletedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  // Navigate to next lesson, crossing module boundaries
  const goNext = () => {
    const mod = COURSE_DATA[activeModuleIdx]
    if (activeLessonIdx < mod.lessons.length - 1) {
      navigate('lesson', activeModuleIdx, activeLessonIdx + 1)
    } else if (activeModuleIdx < COURSE_DATA.length - 1) {
      navigate('lesson', activeModuleIdx + 1, 0)
    }
  }

  // Navigate to previous lesson, crossing module boundaries
  const goPrev = () => {
    if (activeLessonIdx > 0) {
      navigate('lesson', activeModuleIdx, activeLessonIdx - 1)
    } else if (activeModuleIdx > 0) {
      const prevMod = COURSE_DATA[activeModuleIdx - 1]
      navigate('lesson', activeModuleIdx - 1, prevMod.lessons.length - 1)
    }
  }

  const isFirst = activeModuleIdx === 0 && activeLessonIdx === 0
  const isLast = activeModuleIdx === COURSE_DATA.length - 1 &&
    activeLessonIdx === currentModule.lessons.length - 1

  // Slides mode
  if (showSlides && currentLesson?.slides) {
    return (
      <SlideViewer
        slides={currentLesson.slides}
        lang={lang}
        labels={t}
        onExit={() => setShowSlides(false)}
        theme={theme}
      />
    )
  }

  // Overview
  if (view === 'overview') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <Header
          lang={lang}
          setLang={setLang}
          labels={t}
          completedCount={completedCount}
          totalLessons={totalLessons}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Overview
          courseData={COURSE_DATA}
          lang={lang}
          labels={t}
          completedLessons={completedLessons}
          onOpenLesson={openLesson}
        />
      </div>
    )
  }

  // Lesson
  return (
    <LessonView
      module={currentModule}
      moduleIdx={activeModuleIdx}
      lesson={currentLesson}
      lessonIdx={activeLessonIdx}
      lang={lang}
      labels={t}
      isCompleted={!!completedLessons[currentLesson.id]}
      onToggleComplete={() => toggleComplete(currentLesson.id)}
      onShowSlides={() => setShowSlides(true)}
      onBack={() => navigate('overview', 0, 0)}
      onPrev={goPrev}
      onNext={goNext}
      onGoToLesson={(lIdx) => navigate('lesson', activeModuleIdx, lIdx)}
      hasPrev={!isFirst}
      hasNext={!isLast}
      theme={theme}
      onToggleTheme={toggleTheme}
      totalModules={COURSE_DATA.length}
      setLang={setLang}
    />
  )
}
