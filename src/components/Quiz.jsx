import React, { useState, useEffect } from 'react'
import { ActLabel, CheckIcon, Spinner, themeFor } from './Brand'
import { loadQuiz } from '../data/quizzes'

const localized = (value, lang) => value?.[lang] ?? value?.en ?? value?.es ?? ''

/**
 * Quiz — the check at the end of a module.
 *
 * Deliberately unscored and unrecorded: answers stay in component state and
 * never touch storage. It's a self-check, not an exam, so feedback lands per
 * question the moment it's answered rather than behind a submit button.
 */
export default function Quiz({ moduleId, moduleIdx, lang, labels, theme }) {
  const [questions, setQuestions] = useState(null)
  const [chosen, setChosen] = useState({})
  const mt = themeFor(moduleIdx, theme)

  // Answers reset because the parent keys this component by module id, so a
  // different module mounts a fresh Quiz rather than clearing state in here.
  useEffect(() => {
    let live = true
    loadQuiz(moduleId).then((q) => {
      if (live) setQuestions(q ?? [])
    })
    return () => {
      live = false
    }
  }, [moduleId])

  if (questions === null) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size={22} />
      </div>
    )
  }
  if (!questions.length) return null

  const answered = Object.keys(chosen).length
  const right = questions.filter((q, i) => chosen[i] === q.answer).length
  const done = answered === questions.length

  return (
    <section
      className="x-card mt-8 px-5 py-8 sm:px-10 sm:py-10"
      aria-label={labels.checkTitle}
    >
      <ActLabel color={mt.ink}>{labels.checkTitle}</ActLabel>

      <p className="mt-5 text-[14.5px] max-w-[56ch]" style={{ color: 'var(--color-text-muted)' }}>
        {labels.checkIntro}
      </p>

      <ol className="list-none m-0 p-0 mt-8 flex flex-col gap-8">
        {questions.map((q, qi) => {
          const pick = chosen[qi]
          const settled = pick !== undefined
          const correct = settled && pick === q.answer

          return (
            <li key={q.id}>
              <div className="flex items-start gap-3">
                <span
                  className="font-mono text-[11px] font-bold shrink-0 mt-1"
                  style={{ color: mt.ink, minWidth: '1.6rem' }}
                >
                  {String(qi + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15.5px] font-semibold leading-snug m-0"
                    style={{ color: 'var(--color-text-heading)' }}
                  >
                    {localized(q.question, lang)}
                  </p>

                  <div className="mt-3 flex flex-col gap-2">
                    {q.options.map((opt, oi) => {
                      const isPick = pick === oi
                      const isAnswer = oi === q.answer
                      // Once answered, show the right one even if they missed it
                      const good = settled && isAnswer
                      const bad = settled && isPick && !isAnswer

                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={settled}
                          onClick={() => setChosen((c) => ({ ...c, [qi]: oi }))}
                          className="flex items-center gap-3 text-start px-4 py-2.5 rounded-lg text-[14px] transition-colors"
                          style={{
                            // The brand has no red, so a missed pick gets the
                            // warm secondary — attention without alarm.
                            background: good ? mt.tint : bad ? 'var(--color-miss-bg)' : 'transparent',
                            border: `1.5px solid ${
                              good ? mt.line : bad ? 'var(--color-miss-border)' : 'var(--color-border-subtle)'
                            }`,
                            color: 'var(--color-text)',
                            cursor: settled ? 'default' : 'pointer',
                            opacity: settled && !isPick && !isAnswer ? 0.5 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!settled) e.currentTarget.style.background = 'var(--color-hover-bg)'
                          }}
                          onMouseLeave={(e) => {
                            if (!settled) e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <span
                            className="flex items-center justify-center shrink-0 rounded-full font-mono text-[10px] font-bold"
                            style={{
                              width: 20,
                              height: 20,
                              border: `1.5px solid ${
                                good ? mt.ink : bad ? 'var(--color-miss-ink)' : 'var(--color-border)'
                              }`,
                              color: good ? mt.ink : bad ? 'var(--color-miss-ink)' : 'var(--color-text-dim)',
                            }}
                          >
                            {good ? <CheckIcon size={10} /> : bad ? '×' : String.fromCharCode(65 + oi)}
                          </span>
                          <span className="flex-1">{localized(opt, lang)}</span>
                        </button>
                      )
                    })}
                  </div>

                  {settled && (
                    <p
                      className="mt-3 text-[13.5px] leading-relaxed m-0"
                      style={{ color: correct ? mt.ink : 'var(--color-text-muted)' }}
                    >
                      <strong>{correct ? labels.checkCorrect : labels.checkWrong}.</strong>{' '}
                      {localized(q.explain, lang)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      {done && (
        <div
          className="mt-9 pt-6 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          <span className="text-[15px] font-semibold" style={{ color: 'var(--color-text-heading)' }}>
            {right}/{questions.length} {labels.checkScore}
          </span>
          <button type="button" onClick={() => setChosen({})} className="x-btn x-btn-ghost" style={{ height: 38 }}>
            {labels.checkRetry}
          </button>
        </div>
      )}
    </section>
  )
}
