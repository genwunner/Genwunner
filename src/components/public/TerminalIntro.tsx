'use client'

// src/components/public/TerminalIntro.tsx
// RRR Terminal — Fallout-style, fullscreen, LAUNCH + glitch blink-out exit

import { useEffect, useState, useRef } from 'react'

const SEQUENCE: {
  text: string
  delay: number
  dim?: boolean
  highlight?: boolean
  logo?: boolean
}[] = [
  { text: 'WUNNLIFE INDUSTRIES (TM) TERMLINK PROTOCOL',  delay: 80,   dim: true       },
  { text: 'ROCKET RECRUITMENT REGIME // KANTO DIVISION', delay: 180,  dim: false      },
  { text: 'TERMINAL v1.1.1 ——— CLASSIFIED ACCESS ONLY',  delay: 280,  dim: true       },
  { text: '',                                            delay: 380                    },
  { text: 'INITIALIZING SECURE CONNECTION...',           delay: 480,  dim: true       },
  { text: 'ENCRYPTING CHANNEL.............. [COMPLETE]', delay: 620,  dim: true       },
  { text: 'ROUTING THROUGH KANTO MAINFRAME...',          delay: 760,  dim: true       },
  { text: 'ESTABLISHING OPERATIVE UPLINK...',            delay: 900,  dim: true       },
  { text: '',                                            delay: 1000                   },
  { text: ' ██████╗ ██████╗ ██████╗',                   delay: 1100, logo: true      },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',                  delay: 1180, logo: true      },
  { text: ' ██████╔╝██████╔╝██████╔╝',                  delay: 1260, logo: true      },
  { text: ' ██╔══██╗██╔══██╗██╔══██╗',                  delay: 1340, logo: true      },
  { text: ' ██║  ██║██║  ██║██║  ██║',                  delay: 1420, logo: true      },
  { text: ' ╚═════╝ ╚═════╝ ╚═════╝',                   delay: 1500, logo: true      },
  { text: '',                                            delay: 1600                   },
  { text: '  ROCKET RECRUITMENT REGIME',                 delay: 1700                   },
  { text: '  RIGHT HAND OF GIOVANNI — EST. 1996',        delay: 1820, dim: true       },
  { text: '',                                            delay: 1940                   },
  { text: '> VERIFYING OPERATIVE CREDENTIALS...',        delay: 2060, dim: true       },
  { text: '> OPERATIVE ID ............. GENWUNNER',      delay: 2220                   },
  { text: '> ACCESS LEVEL ............. [CLASSIFIED]',   delay: 2380                   },
  { text: '> CLEARANCE ................ EXECUTIVE+',     delay: 2540                   },
  { text: '',                                            delay: 2660                   },
  { text: '> IDENTITY CONFIRMED.',                       delay: 2780, highlight: true  },
  { text: '> WELCOME, OPERATIVE.',                       delay: 2940, highlight: true  },
  { text: '> THE BOSS IS WATCHING.',                     delay: 3100, highlight: true  },
  { text: '',                                            delay: 3220                   },
  { text: '> KANTO MAINFRAME ACCESS GRANTED.',           delay: 3340                   },
  { text: '> REGIME SITE READY TO LOAD.',                delay: 3500                   },
  { text: '',                                            delay: 3620                   },
]

const LAUNCH_DELAY = 3900

export default function TerminalIntro() {
  const [mounted, setMounted]         = useState(false)
  const [visible, setVisible]         = useState(true)
  const [started, setStarted]         = useState(false)
  const [shownLines, setShownLines]   = useState<number[]>([])
  const [showLaunch, setShowLaunch]   = useState(false)
  const [launching, setLaunching]     = useState(false)
  const [goneLines, setGoneLines]     = useState<Set<number>>(new Set())
  const [glitchLines, setGlitchLines] = useState<Set<number>>(new Set())
  const [fadeOut, setFadeOut]         = useState(false)
  const [muted, setMuted]             = useState(false)
  const skipRef     = useRef(false)
  const mutedRef    = useRef(false)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  function toggleMute() {
    mutedRef.current = !mutedRef.current
    setMuted(mutedRef.current)
  }

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)() as AudioContext
      // Try to resume immediately — works if user navigated from another page
      ctx.resume().catch(() => {})
      audioCtxRef.current = ctx
    }
    return audioCtxRef.current!
  }

  // White noise burst through a bandpass filter — sounds like a mechanical keypress
  function makeClick(ctx: AudioContext, when: number, vol: number, freq: number, dur: number) {
    try {
      const len = Math.ceil(ctx.sampleRate * dur)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d   = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1

      const src = ctx.createBufferSource()
      src.buffer = buf

      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = freq
      bpf.Q.value = 3

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(vol, when)
      gain.gain.exponentialRampToValueAtTime(0.0001, when + dur)

      src.connect(bpf)
      bpf.connect(gain)
      gain.connect(ctx.destination)
      src.start(when)
      src.stop(when + dur + 0.01)
    } catch { /* ignore audio errors */ }
  }

  function playSound(kind: 'type' | 'logo' | 'highlight' | 'launch' | 'glitch') {
    if (mutedRef.current) return
    try {
      const ctx = getAudioCtx()
      const t   = ctx.currentTime
      if (kind === 'type') {
        // Subtle mechanical keypress — slight random pitch variation per keystroke
        makeClick(ctx, t, 0.18, 2800 + Math.random() * 800, 0.025)
      } else if (kind === 'logo') {
        // Slightly crisper click for the RRR logo lines
        makeClick(ctx, t, 0.22, 3500, 0.03)
      } else if (kind === 'highlight') {
        // Double-click, rising pitch — confirmation sound
        makeClick(ctx, t,        0.22, 4500, 0.03)
        makeClick(ctx, t + 0.04, 0.18, 5500, 0.025)
      } else if (kind === 'launch') {
        // Rapid keypress burst, accelerating like someone hammering Enter
        for (let i = 0; i < 7; i++) {
          makeClick(ctx, t + i * 0.055, 0.15 + i * 0.015, 3000 + i * 300, 0.025)
        }
      } else if (kind === 'glitch') {
        // Harsh snap at random frequency
        makeClick(ctx, t, 0.22, 1000 + Math.random() * 6000, 0.018)
      }
    } catch { /* ignore audio errors */ }
  }

  useEffect(() => { setMounted(true) }, [])

  // Resume AudioContext on first user interaction (browser autoplay policy)
  useEffect(() => {
    if (!mounted) return
    function unlock() {
      try {
        const ctx = getAudioCtx()
        if (ctx.state === 'suspended') ctx.resume().catch(() => {})
      } catch {}
    }
    document.addEventListener('click',      unlock, { once: true })
    document.addEventListener('keydown',    unlock, { once: true })
    document.addEventListener('touchstart', unlock, { once: true, passive: true })
    return () => {
      document.removeEventListener('click',      unlock)
      document.removeEventListener('keydown',    unlock)
      document.removeEventListener('touchstart', unlock)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    if (sessionStorage.getItem('rrr-intro-seen')) {
      setVisible(false)
      document.body.setAttribute('data-intro-done', '1')
      return
    }
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [mounted])

  // Stream lines in
  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []

    SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        if (skipRef.current) return
        setShownLines(prev => [...prev, i])
        scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })
        if (line.text !== '') {
          if (line.logo) playSound('logo')
          else if (line.highlight) playSound('highlight')
          else playSound('type')
        }
      }, line.delay)
      timers.push(t)
    })

    const lt = setTimeout(() => {
      if (!skipRef.current) setShowLaunch(true)
    }, LAUNCH_DELAY)
    timers.push(lt)

    return () => timers.forEach(clearTimeout)
  }, [started])

  function handleLaunch() {
    if (launching) return
    setLaunching(true)
    setShowLaunch(false)
    playSound('launch')

    // Each visible line gets a random glitch delay then blinks out
    // Spread over ~800ms so they disappear haphazardly, not all at once
    const lineIndices = shownLines.filter(i => SEQUENCE[i].text !== '')
    const timers: ReturnType<typeof setTimeout>[] = []

    lineIndices.forEach(i => {
      const glitchAt = Math.random() * 600
      const goneAt   = glitchAt + 80 + Math.random() * 120

      // First: glitch flash (line flickers)
      const t1 = setTimeout(() => {
        setGlitchLines(prev => new Set(prev).add(i))
        playSound('glitch')
      }, glitchAt)

      // Then: disappear from position
      const t2 = setTimeout(() => {
        setGlitchLines(prev => { const s = new Set(prev); s.delete(i); return s })
        setGoneLines(prev => new Set(prev).add(i))
      }, goneAt)

      timers.push(t1, t2)
    })

    // After all lines gone, fade to black
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('rrr-intro-seen', '1')
        document.body.setAttribute('data-intro-done', '1')
      }, 700)
    }, 1000)

    return () => timers.forEach(clearTimeout)
  }

  function skip() {
    skipRef.current = true
    setFadeOut(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('rrr-intro-seen', '1')
      document.body.setAttribute('data-intro-done', '1')
    }, 500)
  }

  if (!mounted) return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999 }} />
  )

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
          from { top:-6px; }
          to   { top:100%; }
        }
        @keyframes rrr-cursor {
          0%,49%   { opacity:1; }
          50%,100% { opacity:0; }
        }
        @keyframes rrr-logo-pulse {
          0%,100% { text-shadow:0 0 10px rgba(227,0,15,0.7),0 0 30px rgba(227,0,15,0.2); }
          50%     { text-shadow:0 0 22px rgba(227,0,15,1),0 0 60px rgba(227,0,15,0.5); }
        }
        @keyframes rrr-launch-pulse {
          0%,100% { box-shadow:0 0 10px rgba(227,0,15,0.5); border-color:#e3000f; }
          50%     { box-shadow:0 0 32px rgba(227,0,15,0.95),0 0 70px rgba(227,0,15,0.3); border-color:#ff4444; }
        }
        @keyframes rrr-launch-appear {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rrr-line-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes rrr-glitch-blink {
          0%   { opacity:1;   filter:brightness(1);    letter-spacing:0.06em; }
          20%  { opacity:0.2; filter:brightness(2);    letter-spacing:0.12em; color:#ff0000; }
          40%  { opacity:1;   filter:brightness(0.5);  letter-spacing:0.02em; }
          60%  { opacity:0.1; filter:brightness(3);    letter-spacing:0.1em;  color:#660000; }
          80%  { opacity:0.8; filter:brightness(1.5);  letter-spacing:0.08em; }
          100% { opacity:0;   filter:brightness(0); }
        }
        @keyframes rrr-glitch-flicker {
          0%,100% { opacity:1; }
          25%     { opacity:0.15; filter:brightness(2) hue-rotate(10deg); }
          50%     { opacity:0.8; }
          75%     { opacity:0.05; filter:brightness(3); }
        }
      `}</style>

      {/* ── Master overlay ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000',
          opacity: fadeOut ? 0 : 1,
          transition: fadeOut ? 'opacity 0.8s ease' : 'none',
          animation: started && !fadeOut ? 'rrr-flicker 0.55s ease forwards' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* CRT scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
          pointerEvents: 'none', zIndex: 30,
        }} />

        {/* Moving scanline sweep */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 6,
          background: 'linear-gradient(to bottom, transparent, rgba(227,0,15,0.045), transparent)',
          animation: 'rrr-scanmove 5s linear infinite',
          pointerEvents: 'none', zIndex: 31,
        }} />

        {/* CRT vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 38%, rgba(0,0,0,0.82) 100%)',
          pointerEvents: 'none', zIndex: 29,
        }} />

        {/* Red phosphor ambient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 55% 48% at 50% 50%, rgba(227,0,15,0.035) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 28,
        }} />

        {/* Mute + Skip */}
        <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={toggleMute}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 'clamp(0.4rem, 1.2vw, 0.55rem)',
              color: muted ? 'rgba(227,0,15,0.55)' : 'rgba(227,0,15,0.3)',
              background: 'none',
              border: '1px solid rgba(227,0,15,0.12)',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer', letterSpacing: '0.1em',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(227,0,15,0.75)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.4)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = muted ? 'rgba(227,0,15,0.55)' : 'rgba(227,0,15,0.3)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.12)'
            }}
          >
            {muted ? '[ UNMUTE ]' : '[ MUTE ]'}
          </button>
          <button
            onClick={skip}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 'clamp(0.4rem, 1.2vw, 0.55rem)',
              color: 'rgba(227,0,15,0.3)',
              background: 'none',
              border: '1px solid rgba(227,0,15,0.12)',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer', letterSpacing: '0.1em',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(227,0,15,0.75)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.4)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(227,0,15,0.3)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,0,15,0.12)'
            }}
          >
            [ SKIP ]
          </button>
        </div>

        {/* ── Terminal content ── */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto', overflowX: 'hidden',
            scrollbarWidth: 'none',
            padding: 'clamp(4rem, 7vw, 5rem) clamp(1.5rem, 6vw, 5rem) 2rem',
            display: 'flex', flexDirection: 'column',
            position: 'relative', zIndex: 10,
          }}
        >
          {shownLines.map(i => {
            const line = SEQUENCE[i]
            const isGone    = goneLines.has(i)
            const isGlitch  = glitchLines.has(i)

            if (isGone) return <div key={i} style={{ height: line.text === '' ? '0.75rem' : undefined, opacity: 0 }} />
            if (line.text === '') return <div key={i} style={{ height: '0.75rem' }} />

            const isLogo      = !!line.logo
            const isHighlight = !!line.highlight
            const isDim       = !!line.dim

            const color = isGlitch
              ? '#ff0000'
              : isLogo
              ? '#e3000f'
              : isHighlight
              ? '#ff5555'
              : isDim
              ? '#6b0000'
              : '#cc0000'

            const glow = isGlitch
              ? '0 0 20px rgba(255,0,0,1), 0 0 40px rgba(255,0,0,0.5)'
              : isLogo
              ? '0 0 14px rgba(227,0,15,0.9),0 0 40px rgba(227,0,15,0.3)'
              : isHighlight
              ? '0 0 10px rgba(255,85,85,0.7)'
              : isDim
              ? 'none'
              : '0 0 6px rgba(204,0,0,0.5)'

            return (
              <div
                key={i}
                style={{
                  fontFamily: isLogo ? '"Courier New", monospace' : 'var(--font-pixel)',
                  fontSize: isLogo
                    ? 'clamp(0.55rem, 2vw, 1rem)'
                    : 'clamp(0.5rem, 1.5vw, 0.72rem)',
                  color,
                  textShadow: glow,
                  whiteSpace: 'pre',
                  lineHeight: isLogo ? 1.25 : 2.1,
                  letterSpacing: isLogo ? '0.02em' : '0.06em',
                  transition: 'color 0.05s, text-shadow 0.05s',
                  animation: isGlitch
                    ? 'rrr-glitch-flicker 0.12s steps(1) infinite'
                    : isLogo
                    ? 'rrr-logo-pulse 2s ease infinite, rrr-line-in 0.07s ease both'
                    : 'rrr-line-in 0.07s ease both',
                }}
              >
                {line.text}
              </div>
            )
          })}

          {/* Blinking cursor */}
          {started && !showLaunch && !launching && (
            <div style={{
              display: 'inline-block',
              width: 'clamp(0.55rem, 1.5vw, 0.75rem)',
              height: 'clamp(0.9rem, 2vw, 1.15rem)',
              background: '#e3000f',
              marginTop: '0.3rem',
              animation: 'rrr-cursor 0.9s step-end infinite',
              boxShadow: '0 0 10px rgba(227,0,15,0.9)',
            }} />
          )}

          {/* LAUNCH */}
          {showLaunch && (
            <div style={{
              marginTop: '1.75rem',
              animation: 'rrr-launch-appear 0.4s ease both',
            }}>
              <div style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.72rem)',
                color: '#cc0000',
                textShadow: '0 0 8px rgba(227,0,15,0.7)',
                letterSpacing: '0.06em',
                lineHeight: 2.1,
                marginBottom: '1.25rem',
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
                  transition: 'background 0.12s, color 0.12s',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = '#e3000f'
                  ;(e.currentTarget as HTMLElement).style.color = '#000'
                  ;(e.currentTarget as HTMLElement).style.textShadow = 'none'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#e3000f'
                  ;(e.currentTarget as HTMLElement).style.textShadow = '0 0 10px rgba(227,0,15,0.8)'
                }}
              >
                [ LAUNCH ]
              </button>

              <div style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(0.36rem, 1vw, 0.48rem)',
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

