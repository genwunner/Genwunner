'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const BOOT_LINES = [
  { text: '> REQUEST RECEIVED...', highlight: false, delay: 200 },
  { text: '> ENCRYPTING TRANSMISSION...', highlight: false, delay: 700 },
  { text: '> FORWARDING TO MANAGEMENT...', highlight: false, delay: 1200 },
  { text: '> LOGGING TO DATABASE...', highlight: false, delay: 1700 },
  { text: '> GIOVANNI HAS BEEN NOTIFIED', highlight: true, delay: 2200 },
  { text: '> YOUR REQUEST IS UNDER REVIEW', highlight: true, delay: 2600 },
  { text: '> STAND BY FOR FURTHER TRANSMISSIONS', highlight: true, delay: 3000 },
]

export default function BookThankYouPage() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })
    setTimeout(() => setShowContent(true), 3600)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#cc0000' }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
      }} />

      <div className="max-w-3xl mx-auto px-4 py-20">
        <div style={{ marginBottom: '3rem', minHeight: 180 }}>
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
                // DEPLOYMENT REQUEST · FILED
              </p>
              <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
                REQUEST<br />RECEIVED
                <span style={{ display: 'inline-block', width: 4, height: '0.85em', background: '#e3000f', marginLeft: 8, verticalAlign: 'middle', animation: 'terminal-blink 1s step-end infinite' }} />
              </h1>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: '1px', background: '#1a0000', border: '1px solid #1a0000', marginBottom: '2rem' }}
            >
              <div style={{ background: '#030000', padding: '1.5rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.75rem', color: '#e3000f', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// WHAT HAPPENS NEXT</p>
                <ul style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#aa0000', letterSpacing: '0.04em', lineHeight: 2, listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Management reviews your request',
                    'Response within 48 hours',
                    'Confirmation sent to your email',
                    'Final details coordinated directly',
                    'Deployment confirmed in writing',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#e3000f', flexShrink: 0 }}>▶</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: '#030000', padding: '1.5rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.75rem', color: '#e3000f', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// URGENT INQUIRIES</p>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#880000', lineHeight: 2 }}>
                  Can&apos;t wait 48 hours?<br />
                  Transmit directly to management:
                </p>
                <a
                  href="mailto:genwunnermgmt@gmail.com"
                  style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#e3000f', letterSpacing: '0.04em', display: 'block', marginTop: '0.75rem', wordBreak: 'break-all' }}
                >
                  genwunnermgmt@gmail.com →
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/" className="btn-primary">← Return to HQ</Link>
              <Link href="/epk" className="btn-outline">View Dossier →</Link>
              <a href="mailto:genwunnermgmt@gmail.com" className="btn-outline">Direct Line →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
