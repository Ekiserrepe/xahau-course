/**
 * locales.js — the single source of truth for the eight languages.
 *
 * `code` is the internal key used throughout the course data
 * (`title: { en: …, jp: … }`) and in localStorage. Several of those keys are
 * not valid language tags — `jp` is not Japanese (that's `ja`), and `pt`
 * alone doesn't say Brazilian — but they are baked into ~1400 object keys
 * across the twelve module files, so renaming them would mean rewriting the
 * whole curriculum to fix a presentation bug.
 *
 * `tag` is the BCP-47 tag that actually goes on <html lang>, which is what
 * screen readers, browser translation and search engines read. Keeping the
 * two separate fixes the bug without touching a line of course content.
 */

export const LOCALES = [
  { code: 'en', tag: 'en',      label: 'English',            short: 'EN', dir: 'ltr' },
  { code: 'es', tag: 'es',      label: 'Español',            short: 'ES', dir: 'ltr' },
  { code: 'fr', tag: 'fr',      label: 'Français',           short: 'FR', dir: 'ltr' },
  { code: 'pt', tag: 'pt-BR',   label: 'Português (Brasil)', short: 'PT', dir: 'ltr' },
  { code: 'jp', tag: 'ja',      label: '日本語',              short: 'JA', dir: 'ltr' },
  { code: 'ko', tag: 'ko',      label: '한국어',              short: 'KO', dir: 'ltr' },
  { code: 'zh', tag: 'zh-Hans', label: '中文',                short: 'ZH', dir: 'ltr' },
  { code: 'ar', tag: 'ar',      label: 'العربية',            short: 'AR', dir: 'rtl' },
]

export const DEFAULT_LOCALE = 'en'

export const localeOf = (code) =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0]
