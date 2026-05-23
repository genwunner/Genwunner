'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { artistStats } from '@/data/content'
import Image from 'next/image'

// ── Static EPK content (mirrors the public /epk page) ─────────────────────

const PHANTOM_BURIAL_RUN1 = [
  { date: 'Oct 2',  city: 'Berkeley, CA',       venue: 'Cornerstone'           },
  { date: 'Oct 3',  city: 'Los Angeles, CA',     venue: 'The Roxy'              },
  { date: 'Oct 5',  city: 'Phoenix, AZ',         venue: 'Crescent Ballroom'     },
  { date: 'Oct 7',  city: 'Denver, CO',          venue: "Cervantes' Other Side" },
  { date: 'Oct 9',  city: 'Salt Lake City, UT',  venue: 'The Urban Lounge'      },
  { date: 'Oct 11', city: 'Portland, OR',        venue: 'Hawthorne Theatre'     },
  { date: 'Oct 12', city: 'Seattle, WA',         venue: 'The Crocodile'         },
]

const PHANTOM_BURIAL_RUN2 = [
  { date: 'Mar 25', city: 'Las Vegas, NV',       venue: '24 Oxford'             },
  { date: 'Mar 26', city: 'San Antonio, TX',     venue: 'TBD'                   },
  { date: 'Mar 28', city: 'Dallas, TX',          venue: 'Club'                  },
  { date: 'Mar 29', city: 'Houston, TX',         venue: 'White Oak Music Hall'  },
  { date: 'Mar 31', city: 'New Orleans, LA',     venue: "Howlin' Wolf"          },
  { date: 'Apr 1',  city: 'Nashville, TN',       venue: 'The Basement East'     },
  { date: 'Apr 3',  city: 'Orlando, FL',         venue: 'TBD'                   },
  { date: 'Apr 4',  city: 'Atlanta, GA',         venue: 'The Masquerade'        },
  { date: 'Apr 5',  city: 'Durham, NC',          venue: 'Motorco Music Hall'    },
  { date: 'Apr 7',  city: 'Washington, DC',      venue: 'Union Stage'           },
  { date: 'Apr 8',  city: 'Cambridge, MA',       venue: 'Middle East'           },
  { date: 'Apr 9',  city: 'New York, NY',        venue: 'Racket NYC'            },
  { date: 'Apr 11', city: 'Cleveland, OH',       venue: 'TBD'                   },
  { date: 'Apr 13', city: 'Kalamazoo, MI',       venue: "Bell's Eccentric Cafe" },
  { date: 'Apr 15', city: 'Indianapolis, IN',    venue: 'TBD'                   },
  { date: 'Apr 16', city: 'Chicago, IL',         venue: 'TBD'                   },
  { date: 'Apr 17', city: 'Milwaukee, WI',       venue: 'Pabst Theater'         },
  { date: 'Apr 18', city: 'Minneapolis, MN',     venue: '7th St. Entry'         },
]

const CONVENTION_CIRCUIT = [
  'Anime Expo (Los Angeles)', 'Anime NYC', 'MomoCon (Atlanta)', 'OtakuFest',
  'IchigoCon', 'ConnectiCon', 'Long Island TCG Show', 'Nerdz & Hip-Hop Mini-Con',
  'Convivial Fest', 'SOBs — New York City (3x)', 'University of Alaska Fairbanks',
]

const PRESS = [
  { outlet: 'Kotaku',       headline: '"Blastoise Is Finally Winning A Popularity Contest Over Charizard, And It Rules"', href: 'https://kotaku.com/pokemon-big-man-blastoise-rap-song-tiktok-genwunner-1851758160' },
  { outlet: 'Know Your Meme', headline: '"Big Man Blastoise" — Official meme entry: origin, spread, cultural impact',      href: 'https://knowyourmeme.com/memes/big-man-blastoise' },
  { outlet: 'Kickstarter',  headline: '"BIG MAN BLASTOISE MUSIC VIDEO by Genwunner" — Fan-funded visual campaign',        href: 'https://www.kickstarter.com/projects/genwunner/big-man-blastoise-music-video' },
  { outlet: 'Blastoyz.com', headline: '"BIG MAN BLASTOISE!" — Official Blastoyz × Genwunner collab release',              href: 'https://blastoyz.com/music/big-man-blastoise/' },
]

const VIRAL_STATS = [
  ['1B+',          'Organic TikTok UGC views across fan-made edits'],
  ['20M+',         'Views and streams across all platforms combined'],
  ['1M+',          'Spotify streams on "BLASTOISE!" alone'],
  ['Know Your Meme', 'Official "Big Man Blastoise" meme entry'],
  ['Blastoyz Collab', 'EDM producer released an official remix/collab version'],
  ['Kickstarter',  'Fan-funded official music video campaign'],
]

// ── Component ──────────────────────────────────────────────────────────────

export default function EPKAdminPage() {
  const supabase = createClient()
  const [isPublic, setIsPublic] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [loading, setLoading]   = useState(true)
  const [tab, setTab]           = useState<'preview' | 'settings'>('preview')

  useEffect(() => {
    supabase.from('epk_settings').select('is_public').single().then(({ data }) => {
      if (data) setIsPublic(data.is_public)
      setLoading(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function togglePublic() {
    const next = !isPublic
    setSaving(true)
    await supabase.from('epk_settings').upsert({ id: 1, is_public: next })
    setIsPublic(next)
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-black/40">Loading…</div>

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-black/10 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">EPK Agent</h1>
          <div className="flex gap-1 bg-black/5 rounded-lg p-0.5">
            {(['preview', 'settings'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                  tab === t ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium ${isPublic ? 'text-green-600' : 'text-black/40'}`}>
            {isPublic ? '● Live' : '○ Private'}
          </span>
          <button
            onClick={togglePublic}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${isPublic ? 'bg-green-500' : 'bg-black/20'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isPublic ? 'left-6' : 'left-1'}`} />
          </button>
          {isPublic && (
            <a href="/epk" target="_blank" className="text-xs font-medium text-black/40 hover:text-black underline">
              View public →
            </a>
          )}
        </div>
      </div>

      {/* ── Settings tab ── */}
      {tab === 'settings' && (
        <div className="p-8 max-w-xl">
          <div className="bg-black/5 border border-black/10 rounded-xl p-6">
            <h2 className="font-semibold mb-1">Visibility</h2>
            <p className="text-black/40 text-sm mb-4">
              When private, <code>/epk</code> returns 404. Toggle to make it accessible to press and industry.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePublic}
                disabled={saving}
                className={`relative w-11 h-6 rounded-full transition-colors ${isPublic ? 'bg-green-500' : 'bg-black/20'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isPublic ? 'left-6' : 'left-1'}`} />
              </button>
              <span className="text-sm">{isPublic ? 'EPK is public' : 'EPK is private'}</span>
            </div>
          </div>

          <div className="mt-4 bg-black/5 border border-black/10 rounded-xl p-6">
            <h2 className="font-semibold mb-1">Booking contact</h2>
            <p className="text-sm text-black/60">genwunnermgmt@gmail.com</p>
          </div>
        </div>
      )}

      {/* ── Preview tab ── */}
      {tab === 'preview' && (
        <div className="min-h-screen py-12 px-8" style={{ background: '#000', color: '#cc0000' }}>
          <div className="max-w-3xl mx-auto">

            {/* Classification */}
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.6rem', color: '#330000', letterSpacing: '0.15em', marginBottom: '2rem' }}>
              // CLASSIFIED · PRESS &amp; INDUSTRY ACCESS ONLY · ROCKET RECRUITMENT REGIME
            </p>

            {/* Hero */}
            <div className="mb-14">
              <h1 style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#cc0000', lineHeight: 1, marginBottom: '0.5rem' }}>
                GENWUNNER
              </h1>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.9rem', color: '#e3000f', letterSpacing: '0.18em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.75rem' }}>
                PokéRage · Los Angeles, CA
              </p>
              <div style={{ borderLeft: '2px solid #e3000f', paddingLeft: '1.25rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.88rem', color: '#aa0000', lineHeight: 1.85 }}>
                  <span style={{ color: '#f0f0f0', fontWeight: 600 }}>Genwunner</span> is a Los Angeles rapper who invented{' '}
                  <span style={{ color: '#f0f0f0' }}>PokéRage</span> — aggressive, fan-fueled rap built for the generation that grew up catching Pokémon on a Game Boy Color. His breakout track{' '}
                  <span style={{ color: '#e3000f', fontWeight: 700 }}>"BIG MAN BLASTOISE!"</span> became a full internet phenomenon in 2024:
                  a Know Your Meme entry, Kotaku feature, and over one billion organic views across TikTok UGC. The original track crossed 1 million Spotify streams while fan edits ran circles around the internet.
                  A relentless live performer, Genwunner played anime conventions nearly every month in 2025 and joined NateWantsToBattle&apos;s Phantom Burial Tour as direct support across <span style={{ color: '#f0f0f0' }}>25 cities on both coasts</span>.
                </p>
              </div>
            </div>

            {/* Hero Photo */}
            <div className="mb-14" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', border: '1px solid #1a0000' }}>
                <Image
                  src="/images/hero-stage.jpg"
                  alt="Genwunner performing live"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.9) contrast(1.05)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', fontFamily: "'Courier New', monospace", fontSize: '0.6rem', color: '#e3000f', letterSpacing: '0.15em', fontWeight: 700 }}>
                  // OPERATIVE: GENWUNNER · LOS ANGELES, CA
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-14" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: '#1a0000', border: '1px solid #1a0000' }}>
              {artistStats.map(s => (
                <div key={s.label} style={{ background: '#030000', padding: '1.4rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700, color: '#ff5555', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.62rem', color: '#880000', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* The Viral Moment */}
            <section className="mb-14">
              <SectionHead label="THE VIRAL MOMENT" />
              {/* Kotaku quote */}
              <div style={{ background: '#030000', border: '1px solid #1a0000', padding: '2.25rem 2rem', marginBottom: '1rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', color: '#440000', letterSpacing: '0.12em', marginBottom: '0.85rem' }}>
                  // INTERCEPTED PRESS TRANSMISSION
                </p>
                <p style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 700, fontSize: 'clamp(1.1rem, 2.8vw, 1.8rem)', color: '#f0f0f0', lineHeight: 1.25, fontStyle: 'italic', marginBottom: '0.85rem' }}>
                  &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
                </p>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.65rem', color: '#e3000f', letterSpacing: '0.12em', fontWeight: 700 }}>KOTAKU</span>
              </div>
              {/* Viral impact */}
              <div style={{ background: '#030000', border: '1px solid #1a0000', padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', color: '#440000', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// VIRAL IMPACT REPORT</p>
                {VIRAL_STATS.map(([label, desc]) => (
                  <div key={label} style={{ display: 'flex', gap: '1.25rem', padding: '0.5rem 0', borderBottom: '1px solid #0d0000', fontFamily: "'Courier New', monospace", fontSize: '0.77rem' }}>
                    <span style={{ color: '#e3000f', fontWeight: 700, minWidth: '7rem', flexShrink: 0 }}>{label}</span>
                    <span style={{ color: '#770000' }}>{desc}</span>
                  </div>
                ))}
              </div>
              {/* Spotify embed */}
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', color: '#440000', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>// STREAM: BIG MAN BLASTOISE!</p>
              <iframe
                src="https://open.spotify.com/embed/track/04hJB0OGdKpUomyJurCvU0?utm_source=generator&theme=0"
                width="100%" height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ border: '1px solid #1a0000', display: 'block', marginBottom: '0.75rem' }}
              />
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a href="https://www.youtube.com/watch?v=eY_DBWkwSC4" target="_blank" rel="noopener noreferrer" style={outlineBtn}>Official MV on YouTube →</a>
                <a href="https://www.youtube.com/watch?v=yCNoNF3gFaA" target="_blank" rel="noopener noreferrer" style={outlineBtn}>Blastoyz Collab Version →</a>
              </div>
            </section>

            {/* Press */}
            <section className="mb-14">
              <SectionHead label="PRESS & COVERAGE" />
              <div style={{ background: '#030000', border: '1px solid #1a0000' }}>
                {PRESS.map(({ outlet, headline, href }) => (
                  <a key={outlet} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', gap: '1.25rem', padding: '1rem 1.5rem', borderBottom: '1px solid #0d0000', textDecoration: 'none', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.62rem', color: '#e3000f', fontWeight: 700, letterSpacing: '0.08em', minWidth: '6.5rem', flexShrink: 0, marginTop: '0.1rem' }}>{outlet}</span>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', color: '#770000', lineHeight: 1.6 }}>{headline}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Tour History */}
            <section className="mb-14">
              <SectionHead label="TOUR HISTORY" />
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.78rem', color: '#f0f0f0', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Phantom Burial Tour — Support for NateWantsToBattle
                  </span>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', color: '#e3000f', border: '1px solid #e3000f', padding: '0.08rem 0.45rem', letterSpacing: '0.1em' }}>
                    DIRECT SUPPORT
                  </span>
                </div>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.68rem', color: '#440000', marginBottom: '0.6rem' }}>RUN 1 — October 2025 (West Coast)</p>
                <TourTable shows={PHANTOM_BURIAL_RUN1} />
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.68rem', color: '#440000', margin: '1rem 0 0.6rem' }}>RUN 2 — March–April 2026 (National)</p>
                <TourTable shows={PHANTOM_BURIAL_RUN2} />
              </div>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.68rem', color: '#440000', marginBottom: '0.6rem' }}>2025 CONVENTION & LIVE CIRCUIT</p>
              <div style={{ background: '#030000', border: '1px solid #1a0000', padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {CONVENTION_CIRCUIT.map(v => (
                  <span key={v} style={{ fontFamily: "'Courier New', monospace", fontSize: '0.7rem', color: '#880000', background: '#0d0000', border: '1px solid #1a0000', padding: '0.2rem 0.55rem' }}>{v}</span>
                ))}
              </div>
            </section>

            {/* Discography embed */}
            <section className="mb-14">
              <SectionHead label="FULL DISCOGRAPHY" />
              <iframe
                src="https://open.spotify.com/embed/artist/653dGzLhl75ftFI0GsqQLO?utm_source=generator&theme=0"
                width="100%" height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ border: '1px solid #1a0000', display: 'block' }}
              />
            </section>

            {/* Contact */}
            <section>
              <SectionHead label="CONTACT & BOOKING" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: '#1a0000', border: '1px solid #1a0000', marginBottom: '1.5rem' }}>
                {[['Booking & Management', 'genwunnermgmt@gmail.com'], ['Press & Media', 'genwunnermgmt@gmail.com']].map(([label, email]) => (
                  <div key={label} style={{ background: '#030000', padding: '1.1rem 1.4rem' }}>
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.58rem', color: '#440000', letterSpacing: '0.1em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>{label}</p>
                    <a href={`mailto:${email}`} style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem', color: '#e3000f', fontWeight: 700 }}>{email}</a>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: '0.52rem', color: '#1a0000', letterSpacing: '0.08em', lineHeight: 2, textAlign: 'center', marginTop: '2rem' }}>
                ROCKET RECRUITMENT REGIME · KANTO DIVISION · CLASSIFIED DOCUMENT<br />
                FOR PRESS AND INDUSTRY USE ONLY
              </p>
            </section>

          </div>
        </div>
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionHead({ label }: { label: string }) {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.62rem', color: '#e3000f', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.65rem', borderBottom: '1px solid #1a0000' }}>
      // {label}
    </div>
  )
}

function TourTable({ shows }: { shows: { date: string; city: string; venue: string }[] }) {
  return (
    <div style={{ background: '#030000', border: '1px solid #1a0000' }}>
      {shows.map(s => (
        <div key={s.city} style={{ display: 'grid', gridTemplateColumns: '4rem 1fr 1fr', gap: '1rem', padding: '0.5rem 1.25rem', borderBottom: '1px solid #0d0000', fontFamily: "'Courier New', monospace", fontSize: '0.75rem' }}>
          <span style={{ color: '#440000' }}>{s.date}</span>
          <span style={{ color: '#aa0000' }}>{s.city}</span>
          <span style={{ color: '#550000' }}>{s.venue}</span>
        </div>
      ))}
    </div>
  )
}

const outlineBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  background: 'transparent',
  color: '#880000',
  fontFamily: "'Courier New', monospace",
  fontSize: '0.6rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '0.35rem 0.85rem',
  border: '1px solid #330000',
  cursor: 'pointer',
  textDecoration: 'none',
}
