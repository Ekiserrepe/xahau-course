/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        xahau: {
          accent: '#c8ff00',
          bg: '#080818',
          surface: '#0e0e24',
          border: '#1e1e3a',
          muted: '#667',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
