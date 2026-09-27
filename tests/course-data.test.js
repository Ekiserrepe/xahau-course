/**
 * Smoke tests for the course data pipeline.
 *
 * These guard the seams that don't fail the build when they break. The
 * manifest, the search indexes and the module chunks are all derived from the
 * twelve module files, and a mismatch between them doesn't throw — it just
 * renders an empty lesson, a missing icon, or a search that finds nothing.
 *
 *   npm test
 *
 * Run `npm run prebuild` first (npm test does it for you) so the generated
 * artefacts match the modules on disk.
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { MODULE_FILES } from '../src/data/module-list.js'
import { LOCALES } from '../src/data/locales.js'
import { UI_LABELS } from '../src/data/i18n.js'
import { COURSE_MANIFEST } from '../src/data/generated/manifest.js'
import { codeFile } from '../src/data/code-files.js'
import { derivedKorean, localizeCode, untranslatedIn } from '../src/data/code-i18n.js'
import { FR } from '../src/data/code-i18n-fr.js'
import { AR } from '../src/data/code-i18n-ar.js'
import { KO } from '../src/data/code-i18n-ko.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Same glob the app uses, so the test exercises the real resolution path
// rather than a dynamic import Vite can't analyse.
const moduleLoaders = import.meta.glob('../src/data/modules/m*.js')

const modules = await Promise.all(
  MODULE_FILES.map(async (file) => {
    const load = moduleLoaders[`../src/data/modules/${file}`]
    if (!load) throw new Error(`${file} is in module-list.js but not on disk`)
    return { file, mod: (await load()).default }
  }),
)

/** The module ids Brand.jsx draws a line icon for. */
async function iconIds() {
  const src = await readFile(path.join(ROOT, 'src/components/Brand.jsx'), 'utf8')
  const block = src.slice(src.indexOf('const ICON_PATHS'), src.indexOf('export function ModuleIcon'))
  return [...block.matchAll(/^ {2}(m\w+):/gm)].map((m) => m[1])
}

describe('modules', () => {
  it('every registered file loads and exports a module', () => {
    expect(modules).toHaveLength(MODULE_FILES.length)
    for (const { file, mod } of modules) {
      expect(mod, `${file} has no default export`).toBeTruthy()
      expect(mod.id, `${file} has no id`).toBeTruthy()
      expect(Array.isArray(mod.lessons), `${file} has no lessons array`).toBe(true)
      expect(mod.lessons.length, `${file} has no lessons`).toBeGreaterThan(0)
    }
  })

  it('module and lesson ids are unique', () => {
    const moduleIds = modules.map(({ mod }) => mod.id)
    expect(new Set(moduleIds).size).toBe(moduleIds.length)

    const lessonIds = modules.flatMap(({ mod }) => mod.lessons.map((l) => l.id))
    expect(new Set(lessonIds).size, 'duplicate lesson id — progress is keyed on these').toBe(
      lessonIds.length,
    )
  })

  it('every module has a line icon, so none falls back to an emoji', async () => {
    const ids = await iconIds()
    for (const { mod } of modules) {
      expect(ids, `no ICON_PATHS entry for "${mod.id}" in Brand.jsx`).toContain(mod.id)
    }
  })

  it('every code block uses a language the highlighter registers', () => {
    // CodeBlock.jsx registers these; anything else renders unhighlighted.
    const registered = new Set(['javascript', 'bash', 'sh', 'c', 'json', 'html', 'text'])
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        for (const block of lesson.codeBlocks ?? []) {
          const lang = block.language || 'text'
          expect(registered, `${lesson.id} uses unregistered language "${lang}"`).toContain(lang)
        }
      }
    }
  })

  it('every source file the theory names is shown in some Code tab', () => {
    // Theory links `hola-xahau.js` to the file's Code tab; a name with nothing
    // to link to is a lesson talking about code the reader can't see. Same
    // matching as LessonView: a bare name may match a longer path only in its
    // own lesson. Headers (.h) ship with the Hooks toolchain and aren't sources.
    const NOT_COURSE_FILES = {
      'index.js': "npm's default `main`, which the course never creates",
      'src/main.jsx': 'Vite scaffold the lesson says not to touch',
      'index.html': 'Vite scaffold the lesson says not to touch',
      'contracts/base.c': 'the sample Hook `hooks-cli init` writes into a new project',
    }
    const shown = modules.flatMap(({ mod }) =>
      mod.lessons.flatMap((l) => (l.codeBlocks ?? []).map(codeFile).filter(Boolean)),
    )
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        const own = (lesson.codeBlocks ?? []).map(codeFile).filter(Boolean)
        for (const [lang, text] of Object.entries(lesson.theory ?? {})) {
          for (const [, name] of text.matchAll(/`((?:[\w-]+\/)*[\w.-]+\.(?:js|mjs|cjs|jsx|c|sh|toml|txt|html|json))`/g)) {
            if (NOT_COURSE_FILES[name]) continue
            expect(
              shown.includes(name) || own.some((f) => f.endsWith('/' + name)),
              `${lesson.id} (${lang}) names ${name}, which no Code tab shows`,
            ).toBe(true)
          }
        }
      }
    }
  })

  it('the derived code (French, Arabic, Korean where missing) is the English code, line by line, fully translated', () => {
    // Both are derived from the English code (src/data/code-i18n.js): the code
    // is identical and only comments, messages and UI text change. A text with
    // no dictionary entry would stay in English.
    const missing = []
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        for (const block of lesson.codeBlocks ?? []) {
          if (block.manual) continue
          const en = block.code.en ?? ''
          expect(block.code.fr, `${lesson.id}: French code is not derived`).toBe(localizeCode(en, block.language, FR))
          expect(block.code.ar, `${lesson.id}: Arabic code is not derived`).toBe(localizeCode(en, block.language, AR))
          expect(block.code.fr.split('\n').length, `${lesson.id}: French line count`).toBe(en.split('\n').length)
          for (const [lang, dict] of [['fr', FR], ['ar', AR]]) {
            for (const text of untranslatedIn(en, block.language, dict)) missing.push(`${lesson.id} (${lang}): ${text}`)
          }
          // A block with no Korean code of its own gets it the same way
          if (derivedKorean.has(block)) {
            for (const text of untranslatedIn(en, block.language, KO)) missing.push(`${lesson.id} (ko): ${text}`)
          }
        }
      }
    }
    expect(missing, 'add these to src/data/code-i18n-fr.js / -ar.js / -ko.js').toEqual([])
  })

  it('no code block shows an empty version in any language', () => {
    // An empty string doesn't fall back to English: the Code tab shows nothing
    const empty = []
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        for (const [i, block] of (lesson.codeBlocks ?? []).entries()) {
          if (typeof block.code === 'string') continue
          for (const [lang, code] of Object.entries(block.code)) if (!code.trim()) empty.push(`${lesson.id} #${i} (${lang})`)
        }
      }
    }
    expect(empty).toEqual([])
  })

  it('every link to a lesson points at one that exists, outside headings and code', () => {
    // Inserting or moving a lesson shifts every `?m=X&l=Y` after it. A link in
    // a `###` heading breaks its anchor; one in a fence renders as raw text.
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        for (const [lang, text] of Object.entries(lesson.theory ?? {})) {
          let fenced = false
          for (const line of text.split('\n')) {
            if (line.trimStart().startsWith('```')) fenced = !fenced
            const links = [...line.matchAll(/\]\(\?m=(\d+)&l=(\d+)[^)]*\)/g)]
            if (!links.length) continue
            const where = `${lesson.id} (${lang}): ${line.slice(0, 80)}`
            expect(fenced, `link inside a code block in ${where}`).toBe(false)
            expect(/^#{1,6} /.test(line), `link inside a heading in ${where}`).toBe(false)
            for (const [, m, l] of links) {
              expect(modules[+m]?.mod.lessons[+l], `no lesson ?m=${m}&l=${l} in ${where}`).toBeTruthy()
            }
          }
        }
      }
    }
  })
})

describe('manifest', () => {
  it('matches the modules on disk', () => {
    expect(COURSE_MANIFEST).toHaveLength(modules.length)
    COURSE_MANIFEST.forEach((entry, i) => {
      const { mod, file } = modules[i]
      expect(entry.id, `manifest out of order at ${i} — run npm run prebuild`).toBe(mod.id)
      expect(entry.file).toBe(file)
      expect(entry.lessons).toHaveLength(mod.lessons.length)
    })
  })

  it('records which lessons have code and slides', () => {
    COURSE_MANIFEST.forEach((entry, i) => {
      entry.lessons.forEach((meta, j) => {
        const lesson = modules[i].mod.lessons[j]
        // The tabs are enabled from the manifest before content arrives, so a
        // wrong flag means a dead tab or a hidden one.
        expect(meta.hasCode).toBe(!!lesson.codeBlocks?.length)
        expect(meta.hasSlides).toBe(!!lesson.slides?.length)
        // Theory links and ?f= deep links resolve against this list
        expect(meta.files).toEqual((lesson.codeBlocks ?? []).map(codeFile).filter(Boolean))
      })
    })
  })
})

describe('search index', () => {
  const totalLessons = COURSE_MANIFEST.reduce((n, m) => n + m.lessons.length, 0)

  it.each(LOCALES.map((l) => l.code))('%s covers every lesson with a body', async (code) => {
    const docs = JSON.parse(await readFile(path.join(ROOT, `public/search/${code}.json`), 'utf8'))
    expect(docs, `search/${code}.json is stale — run npm run prebuild`).toHaveLength(totalLessons)
    for (const doc of docs) {
      expect(doc.lt, `empty lesson title at ${code} ${doc.m}/${doc.l}`).toBeTruthy()
      expect(doc.b.length, `empty body at ${code} ${doc.m}/${doc.l}`).toBeGreaterThan(0)
    }
  })

  it('strips markdown so searches match what readers see', async () => {
    const docs = JSON.parse(await readFile(path.join(ROOT, 'public/search/en.json'), 'utf8'))
    const joined = docs.map((d) => d.b).join(' ')
    expect(joined).not.toMatch(/```/)
    expect(joined).not.toMatch(/\]\(http/)
  })
})

describe('translations', () => {
  it('every locale has every UI label', () => {
    const reference = Object.keys(UI_LABELS.en)
    for (const { code } of LOCALES) {
      expect(UI_LABELS[code], `no UI_LABELS for "${code}"`).toBeTruthy()
      for (const key of reference) {
        expect(UI_LABELS[code][key], `${code} is missing "${key}"`).toBeTruthy()
      }
    }
  })

  it('has no label that nothing renders', async () => {
    const sources = await Promise.all(
      [
        'src/App.jsx',
        'src/components/Header.jsx',
        'src/components/Hero.jsx',
        'src/components/Overview.jsx',
        'src/components/Footer.jsx',
        'src/components/LessonView.jsx',
        'src/components/SlideViewer.jsx',
        'src/components/CodeBlock.jsx',
        'src/components/Search.jsx',
        'src/components/Quiz.jsx',
        'src/components/LanguageSelect.jsx',
      ].map((f) => readFile(path.join(ROOT, f), 'utf8')),
    )
    const app = sources.join('\n')
    const unused = Object.keys(UI_LABELS.en).filter(
      (key) => !app.includes(`labels.${key}`) && !app.includes(`t.${key}`),
    )
    expect(unused, 'translated in eight languages but never rendered').toEqual([])
  })

  it('every lesson is translated into every locale', () => {
    for (const { mod } of modules) {
      for (const lesson of mod.lessons) {
        for (const { code } of LOCALES) {
          expect(lesson.title?.[code], `${lesson.id} has no ${code} title`).toBeTruthy()
          expect(lesson.theory?.[code], `${lesson.id} has no ${code} theory`).toBeTruthy()
        }
      }
    }
  })
})

describe('quizzes', () => {
  const quizzes = import.meta.glob('../src/data/quizzes/*.js')

  it('is named after a module that exists', () => {
    const ids = new Set(modules.map(({ mod }) => mod.id))
    for (const file of Object.keys(quizzes)) {
      const id = file.split('/').pop().replace('.js', '')
      // A quiz whose filename doesn't match a module id silently never shows.
      expect(ids, `${file} matches no module id`).toContain(id)
    }
  })

  it('is fully translated and every answer points at a real option', async () => {
    for (const [file, load] of Object.entries(quizzes)) {
      const questions = (await load()).default
      expect(Array.isArray(questions), `${file} must default-export an array`).toBe(true)
      expect(questions.length, `${file} is empty`).toBeGreaterThan(0)

      const seen = new Set()
      for (const q of questions) {
        expect(seen.has(q.id), `${file} repeats question id ${q.id}`).toBe(false)
        seen.add(q.id)

        expect(q.options.length, `${file} ${q.id} needs options`).toBeGreaterThan(1)
        expect(q.answer, `${file} ${q.id} answer out of range`).toBeLessThan(q.options.length)
        expect(q.answer).toBeGreaterThanOrEqual(0)

        for (const { code } of LOCALES) {
          expect(q.question?.[code], `${file} ${q.id} has no ${code} question`).toBeTruthy()
          expect(q.explain?.[code], `${file} ${q.id} has no ${code} explanation`).toBeTruthy()
          q.options.forEach((opt, i) => {
            expect(opt?.[code], `${file} ${q.id} option ${i} has no ${code}`).toBeTruthy()
          })
        }
      }
    }
  })
})
