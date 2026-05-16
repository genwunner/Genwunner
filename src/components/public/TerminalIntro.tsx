'use client'

// src/components/public/TerminalIntro.tsx
// RRR Terminal — Fallout-style, fullscreen, requires LAUNCH interaction

import { useEffect, useState, useRef } from 'react'

const SEQUENCE: {
  text: string
  delay: number
  dim?: boolean
  highlight?: boolean
  logo?: boolean
}[] = [
  { text: 'ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL',       delay: 200,  dim: true  },
  { text: 'ROCKET RECRUITMENT REGIME // KANTO DIVISION',   delay: 500,  dim: false },
  { text: 'TERMINAL v3.3.1 ——— CLASSIFIED ACCESS ONLY',    delay: 800,  dim: true  },
  { text: '',                                              delay: 1000              },
  { text: 'INITIALIZING SECURE CONNECTION...',             delay: 1200, dim: true  },
  { text: 'ENCRYPTING CHANNEL.............. [COMPLETE]',   delay: 1700, dim: true  },
  { text: 'ROUTING THROUGH KANTO MAINFRAME...',            delay: 2100, dim: true  },
  { text: 'ESTABLISHING OPERATIVE UPLINK...',              delay: 2500, dim: true  },
  { text: '',                                              delay: 2900              },
  { text: ' ██████╗ ██████╗ ██████╗',                     delay: 3100, logo: true },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',                    delay: 3250, logo: true },
  { text: ' ██████╔╝██████╔╝██████╔╝',                    delay: 3400, logo: true },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',                    delay: 3550, logo: true },
  { text: ' ██║  ██║██║  ██║██║  ██║',                    delay: 3700, logo: true },
  { text: ' ╚═════╝ ╚═════╝ ╚═════╝',                     delay: 3850, logo: true },
  { text: '',                                              delay: 4000              },
  { text: '  ROCKET RECRUITMENT REGIME',                   delay: 4150              },
  { text: '  RIGHT HAND OF GIOVANNI — EST. 2022',          delay: 4350, dim: true  },
  { text: '',                                              delay: 4550              },
  { text: '> VERIFYING OPERATIVE CREDENTIALS...',          delay: 4800, dim: true  },
  { text: '> OPERATIVE ID ............. GENWUNNER',        delay: 5300              },
  { text: '> ACCESS LEVEL ............. [CLASSIFIED]',     delay: 5700              },
  { text: '> CLEARANCE ................ EXECUTIVE+',       delay: 6100              },
  { text: '',                                              delay: 6400              },
  { text: '> IDENTITY CONFIRMED.',                         delay: 6700, highlight: true },
  { text: '> WELCOME, OPERATIVE.',                         delay: 7100, highlight: true },
  { text: '> THE BOSS IS WATCHING.',                       delay: 7500, highlight: true },
  { text: '',                                              delay: 7900              },
  { text: '> KANTO MAINFRAME ACCESS GRANTED.',             delay: 8200              },
  { text: '> REGIME SITE READY TO LOAD.',                  delay: 8700              },
  { text: '',                                              delay: 9100              },
]

const LAUNCH_DELAY = 9600

export default function TerminalIntro() {
  const [mounted, setMounted]       = useState(false)
  const [visible, setVisible]       = useState(true)
  const [started, setStarted]       = useState(false)
  const [shownLines, setShownLines] = useState<number[]>([])
  const [showLaunch, setShowLaunch] = useState(false)
  const [launching, setLaunching]   = useState(false)
  const [fadeOut, setFadeOut]       = useState(false)
  const skipRef   = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    if (sessionStorage.getItem('rrr-intro-seen')) { setVisible(false); return }
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [mounted])

  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []
    SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        if (skipRef.current) return
        setShownLines(prev => [...prev, i])
        scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })
      }, line.delay)
      timers.push(t)
    })
    const lt = setTimeout(() => { if (!skipRef.current) setShowLaunch(true) }, LAUNCH_DELAY)
    timers.push(lt)
    return () => timers.forEach(clearTimeout)
  }, [started])

  function handleLaunch() {
    if (launching) return
    setLaunching(true)
    setShowLaunch(false)
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('rrr-intro-seen', '1')
      }, 800)
    }, 300)
  }

  function skip() {
    skipRef.current = true
    setFadeOut(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('rrr-intro-seen', '1')
    }, 500)
  }

  if (!mounted) return <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999 }} />
  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes rrr-flicker {
          0%   { opacity:0; }
          8%   { opacity:0.9; }
          10%  { opacity:0.1; }
          12%  { opacity:1; }
          14%  { opacity:0.3; }
          16%  { opacity:1; }
          100% { opacity:1; }
        }
        @keyframes rrr-scanmove {
          from { top:-4px; }
          to   { top:100%; }
        }
        @keyframes rrr-cursor {
          0%,49%   { opacity:1; }
          50%,100% { opacity:0; }
        }
        @keyframes rrr-logo-pulse {
          0%,100% { text-shadow:0 0 10px rgba(227,0,15,0.7),0 0 30px rgba(227,0,15,0.2); }
          50%     { text-shadow:0 0 20px rgba(227,0,15,1),0 0 60px rgba(227,0,15,0.5); }
        }
        @keyframes rrr-launch-pulse {
          0%,100% { box-shadow:0 0 10px rgba(227,0,15,0.5); border-color:#e3000f; }
          50%     { box-shadow:0 0 30px rgba(227,0,15,0.9),0 0 60px rgba(227,0,15,0.3); border-color:#ff4444; }
        }
        @keyframes rrr-launch-appear {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rrr-glitch {
          0%   { transform:translate(-3px,0); filter:hue-rotate(0deg); }
          25%  { transform:translate(3px,0);  filter:hue-rotate(90deg); }
          50%  { transform:translate(-2px,0); filter:hue-rotate(0deg); }
          75%  { transform:translate(2px,0);  filter:hue-rotate(45deg); }
          100% { transform:translate(0,0);    filter:hue-rotate(0deg); }
        }
        @keyframes rrr-line-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? 'opacity 0.8s ease' : 'none',
        animation: started && !fadeOut ? 'rrr-flicker 0.6s ease forwards' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* CRT scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.22) 3px, rgba(0,0,0,0.22) 4px)',
          pointerEvents: 'none', zIndex: 30,
        }} />

        {/* Scanline sweep */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 6,
          background: 'linear-gradient(to bottom, transparent, rgba(227,0,15,0.04), transparent)',
          animation: 'rrr-scanmove 5s linear infinite',
          pointerEvents: 'none', zIndex: 31,
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none', zIndex: 29,
        }} />

        {/* Phosphor glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(227,0,15,0.03) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 28,
        }} />

        {/* Glitch on launch */}
        {launching && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 40,
            animation: 'rrr-glitch 0.3s steps(2) forwards',
            background: 'rgba(227,0,15,0.05)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 100,
            fontFamily: 'var(--font-pixel)', fontSize: '0.5rem',
            color: 'rgba(227,0,15,0.3)', background: 'none',
            border: '1px solid rgba(227,0,15,0.12)',
            padding: '0.4rem 0.9rem', cursor: 'pointer', letterSpacing: '0.1em',
          }}
        >
          [ SKIP ]
        </button>

        {/* Terminal content */}
        <div
          ref={scrollRef}
          style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            position: 'relative', zIndex: 10,
          }}
        >
          {shownLines.map(i => {
            const line = SEQUENCE[i]
            if (line.text === '') return <div key={i} style={{ height: '0.8rem' }} />

            const color = line.logo ? '#e3000f' : line.highlight ? '#ff5555' : line.dim ? '#6b0000' : '#cc0000'
            const glow  = line.logo
              ? '0 0 14px rgba(227,0,15,0.9), 0 0 40px rgba(227,0,15,0.3)'
              : line.highlight
              ? '0 0 10px rgba(255,85,85,0.7)'
              : line.dim
              ? 'none'
              : '0 0 6px rgba(204,0,0,0.5)'

            return (
              <div
                key={i}
                style={{
                  fontFamily: line.logo ? '"Courier New", monospace' : 'var(--font-pixel)',
                  fontSize: line.logo ? 'clamp(0.5rem, 1.8vw, 0.9rem)' : 'clamp(0.5rem, 1.5vw, 0.7rem)',
                  color,
                  textShadow: glow,
                  whiteSpace: 'pre',
                  lineHeight: line.logo ? 1.25 : 2,
                  letterSpacing: line.logo ? '0.02em' : '0.06em',
                  animation: line.logo
                    ? 'rrr-logo-pulse 2s ease infinite, rrr-line-in 0.08s ease both'
                    : 'rrr-line-in 0.08s ease both',
                }}
              >
                {line.text}
              </div>
            )
          })}

          {/* Blinking cursor */}
          {started && !showLaunch && !launching && (
            <div style={{
              display: 'inline-block', width: '0.7rem', height: '1.1rem',
              background: '#e3000f', verticalAlign: 'middle', marginTop: '0.4rem',
              animation: 'rrr-cursor 0.9s step-end infinite',
              boxShadow: '0 0 8px rgba(227,0,15,0.8)',
            }} />
          )}

          {/* LAUNCH */}
          {showLaunch && (
            <div style={{ marginTop: '2rem', animation: 'rrr-launch-appear 0.4s ease both' }}>
              <div style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                color: '#cc0000',
                textShadow: '0 0 6px rgba(204,0,0,0.5)',
                letterSpacing: '0.06em',
                lineHeight: 2,
                marginBottom: '1rem',
              }}>
                &gt; AWAITING OPERATIVE AUTHORIZATION TO PROCEED...
              </div>

              <button
                onClick={handleLaunch}
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: 'clamp(0.65rem, 2vw, 1rem)',
                  letterSpacing: '0.2em',
                  color: '#e3000f',
                  background: 'transparent',
                  border: '2px solid #e3000f',
                  padding: 'clamp(0.75rem, 2vw, 1.1rem) clamp(2rem, 5vw, 3.5rem)',
                  cursor: 'pointer',
                  textShadow: '0 0 10px rgba(227,0,15,0.8)',
                  animation: 'rrr-launch-pulse 1.2s ease infinite',
                  transition: 'background 0.15s, color 0.15s',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = '#e3000f'
                  ;(e.currentTarget as HTMLElement).style.color = '#000'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#e3000f'
                }}
              >
                [ LAUNCH ]
              </button>

              <div style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(0.38rem, 1vw, 0.5rem)',
                color: '#3a0000',
                letterSpacing: '0.06em',
                marginTop: '1rem',
                lineHeight: 2,
              }}>
                PRESS LAUNCH TO ENTER THE REGIME MAINFRAME
              </div>
            </div>
          )}

          <div style={{ height: '2rem', flexShrink: 0 }} />
        </div>
      </div>
    </>
  )
}
