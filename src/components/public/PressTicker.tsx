'use client'

import { useState, useEffect } from 'react'

interface Quote {
  quote: string
  source: string
}

export default function PressTicker({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (quotes.length <= 1) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % quotes.length)
        setVisible(true)
      }, 600)
    }, 6000)
    return () => clearInterval(interval)
  }, [quotes.length])

  const current = quotes[index]

  return (
    <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid #1a0000', textAlign: 'center', background: '#030000' }}>
      <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.55rem', color: '#660000', letterSpacing: '0.12em', marginBottom: '0.65rem' }}>
        // INTERCEPTED CIVILIAN TRANSMISSION
      </div>
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
        color: '#880000',
        letterSpacing: '0.05em',
        fontStyle: 'italic',
        lineHeight: 1.6,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        &ldquo;{current.quote}&rdquo;
      </div>
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '0.55rem',
        color: '#e3000f',
        letterSpacing: '0.18em',
        marginTop: '0.65rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        — {current.source}
      </div>
    </div>
  )
}
