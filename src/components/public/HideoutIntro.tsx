'use client'

// src/components/public/HideoutIntro.tsx
// Team Rocket Hideout — alley approach + steel bunker door

import { useEffect, useState, useRef } from 'react'

type Phase =
  | 'logo'
  | 'approach'   // camera slowly zooms toward the door (CSS scale)
  | 'door'       // settled at door, knock prompt visible
  | 'knocked'    // shaking + intercom dialogue
  | 'typing'     // password types itself
  | 'granted'    // ACCESS GRANTED
  | 'opening'    // door splits open, screen goes dark
  | 'done'

const PASSWORD = 'BIGMANBLASTOISE'
const CHAR_DELAY = 55

export default function HideoutIntro() {
  const [phase, setPhase]               = useState<Phase>('logo')
  const [visible, setVisible]           = useState(true)
  const [typed, setTyped]               = useState('')
  const [dialogueLine, setDialogueLine] = useState(0)
  const skipRef = useRef(false)

  function skip() {
    skipRef.current = true
    setPhase('done')
    setTimeout(() => setVisible(false), 500)
    sessionStorage.setItem('rrr-intro-seen', '1')
  }

  useEffect(() => {
    if (sessionStorage.getItem('rrr-intro-seen')) {
      setVisible(false)
    }
  }, [])

  // Logo → approach
  useEffect(() => {
    if (phase !== 'logo' || !visible || skipRef.current) return
    const t = setTimeout(() => setPhase('approach'), 1800)
    return () => clearTimeout(t)
  }, [phase, visible])

  // Approach → door (zoom settles)
  useEffect(() => {
    if (phase !== 'approach' || skipRef.current) return
    const t = setTimeout(() => setPhase('door'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  function handleKnock() {
    if (phase !== 'door') return
    setPhase('knocked')
    setTimeout(() => { if (!skipRef.current) setDialogueLine(1) }, 700)
    setTimeout(() => { if (!skipRef.current) setDialogueLine(2) }, 1900)
    setTimeout(() => { if (!skipRef.current) setPhase('typing')  }, 2900)
  }

  // Typing
  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const interval = setInterval(() => {
      if (skipRef.current) { clearInterval(interval); return }
      i++
      setTyped(PASSWORD.slice(0, i))
      if (i >= PASSWORD.length) {
        clearInterval(interval)
        setTimeout(() => { if (!skipRef.current) setPhase('granted') }, 400)
      }
    }, CHAR_DELAY)
    return () => clearInterval(interval)
  }, [phase])

  // Granted → opening
  useEffect(() => {
    if (phase !== 'granted') return
    const t = setTimeout(() => { if (!skipRef.current) setPhase('opening') }, 900)
    return () => clearTimeout(t)
  }, [phase])

  // Opening → done
  useEffect(() => {
    if (phase !== 'opening') return
    const t = setTimeout(() => {
      if (!skipRef.current) setPhase('done')
      setTimeout(() => setVisible(false), 800)
      sessionStorage.setItem('rrr-intro-seen', '1')
    }, 1200)
    return () => clearTimeout(t)
  }, [phase])

  if (!visible) return null

  const showAlley    = phase !== 'logo'
  const isApproach   = phase === 'approach'
  const showKnock    = phase === 'door'
  const showDialogue = ['knocked', 'typing', 'granted', 'opening'].includes(phase)
  const isGranted    = ['granted', 'opening', 'done'].includes(phase)
  const isOpening    = phase === 'opening'
  const isDone       = phase === 'done'

  const sceneScale = isApproach ? 'scale(1.5)' : showAlley ? 'scale(2.2)' : 'scale(1)'

  return (
    <>
      <style>{`
        @keyframes rrr-fadein {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rrr-shake {
          0%,100% { transform:translateX(0) scale(2.2); }
          15%      { transform:translateX(-5px) scale(2.2); }
          30%      { transform:translateX(5px) scale(2.2); }
          45%      { transform:translateX(-5px) scale(2.2); }
          60%      { transform:translateX(5px) scale(2.2); }
          80%      { transform:translateX(-2px) scale(2.2); }
          90%      { transform:translateX(2px) scale(2.2); }
        }
        @keyframes rrr-blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes rrr-pulse-red {
          0%,100% { box-shadow:0 0 8px 2px rgba(227,0,15,0.7); }
          50%      { box-shadow:0 0 20px 6px rgba(227,0,15,1); }
        }
        @keyframes rrr-pulse-green {
          0%,100% { box-shadow:0 0 8px 2px rgba(74,222,128,0.6); }
          50%      { box-shadow:0 0 20px 6px rgba(74,222,128,1); }
        }
        @keyframes rrr-door-left {
          from { transform:translateX(0); }
          to   { transform:translateX(-110%); }
        }
        @keyframes rrr-door-right {
          from { transform:translateX(0); }
          to   { transform:translateX(110%); }
        }
        @keyframes rrr-granted-flash {
          0%   { opacity:0; transform:scale(0.85); }
          25%  { opacity:1; transform:scale(1.08); }
          80%  { opacity:1; transform:scale(1); }
          100% { opacity:0; }
        }
        @keyframes rrr-stripe {
          from { background-position:0 0; }
          to   { background-position:40px 0; }
        }
        @keyframes rrr-flicker {
          0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; }
          20%,22%,24%,55%                  { opacity:0.4; }
        }
        @keyframes rrr-darken {
          from { opacity:0; }
          to   { opacity:1; }
        }
        .rrr-shake-anim {
          animation: rrr-shake 0.55s ease !important;
        }
      `}</style>

      {/* Master overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        background: '#000',
        opacity: isDone ? 0 : 1,
        transition: isDone ? 'opacity 0.8s ease' : 'none',
      }}>

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            position: 'absolute',
            top: 20, right: 20,
            zIndex: 100,
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'rgba(240,240,240,0.3)',
            background: 'none',
            border: '1px solid rgba(240,240,240,0.12)',
            padding: '0.35rem 0.75rem',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          [ SKIP ]
        </button>

        {/* PHASE 1: LOGO */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showAlley ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: showAlley ? 'none' : 'all',
          background: '#000',
          zIndex: 10,
        }}>
          <div style={{ animation: 'rrr-fadein 0.8s ease both' }}>
            <RRRInsignia size={110} />
          </div>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginTop: '1.5rem',
            animation: 'rrr-fadein 0.8s 0.4s ease both',
            opacity: 0,
          }}>
            Rocket Recruitment Regime · Kanto Division
          </p>
        </div>

        {/* ALLEY SCENE (phases 2+) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: showAlley ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>

          <AlleyScene
            sceneScale={sceneScale}
            isApproach={isApproach}
            phase={phase}
            onKnock={handleKnock}
            isGranted={isGranted}
            isOpening={isOpening}
          />

          {/* Black flood when door opens */}
          {isOpening && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              zIndex: 50,
              animation: 'rrr-darken 1s 0.3s ease forwards',
              opacity: 0,
              pointerEvents: 'none',
            }} />
          )}

          {/* HUD overlay — dialogue + knock prompt */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(2rem, 6vh, 4rem)',
            zIndex: 40,
            pointerEvents: 'none',
          }}>

            {/* Dialogue box */}
            {showDialogue && dialogueLine > 0 && (
              <div style={{
                background: 'rgba(8,8,8,0.92)',
                border: '1px solid #2a2a2a',
                borderLeft: '2px solid #e3000f',
                padding: '0.75rem 1.25rem',
                maxWidth: 360,
                width: '90%',
                animation: 'rrr-fadein 0.3s ease both',
                marginBottom: '1rem',
                pointerEvents: 'all',
              }}>
                <p style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.36rem',
                  color: '#888',
                  letterSpacing: '0.06em',
                  lineHeight: 1.9,
                  marginBottom: dialogueLine >= 2 ? '0.4rem' : 0,
                }}>
                  <span style={{ color: '#e3000f' }}>INTERCOM:</span>{' '}
                  &ldquo;...who&apos;s there?&rdquo;
                </p>
                {dialogueLine >= 2 && (
                  <p style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.36rem',
                    color: '#888',
                    letterSpacing: '0.06em',
                    lineHeight: 1.9,
                    animation: 'rrr-fadein 0.3s ease both',
                    marginBottom: (phase === 'typing' || isGranted) ? '0.4rem' : 0,
                  }}>
                    <span style={{ color: '#e3000f' }}>INTERCOM:</span>{' '}
                    &ldquo;...password?&rdquo;
                  </p>
                )}
                {(phase === 'typing' || isGranted) && (
                  <p style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.36rem',
                    color: '#4ade80',
                    letterSpacing: '0.08em',
                  }}>
                    &gt; {typed}
                    {phase === 'typing' && (
                      <span style={{ animation: 'rrr-blink 0.7s infinite' }}>_</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* ACCESS GRANTED */}
            {phase === 'granted' && (
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.55rem',
                color: '#4ade80',
                letterSpacing: '0.2em',
                animation: 'rrr-granted-flash 0.9s ease forwards',
                textShadow: '0 0 20px rgba(74,222,128,0.9)',
                marginBottom: '1rem',
              }}>
                [ ACCESS GRANTED ]
              </p>
            )}

            {/* Knock prompt */}
            {showKnock && (
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.42rem',
                color: 'rgba(240,240,240,0.55)',
                letterSpacing: '0.15em',
                animation: 'rrr-blink 1.3s ease infinite',
                pointerEvents: 'none',
              }}>
                &gt; KNOCK TO ENTER_
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Alley Scene ─────────────────────────────────────────
function AlleyScene({
  sceneScale,
  isApproach,
  phase,
  onKnock,
  isGranted,
  isOpening,
}: {
  sceneScale: string
  isApproach: boolean
  phase: Phase
  onKnock: () => void
  isGranted: boolean
  isOpening: boolean
}) {
  const [shaking, setShaking] = useState(false)

  function handleClick() {
    if (phase !== 'door') return
    setShaking(true)
    setTimeout(() => setShaking(false), 700)
    onKnock()
  }

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Scene wrapper — this zooms */}
      <div
        className={shaking ? 'rrr-shake-anim' : ''}
        style={{
          transform: sceneScale,
          transformOrigin: 'center 55%',
          transition: isApproach
            ? 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)'
            : 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Sky / top */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #0d0d0f 0%, #111116 35%, #0a0a0c 60%, #080808 100%)',
        }} />

        {/* Distant fog/haze */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 40% at 50% 30%, rgba(30,20,20,0.6) 0%, transparent 70%)',
        }} />

        {/* Left alley wall */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '28%',
          background: 'linear-gradient(to right, #0a0a0a 0%, #141414 70%, #1a1a1a 100%)',
        }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${(i + 1) * 5.5}%`, height: 1,
              background: 'rgba(0,0,0,0.5)',
            }} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: i % 2 === 0 ? '33%' : '66%',
              top: `${i * 11}%`, width: 1, height: '5.5%',
              background: 'rgba(0,0,0,0.4)',
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '20%', right: 0, width: '60%', height: '30%',
            background: 'radial-gradient(ellipse at right, rgba(227,0,15,0.06) 0%, transparent 70%)',
          }} />
        </div>

        {/* Right alley wall */}
        <div style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '28%',
          background: 'linear-gradient(to left, #0a0a0a 0%, #141414 70%, #1a1a1a 100%)',
        }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${(i + 1) * 5.5}%`, height: 1,
              background: 'rgba(0,0,0,0.5)',
            }} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: i % 2 === 0 ? '33%' : '66%',
              top: `${i * 11 + 2}%`, width: 1, height: '5.5%',
              background: 'rgba(0,0,0,0.4)',
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)',
          }} />
          {/* Pipe */}
          <div style={{
            position: 'absolute',
            left: '18%', top: '10%', bottom: '20%',
            width: 8, background: '#1c1c1c', border: '1px solid #111',
          }} />
          <div style={{
            position: 'absolute',
            left: '18%', top: '38%',
            width: 16, height: 12,
            background: '#181818', border: '1px solid #111', borderRadius: 2,
          }} />
        </div>

        {/* Floor — wet concrete perspective */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: '20%', right: '20%', height: '35%',
          background: 'linear-gradient(to bottom, #111 0%, #0d0d0d 50%, #0a0a0a 100%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 110% 100%, -10% 100%)',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '15%', left: '25%', right: '25%', height: '18%',
            background: 'radial-gradient(ellipse, rgba(227,0,15,0.08) 0%, rgba(20,20,20,0.6) 60%, transparent 100%)',
            borderRadius: '50%',
          }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${20 + i * 15}%`, height: 1,
              background: 'rgba(0,0,0,0.4)',
            }} />
          ))}
        </div>

        {/* Overhead bulb */}
        <div style={{
          position: 'absolute', top: '8%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ width: 1, height: 30, background: '#2a2a2a' }} />
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: isGranted ? '#ffe8a0' : '#c8a060',
            boxShadow: isGranted
              ? '0 0 20px 8px rgba(255,220,120,0.25)'
              : '0 0 12px 4px rgba(180,130,60,0.2)',
            animation: 'rrr-flicker 6s ease infinite',
          }} />
        </div>

        {/* Light cone */}
        <div style={{
          position: 'absolute', top: '11%', left: '50%',
          transform: 'translateX(-50%)',
          width: '50%', height: '60%',
          background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(180,130,60,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Trash */}
        <div style={{
          position: 'absolute', bottom: '28%', left: '22%',
          width: 20, height: 28, background: '#111',
          border: '1px solid #1a1a1a', borderRadius: '0 0 2px 2px',
        }} />
        <div style={{
          position: 'absolute', bottom: '28%', left: '24%',
          width: 14, height: 22, background: '#0e0e0e',
          border: '1px solid #181818', borderRadius: '0 0 2px 2px',
        }} />

        {/* THE DOOR */}
        <div style={{
          position: 'absolute', left: '50%', top: '14%',
          transform: 'translateX(-50%)',
          width: '28%', minWidth: 160, maxWidth: 240, zIndex: 20,
        }}>
          <div style={{
            background: '#1a1a1c',
            border: '3px solid #111',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 0 1px #0a0a0a',
            padding: 4,
            position: 'relative',
          }}>
            {/* Warning light */}
            <div style={{
              position: 'absolute', top: -14, left: '50%',
              transform: 'translateX(-50%)',
              width: 12, height: 12, borderRadius: '50%',
              background: isGranted ? '#4ade80' : '#e3000f',
              animation: isGranted
                ? 'rrr-pulse-green 0.4s ease infinite'
                : 'rrr-pulse-red 1.5s ease infinite',
              border: '2px solid rgba(0,0,0,0.5)',
              transition: 'background 0.3s',
            }} />

            {/* Authorized plate */}
            <div style={{
              background: '#111', border: '1px solid #222',
              padding: '0.15rem 0.4rem', marginBottom: 4, textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-pixel)', fontSize: '0.28rem',
                color: '#e3000f', letterSpacing: '0.08em', lineHeight: 1.5,
              }}>
                AUTHORIZED ONLY
              </p>
            </div>

            {/* Door panels */}
            <div style={{ position: 'relative', overflow: isOpening ? 'hidden' : 'visible' }}>

              {/* Left panel */}
              <div style={{
                position: isOpening ? 'absolute' : 'relative',
                left: 0, top: 0,
                width: isOpening ? '50%' : '100%',
                height: isOpening ? '100%' : 'auto',
                animation: isOpening ? 'rrr-door-left 1s ease forwards' : 'none',
                zIndex: 2,
              }}>
                <SteelDoor
                  side="left"
                  isOpening={isOpening}
                  onClick={handleClick}
                  clickable={phase === 'door'}
                />
              </div>

              {/* Right panel (split on open) */}
              {isOpening && (
                <div style={{
                  position: 'absolute', right: 0, top: 0,
                  width: '50%', height: '100%', overflow: 'hidden',
                  animation: 'rrr-door-right 1s ease forwards',
                  zIndex: 2,
                }}>
                  <div style={{
                    position: 'absolute', right: 0, top: 0,
                    width: '200%', height: '100%',
                    transform: 'translateX(-50%)',
                  }}>
                    <SteelDoor
                      side="right"
                      isOpening={isOpening}
                      onClick={() => {}}
                      clickable={false}
                    />
                  </div>
                </div>
              )}

              {/* Dark interior */}
              {isOpening && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#000', zIndex: 1,
                }} />
              )}
            </div>

            {/* Clearance plate */}
            <div style={{
              background: '#0d0d0d', border: '1px solid #1a1a1a',
              padding: '0.12rem 0.4rem', marginTop: 4, textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-pixel)', fontSize: '0.24rem',
                color: '#333', letterSpacing: '0.06em',
              }}>
                GRUNT CLEARANCE REQUIRED
              </p>
            </div>
          </div>
        </div>

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom darkness */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%',
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

// ── Steel Door Panel ─────────────────────────────────────
function SteelDoor({
  side,
  isOpening,
  onClick,
  clickable,
}: {
  side: 'left' | 'right'
  isOpening: boolean
  onClick: () => void
  clickable: boolean
}) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        background: 'linear-gradient(160deg, #7a7a7e 0%, #5a5a5e 25%, #4a4a4e 50%, #525256 75%, #6a6a6e 100%)',
        border: '2px solid #3a3a3e',
        boxShadow: 'inset 2px 2px 8px rgba(255,255,255,0.06), inset -2px -2px 8px rgba(0,0,0,0.5)',
        cursor: clickable ? 'pointer' : 'default',
        position: 'relative',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0.75rem',
        gap: '0.75rem',
        userSelect: 'none',
      }}
    >
      {/* Panel seams */}
      <div style={{
        position: 'absolute', left: 8, right: 8, top: '33%', height: 2,
        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3), rgba(255,255,255,0.05), rgba(0,0,0,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute', left: 8, right: 8, top: '66%', height: 2,
        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3), rgba(255,255,255,0.05), rgba(0,0,0,0.3), transparent)',
      }} />

      {/* Scratch marks */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 30, height: 1,
        background: 'rgba(255,255,255,0.08)', transform: 'rotate(-15deg)',
      }} />
      <div style={{
        position: 'absolute', top: '22%', left: '28%',
        width: 20, height: 1,
        background: 'rgba(255,255,255,0.05)', transform: 'rotate(-12deg)',
      }} />

      {/* Corner bolts */}
      {[
        { top: 10, left: 10 },
        { top: 10, right: 10 },
        { bottom: 10, left: 10 },
        { bottom: 10, right: 10 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 8, height: 8, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #888, #3a3a3a)',
          border: '1px solid #2a2a2a',
          boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }} />
      ))}

      {/* RRR insignia — left panel only */}
      {side === 'left' && <RRRInsignia size={52} />}

      {/* Intercom grille */}
      <div style={{
        position: 'absolute', right: 10, top: '42%',
        transform: 'translateY(-50%)',
        width: 16, background: '#3a3a3e',
        border: '1px solid #2a2a2e',
        padding: '4px 3px',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ height: 1.5, background: '#222', borderRadius: 1 }} />
        ))}
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#e3000f', margin: '3px auto 0',
          boxShadow: '0 0 5px rgba(227,0,15,0.8)',
        }} />
      </div>

      {/* Warning stripes */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 16,
        background: 'repeating-linear-gradient(45deg, rgba(227,0,15,0.7) 0px, rgba(227,0,15,0.7) 6px, #1a1a1a 6px, #1a1a1a 12px)',
        animation: 'rrr-stripe 1.2s linear infinite',
        backgroundSize: '32px 32px',
        opacity: 0.9,
      }} />
    </div>
  )
}

// ── RRR Insignia ─────────────────────────────────────────
function RRRInsignia({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50" y="40"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="40" fontWeight="900"
        fill="#e3000f" textAnchor="middle"
        transform="rotate(-18, 50, 32)"
        style={{ filter: 'drop-shadow(0 0 5px rgba(227,0,15,0.5))' }}
      >R</text>
      <text
        x="25" y="80"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="40" fontWeight="900"
        fill="#e3000f" textAnchor="middle"
        transform="rotate(12, 25, 74)"
        style={{ filter: 'drop-shadow(0 0 5px rgba(227,0,15,0.5))' }}
      >R</text>
      <text
        x="75" y="80"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="40" fontWeight="900"
        fill="#e3000f" textAnchor="middle"
        transform="rotate(-8, 75, 74)"
        style={{ filter: 'drop-shadow(0 0 5px rgba(227,0,15,0.5))' }}
      >R</text>
    </svg>
  )
}
