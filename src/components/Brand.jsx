import React from 'react'

/**
 * Brand.jsx — shared vocabulary for the Xahau design system.
 *
 * Everything visual that more than one screen needs lives here: the wordmark
 * lockup, the icon set, the module colour themes and the small editorial
 * primitives (act labels, chips) that give xahau.network its rhythm.
 */

/* ── Module themes ──────────────────────────────────────────────────────────
   Four pastel tiles drawn from the brand palette (green, teal, sand, sage),
   cycled across modules. Deliberately restrained: the colour identifies the
   module, it never shouts over the content.
──────────────────────────────────────────────────────────────────────────── */

export const MODULE_THEMES = [
  { key: 'green', tint: '#e6f2ea', line: '#c8e0cf', ink: '#00622a' },
  { key: 'teal',  tint: '#e0f2f6', line: '#b8dde6', ink: '#005f75' },
  { key: 'sand',  tint: '#fdf1e3', line: '#f0dcc1', ink: '#8a5a12' },
  { key: 'sage',  tint: '#eef4f0', line: '#d0e2d5', ink: '#3a6b53' },
]

export const moduleTheme = (idx) => MODULE_THEMES[idx % MODULE_THEMES.length]

/* Dark mode needs its own tints — the pastels turn to muddy fog on ink. */
export const DARK_MODULE_THEMES = [
  { key: 'green', tint: 'rgba(93,228,140,0.12)',  line: 'rgba(93,228,140,0.26)',  ink: '#7ceba4' },
  { key: 'teal',  tint: 'rgba(0,196,232,0.12)',   line: 'rgba(0,196,232,0.26)',   ink: '#6fdcf2' },
  { key: 'sand',  tint: 'rgba(250,215,174,0.12)', line: 'rgba(250,215,174,0.26)', ink: '#f3cf9f' },
  { key: 'sage',  tint: 'rgba(163,206,181,0.12)', line: 'rgba(163,206,181,0.26)', ink: '#a9d6bd' },
]

export const themeFor = (idx, theme) =>
  (theme === 'dark' ? DARK_MODULE_THEMES : MODULE_THEMES)[idx % MODULE_THEMES.length]

/* ── Wordmark ───────────────────────────────────────────────────────────── */

export function XahauLockup({ label, compact = false, href = '/' }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 shrink-0 no-underline"
      style={{ color: 'var(--color-text-heading)' }}
      aria-label={`Xahau ${label}`}
    >
      <img
        src="/xahau-logo.svg"
        alt="Xahau"
        width={compact ? 108 : 126}
        height={compact ? 20 : 23}
        className="x-logo"
        style={{ display: 'block', maxWidth: '100%' }}
      />
      {/* The sub-brand is dropped on phones: the wordmark alone still reads. */}
      <span
        aria-hidden="true"
        className="hidden sm:block"
        style={{
          width: 1,
          height: compact ? 18 : 22,
          background: 'var(--color-border)',
        }}
      />
      <span
        className="hidden sm:block font-semibold tracking-tight"
        style={{
          fontSize: compact ? 14 : 16,
          color: 'var(--color-text-secondary)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
    </a>
  )
}

/* ── Editorial primitives ───────────────────────────────────────────────── */

export function ActLabel({ children, color = 'var(--color-accent)', className = '' }) {
  return (
    <p className={`x-act-label ${className}`}>
      <span className="x-pip" style={{ background: color }} />
      {children}
    </p>
  )
}

export function Chip({ children }) {
  return <span className="x-chip">{children}</span>
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

export function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export function SunIcon({ size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export function MoonIcon({ size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function ArrowLeftIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function CheckIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ChevronDownIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
