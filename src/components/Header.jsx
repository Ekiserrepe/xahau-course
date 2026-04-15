import React from 'react'
import ProgressBar from './ProgressBar'

export default function Header({ lang, setLang, labels, completedCount, totalLessons, theme, onToggleTheme }) {
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)

  return (
    <header
      className="px-4 sm:px-6 py-4 border-b"
      style={{
        background: `linear-gradient(180deg, var(--color-header-gradient) 0%, transparent 100%)`,
        borderColor: 'var(--color-border-light)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-black tracking-tight font-display" style={{ color: 'var(--color-text-heading)' }}>
              <span style={{ color: 'var(--color-accent)' }}>⬡</span> {labels.title}
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{labels.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* GitHub Link */}
            <a
              href="https://github.com/INFTF/xahau-course"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: 'var(--color-button-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              title="View on GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-base transition-all"
              style={{
                background: 'var(--color-button-bg)',
                border: '1px solid var(--color-border)',
              }}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {/* Language Switcher */}
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              {['en', 'es', 'jp', 'ko', 'zh'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1.5 text-xs sm:text-sm font-bold uppercase transition-all"
                  style={{
                    background: lang === l ? 'var(--color-accent)' : 'transparent',
                    color: lang === l ? '#000' : 'var(--color-text-dim)',
                  }}
                >
                  {l === 'jp' ? '日本語' : l === 'ko' ? '한국어' : l === 'zh' ? '中文' : l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {labels.progress}: {completedCount}/{totalLessons}
          </span>
          <span className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{pct}%</span>
        </div>
        <ProgressBar completed={completedCount} total={totalLessons} />
      </div>
    </header>
  )
}
