import React from 'react'
import { ChevronDownIcon } from './Brand'
import { LOCALES, localeOf } from '../data/locales'


export default function LanguageSelect({ lang, setLang, label = 'Language' }) {
  const active = localeOf(lang)

  return (
    <label
      className="relative flex items-center gap-1.5 h-[34px] px-2.5 rounded-md cursor-pointer transition-colors"
      style={{
        background: 'var(--color-button-bg)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-button-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-button-bg)'
      }}
      title={label}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        <path d="M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
      <span
        className="font-mono text-[11px] font-bold tracking-[0.08em]"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {active.short}
      </span>
      <ChevronDownIcon size={11} />
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      >
        {LOCALES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  )
}
