// src/app/(public)/stream/page.tsx
import { socialLinks } from '@/data/content'

export const metadata = { title: 'Stream — Genwunner · Rocket Recruitment Regime' }

export default function StreamPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // STREAM THE ARSENAL
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

        {/* Spotify embed */}
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

        {/* Other platforms */}
        <div className="mt-8 p-6" style={{
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
            // Also deployed on
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Apple Music', href: socialLinks.apple },
              { label: 'YouTube',     href: socialLinks.youtube },
              { label: 'TikTok',      href: socialLinks.tiktok },
            ].map(p => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-sm"
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem' }}
              >
                {p.label} →
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
