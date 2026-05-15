// src/app/(public)/epk/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { artistStats, socialLinks } from '@/data/content'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dossier | Genwunner' }

interface Highlight {
  id: string
  title: string
  body: string
  category: string
  sort_order: number
}

export default async function EPKPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('epk_settings')
    .select('is_public')
    .single()

  if (!settings?.is_public) notFound()

  await supabase.from('epk_views').insert({ viewed_at: new Date().toISOString() })

  const { data: highlights } = await supabase
    .from('epk_highlights')
    .select('*')
    .order('sort_order')

  const grouped = (highlights ?? []).reduce<Record<string, Highlight[]>>((acc, h) => {
    if (!acc[h.category]) acc[h.category] = []
    acc[h.category].push(h as Highlight)
    return acc
  }, {})

  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // CLASSIFIED · PRESS & INDUSTRY ACCESS ONLY
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            OPERATIVE<br />DOSSIER
          </h1>
          <div className="mt-6" style={{
            borderLeft: '2px solid var(--color-brand-red)',
            paddingLeft: '1.25rem',
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-brand-off)', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--color-brand-white)', fontWeight: 500 }}>Operative: GENWUNNER.</strong>{' '}
              Born Genesis Tajiri. Los Angeles-based PokéRage artist. Creator of Big Man Blastoise.
              Right hand of Giovanni. Appointed leader of the Rocket Recruitment Regime.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px mb-16"
          style={{ background: 'var(--color-brand-gray-mid)', border: '1px solid var(--color-brand-gray-mid)' }}>
          {artistStats.map((stat) => (
            <div key={stat.label} className="py-6 px-5 text-center"
              style={{ background: 'var(--color-brand-gray)' }}>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Press Quote ── */}
        <div className="mb-16 py-10 px-8 text-center" style={{
          background: 'var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
          }}>
            // INTERCEPTED CIVILIAN TRANSMISSION
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            color: 'rgba(240,240,240,0.9)',
            lineHeight: 1.2,
            fontStyle: 'italic',
          }}>
            &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
          </p>
          <p className="mt-4" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
          }}>
            / Kotaku
          </p>
        </div>

        {/* ── Dynamic Highlights from Supabase ── */}
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="mb-12">
            <div style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.4rem',
              color: 'var(--color-brand-red)',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--color-brand-gray-mid)',
            }}>
              // {category.toUpperCase()}
            </div>
            <div className="space-y-6">
              {(items ?? []).map(item => (
                <div key={item.id} style={{
                  paddingLeft: '1rem',
                  borderLeft: '1px solid var(--color-brand-gray-mid)',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-brand-off)',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ── Contact / Links ── */}
        <div style={{
          borderTop: '1px solid var(--color-brand-gray-mid)',
          paddingTop: '3rem',
          marginTop: '3rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem',
          }}>
            // CONTACT & LINKS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Booking & Management', value: 'genwunnermgmt@gmail.com', href: 'mailto:genwunnermgmt@gmail.com' },
              { label: 'Press & Media',         value: 'genwunnermgmt@gmail.com', href: 'mailto:genwunnermgmt@gmail.com' },
            ].map(c => (
              <div key={c.label} style={{
                background: 'var(--color-brand-gray)',
                border: '1px solid var(--color-brand-gray-mid)',
                padding: '1rem 1.25rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.36rem',
                  color: 'var(--color-brand-off)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                }}>
                  {c.label}
                </p>
                <a href={c.href} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'var(--color-brand-red)',
                  letterSpacing: '0.04em',
                }}>
                  {c.value}
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Spotify',     href: socialLinks.spotify    },
              { label: 'Apple Music', href: socialLinks.apple      },
              { label: 'YouTube',     href: socialLinks.youtube    },
              { label: 'Instagram',   href: socialLinks.instagram  },
              { label: 'TikTok',      href: socialLinks.tiktok     },
              { label: 'Book Now',    href: '/book'                },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-outline btn-sm"
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem' }}
              >
                {l.label} →
              </a>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.32rem',
            color: '#333',
            letterSpacing: '0.06em',
            lineHeight: 2,
            marginTop: '2rem',
            textAlign: 'center',
          }}>
            ROCKET RECRUITMENT REGIME · KANTO DIVISION · CLASSIFIED DOCUMENT<br />
            FOR PRESS AND INDUSTRY USE ONLY
          </p>
        </div>

      </div>
    </div>
  )
}
