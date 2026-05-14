// src/components/public/SpinningPokeball.tsx
// Drop-in spinning Pokéball SVG — use anywhere

interface Props {
  size?: number
  className?: string
  style?: React.CSSProperties
  speed?: string // e.g. '4s', '8s'
}

export default function SpinningPokeball({
  size = 28,
  className = '',
  style = {},
  speed = '6s',
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        animation: `spin ${speed} linear infinite`,
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Clip to circle */}
      <defs>
        <clipPath id="pb-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Top half — red */}
      <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="#e3000f" clipPath="url(#pb-clip)" />

      {/* Bottom half — white */}
      <path d="M2 50 A48 48 0 0 0 98 50 Z" fill="#f0f0f0" clipPath="url(#pb-clip)" />

      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#0a0a0a" strokeWidth="4" />

      {/* Center dividing line */}
      <line x1="2" y1="50" x2="98" y2="50" stroke="#0a0a0a" strokeWidth="4" />

      {/* Center button ring */}
      <circle cx="50" cy="50" r="14" fill="#0a0a0a" />
      <circle cx="50" cy="50" r="9" fill="#f0f0f0" />
      <circle cx="50" cy="50" r="4" fill="#cccccc" />
    </svg>
  )
}
