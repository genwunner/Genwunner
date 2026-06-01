'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const BOOT_LINES = [
  { text: '> INITIALIZING WUNNERDEX PROTOCOL...', highlight: false, delay: 200 },
  { text: '> VERIFYING OPERATIVE CREDENTIALS...', highlight: false, delay: 600 },
  { text: '> CROSS-REFERENCING KANTO DATABASE...', highlight: false, delay: 1100 },
  { text: '> ENCRYPTING PERSONAL FILE...', highlight: false, delay: 1500 },
  { text: '> TRANSMITTING TO GIOVANNI...', highlight: false, delay: 1900 },
  { text: '> OPERATIVE IDENTITY CONFIRMED', highlight: true, delay: 2300 },
  { text: '> FILE ADDED TO WUNNERDEX', highlight: true, delay: 2600 },
  { text: '> WELCOME TO THE ROCKET RECRUITMENT REGIME', highlight: true, delay: 2900 },
]

export default function WunnerdexWelcomePage() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })
    setTimeout(() => setShowContent(true), 3400)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#cc0000' }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
      }} />

      <div className="max-w-3xl mx-auto px-4 py-20">
        <div style={{ marginBottom: '3rem', minHeight: 200 }}>
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                lineHeight: 2,
                color: visibleLines.includes(i) ? (line.highlight ? '#e3000f' : '#880000') : 'transparent',
                transition: 'color 0.3s',
                textShadow: line.highlight && visibleLines.includes(i) ? '0 0 8px rgba(227,0,15,0.5)' : 'none',
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {showContent && (
          <div style={{ animation: 'rrr-fold-down 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <div style={{ borderLeft: '3px solid #e3000f', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.55rem', color: '#e3000f', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                // ENLISTMENT CONFIRMED · KANTO DIVISION
              </p>
              <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
                YOU&apos;RE IN<br />THE REGIME
                <span style={{ display: 'inline-block', width: 4, height: '0.85em', background: '#e3000f', marginLeft: 8, verticalAlign: 'middle', animation: 'terminal-blink 1s step-end infinite' }} />
              </h1>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: '1px', background: '#1a0000', border: '1px solid #1a0000', marginBottom: '3rem' }}
            >
              <div style={{ background: '#030000', padding: '1.5rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.75rem', color: '#e3000f', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// YOUR ORDERS</p>
                <ul style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#aa0000', letterSpacing: '0.04em', lineHeight: 2, listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'City raid alerts — first to know',
                    'Early merch access before civilians',
                    'Secret drops & unreleased intel',
                    "Giovanni's journal — classified updates",
                    'Fan challenges & field missions',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#e3000f', flexShrink: 0 }}>▶</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: '#030000', padding: '1.5rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.75rem', color: '#e3000f', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// OPERATIVE STATUS</p>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#880000', lineHeight: 2 }}>
                  <p><span style={{ color: '#770000' }}>RANK:</span>&nbsp;<span style={{ color: '#cc0000' }}>GRUNT — NEWLY ENLISTED</span></p>
                  <p><span style={{ color: '#770000' }}>CLEARANCE:</span>&nbsp;<span style={{ color: '#cc0000' }}>LEVEL 1</span></p>
                  <p><span style={{ color: '#770000' }}>STATUS:</span>&nbsp;<span style={{ color: '#e3000f', textShadow: '0 0 6px rgba(227,0,15,0.4)' }}>ACTIVE</span></p>
                  <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#880000', lineHeight: 1.8 }}>
                    Check your email — your operative<br />confirmation has been dispatched.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="https://discord.gg/6c28f8JXKV" target="_blank" rel="noopener noreferrer" className="btn-primary">
                ⚡ Enter HQ — Discord →
              </a>
              <Link href="/music" className="btn-outline">Stream Arsenal →</Link>
              <Link href="/" className="btn-outline">Return to HQ →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
