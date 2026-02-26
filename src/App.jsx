import React, { useState, useEffect } from 'react'
import { UI_LABELS } from './data/i18n'
import { COURSE_DATA } from './data/courses'
import Header from './components/Header'
import Overview from './components/Overview'
import LessonView from './components/LessonView'
import SlideViewer from './components/SlideViewer'

export default function App() {
  const [lang, setLang] = useState('es')
  const [view, setView] = useState('overview')
  const [activeModuleIdx, setActiveModuleIdx] = useState(0)
  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [showSlides, setShowSlides] = useState(false)
  const [completedLessons, setCompletedLessons] = useState({})
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('xahau-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('xahau-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const t = UI_LABELS[lang]
  const totalLessons = COURSE_DATA.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = Object.values(completedLessons).filter(Boolean).length

  const currentModule = COURSE_DATA[activeModuleIdx]
  const currentLesson = currentModule?.lessons[activeLessonIdx]

  const openLesson = (mIdx, lIdx) => {
    setActiveModuleIdx(mIdx)
    setActiveLessonIdx(lIdx)
    setView('lesson')
  }

  const toggleComplete = (lessonId) => {
    setCompletedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  // Navigate to next lesson, crossing module boundaries
  const goNext = () => {
    const mod = COURSE_DATA[activeModuleIdx]
    if (activeLessonIdx < mod.lessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1)
    } else if (activeModuleIdx < COURSE_DATA.length - 1) {
      setActiveModuleIdx(activeModuleIdx + 1)
      setActiveLessonIdx(0)
    }
  }

  // Navigate to previous lesson, crossing module boundaries
  const goPrev = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1)
    } else if (activeModuleIdx > 0) {
      const prevMod = COURSE_DATA[activeModuleIdx - 1]
      setActiveModuleIdx(activeModuleIdx - 1)
      setActiveLessonIdx(prevMod.lessons.length - 1)
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
      onBack={() => setView('overview')}
      onPrev={goPrev}
      onNext={goNext}
      onGoToLesson={(lIdx) => setActiveLessonIdx(lIdx)}
      hasPrev={!isFirst}
      hasNext={!isLast}
      theme={theme}
      onToggleTheme={toggleTheme}
      totalModules={COURSE_DATA.length}
      setLang={setLang}
    />
  )
}
