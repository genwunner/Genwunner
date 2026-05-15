// src/app/(public)/stream/page.tsx
import Link from 'next/link'
import { socialLinks } from '@/data/content'

export const metadata = { title: 'Stream | Genwunner · Rocket Recruitment Regime' }

const platforms = [
  { label: 'Apple Music', href: socialLinks.apple,   desc: 'Full catalog on Apple Music'    },
  { label: 'YouTube',     href: socialLinks.youtube, desc: 'Videos, lives, and full tracks' },
  { label: 'TikTok',      href: socialLinks.tiktok,  desc: 'Short form PokéRage content'    },
]

export default function StreamPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // STREAM THE ARSENAL · ALL PLATFORMS
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            STREAM
          </h1>
          <p className="mt-3" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
          }}>
            All weapons. All platforms. No excuses.
          </p>
        </div>

        {/* Spotify Embed */}
        <div style={{ border: '1px solid var(--color-brand-gray-mid)', marginBottom: '1rem' }}>
          <iframe
            src="https://open.spotify.com/embed/artist/653dGzLhl75ftFI0GsqQLO?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block', border: 'none' }}
          />
        </div>

        <div className="text-center mb-12">
          <a
            href={socialLinks.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open Full Spotify Profile →
          </a>
        </div>

        {/* Other Platforms */}
        <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.1em',
            margin: '1.5rem 0 1rem',
          }}>
            // Also deployed on
          </p>

          {platforms.map((p, i) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b"
              style={{ borderColor: 'var(--color-brand-gray-mid)' }}
            >
              <div className="flex items-baseline gap-4">
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.38rem',
                  color: 'var(--color-brand-red)',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    className="group-hover:!text-[var(--color-brand-red)]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-white)',
                      transition: 'color 0.15s',
                    }}
                  >
                    {p.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.32rem',
                    color: 'var(--color-brand-off)',
                    letterSpacing: '0.05em',
                    marginTop: 2,
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
              <span
                className="group-hover:!text-[var(--color-brand-red)]"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.36rem',
                  color: 'var(--color-brand-off)',
                  transition: 'color 0.15s',
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>

        {/* Arsenal CTA */}
        <div className="mt-8 p-6 text-center" style={{
          background: 'var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
            lineHeight: 2,
          }}>
            See the full breakdown of each operative — lore, type, mission status
          </p>
          <Link href="/music" className="btn-outline">
            View the Full Arsenal →
          </Link>
        </div>

      </div>
    </div>
  )
}
