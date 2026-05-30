'use client'

import { useState } from 'react'

interface Quote {
  quote: string
  source: string
}

export default function PressTicker({ quotes }: { quotes: Quote[] }) {
  const [touchPaused, setTouchPaused] = useState(false)

  // Duplicate so the loop is seamless — animation runs 0 → -50%
  const items = [...quotes, ...quotes]

  return (
    <div style={{ borderBottom: '1px solid #1a0000', background: '#030000' }}>
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
        fontWeight: 700,
        color: '#880000',
        letterSpacing: '0.12em',
        padding: '0.6rem 1.5rem 0',
        userSelect: 'none',
      }}>
        // INTERCEPTED CIVILIAN TRANSMISSION
      </div>

      <div
        className={`ticker-wrapper${touchPaused ? ' touch-paused' : ''}`}
        style={{ overflow: 'hidden', padding: '0.6rem 0 0.9rem', cursor: 'default' }}
        onTouchStart={() => setTouchPaused(true)}
        onTouchEnd={() => setTouchPaused(false)}
        onTouchCancel={() => setTouchPaused(false)}
      >
        <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {items.map((q, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.6em', paddingRight: '4rem' }}>
              <span style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.5rem)',
                color: '#cc0000',
                letterSpacing: '0.04em',
                fontStyle: 'italic',
              }}>
                &ldquo;{q.quote}&rdquo;
              </span>
              <span style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(0.75rem, 1.6vw, 1rem)',
                fontWeight: 700,
                color: '#e3000f',
                letterSpacing: '0.15em',
              }}>
                — {q.source}
              </span>
              <span style={{ color: '#2a0000', paddingLeft: '2rem', letterSpacing: '0.2em' }}>///</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 38s linear infinite;
        }
        .ticker-wrapper:hover .ticker-track,
        .ticker-wrapper.touch-paused .ticker-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
