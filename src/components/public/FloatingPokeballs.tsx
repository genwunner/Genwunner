// src/components/public/FloatingPokeballs.tsx
// Decorative drifting Pokéballs — pure texture, no interaction

'use client'

const balls = [
  { size: 22, top: '12%',  left: '7%',   opacity: 0.07, duration: '9s',  delay: '0s',   spinSpeed: '12s' },
  { size: 16, top: '30%',  left: '88%',  opacity: 0.06, duration: '12s', delay: '1.5s', spinSpeed: '8s'  },
  { size: 28, top: '55%',  left: '4%',   opacity: 0.05, duration: '10s', delay: '3s',   spinSpeed: '15s' },
  { size: 14, top: '70%',  left: '78%',  opacity: 0.08, duration: '8s',  delay: '0.5s', spinSpeed: '7s'  },
  { size: 20, top: '85%',  left: '22%',  opacity: 0.06, duration: '11s', delay: '2s',   spinSpeed: '10s' },
  { size: 12, top: '20%',  left: '55%',  opacity: 0.05, duration: '14s', delay: '4s',   spinSpeed: '9s'  },
]

export default function FloatingPokeballs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}
    >
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-18px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
      `}</style>

      {balls.map((b, i) => (
        <svg
          key={i}
          width={b.size}
          height={b.size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            animation: `floatUp ${b.duration} ${b.delay} ease-in-out infinite`,
          }}
        >
          <defs>
            <clipPath id={`fp-clip-${i}`}>
              <circle cx="50" cy="50" r="48" />
            </clipPath>
          </defs>
          <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="#e3000f" clipPath={`url(#fp-clip-${i})`} />
          <path d="M2 50 A48 48 0 0 0 98 50 Z" fill="#f0f0f0" clipPath={`url(#fp-clip-${i})`} />
          <circle cx="50" cy="50" r="48" fill="none" stroke="#0a0a0a" strokeWidth="5" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="#0a0a0a" strokeWidth="5" />
          <circle cx="50" cy="50" r="14" fill="#0a0a0a" />
          <circle cx="50" cy="50" r="9" fill="#f0f0f0" />
        </svg>
      ))}
    </div>
  )
}
