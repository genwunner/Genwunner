// src/app/(public)/music/page.tsx
import Image from 'next/image'
import { songs, socialLinks } from '@/data/content'

export const metadata = { title: 'Arsenal | Genwunner' }

const platforms = [
  { label: 'Spotify',     href: socialLinks.spotify },
  { label: 'Apple Music', href: socialLinks.apple   },
  { label: 'YouTube',     href: socialLinks.youtube  },
  { label: 'TikTok',      href: socialLinks.tiktok   },
]

export default function MusicPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-6xl mx-auto px-4 py-20">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // DEPLOYED OPERATIVES · KANTO CAMPAIGN
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            THE ARSENAL
          </h1>
          <p className="mt-4" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
          }}>
            Each song a weapon. Each name an operative.<br />
            Pokémon deployed on the campaign to spread The Rocket&apos;s message across Kanto.
          </p>
        </div>

        {/* ── Stream Everywhere ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {platforms.map(p => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem' }}
            >
              {p.label} →
            </a>
          ))}
        </div>

        {/* ── Song Cards ── */}
        <div style={{
          borderTop: '1px solid var(--color-brand-gray-mid)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {songs.map((song, i) => (
            <div
              key={song.title}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b"
              style={{ borderColor: 'var(--color-brand-gray-mid)', position: 'relative' }}
            >
              {/* Red slash on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                style={{ background: 'var(--color-brand-red)' }}
              />

              {/* Track number / cover */}
              <div className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 72, height: 72, border: '1px solid var(--color-brand-gray-mid)' }}>
                {song.cover ? (
                  <Image
                    src={song.cover}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: 'var(--color-brand-gray)' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: 'var(--color-brand-red)',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-white)',
                  }}>
                    {song.title}
                  </h2>
                  <span style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.36rem',
                    color: 'var(--color-brand-red)',
                    border: '1px solid rgba(227,0,15,0.3)',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(227,0,15,0.06)',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}>
                    {song.tag}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--color-brand-off)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  maxWidth: 500,
                }}>
                  {song.lore}
                </p>
              </div>

              {/* Stream buttons */}
              <div className="flex gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                  Spotify
                </a>
                <a href={song.apple} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                  Apple
                </a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                  YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Full Catalog CTA ── */}
        <div className="mt-16 p-8 text-center" style={{
          background: 'var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            // Full arsenal available on all platforms
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Open Spotify Profile →
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">
              YouTube Channel →
            </a>
          </div>
        </div>

        {/* ── Collector EPs Teaser ── */}
        <div className="mt-4 p-8" style={{ background: 'var(--color-brand-red)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.38rem',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.12em',
                marginBottom: '0.4rem',
              }}>
                // INCOMING · SUMMER 2026
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                color: 'white',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Blue Version + Red Version EPs
              </h3>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.34rem',
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.06em',
                marginTop: '0.4rem',
                lineHeight: 2,
              }}>
                Gameboy cartridge USB · Holographic signed trainer card · Limit 2 per grunt
              </p>
            </div>
            <a
              href="/wunnerdex"
              className="btn-outline flex-shrink-0"
              style={{ borderColor: 'white', color: 'white' }}
            >
              Enlist for Early Access →
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
