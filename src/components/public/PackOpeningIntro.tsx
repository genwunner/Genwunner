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
  const HALF = SIZE / 2
  const BAND = Math.round(SIZE * 0.092)
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
            filter: progress > 0.85 ? `drop-shadow(0 0 ${Math.round(12 * progress)}px rgba(220,38,38,0.6))` : undefined,
          }}
        >
          <PokeballSVG size={SIZE} />
        </div>

        {/* ── SPLIT BALL — shown during open phase ── */}
        {isOpen && (
          <div style={{ position: 'relative', width: SIZE, height: SIZE }}>

            {/* Top dome — flies upward */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: HALF, overflow: 'hidden',
              transform: 'translateY(-210px)',
              transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
            }}>
              <svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
                <defs>
                  <clipPath id="top-clip"><rect x="0" y="0" width="100" height="50" /></clipPath>
                  <radialGradient id="split-top-grad" cx="35%" cy="28%" r="70%">
                    <stop offset="0%" stopColor="#3a3a3a" />
                    <stop offset="40%" stopColor="#141414" />
                    <stop offset="100%" stopColor="#050505" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#split-top-grad)" clipPath="url(#top-clip)" />
                <ellipse cx="34" cy="26" rx="15" ry="8" fill="rgba(255,255,255,0.08)" clipPath="url(#top-clip)" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#444" strokeWidth="8" clipPath="url(#top-clip)" />
              </svg>
            </div>

            {/* Bottom dome — flies downward */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: HALF, overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
              transform: 'translateY(210px)',
              transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
            }}>
              <svg width={SIZE} height={SIZE} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                <defs>
                  <clipPath id="bot-clip"><rect x="0" y="50" width="100" height="50" /></clipPath>
                  <radialGradient id="split-bot-grad" cx="65%" cy="72%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="55%" stopColor="#e0e0e0" />
                    <stop offset="100%" stopColor="#c0c0c0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#split-bot-grad)" clipPath="url(#bot-clip)" />
                <ellipse cx="67" cy="74" rx="13" ry="7" fill="rgba(255,255,255,0.22)" clipPath="url(#bot-clip)" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="8" clipPath="url(#bot-clip)" />
              </svg>
            </div>

            {/* Center band — stays, fades */}
            <div style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: 0, right: 0, height: BAND, background: '#000', zIndex: 5,
            }} />

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
    </div>
  )
}

function PokeballSVG({ size }: { size: number }) {
  const logoSize = Math.round(size * 0.52)
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'block' }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
        <defs>
          <clipPath id="pokeball-clip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
          <radialGradient id="pb-top" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="40%" stopColor="#141414" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <radialGradient id="pb-bot" cx="65%" cy="72%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </radialGradient>
        </defs>
        {/* Top half — dark 3D gradient */}
        <rect x="0" y="0" width="100" height="50" fill="url(#pb-top)" clipPath="url(#pokeball-clip)" />
        {/* Bottom half — white 3D gradient */}
        <rect x="0" y="50" width="100" height="50" fill="url(#pb-bot)" clipPath="url(#pokeball-clip)" />
        {/* Gloss highlights */}
        <ellipse cx="34" cy="26" rx="16" ry="9" fill="rgba(255,255,255,0.1)" clipPath="url(#pokeball-clip)" />
        <ellipse cx="67" cy="74" rx="13" ry="7" fill="rgba(255,255,255,0.22)" clipPath="url(#pokeball-clip)" />
        {/* Center band */}
        <rect x="0" y="45" width="100" height="10" fill="#111" clipPath="url(#pokeball-clip)" />
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#444" strokeWidth="8" />
        {/* Center button */}
        <circle cx="50" cy="50" r="13" fill="#1a1a1a" stroke="#444" strokeWidth="4" />
        <circle cx="50" cy="50" r="6" fill="#e3000f" />
        {/* Button specular */}
        <ellipse cx="47" cy="47" rx="3" ry="2" fill="rgba(255,255,255,0.25)" />
      </svg>
      {/* RRR logo — screen blend removes the black bg, only red Rs show */}
      <img
        src="/images/rrr-logo.jpg"
        alt="RRR"
        style={{
          position: 'absolute',
          top: '7%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: logoSize,
          height: logoSize,
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
