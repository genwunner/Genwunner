// src/components/public/ArsenalCard.tsx
import { arsenalAscii } from '@/data/ascii'

interface Song {
  title: string
  tag: string
  lore: string
  spotify: string
  youtube: string
  apple?: string
  tiktok?: string
  isNewest?: boolean
}

export default function ArsenalCard({ song }: { song: Song }) {
  const ascii = arsenalAscii[song.title]

  return (
    <div
      className="brand-card"
      style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      {/* Type tag + newest badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.42rem',
          color: '#550000',
          letterSpacing: '0.06em',
          border: '1px solid #1a0000',
          padding: '0.14rem 0.35rem',
          display: 'inline-block',
        }}>
          {song.tag}
        </div>
        {song.isNewest && (
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.38rem',
            color: '#000',
            background: '#e3000f',
            padding: '0.14rem 0.4rem',
            letterSpacing: '0.08em',
            fontWeight: 700,
            animation: 'terminal-blink 1.2s step-end infinite',
            display: 'inline-block',
          }}>
            ⚡ NEWEST OPERATIVE
          </div>
        )}
      </div>

      {/* ASCII art */}
      {ascii && (
        <div style={{
          position: 'relative',
          padding: '0.5rem 0',
          borderTop: '1px solid #0d0000',
          borderBottom: '1px solid #0d0000',
          overflow: 'hidden',
        }}>
          <pre style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 'clamp(0.28rem, 0.55vw, 0.5rem)',
            lineHeight: 1.2,
            color: '#880000',
            margin: 0,
            whiteSpace: 'pre',
            textAlign: 'center',
            textShadow: '0 0 6px rgba(136,0,0,0.4)',
            transition: 'color 0.2s, text-shadow 0.2s',
            overflow: 'hidden',
          }}
          className="ascii-art"
          >
            {ascii}
          </pre>
          <style>{`
            .brand-card:hover .ascii-art {
              color: #e3000f;
              text-shadow: 0 0 8px rgba(227,0,15,0.5);
            }
          `}</style>
        </div>
      )}

      {/* Song title */}
      <div style={{
        fontFamily: '"Courier New", monospace',
        fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
        fontWeight: 700,
        color: '#cc0000',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {song.title}
      </div>

      {/* Lore */}
      <p style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '0.46rem',
        color: '#440000',
        lineHeight: 1.8,
        margin: 0,
        fontStyle: 'italic',
        letterSpacing: '0.03em',
        flex: 1,
      }}>
        {song.lore}
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
        <a
          href={song.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-sm"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          Spotify
        </a>
        <a
          href={song.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-sm"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          YouTube
        </a>
      </div>
    </div>
  )
}
