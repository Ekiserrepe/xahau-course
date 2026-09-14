/**
 * Site-wide configuration — the single source of truth for anything that
 * depends on where this is published.
 *
 * SITE_URL feeds four things that all silently break if they disagree with
 * the real host: the canonical link, the Open Graph and Twitter image URLs
 * (social platforms reject relative paths), robots.txt, and sitemap.xml.
 *
 * ▸ PLACEHOLDER — replace before going live.
 *   No trailing slash. It is injected into index.html by vite.config.js and
 *   read by scripts/build-course-data.mjs; nothing else should hardcode it.
 */
export const SITE_URL = 'https://example.invalid'
