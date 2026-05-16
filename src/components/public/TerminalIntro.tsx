'use client'

// src/components/public/TerminalIntro.tsx
// Rocket Recruitment Regime — Fallout-style terminal login sequence

import { useEffect, useState, useRef } from 'react'

const BOOT_LINES = [
  { text: 'ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL',   delay: 0,    dim: true  },
  { text: 'ROCKET RECRUITMENT REGIME // KANTO DIV.',   delay: 120,  dim: false },
  { text: 'TERMINAL v3.3.1 — CLASSIFIED ACCESS ONLY',  delay: 240,  dim: true  },
  { text: '',                                           delay: 360,  dim: false },
  { text: 'INITIALIZING SECURE CONNECTION...',          delay: 480,  dim: true  },
  { text: 'ENCRYPTING CHANNEL........... [COMPLETE]',   delay: 700,  dim: true  },
  { text: 'ROUTING THROUGH KANTO MAINFRAME...',         delay: 920,  dim: true  },
  { text: '',                                           delay: 1050, dim: false },
]

const LOGO_LINES = [
  { text: ' ██████╗ ██████╗ ██████╗ ',  delay: 0   },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',  delay: 80  },
  { text: ' ██████╔╝██████╔╝██████╔╝',  delay: 160 },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',  delay: 240 },
  { text: ' ██║  ██║██║  ██║██║  ██║',  delay: 320 },
  { text: ' ╚═════╝ ╚═════╝ ╚═════╝ ',  delay: 400 },
]

const LOGO_FOOTER = [
  { text: '  ROCKET RECRUITMENT REGIME',  delay: 520  },
  { text: '  RIGHT HAND OF GIOVANNI',     delay: 640  },
  { text: '',                             delay: 760  },
]

const LOGIN_LINES = [
  { text: '> VERIFYING OPERATIVE CREDENTIALS...',           delay: 0    },
  { text: '> OPERATIVE ID ............. GENWUNNER',         delay: 300  },
  { text: '> ACCESS LEVEL ............. [CLASSIFIED]',      delay: 500  },
  { text: '> CLEARANCE ................ EXECUTIVE+',        delay: 700  },
  { text: '',                                               delay: 900  },
  { text: '> IDENTITY CONFIRMED.',                          delay: 1000, highlight: true },
  { text: '> WELCOME, OPERATIVE.',                          delay: 1200, highlight: true },
  { text: '> THE BOSS IS WATCHING.',                        delay: 1400, highlight: true },
  { text: '',                                               delay: 1600  },
  { text: '> LOADING REGIME MAINFRAME...',                  delay: 1700  },
  { text: '> [████████████████████] 100%',                  delay: 2100  },
  { text: '',                                               delay: 2300  },
  { text: '> INITIALIZING SITE. STAND BY.',                 delay: 2400, highlight: true },
]

export default function TerminalIntro() {
  const [visible, setVisible]       = useState(true)
  const [booting, setBooting]       = useState(false)
  const [bootLines, setBootLines]   = useState<number[]>([])
  const [logoLines, setLogoLines]   = useState<number[]>([])
  const [loginLines, setLoginLines] = useState<number[]>([])
  const [showLogo, setShowLogo]     = useState(false)
  const [showLogin, setShowLogin]   = useState(false)
  const [glitching, setGlitching]   = useState(false)
  const [fadeOut, setFadeOut]       = useState(false)
  const [flickered, setFlickered]   = useState(false)
  const skipRef = useRef(false)

  function skip() {
    skipRef.current = true
    setFadeOut(true)
    setTimeout(() => setVisible(false), 600)
    sessionStorage.setItem('rrr-intro-seen', '1')
  }

  useEffect(() => {
    if (sessionStorage.getItem('rrr-intro-seen')) {
      setVisible(false)
      return
    }
    const t = setTimeout(() => {
      setFlickered(true)
      setTimeout(() => setBooting(true), 300)
    }, 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!booting) return
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => { if (!skipRef.current) setBootLines(prev => [...prev, i]) }, line.delay)
    )
    const logoStart = BOOT_LINES[BOOT_LINES.length - 1].delay + 200
    const t = setTimeout(() => { if (!skipRef.current) setShowLogo(true) }, logoStart)
    return () => { timers.forEach(clearTimeout); clearTimeout(t) }
  }, [booting])

  useEffect(() => {
    if (!showLogo) return
    const allLogoLines = [...LOGO_LINES, ...LOGO_FOOTER]
    const timers = allLogoLines.map((line, i) =>
      setTimeout(() => { if (!skipRef.current) setLogoLines(prev => [...prev, i]) }, line.delay)
    )
    const loginStart = LOGO_FOOTER[LOGO_FOOTER.length - 1].delay + 300
    const t = setTimeout(() => { if (!skipRef.current) setShowLogin(true) }, loginStart)
    return () => { timers.forEach(clearTimeout); clearTimeout(t) }
  }, [showLogo])

  useEffect(() => {
    if (!showLogin) return
    const timers = LOGIN_LINES.map((line, i) =>
      setTimeout(() => { if (!skipRef.current) setLoginLines(prev => [...prev, i]) }, line.delay)
    )
    const glitchAt = LOGIN_LINES[LOGIN_LINES.length - 1].delay + 600
    const t1 = setTimeout(() => {
      if (!skipRef.current) setGlitching(true)
      setTimeout(() => setGlitching(false), 400)
    }, glitchAt)
    const t2 = setTimeout(() => {
      if (!skipRef.current) setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('rrr-intro-seen', '1')
      }, 800)
    }, glitchAt + 600)
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2) }
  }, [showLogin])

  if (!visible) return null

  const allLogoLines = [...LOGO_LINES, ...LOGO_FOOTER]

  return (
    <>
      <style>{`
        @keyframes rrr-flicker {
          0%   { opacity:0; }
          10%  { opacity:0.8; }
          12%  { opacity:0.2; }
          14%  { opacity:0.9; }
          16%  { opacity:0.1; }
          18%  { opacity:1; }
          100% { opacity:1; }
        }
        @keyframes rrr-scanline {
          from { transform:translateY(-100%); }
          to   { transform:translateY(100vh); }
        }
        @keyframes rrr-cursor {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes rrr-glitch-h {
          0%   { clip-path:inset(40% 0 60% 0); transform:translate(-4px,0); }
          20%  { clip-path:inset(10% 0 85% 0); transform:translate(4px,0); }
          40%  { clip-path:inset(70% 0 20% 0); transform:translate(-2px,0); }
          60%  { clip-path:inset(30% 0 55% 0); transform:translate(2px,0); }
          80%  { clip-path:inset(80% 0 5%  0); transform:translate(-3px,0); }
          100% { clip-path:inset(50% 0 30% 0); transform:translate(0,0); }
        }
        @keyframes rrr-text-in {
          from { opacity:0; transform:translateX(-4px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .rrr-terminal-text {
          font-family: var(--font-pixel);
          letter-spacing: 0.05em;
          line-height: 1.9;
          animation: rrr-text-in 0.1s ease both;
        }
        .rrr-cursor {
          display:inline-block;
          width:0.6em;
          height:1em;
          background:#e3000f;
          vertical-align:middle;
          margin-left:2px;
          animation:rrr-cursor 0.8s ease infinite;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        opacity: fadeOut ? 0 : flickered ? 1 : 0,
        animation: flickered && !fadeOut ? 'rrr-flicker 0.5s ease forwards' : 'none',
        transition: fadeOut ? 'opacity 0.8s ease' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* CRT scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
          pointerEvents: 'none', zIndex: 20,
        }} />

        {/* Scanline sweep */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 8,
          background: 'linear-gradient(to bottom, transparent, rgba(227,0,15,0.03), transparent)',
          animation: 'rrr-scanline 4s linear infinite',
          pointerEvents: 'none', zIndex: 21,
        }} />

        {/* CRT vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none', zIndex: 19,
        }} />

        {/* Phosphor glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(227,0,15,0.04) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 18,
        }} />

        {/* Glitch layers */}
        {glitching && (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(227,0,15,0.06)',
              animation: 'rrr-glitch-h 0.2s steps(1) infinite',
              zIndex: 22, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,80,0.08)',
              animation: 'rrr-glitch-h 0.15s steps(1) 0.05s infinite',
              zIndex: 22, pointerEvents: 'none',
            }} />
          </>
        )}

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 200,
            fontFamily: 'var(--font-pixel)', fontSize: '0.38rem',
            color: 'rgba(227,0,15,0.35)', background: 'none',
            border: '1px solid rgba(227,0,15,0.15)',
            padding: '0.35rem 0.75rem', cursor: 'pointer', letterSpacing: '0.1em',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(227,0,15,0.8)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.5)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(227,0,15,0.35)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.15)'
          }}
        >
          [ SKIP ]
        </button>

        {/* Terminal content */}
        <div style={{
          width: '100%', maxWidth: 720,
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          position: 'relative', zIndex: 10,
          maxHeight: '100vh', overflowY: 'auto', scrollbarWidth: 'none',
        }}>

          {bootLines.map(i => (
            <TermLine key={`boot-${i}`} text={BOOT_LINES[i].text} dim={BOOT_LINES[i].dim} size="sm" />
          ))}

          {showLogo && logoLines.map(i => {
            const line = allLogoLines[i]
            const isLogoBlock = i < LOGO_LINES.length
            return (
              <TermLine
                key={`logo-${i}`}
                text={line.text}
                logo={isLogoBlock}
                size={isLogoBlock ? 'logo' : 'sm'}
              />
            )
          })}

          {showLogin && loginLines.map(i => (
            <TermLine
              key={`login-${i}`}
              text={LOGIN_LINES[i].text}
              highlight={LOGIN_LINES[i].highlight}
              size="sm"
            />
          ))}

          {booting && !fadeOut && (
            <div style={{ marginTop: 4 }}>
              <span className="rrr-cursor" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function TermLine({
  text,
  dim,
  highlight,
  logo,
  size,
}: {
  text: string
  dim?: boolean
  highlight?: boolean
  logo?: boolean
  size: 'sm' | 'logo'
}) {
  if (text === '') return <div style={{ height: '1rem' }} />

  const color = highlight ? '#ff4444' : logo ? '#e3000f' : dim ? '#660000' : '#cc0000'
  const glow  = logo
    ? '0 0 12px rgba(227,0,15,0.8), 0 0 30px rgba(227,0,15,0.3)'
    : highlight
    ? '0 0 8px rgba(255,68,68,0.6)'
    : dim
    ? 'none'
    : '0 0 5px rgba(204,0,0,0.4)'

  return (
    <div
      className="rrr-terminal-text"
      style={{
        fontSize: size === 'logo' ? 'clamp(0.32rem, 1.2vw, 0.55rem)' : '0.38rem',
        color,
        textShadow: glow,
        whiteSpace: 'pre',
        fontFamily: size === 'logo' ? 'monospace' : 'var(--font-pixel)',
        letterSpacing: size === 'logo' ? '0.05em' : '0.06em',
        lineHeight: size === 'logo' ? 1.3 : 1.9,
        animation: 'rrr-text-in 0.08s ease both',
      }}
    >
      {text}
    </div>
  )
}
