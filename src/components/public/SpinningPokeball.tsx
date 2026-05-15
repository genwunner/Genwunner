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
    // invert(1) turns white bg → black, hue-rotate(180deg) flips cyan Rs back to red
    <img
      src="/images/rrr-logo-2.jpg"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{
        animation: `spin ${speed} linear infinite`,
        flexShrink: 0,
        borderRadius: '50%',
        display: 'block',
        filter: 'invert(1) hue-rotate(180deg)',
        ...style,
      }}
    />
  )
}
