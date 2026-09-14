import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist', 'node_modules', 'src/data/generated'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // The course data files legitimately carry very long localized strings
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
    },
  },
  {
    // Course data is content, not application code: the lesson bodies embed
    // code samples whose escaping is deliberate and must render verbatim.
    // Lint them for syntax, not for style.
    files: ['src/data/modules/**/*.js'],
    rules: {
      'no-useless-escape': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    // Shared modules that deliberately export helpers alongside components
    files: ['src/components/Brand.jsx', 'src/components/Markdown.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // Node context, not browser
    files: ['scripts/**/*.mjs', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]
