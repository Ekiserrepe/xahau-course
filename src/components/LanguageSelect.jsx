import React from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português (Brasil)', short: 'PT-BR' },
  { code: 'jp', label: '日本語', short: '日本語' },
  { code: 'ko', label: '한국어', short: '한국어' },
  { code: 'zh', label: '中文', short: '中文' },
  { code: 'ar', label: 'العربية', short: 'AR' },
]

export default function LanguageSelect({ lang, setLang, label = 'Language', compact = false }) {
  const active = LANGUAGES.find((item) => item.code === lang) || LANGUAGES[0]

  return (
    <label
      className={`relative flex items-center gap-1.5 rounded-lg transition-all ${compact ? 'h-8 px-2' : 'h-9 px-2.5'}`}
      style={{
        background: 'var(--color-button-bg)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
      }}
      title={label}
      aria-label={label}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={compact ? 'w-4 h-4' : 'w-[18px] h-[18px]'}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        <path d="M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
      <span className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
        {active.short}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-3 h-3"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
          clipRule="evenodd"
        />
      </svg>
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  )
}
