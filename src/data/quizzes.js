/**
 * Module checks — optional, per module, lazily loaded.
 *
 * Kept out of the module files on purpose: those are already thousands of
 * lines of lesson content, and a quiz is a different kind of thing with a
 * different review cycle. Drop a file named after the module's `id` into
 * ./quizzes/ and it appears at the end of that module's last lesson.
 * No file, no check — nothing else to wire up.
 *
 * Shape: see ./quizzes/m0.js
 */

const loaders = import.meta.glob('./quizzes/*.js')

const cache = new Map()

/** Resolve a module's quiz by module id, or null when it hasn't got one. */
export function loadQuiz(moduleId) {
  if (cache.has(moduleId)) return Promise.resolve(cache.get(moduleId))

  const loader = loaders[`./quizzes/${moduleId}.js`]
  if (!loader) {
    cache.set(moduleId, null)
    return Promise.resolve(null)
  }

  return loader()
    .then((m) => {
      const quiz = m.default ?? null
      cache.set(moduleId, quiz)
      return quiz
    })
    .catch(() => {
      cache.set(moduleId, null)
      return null
    })
}

/** Whether a module has a check at all — cheap, no fetch. */
export function hasQuiz(moduleId) {
  return !!loaders[`./quizzes/${moduleId}.js`]
}
