// src/app/(public)/music/page.tsx
import Link from 'next/link'
import { socialLinks } from '@/data/content'
import ArsenalGrid from '@/components/public/ArsenalGrid'

export const metadata = { title: 'Arsenal | Genwunner' }

const SPOTIFY_ARTIST_ID = '653dGzLhl75ftFI0GsqQLO'

const platforms = [
  { label: 'Spotify',     href: socialLinks.spotify },
  { label: 'Apple Music', href: socialLinks.apple   },
  { label: 'YouTube',     href: socialLinks.youtube  },
  { label: 'TikTok',      href: socialLinks.tiktok   },
]

export default function MusicPage() {
  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#cc0000' }}>
      <div className="max-w-6xl mx-auto px-4 py-20">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // DEPLOYED OPERATIVES · KANTO CAMPAIGN
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            THE ARSENAL
          </h1>
          <p className="mt-4" style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '1rem',
            color: '#aa0000',
            letterSpacing: '0.06em',
            lineHeight: 2,
          }}>
            Each song a weapon. Each name an operative. Propaganda deployed on the Kanto campaign.
          </p>
        </div>

        {/* ── Platform links ── */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:justify-center mb-12">
          {platforms.map(p => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {p.label} →
            </a>
          ))}
        </div>

        {/* ── Song Grid ── */}
        <ArsenalGrid />

        {/* ── Spotify Discography Embed ── */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#e3000f',
            letterSpacing: '0.12em',
            marginBottom: '1rem',
          }}>
            // STREAM THE FULL ARSENAL
          </div>
          <iframe
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="450"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ border: '1px solid #1a0000', display: 'block' }}
          />
        </div>

        {/* ── Collector EPs Teaser ── */}
        <div className="p-8" style={{ background: '#e3000f' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.12em',
                marginBottom: '0.4rem',
              }}>
                // INCOMING · SUMMER 2026
              </p>
              <h3 style={{
                fontFamily: 'var(--font-heading), "Courier New", Courier, monospace',
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                color: 'white',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                <span style={{ display: 'block' }}>GENWUNNER: RED VERSION (EP)</span>
                <span style={{ display: 'block' }}>GENWUNNER: BLUE VERSION (EP)</span>
              </h3>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.06em',
                marginTop: '0.6rem',
                lineHeight: 1.8,
              }}>
                Giovanni commissioned two. Blue Version and Red Version. The first official documents of the regime. 6 songs each. Collector&apos;s Edition: OG Game-inspired box, Gameboy USB cartridge + more.
              </p>
            </div>
            <Link href="/wunnerdex" className="btn-outline flex-shrink-0" style={{ borderColor: 'white', color: 'white' }}>
              Enlist for Early Access →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
