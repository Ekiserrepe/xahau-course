/**
 * check-links.mjs: does every external link in the course still work?
 *
 *   npm run check-links
 *
 * Collects the http(s) links from the lessons, quizzes and READMEs, follows
 * redirects, and fails on anything that is not a 200. Documentation sites
 * reorganise (docs.xahau.network moved under xahau.network/docs and changed
 * its paths once already), so run this before publishing.
 */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCES = [
  ...(await readdir(path.join(ROOT, 'src/data/modules'))).map((f) => `src/data/modules/${f}`),
  ...(await readdir(path.join(ROOT, 'src/data/quizzes'))).map((f) => `src/data/quizzes/${f}`),
  'README.md',
]
// Placeholders and local addresses used as examples in the text, not real links;
// URL prefixes the code completes with a tx hash; and npmjs.com, which answers
// 403 to anything that is not a browser
const SKIP = [/localhost/, /(your|tu|seu|ton)-(server|servidor|serveur)\.com/, /example\.com/, /(ejemplo|exemplo)\.com/, /(mi-servidor|my-server)\.com/, /(tuweb|yourwebsite)\.com/, /^https:\/\/$/, /xaman\.app\/explorer\/21338\/$/, /npmjs\.com/, /\.example\//, /<[^>]*>/, /…/, /\$\{/, /bafy-/, /ipfs\.io\/ipfs\/$/, /\/ipfs\/$/]

const links = new Map() // url -> first file that uses it
for (const file of SOURCES) {
  const text = await readFile(path.join(ROOT, file), 'utf8')
  for (const [url] of text.matchAll(/https?:\/\/[^\s)"'`\]\\|]+/g)) {
    const clean = url.replace(/[.,;:]+$/, '')
    if (!SKIP.some((re) => re.test(clean)) && !links.has(clean)) links.set(clean, file)
  }
}

const bad = []
await Promise.all(
  [...links].map(async ([url, file]) => {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000), headers: { 'user-agent': 'learn-xahau-link-check' } })
      if (res.status !== 200) bad.push(`${res.status}  ${url}  (${file})`)
    } catch (err) {
      bad.push(`ERR  ${url}  (${file}): ${err.message}`)
    }
  }),
)

console.log(`${links.size} links checked, ${bad.length} broken`)
for (const b of bad.sort()) console.log('  ' + b)
process.exitCode = bad.length ? 1 : 0
