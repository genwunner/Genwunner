'use client'
import { useState, useEffect } from 'react'

export default function PackOpeningIntro() {
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'ripping' | 'done'>('idle')

  useEffect(() => {
    if (!sessionStorage.getItem('genwunner-pack-opened')) {
      setShow(true)
    }
  }, [])

  const rip = () => {
    if (phase !== 'idle') return
    setPhase('ripping')
    setTimeout(() => {
      sessionStorage.setItem('genwunner-pack-opened', '1')
      setPhase('done')
    }, 750)
    setTimeout(() => setShow(false), 1400)
  }

  if (!show) return null

  return (
    <div
      onClick={rip}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-500 ${phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.12)_0%,_transparent_65%)]" />

      {/* Pack */}
      <div className="relative flex flex-col items-center" style={{ width: 220 }}>

        {/* ── TOP HALF (Pokéball red) ── */}
        <div
          className="w-full rounded-t-3xl overflow-hidden border-2 border-b-0 border-white/20 transition-transform duration-700 ease-in-out"
          style={{
            height: 228,
            background: 'linear-gradient(145deg, #dc2626 0%, #ef4444 45%, #b91c1c 100%)',
            transform: phase === 'ripping' ? 'translateY(-130vh)' : 'translateY(0)',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-between py-6 px-5 relative">
            {/* Shine */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl" />
            {/* Label */}
            <p className="text-white/70 text-[9px] font-black uppercase tracking-[0.5em] z-10">PokéRage Series — Vol. I</p>
            {/* Main name */}
            <div className="text-center z-10">
              <p className="text-white font-black leading-none tracking-tighter drop-shadow-lg" style={{ fontSize: 64 }}>GEN</p>
              <p className="text-white font-black leading-none tracking-tighter drop-shadow-lg" style={{ fontSize: 64 }}>WUN</p>
            </div>
            {/* Stars */}
            <p className="text-white/50 text-xs tracking-widest z-10">— ★ ★ ★ —</p>
          </div>
        </div>

        {/* ── PERFORATED TEAR LINE ── */}
        <div className="relative w-full flex items-center z-20" style={{ height: 18 }}>
          {/* Left hole */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-white/30" />
          {/* Dashes */}
          <div className="w-full flex gap-[3px] px-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-1 h-[2px] bg-white/40" />
            ))}
          </div>
          {/* Right hole */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-white/30" />
        </div>

        {/* ── BOTTOM HALF (Pokéball black) ── */}
        <div
          className="w-full rounded-b-3xl overflow-hidden border-2 border-t-0 border-white/20 transition-transform duration-700 ease-in-out"
          style={{
            height: 228,
            background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 60%, #000000 100%)',
            transform: phase === 'ripping' ? 'translateY(130vh)' : 'translateY(0)',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-between py-6 px-5 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 z-10 text-center">
              {[
                { label: 'HP', value: '543K' },
                { label: 'RAGE', value: '∞' },
                { label: 'STREAMS', value: '6M+' },
                { label: 'UGC', value: '1B+' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-red-500 text-[9px] uppercase tracking-widest font-black">{label}</p>
                  <p className="text-white font-black text-sm">{value}</p>
                </div>
              ))}
            </div>
            {/* Name bottom */}
            <div className="text-center z-10">
              <p className="text-white font-black leading-none tracking-tighter drop-shadow-lg" style={{ fontSize: 64 }}>NER</p>
              <p className="text-red-500/70 text-[10px] uppercase tracking-[0.5em] font-bold mt-1">★ RARE HOLO ★</p>
            </div>
            {/* Bottom label */}
            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-bold z-10">Los Angeles · Big Man Blastoise</p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <p
        className={`mt-10 text-red-500 text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-300 ${phase === 'ripping' ? 'opacity-0 translate-y-2' : 'animate-pulse'}`}
      >
        Rip It Open →
      </p>
      <p className={`mt-2 text-white/20 text-[9px] uppercase tracking-widest transition-opacity duration-300 ${phase === 'ripping' ? 'opacity-0' : ''}`}>
        Click or tap anywhere
      </p>
    </div>
  )
}
