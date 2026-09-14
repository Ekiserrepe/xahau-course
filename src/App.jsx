import React, { useState, useEffect, useCallback } from 'react'
import { UI_LABELS } from './data/i18n'
import { COURSE_DATA } from './data/courses'
import { LOCALES, DEFAULT_LOCALE, localeOf } from './data/locales'
import Header from './components/Header'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Footer from './components/Footer'
import LessonView from './components/LessonView'
import SlideViewer from './components/SlideViewer'
import Search from './components/Search'

// Course-wide figures, derived once — the hero and the stats strip share them
const COURSE_STATS = {
  modules: COURSE_DATA.length,
  lessons: COURSE_DATA.reduce((acc, m) => acc + m.lessons.length, 0),
  languages: LOCALES.length,
}

const STORAGE = {
  lang: 'xahau-lang',
  theme: 'xahau-theme',
  progress: 'xahau-progress',
}

// ── Persistence ──────────────────────────────────────────────────────────────
// Every read is guarded: Safari in private mode throws on localStorage access,
// and a corrupt value shouldn't take the whole app down with it.

function readStored(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — the session still works, it just won't persist */
  }
}

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE.progress) ?? '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    // Only keep the ids that are actually marked done
    return Object.fromEntries(Object.entries(parsed).filter(([, v]) => v === true))
  } catch {
    return {}
  }
}

// ── URL helpers ──────────────────────────────────────────────────────────────

function getStateFromURL() {
  const params = new URLSearchParams(window.location.search)
  const m = parseInt(params.get('m') ?? '-1', 10)
  const l = parseInt(params.get('l') ?? '0', 10)
  const slides = params.get('s') === '1'
  if (m >= 0 && m < COURSE_DATA.length) {
    const mod = COURSE_DATA[m]
    const lIdx = l >= 0 && l < mod.lessons.length ? l : 0
    const hasSlides = !!mod.lessons[lIdx]?.slides?.length
    return {
      view: 'lesson',
      activeModuleIdx: m,
      activeLessonIdx: lIdx,
      showSlides: slides && hasSlides,
    }
  }
  return { view: 'overview', activeModuleIdx: 0, activeLessonIdx: 0, showSlides: false }
}

function buildURL(view, mIdx, lIdx, slides = false) {
  if (view !== 'lesson') return window.location.pathname
  return `${window.location.pathname}?m=${mIdx}&l=${lIdx}${slides ? '&s=1' : ''}`
}

// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState(() => {
    const stored = readStored(STORAGE.lang, DEFAULT_LOCALE)
    return LOCALES.some((l) => l.code === stored) ? stored : DEFAULT_LOCALE
  })
  const [theme, setTheme] = useState(() =>
    // Light is the brand default — the same canvas as xahau.network
    readStored(STORAGE.theme, 'light') === 'dark' ? 'dark' : 'light',
  )
  const [completedLessons, setCompletedLessons] = useState(readProgress)
  const [searchOpen, setSearchOpen] = useState(false)

  // Initialise navigation state from URL so deep links and refreshes work
  const initialState = getStateFromURL()
  const [view, setView] = useState(initialState.view)
  const [activeModuleIdx, setActiveModuleIdx] = useState(initialState.activeModuleIdx)
  const [activeLessonIdx, setActiveLessonIdx] = useState(initialState.activeLessonIdx)
  const [showSlides, setShowSlides] = useState(initialState.showSlides)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    writeStored(STORAGE.theme, theme)
  }, [theme])

  useEffect(() => {
    // The internal code (`jp`) is not a language tag — publish the real one.
    const locale = localeOf(lang)
    document.documentElement.setAttribute('lang', locale.tag)
    document.documentElement.setAttribute('dir', locale.dir)
    writeStored(STORAGE.lang, lang)
  }, [lang])

  useEffect(() => {
    writeStored(STORAGE.progress, JSON.stringify(completedLessons))
  }, [completedLessons])

  // Sync browser back/forward buttons with app state
  useEffect(() => {
    const handlePopState = () => {
      const s = getStateFromURL()
      setView(s.view)
      setActiveModuleIdx(s.activeModuleIdx)
      setActiveLessonIdx(s.activeLessonIdx)
      setShowSlides(s.showSlides)
    }
    window.addEventListener('popstate', handlePopState)
    // Replace the current history entry so the initial URL is canonical
    window.history.replaceState(
      null,
      '',
      buildURL(
        initialState.view,
        initialState.activeModuleIdx,
        initialState.activeLessonIdx,
        initialState.showSlides,
      ),
    )
    return () => window.removeEventListener('popstate', handlePopState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ⌘K / Ctrl-K opens search from anywhere
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const t = UI_LABELS[lang] ?? UI_LABELS.en
  const totalLessons = COURSE_STATS.lessons
  const completedCount = Object.keys(completedLessons).length

  const currentModule = COURSE_DATA[activeModuleIdx]
  const currentLesson = currentModule?.lessons[activeLessonIdx]

  // Central navigation: updates state AND pushes a browser history entry
  const navigate = useCallback((nextView, mIdx, lIdx, slides = false) => {
    window.history.pushState(null, '', buildURL(nextView, mIdx, lIdx, slides))
    setView(nextView)
    setActiveModuleIdx(mIdx)
    setActiveLessonIdx(lIdx)
    setShowSlides(slides)
  }, [])

  const openLesson = useCallback(
    (mIdx, lIdx) => navigate('lesson', mIdx, lIdx),
    [navigate],
  )

  const toggleComplete = (lessonId) => {
    setCompletedLessons((prev) => {
      const next = { ...prev }
      if (next[lessonId]) delete next[lessonId]
      else next[lessonId] = true
      return next
    })
  }

  const resetProgress = () => {
    if (window.confirm(t.resetConfirm)) setCompletedLessons({})
  }

  /** First lesson not yet marked done — where "Continue" should land. */
  const nextUp = (() => {
    for (let m = 0; m < COURSE_DATA.length; m++) {
      const lessons = COURSE_DATA[m].lessons
      for (let l = 0; l < lessons.length; l++) {
        if (!completedLessons[lessons[l].id]) return { mIdx: m, lIdx: l }
      }
    }
    return { mIdx: 0, lIdx: 0 } // everything done — start from the top
  })()

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
  const isLast =
    activeModuleIdx === COURSE_DATA.length - 1 &&
    activeLessonIdx === currentModule.lessons.length - 1

  const searchPanel = (
    <Search
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      courseData={COURSE_DATA}
      lang={lang}
      labels={t}
      theme={theme}
      onOpenLesson={openLesson}
    />
  )

  // Slides mode
  if (showSlides && currentLesson?.slides) {
    return (
      <SlideViewer
        slides={currentLesson.slides}
        lang={lang}
        labels={t}
        onExit={() => navigate('lesson', activeModuleIdx, activeLessonIdx, false)}
      />
    )
  }

  // Overview
  if (view === 'overview') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
        <Header
          lang={lang}
          setLang={setLang}
          labels={t}
          completedCount={completedCount}
          totalLessons={totalLessons}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setSearchOpen(true)}
          onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <main className="flex-1">
          <Hero
            labels={t}
            stats={COURSE_STATS}
            completedCount={completedCount}
            totalLessons={totalLessons}
            onStart={() => openLesson(nextUp.mIdx, nextUp.lIdx)}
            onReset={resetProgress}
          />
          <Overview
            courseData={COURSE_DATA}
            lang={lang}
            labels={t}
            completedLessons={completedLessons}
            onOpenLesson={openLesson}
            theme={theme}
            stats={COURSE_STATS}
          />
        </main>
        <Footer
          labels={t}
          onOpenModules={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onStart={() => openLesson(nextUp.mIdx, nextUp.lIdx)}
        />
        {searchPanel}
      </div>
    )
  }

  // Lesson
  return (
    <>
      <LessonView
        module={currentModule}
        moduleIdx={activeModuleIdx}
        lesson={currentLesson}
        lessonIdx={activeLessonIdx}
        lang={lang}
        labels={t}
        isCompleted={!!completedLessons[currentLesson.id]}
        onToggleComplete={() => toggleComplete(currentLesson.id)}
        onShowSlides={() => navigate('lesson', activeModuleIdx, activeLessonIdx, true)}
        onBack={() => navigate('overview', 0, 0)}
        onPrev={goPrev}
        onNext={goNext}
        onGoToLesson={(lIdx) => navigate('lesson', activeModuleIdx, lIdx)}
        onOpenSearch={() => setSearchOpen(true)}
        hasPrev={!isFirst}
        hasNext={!isLast}
        theme={theme}
        onToggleTheme={toggleTheme}
        totalModules={COURSE_DATA.length}
        setLang={setLang}
        completedLessons={completedLessons}
        completedCount={completedCount}
        totalLessons={totalLessons}
      />
      {searchPanel}
    </>
  )
}
