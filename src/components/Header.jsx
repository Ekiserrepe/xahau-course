import React from 'react'
import ProgressBar from './ProgressBar'

export default function Header({ lang, setLang, labels, completedCount, totalLessons, theme, onToggleTheme }) {
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)

  return (
    <header
      className="px-6 py-5 border-b"
      style={{
        background: `linear-gradient(180deg, var(--color-header-gradient) 0%, transparent 100%)`,
        borderColor: 'var(--color-border-light)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight font-display" style={{ color: 'var(--color-text-heading)' }}>
              <span style={{ color: 'var(--color-accent)' }}>⬡</span> {labels.title}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{labels.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all"
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
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 text-sm font-bold uppercase transition-all"
                  style={{
                    background: lang === l ? 'var(--color-accent)' : 'transparent',
                    color: lang === l ? '#000' : 'var(--color-text-dim)',
                  }}
                >
                  {l === 'jp' ? '日本語' : l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {labels.progress}: {completedCount}/{totalLessons}
          </span>
          <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{pct}%</span>
        </div>
        <ProgressBar completed={completedCount} total={totalLessons} />
      </div>
    </header>
  )
}
