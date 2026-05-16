'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const THRESHOLD = 600 // total scroll delta needed to open

export default function PackOpeningIntro() {
  const [show, setShow] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [phase, setPhase] = useState<'spinning' | 'settling' | 'opening' | 'done'>('spinning')
  const accumulated = useRef(0)
  const triggered = useRef(false)
  const prevTouchY = useRef(0)

  useEffect(() => {
    if (!sessionStorage.getItem('genwunner-pack-opened')) {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [])

  const openBall = useCallback(() => {
    if (triggered.current) return
    triggered.current = true
    // Snap rotation to nearest clean multiple of 360 so the ball is upright when it opens
    setRotation(r => Math.ceil(r / 360) * 360 || 360)
    setPhase('settling')
    setTimeout(() => setPhase('opening'), 480)
    setTimeout(() => {
      sessionStorage.setItem('genwunner-pack-opened', '1')
      setPhase('done')
      document.body.style.overflow = ''
    }, 1050)
    setTimeout(() => setShow(false), 1800)
  }, [])

  const addScroll = useCallback((delta: number) => {
    if (triggered.current) return
    accumulated.current += delta
    const r = Math.min((accumulated.current / THRESHOLD) * 720, 720)
    setRotation(r)
    if (accumulated.current >= THRESHOLD) openBall()
  }, [openBall])

  useEffect(() => {
    if (!show) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      addScroll(Math.abs(e.deltaY) * 1.1)
    }
    const onTouchStart = (e: TouchEvent) => {
      prevTouchY.current = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const dy = prevTouchY.current - e.touches[0].clientY
      prevTouchY.current = e.touches[0].clientY
      addScroll(Math.abs(dy) * 2.8)
    }
    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
    }
  }, [show, addScroll])

  if (!show) return null

  const progress = Math.min(accumulated.current / THRESHOLD, 1)
  const isOpen = phase === 'opening' || phase === 'done'
  const dispRotation = phase === 'settling' || isOpen
    ? (Math.ceil(rotation / 360) * 360 || 360)
    : rotation

  const SIZE = 264
  const BTN_OUTER = Math.round(SIZE * 0.21)
  const BTN_INNER = Math.round(SIZE * 0.09)
  const BORDER = Math.round(SIZE * 0.026)

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${phase === 'done' ? 'opacity-0 pointer-events-none' : ''}`}
    >
      {/* Background glow — intensifies as you spin */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.14) 0%, transparent 65%)',
          opacity: 0.4 + progress * 0.6,
          transition: 'opacity 0.1s',
        }}
      />

      {/* ── SPINNING POKÉBALL ── */}
      <button
        onClick={openBall}
        aria-label="Spin the Pokéball to enter"
        className="relative focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        {/* Rotating ball — hidden once open */}
        <div
          style={{
            display: isOpen ? 'none' : 'block',
            transform: `rotate(${dispRotation}deg)`,
            transition: phase === 'settling' ? 'transform 0.45s cubic-bezier(0.34,1.5,0.64,1)' : undefined,
            filter: progress > 0.85 ? `drop-shadow(0 0 ${Math.round(18 * progress)}px rgba(220,38,38,0.7))` : undefined,
          }}
        >
          <img
            src="/images/rrr-ball-3d.png"
            alt=""
            width={SIZE}
            height={SIZE}
            style={{ display: 'block', userSelect: 'none', pointerEvents: 'none' }}
          />
        </div>

        {/* ── SPLIT BALL — shown during open phase ── */}
        {isOpen && (
          <div style={{ position: 'relative', width: SIZE, height: SIZE }}>

            {/* Top half — clips to upper 50%, flies upward */}
            <img
              src="/images/rrr-ball-3d.png"
              alt=""
              width={SIZE}
              height={SIZE}
              style={{
                position: 'absolute', top: 0, left: 0,
                display: 'block',
                clipPath: 'inset(0 0 50% 0)',
                transform: 'translateY(-210px)',
                transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
                userSelect: 'none', pointerEvents: 'none',
              }}
            />

            {/* Bottom half — clips to lower 50%, flies downward */}
            <img
              src="/images/rrr-ball-3d.png"
              alt=""
              width={SIZE}
              height={SIZE}
              style={{
                position: 'absolute', top: 0, left: 0,
                display: 'block',
                clipPath: 'inset(50% 0 0 0)',
                transform: 'translateY(210px)',
                transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
                userSelect: 'none', pointerEvents: 'none',
              }}
            />

            {/* Center button — glows red on open */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: BTN_OUTER, height: BTN_OUTER, borderRadius: '50%',
              background: '#fff', border: `${BORDER}px solid #000`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 0 20px 6px rgba(220,38,38,0.5)',
            }}>
              <div style={{ width: BTN_INNER, height: BTN_INNER, borderRadius: '50%', background: '#DC2626' }} />
            </div>
          </div>
        )}
      </button>

      {/* ── LIGHT FLASH — triggered on open ── */}
      {isOpen && (
        <>
          {/* Full-screen white burst — classic Pokémon flash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'white', animation: 'pokeScreenFlash 0.5s ease-out forwards', zIndex: 60 }}
          />
          {/* Radial glow from ball center */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%', left: '50%',
              marginLeft: -(SIZE * 2.5),
              marginTop: -(SIZE * 2.5),
              width: SIZE * 5,
              height: SIZE * 5,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,220,1) 0%, rgba(255,220,100,0.85) 18%, rgba(255,160,40,0.55) 40%, transparent 70%)',
              animation: 'pokeRadialBurst 0.65s ease-out forwards',
              zIndex: 55,
            }}
          />
          {/* Light rays */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%', left: '50%',
              marginLeft: -(SIZE * 3),
              marginTop: -(SIZE * 3),
              width: SIZE * 6,
              height: SIZE * 6,
              background: `conic-gradient(
                rgba(255,255,200,0.55) 0deg 8deg,   transparent 8deg 38deg,
                rgba(255,255,200,0.45) 38deg 46deg,  transparent 46deg 83deg,
                rgba(255,255,200,0.55) 83deg 91deg,  transparent 91deg 128deg,
                rgba(255,255,200,0.45) 128deg 136deg, transparent 136deg 173deg,
                rgba(255,255,200,0.55) 173deg 181deg, transparent 181deg 218deg,
                rgba(255,255,200,0.45) 218deg 226deg, transparent 226deg 263deg,
                rgba(255,255,200,0.55) 263deg 271deg, transparent 271deg 308deg,
                rgba(255,255,200,0.45) 308deg 316deg, transparent 316deg 360deg
              )`,
              animation: 'pokeRaysBurst 0.6s ease-out forwards',
              zIndex: 54,
            }}
          />
        </>
      )}

      {/* ── PROGRESS + LABEL ── */}
      <div
        className="mt-12 flex flex-col items-center gap-3"
        style={{
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.3s',
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        {/* Progress track */}
        <div className="relative w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-red-600 rounded-full"
            style={{ width: `${progress * 100}%`, transition: 'width 0.06s linear' }}
          />
        </div>
        {/* Instruction text */}
        <p
          className="text-[11px] uppercase tracking-[0.55em] font-black"
          style={{
            color: progress > 0.9 ? '#DC2626' : 'rgba(255,255,255,0.4)',
            transition: 'color 0.2s',
            animation: progress < 0.05 ? 'pulse 2s infinite' : undefined,
          }}
        >
          {progress === 0
            ? 'Scroll to Spin'
            : progress < 0.4
            ? 'Keep Going...'
            : progress < 0.8
            ? 'Almost There...'
            : 'Let Go!'}
        </p>
        {/* Skip */}
        <button
          onClick={openBall}
          className="text-white/15 hover:text-white/35 text-[9px] uppercase tracking-widest font-bold mt-1 transition-colors"
        >
          Skip →
        </button>
      </div>
      <style>{`
        @keyframes pokeScreenFlash {
          0%   { opacity: 0.88; }
          20%  { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes pokeRadialBurst {
          0%   { opacity: 0; transform: scale(0.04); }
          12%  { opacity: 1; }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes pokeRaysBurst {
          0%   { opacity: 0; transform: scale(0.04) rotate(0deg); }
          18%  { opacity: 0.85; }
          100% { opacity: 0; transform: scale(1) rotate(12deg); }
        }
      `}</style>
    </div>
  )
}
