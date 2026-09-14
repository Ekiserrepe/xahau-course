import React from 'react'
import { GitHubIcon } from './Brand'

const REPO_URL = 'https://github.com/INFTF/xahau-course'

function Column({ title, links }) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3
        className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-text-dim)' }}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
        {links.map((l) => {
          const style = { color: 'var(--color-text-muted)' }
          const cls = 'text-[13.5px] no-underline transition-colors text-left'
          const enter = (e) => {
            e.currentTarget.style.color = 'var(--color-accent)'
          }
          const leave = (e) => {
            e.currentTarget.style.color = 'var(--color-text-muted)'
          }
          return (
            <li key={l.label}>
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  style={style}
                  onMouseEnter={enter}
                  onMouseLeave={leave}
                >
                  {l.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={l.onClick}
                  className={cls}
                  style={{ ...style, background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}
                  onMouseEnter={enter}
                  onMouseLeave={leave}
                >
                  {l.label}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Footer — the closing bar, built to the same proportions as the one on
 * xahau.network: brand column on the left, three link columns, a hairline,
 * and a monospace copyright row.
 */
export default function Footer({ labels, onOpenModules, onStart }) {
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="mx-auto max-w-shell px-4 sm:px-6 py-14">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <img
              src="/xahau-logo.svg"
              alt="Xahau"
              width={168}
              height={30}
              className="x-logo"
              style={{ display: 'block' }}
            />
            <p
              className="text-[13.5px] leading-relaxed max-w-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {labels.tagline} —{' '}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline font-semibold transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                GitHub ↗
              </a>
            </p>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="x-icon-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <Column
              title={labels.footerLearn}
              links={[
                { label: labels.allModules, onClick: onOpenModules },
                { label: labels.heroStart, onClick: onStart },
              ]}
            />
            <Column
              title={labels.footerResources}
              links={[
                { label: labels.heroDocs, href: 'https://docs.xahau.network' },
                { label: labels.footerNetwork, href: 'https://xahau.network' },
                { label: labels.footerExplorer, href: 'https://xahauexplorer.com' },
              ]}
            />
            <Column
              title={labels.footerCommunity}
              links={[
                { label: labels.footerGithub, href: REPO_URL },
                { label: labels.footerDiscord, href: 'https://discord.com/invite/UzU58haAn4' },
                { label: 'X / Twitter', href: 'https://x.com/XahauNetwork' },
              ]}
            />
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.04em]"
            style={{ color: 'var(--color-text-dim)' }}
          >
            © {new Date().getFullYear()} {labels.copyright}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.04em]"
            style={{ color: 'var(--color-text-dim)' }}
          >
            MIT License
          </span>
        </div>
      </div>
    </footer>
  )
}
