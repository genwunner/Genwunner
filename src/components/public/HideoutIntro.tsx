'use client'

// src/components/public/HideoutIntro.tsx
// Team Rocket Hideout door intro — static shot, CMU wall, speakeasy window

import { useEffect, useState, useRef } from 'react'

type Phase =
  | 'logo'
  | 'door'       // static shot of door, knock prompt
  | 'knocked'    // speakeasy slides open, eyes appear
  | 'typing'     // password types itself
  | 'granted'    // ACCESS GRANTED
  | 'opening'    // door swings open, pans to black
  | 'done'

const PASSWORD = 'BIGMANBLASTOISE'
const CHAR_DELAY = 55

export default function HideoutIntro() {
  const [phase, setPhase]           = useState<Phase>('logo')
  const [visible, setVisible]       = useState(true)
  const [typed, setTyped]           = useState('')
  const [dialogueLine, setDialogueLine] = useState(0)
  const [eyeBlink, setEyeBlink]     = useState(false)
  const skipRef = useRef(false)

  function skip() {
    skipRef.current = true
    setPhase('done')
    setTimeout(() => setVisible(false), 500)
    sessionStorage.setItem('rrr-intro-seen', '1')
  }

  useEffect(() => {
    if (sessionStorage.getItem('rrr-intro-seen')) setVisible(false)
  }, [])

  // Logo → door
  useEffect(() => {
    if (phase !== 'logo' || !visible || skipRef.current) return
    const t = setTimeout(() => setPhase('door'), 2000)
    return () => clearTimeout(t)
  }, [phase, visible])

  function handleKnock() {
    if (phase !== 'door') return
    setPhase('knocked')
    setTimeout(() => { if (!skipRef.current) setDialogueLine(1) }, 900)
    setTimeout(() => { if (!skipRef.current) setEyeBlink(true)  }, 1400)
    setTimeout(() => { if (!skipRef.current) setEyeBlink(false) }, 1600)
    setTimeout(() => { if (!skipRef.current) setEyeBlink(true)  }, 1700)
    setTimeout(() => { if (!skipRef.current) setEyeBlink(false) }, 1850)
    setTimeout(() => { if (!skipRef.current) setDialogueLine(2) }, 2200)
    setTimeout(() => { if (!skipRef.current) setPhase('typing') }, 3200)
  }

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

  useEffect(() => {
    if (phase !== 'granted') return
    const t = setTimeout(() => { if (!skipRef.current) setPhase('opening') }, 1000)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'opening') return
    const t = setTimeout(() => {
      if (!skipRef.current) setPhase('done')
      setTimeout(() => setVisible(false), 700)
      sessionStorage.setItem('rrr-intro-seen', '1')
    }, 1400)
    return () => clearTimeout(t)
  }, [phase])

  if (!visible) return null

  const showDoor      = phase !== 'logo'
  const showKnock     = phase === 'door'
  const speakeasyOpen = ['knocked','typing','granted','opening'].includes(phase)
  const isGranted     = ['granted','opening','done'].includes(phase)
  const isOpening     = phase === 'opening'
  const isDone        = phase === 'done'
  const showDialogue  = ['knocked','typing','granted','opening'].includes(phase)

  return (
    <>
      <style>{`
        @keyframes rrr-fadein {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rrr-blink-cursor {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes rrr-pulse-red {
          0%,100% { opacity:0.8; box-shadow:0 0 6px 2px rgba(227,0,15,0.6); }
          50%      { opacity:1;   box-shadow:0 0 14px 4px rgba(227,0,15,1); }
        }
        @keyframes rrr-pulse-green {
          0%,100% { box-shadow:0 0 8px 2px rgba(74,222,128,0.5); }
          50%      { box-shadow:0 0 18px 5px rgba(74,222,128,0.9); }
        }
        @keyframes rrr-door-open {
          0%   { transform: perspective(800px) rotateY(0deg); }
          100% { transform: perspective(800px) rotateY(-85deg); }
        }
        @keyframes rrr-granted-flash {
          0%   { opacity:0; transform:scale(0.85); }
          25%  { opacity:1; transform:scale(1.06); }
          80%  { opacity:1; transform:scale(1); }
          100% { opacity:0; }
        }
        @keyframes rrr-pan-in {
          0%   { transform:scale(1);   opacity:1; }
          60%  { transform:scale(1.4); opacity:1; }
          100% { transform:scale(1.4); opacity:0; }
        }
        @keyframes rrr-shake {
          0%,100% { transform:translateX(0); }
          20%     { transform:translateX(-6px); }
          40%     { transform:translateX(6px); }
          60%     { transform:translateX(-4px); }
          80%     { transform:translateX(4px); }
        }
        @keyframes rrr-stripe {
          from { background-position:0 0; }
          to   { background-position:28px 0; }
        }
        @keyframes rrr-flicker {
          0%,90%,100%  { opacity:1; }
          92%           { opacity:0.5; }
          94%           { opacity:1; }
          96%           { opacity:0.3; }
          98%           { opacity:1; }
        }
        .rrr-door-shake { animation: rrr-shake 0.45s ease; }
      `}</style>

      {/* ── Master overlay ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        background: '#000',
        opacity: isDone ? 0 : 1,
        transition: isDone ? 'opacity 0.7s ease' : 'none',
      }}>

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            position: 'absolute',
            top: 20, right: 20,
            zIndex: 200,
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

        {/* ── LOGO PHASE ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showDoor ? 0 : 1,
          transition: 'opacity 0.7s ease',
          pointerEvents: showDoor ? 'none' : 'all',
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

        {/* ── DOOR SCENE ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: showDoor ? 1 : 0,
          transition: 'opacity 0.8s ease',
          animation: isOpening ? 'rrr-pan-in 1.4s ease forwards' : 'none',
        }}>

          <CMUWall />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,180,130,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <HideoutDoor
              phase={phase}
              onKnock={handleKnock}
              speakeasyOpen={speakeasyOpen}
              isGranted={isGranted}
              isOpening={isOpening}
              eyeBlink={eyeBlink}
              dialogueLine={dialogueLine}
            />
          </div>

          {isOpening && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              zIndex: 100,
              animation: 'rrr-fadein 1s 0.6s ease forwards',
              opacity: 0,
              pointerEvents: 'none',
            }} />
          )}

          {/* ── HUD ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(1.5rem, 5vh, 3.5rem)',
            zIndex: 50,
            pointerEvents: 'none',
          }}>

            {showDialogue && dialogueLine > 0 && (
              <div style={{
                background: 'rgba(6,6,6,0.94)',
                border: '1px solid #222',
                borderLeft: '2px solid #e3000f',
                padding: '0.75rem 1.25rem',
                maxWidth: 360,
                width: '90%',
                animation: 'rrr-fadein 0.3s ease both',
                marginBottom: '0.75rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.36rem',
                  color: '#888',
                  letterSpacing: '0.06em',
                  lineHeight: 1.9,
                  marginBottom: dialogueLine >= 2 ? '0.35rem' : 0,
                }}>
                  <span style={{ color: '#e3000f' }}>GRUNT:</span>{' '}
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
                    marginBottom: (phase === 'typing' || isGranted) ? '0.35rem' : 0,
                  }}>
                    <span style={{ color: '#e3000f' }}>GRUNT:</span>{' '}
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
                      <span style={{ animation: 'rrr-blink-cursor 0.7s infinite' }}>_</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {phase === 'granted' && (
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.55rem',
                color: '#4ade80',
                letterSpacing: '0.2em',
                animation: 'rrr-granted-flash 0.9s ease forwards',
                textShadow: '0 0 20px rgba(74,222,128,0.9)',
                marginBottom: '0.75rem',
              }}>
                [ ACCESS GRANTED ]
              </p>
            )}

            {showKnock && (
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.42rem',
                color: 'rgba(240,240,240,0.5)',
                letterSpacing: '0.15em',
                animation: 'rrr-blink-cursor 1.3s ease infinite',
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

// ── CMU Wall ─────────────────────────────────────────────
function CMUWall() {
  const blockW = 120
  const blockH = 60
  const cols   = Math.ceil((typeof window !== 'undefined' ? window.innerWidth  : 1920) / blockW + 2)
  const rows   = Math.ceil((typeof window !== 'undefined' ? window.innerHeight : 1080) / blockH + 2)

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: '#b8b8b4',
    }}>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} style={{
          display: 'flex',
          height: blockH,
          marginLeft: row % 2 === 0 ? 0 : -blockW / 2,
        }}>
          {Array.from({ length: cols }).map((_, col) => (
            <div key={col} style={{
              flexShrink: 0,
              width: blockW,
              height: blockH,
              border: '2px solid #9a9a96',
              background: (row + col) % 3 === 0
                ? '#c0c0bc'
                : (row + col) % 3 === 1
                ? '#b4b4b0'
                : '#bcbcb8',
              boxSizing: 'border-box',
              position: 'relative',
              boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.15), inset -1px -1px 3px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                position: 'absolute',
                inset: 4,
                background: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.015) 18px, rgba(0,0,0,0.015) 19px)',
              }} />
              <div style={{
                position: 'absolute',
                left: '30%', right: '30%',
                top: 6, bottom: 6,
                borderLeft: '1px solid rgba(0,0,0,0.05)',
                borderRight: '1px solid rgba(0,0,0,0.05)',
              }} />
            </div>
          ))}
        </div>
      ))}

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.25) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ── Hideout Door ─────────────────────────────────────────
function HideoutDoor({
  phase,
  onKnock,
  speakeasyOpen,
  isGranted,
  isOpening,
  eyeBlink,
  dialogueLine,
}: {
  phase: Phase
  onKnock: () => void
  speakeasyOpen: boolean
  isGranted: boolean
  isOpening: boolean
  eyeBlink: boolean
  dialogueLine: number
}) {
  const [shaking, setShaking] = useState(false)

  function handleClick() {
    if (phase !== 'door') return
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
    onKnock()
  }

  const doorColor      = '#2a2c30'
  const doorHighlight  = '#363840'
  const doorShadow     = '#1e2024'
  const frameColor     = '#1a1c20'

  return (
    <div style={{ width: 'clamp(220px, 28vw, 340px)', position: 'relative' }}>

      {/* ── DOOR FRAME ── */}
      <div style={{
        background: frameColor,
        padding: '6px 6px 8px 6px',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.5)',
        position: 'relative',
      }}>

        {/* Warning light */}
        <div style={{
          position: 'absolute',
          top: -18, left: '50%',
          transform: 'translateX(-50%)',
          width: 14, height: 14,
          borderRadius: '50%',
          background: isGranted ? '#4ade80' : '#e3000f',
          animation: isGranted
            ? 'rrr-pulse-green 0.4s ease infinite'
            : 'rrr-pulse-red 1.6s ease infinite',
          border: '2px solid rgba(0,0,0,0.4)',
          transition: 'background 0.3s',
          zIndex: 10,
        }} />

        {/* ── THE DOOR ── */}
        <div
          className={shaking ? 'rrr-door-shake' : ''}
          onClick={handleClick}
          style={{
            background: `linear-gradient(170deg, ${doorHighlight} 0%, ${doorColor} 40%, ${doorShadow} 100%)`,
            cursor: phase === 'door' ? 'pointer' : 'default',
            position: 'relative',
            userSelect: 'none',
            transformOrigin: 'left center',
            animation: isOpening ? 'rrr-door-open 1.2s ease forwards' : 'none',
            boxShadow: 'inset 1px 0 4px rgba(255,255,255,0.04), inset -2px 0 8px rgba(0,0,0,0.4)',
          }}
        >
          {/* Top panel — RRR insignia + speakeasy */}
          <div style={{
            borderBottom: `3px solid ${frameColor}`,
            padding: '0.75rem',
            position: 'relative',
            minHeight: 90,
          }}>
            <div style={{
              position: 'absolute',
              inset: 8,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
              border: `1px solid ${doorShadow}`,
              background: `linear-gradient(160deg, ${doorShadow} 0%, ${doorColor} 100%)`,
            }} />

            <div style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 4,
            }}>
              <RRRInsignia size={48} />
            </div>

            {/* Speakeasy window */}
            <div style={{
              position: 'absolute',
              bottom: 10, left: '50%',
              transform: 'translateX(-50%)',
              width: 60, height: 22,
              zIndex: 5,
            }}>
              <div style={{
                width: '100%', height: '100%',
                background: '#111',
                border: `2px solid ${frameColor}`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Sliding panel */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: doorColor,
                  transform: speakeasyOpen ? 'translateY(-100%)' : 'translateY(0)',
                  transition: 'transform 0.4s ease',
                  zIndex: 3,
                }} />
                {/* Eyes */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: '#0a0505',
                  zIndex: 2,
                }}>
                  <Eye blink={eyeBlink} />
                  <Eye blink={eyeBlink} />
                </div>
              </div>
            </div>
          </div>

          <HorizontalBarStrip doorColor={doorColor} frameColor={frameColor} />

          {/* Middle panel — handle + keyhole */}
          <div style={{
            borderBottom: `3px solid ${frameColor}`,
            padding: '0.75rem',
            position: 'relative',
            minHeight: 80,
          }}>
            <div style={{
              position: 'absolute',
              inset: 8,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
              border: `1px solid ${doorShadow}`,
              background: `linear-gradient(160deg, ${doorShadow} 0%, ${doorColor} 100%)`,
            }} />
            <div style={{
              position: 'absolute',
              right: 14, top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
            }}>
              <div style={{
                width: 14, height: 36,
                background: 'linear-gradient(to bottom, #888, #666, #888)',
                border: '1px solid #444',
                borderRadius: 3,
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: 5, height: 7,
                  background: '#111',
                  borderRadius: '50% 50% 0 0',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: -3, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 3, height: 4,
                    background: '#111',
                  }} />
                </div>
              </div>
            </div>
          </div>

          <HorizontalBarStrip doorColor={doorColor} frameColor={frameColor} />

          {/* Bottom panel */}
          <div style={{
            padding: '0.75rem',
            position: 'relative',
            minHeight: 70,
          }}>
            <div style={{
              position: 'absolute',
              inset: 8,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
              border: `1px solid ${doorShadow}`,
              background: `linear-gradient(160deg, ${doorShadow} 0%, ${doorColor} 100%)`,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 14,
              background: 'repeating-linear-gradient(45deg, rgba(227,0,15,0.65) 0px, rgba(227,0,15,0.65) 5px, #111 5px, #111 10px)',
              animation: 'rrr-stripe 1s linear infinite',
              backgroundSize: '28px 28px',
            }} />
          </div>
        </div>
      </div>

      {/* Authorized plate */}
      <div style={{
        background: '#111',
        border: '1px solid #1e1e1e',
        padding: '0.25rem 0.5rem',
        marginTop: 4,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}>
        <p style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.3rem',
          color: '#e3000f',
          letterSpacing: '0.1em',
        }}>
          AUTHORIZED PERSONNEL ONLY · GRUNT CLEARANCE REQUIRED
        </p>
      </div>
    </div>
  )
}

// ── Horizontal bar strip ──────────────────────────────────
function HorizontalBarStrip({ doorColor: _dc, frameColor }: { doorColor: string; frameColor: string }) {
  return (
    <div style={{
      height: 18,
      background: frameColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderTop: '1px solid #111',
      borderBottom: '1px solid #111',
    }}>
      {[-35, 0, 35].map((offset, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `calc(50% + ${offset}px - 18px)`,
          width: 36, height: 8,
          background: 'linear-gradient(to bottom, #666, #888, #666)',
          border: '1px solid #444',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
        }} />
      ))}
    </div>
  )
}

// ── Eye ───────────────────────────────────────────────────
function Eye({ blink }: { blink: boolean }) {
  return (
    <div style={{
      width: 14,
      height: blink ? 2 : 8,
      background: blink ? '#333' : 'transparent',
      borderRadius: '50%',
      border: blink ? 'none' : '1.5px solid #c8a060',
      position: 'relative',
      transition: 'height 0.06s ease, background 0.06s ease',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {!blink && (
        <div style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#8b4513',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#111' }} />
        </div>
      )}
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
        style={{ filter: 'drop-shadow(0 0 4px rgba(227,0,15,0.5))' }}
      >R</text>
      <text
        x="25" y="80"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="40" fontWeight="900"
        fill="#e3000f" textAnchor="middle"
        transform="rotate(12, 25, 74)"
        style={{ filter: 'drop-shadow(0 0 4px rgba(227,0,15,0.5))' }}
      >R</text>
      <text
        x="75" y="80"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="40" fontWeight="900"
        fill="#e3000f" textAnchor="middle"
        transform="rotate(-8, 75, 74)"
        style={{ filter: 'drop-shadow(0 0 4px rgba(227,0,15,0.5))' }}
      >R</text>
    </svg>
  )
}
