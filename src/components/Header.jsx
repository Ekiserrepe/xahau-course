import React from 'react'
import LanguageSelect from './LanguageSelect'
import {
  XahauLockup,
  GitHubIcon,
  SunIcon,
  MoonIcon,
} from './Brand'

const REPO_URL = 'https://github.com/INFTF/xahau-course'

/**
 * ProgressRing — the compact progress read-out that lives in the top bar.
 * A ring rather than a bar: it survives the narrow header without stealing
 * horizontal space from the breadcrumb.
 */
function ProgressRing({ pct, size = 30, stroke = 3 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="var(--color-border)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  )
}

/**
 * Header — the single top bar shared by the overview and the lesson reader.
 * `children` is the contextual slot (breadcrumb in the lesson view).
 */
export default function Header({
  lang,
  setLang,
  labels,
  completedCount,
  totalLessons,
  theme,
  onToggleTheme,
  onBrandClick,
  children,
  compact = false,
}) {
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-bar)',
      }}
    >
      <div
        className={`mx-auto flex items-center gap-4 px-4 sm:px-6 ${compact ? 'py-3' : 'py-3.5'}`}
        style={{ maxWidth: compact ? 'none' : '80rem' }}
      >
        {/* Brand */}
        <div
          onClick={(e) => {
            if (onBrandClick) {
              e.preventDefault()
              onBrandClick()
            }
          }}
        >
          <XahauLockup label={labels.brand} compact={compact} href="#" />
        </div>

        {/* Contextual slot — breadcrumb, lesson title… */}
        <div className="min-w-0 flex-1">{children}</div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Progress read-out */}
          <div
            className="hidden sm:flex items-center gap-2.5 pr-3 mr-1"
            style={{ borderRight: '1px solid var(--color-border-subtle)' }}
            title={`${labels.progress}: ${completedCount}/${totalLessons}`}
          >
            <ProgressRing pct={pct} />
            <div className="leading-none">
              <div
                className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ color: 'var(--color-text-dim)' }}
              >
                {labels.progress}
              </div>
              <div
                className="text-[13px] font-bold tabular-nums mt-1"
                style={{ color: 'var(--color-text-heading)' }}
              >
                {completedCount}
                <span style={{ color: 'var(--color-text-dim)', fontWeight: 500 }}>
                  /{totalLessons}
                </span>
              </div>
            </div>
          </div>

          <LanguageSelect lang={lang} setLang={setLang} label={labels.language} />

          <button
            type="button"
            onClick={onToggleTheme}
            className="x-icon-btn"
            title={theme === 'dark' ? labels.lightMode : labels.darkMode}
            aria-label={theme === 'dark' ? labels.lightMode : labels.darkMode}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="x-icon-btn"
            title="GitHub"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  )
}
