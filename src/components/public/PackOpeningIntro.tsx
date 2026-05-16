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
  const HALF  = SIZE / 2
  const BAND  = Math.round(SIZE * 0.092)
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
          <PokeballSVG size={SIZE} />
        </div>

        {/* ── SPLIT BALL — shown during open phase ── */}
        {isOpen && (
          <div style={{ position: 'relative', width: SIZE, height: SIZE }}>

            {/* Top dome — flies upward */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: HALF, overflow: 'hidden',
              transform: 'translateY(-220px)',
              transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
            }}>
              <svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
                <defs>
                  <clipPath id="sp-top-clip"><rect x="0" y="0" width="100" height="50" /></clipPath>
                  <radialGradient id="sp-top-grad" cx="68%" cy="26%" r="75%">
                    <stop offset="0%"   stopColor="#6a6a6a" />
                    <stop offset="20%"  stopColor="#262626" />
                    <stop offset="55%"  stopColor="#0c0c0c" />
                    <stop offset="100%" stopColor="#020202" />
                  </radialGradient>
                  <linearGradient id="sp-top-ring" x1="96" y1="4" x2="4" y2="96" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#707070" />
                    <stop offset="40%"  stopColor="#2a2a2a" />
                    <stop offset="100%" stopColor="#101010" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#sp-top-grad)" clipPath="url(#sp-top-clip)" />
                <ellipse cx="66" cy="22" rx="18" ry="11" fill="rgba(255,255,255,0.13)" clipPath="url(#sp-top-clip)" />
                <ellipse cx="70" cy="15" rx="6"  ry="3"  fill="rgba(255,255,255,0.32)" clipPath="url(#sp-top-clip)" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#sp-top-ring)" strokeWidth="8" clipPath="url(#sp-top-clip)" />
              </svg>
            </div>

            {/* Bottom dome — flies downward */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: HALF, overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
              transform: 'translateY(220px)',
              transition: 'transform 0.52s cubic-bezier(0.55,0,1,0.45)',
            }}>
              <svg width={SIZE} height={SIZE} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                <defs>
                  <clipPath id="sp-bot-clip"><rect x="0" y="50" width="100" height="50" /></clipPath>
                  <radialGradient id="sp-bot-grad" cx="50%" cy="74%" r="70%">
                    <stop offset="0%"   stopColor="#f6f6f6" />
                    <stop offset="35%"  stopColor="#e4e4e4" />
                    <stop offset="70%"  stopColor="#c6c6c6" />
                    <stop offset="100%" stopColor="#aaaaaa" />
                  </radialGradient>
                  <linearGradient id="sp-bot-ao" x1="0" y1="50" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="rgba(0,0,0,0.45)" />
                    <stop offset="28%"  stopColor="rgba(0,0,0,0.1)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                  <linearGradient id="sp-bot-ring" x1="96" y1="4" x2="4" y2="96" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#707070" />
                    <stop offset="40%"  stopColor="#2a2a2a" />
                    <stop offset="100%" stopColor="#101010" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#sp-bot-grad)" clipPath="url(#sp-bot-clip)" />
                <circle cx="50" cy="50" r="46" fill="url(#sp-bot-ao)"   clipPath="url(#sp-bot-clip)" />
                <ellipse cx="50" cy="79" rx="18" ry="8" fill="rgba(255,255,255,0.16)" clipPath="url(#sp-bot-clip)" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#sp-bot-ring)" strokeWidth="8" clipPath="url(#sp-bot-clip)" />
              </svg>
            </div>

            {/* Center band */}
            <div style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: 0, right: 0, height: BAND, background: '#080808', zIndex: 5,
            }} />

            {/* Center button — glows red on open */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: BTN_OUTER, height: BTN_OUTER, borderRadius: '50%',
              background: '#fff', border: `${BORDER}px solid #080808`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 0 28px 8px rgba(227,0,15,0.65)',
            }}>
              <div style={{ width: BTN_INNER, height: BTN_INNER, borderRadius: '50%', background: '#e3000f' }} />
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
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
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

function PokeballSVG({ size }: { size: number }) {
  const logoSize = Math.round(size * 0.46)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
        <defs>
          <clipPath id="pb-clip"><circle cx="50" cy="50" r="46" /></clipPath>

          {/* Top half: dark charcoal, light from upper-right */}
          <radialGradient id="pb-top" cx="68%" cy="26%" r="75%">
            <stop offset="0%"   stopColor="#6a6a6a" />
            <stop offset="20%"  stopColor="#262626" />
            <stop offset="55%"  stopColor="#0c0c0c" />
            <stop offset="100%" stopColor="#020202" />
          </radialGradient>

          {/* Bottom half: metallic silver */}
          <radialGradient id="pb-bot" cx="50%" cy="74%" r="70%">
            <stop offset="0%"   stopColor="#f6f6f6" />
            <stop offset="35%"  stopColor="#e4e4e4" />
            <stop offset="70%"  stopColor="#c6c6c6" />
            <stop offset="100%" stopColor="#aaaaaa" />
          </radialGradient>

          {/* AO: darkens the equator edge of the bottom half */}
          <linearGradient id="pb-ao" x1="0" y1="50" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.45)" />
            <stop offset="28%"  stopColor="rgba(0,0,0,0.10)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          {/* Outer ring */}
          <linearGradient id="pb-ring" x1="96" y1="4" x2="4" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#707070" />
            <stop offset="40%"  stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>

          {/* Button white disc — convex look */}
          <radialGradient id="pb-btn" cx="38%" cy="36%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="55%"  stopColor="#eaeaea" />
            <stop offset="100%" stopColor="#cccccc" />
          </radialGradient>
        </defs>

        {/* TOP DOME */}
        <rect x="0" y="0" width="100" height="50" fill="url(#pb-top)" clipPath="url(#pb-clip)" />
        {/* Specular bloom — upper right */}
        <ellipse cx="66" cy="22" rx="18" ry="11" fill="rgba(255,255,255,0.13)" clipPath="url(#pb-clip)" />
        {/* Tight glint */}
        <ellipse cx="70" cy="15" rx="6"  ry="3"  fill="rgba(255,255,255,0.32)" clipPath="url(#pb-clip)" />

        {/* BOTTOM DOME */}
        <rect x="0" y="50" width="100" height="50" fill="url(#pb-bot)" clipPath="url(#pb-clip)" />
        <rect x="0" y="50" width="100" height="50" fill="url(#pb-ao)"  clipPath="url(#pb-clip)" />
        {/* Bottom sheen */}
        <ellipse cx="50" cy="79" rx="18" ry="8" fill="rgba(255,255,255,0.16)" clipPath="url(#pb-clip)" />

        {/* CENTER BAND */}
        <rect x="0" y="43" width="100" height="14" fill="#080808" clipPath="url(#pb-clip)" />

        {/* OUTER RING */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#pb-ring)" strokeWidth="8" />

        {/* BUTTON */}
        <circle cx="50" cy="50" r="13"  fill="#0a0a0a" />
        <circle cx="50" cy="50" r="9.5" fill="url(#pb-btn)" />
        <circle cx="50" cy="50" r="4.2" fill="#e3000f" />
        <ellipse cx="48.5" cy="47.8" rx="2" ry="1.2" fill="rgba(255,255,255,0.65)" />
      </svg>

      {/* RRR logo — screen blend removes black bg, red Rs show through */}
      <img
        src="/images/rrr-logo.jpg"
        alt=""
        style={{
          position: 'absolute',
          top: '8%',
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

