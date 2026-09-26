import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_URL } from './site.config.js'

/**
 * index.html is static, so the canonical and Open Graph URLs would otherwise
 * have to be hardcoded. This swaps %SITE_URL% for the one value in
 * site.config.js, keeping a single place to change when the host is known.
 */
function siteUrl() {
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL)
    },
  }
}

// Served from a sub-path (learn.xahau.network/xahau-course)? Build for it.
const BASE = new URL(SITE_URL).pathname.replace(/\/?$/, '/')

export default defineConfig({
  base: BASE,
  plugins: [react(), siteUrl()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // The French and Arabic code dictionaries every module shares: one chunk,
          // fetched once, instead of riding inside whichever module imports them first
          if (id.includes('/src/data/code-i18n')) return 'code-i18n'
          if (id.includes('/src/data/modules/')) {
            return id.split('/').pop().replace('.js', '')
          }
        },
      },
    },
  }
})
