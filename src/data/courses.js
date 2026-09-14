/**
 * Course Data Index
 *
 * Modules are no longer imported statically. The overview only needs titles
 * and lesson lists, which come from the generated manifest (small, bundled);
 * a module's lessons — the megabytes of theory, code and slides — load the
 * first time someone opens one of them.
 *
 * To add a module:
 * 1. Create the module file in ./modules/
 * 2. Add its filename to ./module-list.js in the right position
 * 3. Add a line icon for its `id` in src/components/Brand.jsx
 * Then `npm run dev` (or `build`) regenerates the manifest.
 */

import { COURSE_MANIFEST } from './generated/manifest.js'
import { MODULE_FILES } from './module-list.js'

/** Metadata for every module — safe to render immediately. */
export const COURSE_META = COURSE_MANIFEST

/**
 * Vite turns this glob into a map of dynamic imports, one chunk per module,
 * none of them fetched until called.
 */
const loaders = import.meta.glob('./modules/m*.js')

const cache = new Map()

/** Load a module's full content by index. Resolves from cache on repeat. */
export function loadModule(mIdx) {
  if (cache.has(mIdx)) return Promise.resolve(cache.get(mIdx))

  const file = MODULE_FILES[mIdx]
  const loader = loaders[`./modules/${file}`]
  if (!loader) return Promise.reject(new Error(`Unknown module index ${mIdx}`))

  return loader().then((m) => {
    cache.set(mIdx, m.default)
    return m.default
  })
  // Deliberately no catch: a failed chunk must reject so the caller can show
  // an error and offer a retry. Swallowing it here is what left the lesson
  // spinning forever. Nothing is cached on failure, so a retry refetches.
}

/** Already-resolved module, or undefined. Lets render paths stay synchronous. */
export function peekModule(mIdx) {
  return cache.get(mIdx)
}

/** Warm the cache without blocking — used to prefetch the next lesson's module. */
export function prefetchModule(mIdx) {
  if (mIdx >= 0 && mIdx < MODULE_FILES.length && !cache.has(mIdx)) {
    loadModule(mIdx).catch(() => {})
  }
}
