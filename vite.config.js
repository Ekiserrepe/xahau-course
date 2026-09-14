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

export default defineConfig({
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
          if (id.includes('/src/data/modules/')) {
            return id.split('/').pop().replace('.js', '')
          }
        },
      },
    },
  }
})
