// src/components/public/SpinningPokeball.tsx
interface Props {
  size?: number
  className?: string
  style?: React.CSSProperties
  speed?: string
}

export default function SpinningPokeball({
  size = 28,
  className = '',
  style = {},
  speed = '6s',
}: Props) {
  return (
    <img
      src="/images/true-rrr.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{
        animation: `spin ${speed} linear infinite`,
        flexShrink: 0,
        ...style,
      }}
    />
  )
}
