/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Xahau brand palette — mirrors xahau.network's @theme tokens
        xahau: {
          green: '#5de48c',
          'green-dark': '#007b3d',
          background: '#f7f7f7',
          gray: '#0f2328',
          secondary: '#fad7ae',
          teal: '#006f87',
          ink: '#0f2328',
          dim: '#2d3e44',
          mute: '#556068',
          line: '#e4edef',
        },
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', 'sans-serif'],
        display: ['Onest', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '24px',
      },
      boxShadow: {
        card: '0 2px 4px rgba(0,0,0,0.04), 0 20px 64px -24px rgba(15,35,40,0.13)',
      },
      maxWidth: {
        shell: '80rem',
      },
    },
  },
  plugins: [],
}
