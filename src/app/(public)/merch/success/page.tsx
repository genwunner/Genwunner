'use client'

// src/app/(public)/merch/success/page.tsx
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  { text: '> PAYMENT CONFIRMED.', delay: 200 },
  { text: '> ORDER LOGGED TO REGIME DATABASE...', delay: 600 },
  { text: '> GIOVANNI HAS BEEN NOTIFIED.', delay: 1000 },
  { text: '> SUPPLY DROP INCOMING.', delay: 1400 },
  { text: '', delay: 1700 },
  { text: '> ORDER CONFIRMED.', delay: 1900, highlight: true },
  { text: '> YOUR GEAR IS ON ITS WAY, OPERATIVE.', delay: 2300, highlight: true },
]

export default function MerchSuccessPage() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay)
    })
    setTimeout(() => setShowContent(true), 3000)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#cc0000', fontFamily: '"Courier New", Courier, monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <div style={{ fontSize: '0.5rem', color: '#330000', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
          // SUPPLY DROP · ORDER CONFIRMATION · ROCKET RECRUITMENT REGIME
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          {BOOT_LINES.map((line, i) => (
            visibleLines.includes(i) && (
              <div key={i} style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.75rem)', color: line.highlight ? '#ff5555' : '#550000', letterSpacing: '0.08em', lineHeight: 2, textShadow: line.highlight ? '0 0 10px rgba(255,85,85,0.5)' : 'none', fontWeight: line.highlight ? 700 : 400, minHeight: '1.5em' }}>
                {line.text}
              </div>
            )
          ))}
        </div>
        {showContent && (
          <div style={{ animation: 'fadeIn 0.6s ease forwards' }}>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } } @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }`}</style>
            <div style={{ borderTop: '1px solid #1a0000', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h1 style={{ margin: '0 0 0.25rem', fontFamily: '"Courier New", monospace', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 700, color: '#ff5555', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '0.2em', flexWrap: 'wrap' }}>
                SUPPLY DROP CONFIRMED
                <span style={{ display: 'inline-block', width: '0.55em', height: '1em', background: '#e3000f', verticalAlign: 'middle', animation: 'blink 0.9s step-end infinite', boxShadow: '0 0 8px rgba(227,0,15,0.7)', marginLeft: '0.05em' }} />
              </h1>
              <p style={{ margin: 0, fontSize: '0.65rem', color: '#550000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Rocket Recruitment Regime · Supply Depot
              </p>
            </div>
            <div style={{ background: '#030000', border: '1px solid #1a0000', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.48rem', color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>// WHAT HAPPENS NEXT</div>
              <p style={{ margin: 0, fontSize: '0.62rem', color: '#660000', lineHeight: 1.85, letterSpacing: '0.04em' }}>
                A confirmation email is on its way to your inbox. Your order will be fulfilled and shipped by the Rocket Recruitment Regime. Giovanni keeps records on every order. Your gear is coming.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href="/merch" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#000', background: '#e3000f', border: '1px solid #e3000f', padding: '0.6rem 1.5rem', textDecoration: 'none', textTransform: 'uppercase' }}>
                [ BACK TO SUPPLY DROP ]
              </Link>
              <Link href="/" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#880000', background: 'transparent', border: '1px solid #330000', padding: '0.6rem 1.5rem', textDecoration: 'none', textTransform: 'uppercase' }}>
                [ RETURN TO HQ ]
              </Link>
            </div>
            <div style={{ borderTop: '1px solid #0d0000', paddingTop: '1rem', fontSize: '0.4rem', color: '#220000', letterSpacing: '0.06em', lineHeight: 1.8 }}>
              SUPPLY DROP v2.0 · PROPERTY OF TEAM ROCKET · KANTO DIVISION · NOT AFFILIATED WITH THE POKEMON COMPANY
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
