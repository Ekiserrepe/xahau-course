import React from 'react'

export default function ProgressBar({ completed, total }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return (
    <div className="w-full rounded-full h-2" style={{ background: 'var(--color-border)' }}>
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--color-accent), #7eb8ff)',
        }}
      />
    </div>
  )
}
