/**
 * Site-wide configuration: the single source of truth for anything that
 * depends on where this is published.
 *
 * SITE_URL feeds everything that silently breaks if it disagrees with the
 * real host: the canonical link, the Open Graph and Twitter image URLs
 * (social platforms reject relative paths), robots.txt, sitemap.xml, Vite's
 * `base` (for a sub-path deploy) and public/CNAME (only when the course has a
 * custom domain to itself, at its root).
 *
 * To move the site, change the default below, or set SITE_URL in the
 * environment to build for another host without touching code. No trailing slash needed.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://learn.xahau.network/xahau-course').replace(/\/+$/, '')
