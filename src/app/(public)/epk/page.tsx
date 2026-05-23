// src/app/(public)/epk/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { artistStats, socialLinks } from '@/data/content'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'EPK | Genwunner' }

const BLASTOISE_SPOTIFY_TRACK = '04hJB0OGdKpUomyJurCvU0'
const BLASTOISE_YOUTUBE_MV    = 'https://www.youtube.com/watch?v=eY_DBWkwSC4'
const BLASTOYZ_COLLAB_YT      = 'https://www.youtube.com/watch?v=yCNoNF3gFaA'
const SPOTIFY_ARTIST_ID       = '653dGzLhl75ftFI0GsqQLO'

const PHANTOM_BURIAL_RUN1 = [
  { date: 'Oct 2',  city: 'Berkeley, CA',        venue: 'Cornerstone'           },
  { date: 'Oct 3',  city: 'Los Angeles, CA',      venue: 'The Roxy'              },
  { date: 'Oct 5',  city: 'Phoenix, AZ',          venue: 'Crescent Ballroom'     },
  { date: 'Oct 7',  city: 'Denver, CO',           venue: "Cervantes' Other Side" },
  { date: 'Oct 9',  city: 'Salt Lake City, UT',   venue: 'The Urban Lounge'      },
  { date: 'Oct 11', city: 'Portland, OR',         venue: 'Hawthorne Theatre'     },
  { date: 'Oct 12', city: 'Seattle, WA',          venue: 'The Crocodile'         },
]

const PHANTOM_BURIAL_RUN2 = [
  { date: 'Mar 25', city: 'Las Vegas, NV',        venue: '24 Oxford'             },
  { date: 'Mar 26', city: 'San Antonio, TX',      venue: 'TBD'                   },
  { date: 'Mar 28', city: 'Dallas, TX',           venue: 'Club'                  },
  { date: 'Mar 29', city: 'Houston, TX',          venue: 'White Oak Music Hall'  },
  { date: 'Mar 31', city: 'New Orleans, LA',      venue: "Howlin' Wolf"          },
  { date: 'Apr 1',  city: 'Nashville, TN',        venue: 'The Basement East'     },
  { date: 'Apr 3',  city: 'Orlando, FL',          venue: 'TBD'                   },
  { date: 'Apr 4',  city: 'Atlanta, GA',          venue: 'The Masquerade'        },
  { date: 'Apr 5',  city: 'Durham, NC',           venue: 'Motorco Music Hall'    },
  { date: 'Apr 7',  city: 'Washington, DC',       venue: 'Union Stage'           },
  { date: 'Apr 8',  city: 'Cambridge, MA',        venue: 'Middle East'           },
  { date: 'Apr 9',  city: 'New York, NY',         venue: 'Racket NYC'            },
  { date: 'Apr 11', city: 'Cleveland, OH',        venue: 'TBD'                   },
  { date: 'Apr 13', city: 'Kalamazoo, MI',        venue: "Bell's Eccentric Cafe" },
  { date: 'Apr 15', city: 'Indianapolis, IN',     venue: 'TBD'                   },
  { date: 'Apr 16', city: 'Chicago, IL',          venue: 'TBD'                   },
  { date: 'Apr 17', city: 'Milwaukee, WI',        venue: 'Pabst Theater'         },
  { date: 'Apr 18', city: 'Minneapolis, MN',      venue: '7th St. Entry'         },
]

const CONVENTION_CIRCUIT = [
  'Anime Expo (Los Angeles)',
  'Anime NYC',
  'MomoCon (Atlanta)',
  'OtakuFest',
  'IchigoCon',
  'ConnectiCon',
  'Long Island TCG Show',
  'Nerdz & Hip-Hop Mini-Con',
  'Convivial Fest',
  'SOBs — New York City (3 separate performances)',
  'University of Alaska Fairbanks',
]

const row = {
  display: 'flex',
  gap: '1.5rem',
  fontFamily: "'Courier New', monospace",
  fontSize: '0.8rem',
  paddingTop: '0.6rem',
  paddingBottom: '0.6rem',
  borderBottom: '1px solid #0d0000',
  alignItems: 'baseline' as const,
}

export default async function EPKPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('epk_settings')
    .select('is_public')
    .single()

  if (!settings?.is_public) notFound()

  // Log the view (non-blocking)
  supabase.from('epk_views').insert({ viewed_at: new Date().toISOString() }).then(() => {})

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: '#000', color: '#cc0000' }}>
      <div className="max-w-3xl mx-auto">

        {/* ── Classification Header ── */}
        <p style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '0.65rem',
          color: '#550000',
          letterSpacing: '0.15em',
          marginBottom: '2rem',
        }}>
          // CLASSIFIED · PRESS &amp; INDUSTRY ACCESS ONLY · ROCKET RECRUITMENT REGIME
        </p>

        {/* ── HERO ── */}
        <div className="mb-16">
          <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', lineHeight: 1 }}>
            GENWUNNER
          </h1>
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.95rem',
            color: '#e3000f',
            letterSpacing: '0.18em',
            marginTop: '0.75rem',
            marginBottom: '2rem',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            PokéRage · Los Angeles, CA
          </p>
          <div style={{
            borderLeft: '2px solid #e3000f',
            paddingLeft: '1.25rem',
          }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.9rem',
              color: '#aa0000',
              lineHeight: 1.85,
            }}>
              <span style={{ color: '#f0f0f0', fontWeight: 600 }}>Genwunner</span> is a Los Angeles rapper who invented <span style={{ color: '#f0f0f0' }}>PokéRage</span> — aggressive, fan-fueled rap built for the generation that grew up catching Pokémon on a Game Boy Color. His breakout track <span style={{ color: '#e3000f', fontWeight: 700 }}>"BIG MAN BLASTOISE!"</span> became a full internet phenomenon in 2024: a Know Your Meme entry, Kotaku feature, and over one billion organic views across TikTok user-generated content. The original track crossed 1 million Spotify streams while fan edits ran circles around the internet. A relentless live performer, Genwunner played anime conventions nearly every month in 2025 and joined NateWantsToBattle&apos;s Phantom Burial Tour as direct support across <span style={{ color: '#f0f0f0' }}>25 cities on both coasts</span>.
            </p>
          </div>
        </div>

        {/* ── Hero Photo ── */}
        <div className="mb-16" style={{ position: 'relative' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', border: '1px solid #1a0000' }}>
            <Image
              src="/images/hero-stage.jpg"
              alt="Genwunner performing live"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.9) contrast(1.05)' }}
              priority
            />
            {/* Red vignette overlay for terminal aesthetic */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }} />
            {/* Scanline overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
              pointerEvents: 'none',
            }} />
            {/* Caption */}
            <div style={{
              position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#e3000f',
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}>
              // OPERATIVE: GENWUNNER · LOS ANGELES, CA
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="mb-16"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1px',
            background: '#1a0000',
            border: '1px solid #1a0000',
          }}>
          {artistStats.map(stat => (
            <div key={stat.label} style={{
              background: '#030000',
              padding: '1.5rem 1rem',
              textAlign: 'center',
            }}>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── THE VIRAL MOMENT ── */}
        <section className="mb-16">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // THE VIRAL MOMENT
          </div>

          {/* Press quote */}
          <div style={{
            background: '#030000',
            border: '1px solid #1a0000',
            padding: '2.5rem 2rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#550000',
              letterSpacing: '0.12em',
              marginBottom: '1rem',
            }}>
              // INTERCEPTED PRESS TRANSMISSION
            </p>
            <p style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              color: '#f0f0f0',
              lineHeight: 1.25,
              fontStyle: 'italic',
              marginBottom: '1rem',
            }}>
              &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
            </p>
            <a
              href="https://kotaku.com/pokemon-big-man-blastoise-rap-song-tiktok-genwunner-1851758160"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.7rem',
                color: '#e3000f',
                letterSpacing: '0.12em',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              KOTAKU →
            </a>
          </div>

          {/* Viral breakdown */}
          <div style={{
            background: '#030000',
            border: '1px solid #1a0000',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#550000',
              letterSpacing: '0.12em',
              marginBottom: '1rem',
            }}>
              // VIRAL IMPACT REPORT
            </p>
            {[
              ['1B+',    'Organic TikTok UGC views across fan-made edits using the song'],
              ['20M+',   'Views and streams across all platforms combined'],
              ['1M+',    'Spotify streams on the original "BLASTOISE!" track alone'],
              ['Know Your Meme', 'Official "Big Man Blastoise" meme entry — community-documented internet phenomenon'],
              ['Blastoyz Collab', 'EDM producer Blastoyz released an official remix/collab version'],
              ['Kickstarter', 'Fan-funded official music video campaign launched on Kickstarter'],
            ].map(([label, desc]) => (
              <div key={label} style={row}>
                <span style={{ color: '#e3000f', fontWeight: 700, minWidth: '7rem', flexShrink: 0 }}>{label}</span>
                <span style={{ color: '#880000' }}>{desc}</span>
              </div>
            ))}
          </div>

          {/* Spotify embed */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#550000',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
            }}>
              // STREAM: BIG MAN BLASTOISE!
            </p>
            <iframe
              src={`https://open.spotify.com/embed/track/${BLASTOISE_SPOTIFY_TRACK}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: '1px solid #1a0000', display: 'block' }}
            />
          </div>

          {/* MV links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={BLASTOISE_YOUTUBE_MV} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
              Official MV on YouTube →
            </a>
            <a href={BLASTOYZ_COLLAB_YT} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
              Blastoyz Collab Version →
            </a>
          </div>
        </section>

        {/* ── BIO ── */}
        <section className="mb-16">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // OPERATIVE BIO
          </div>
          <div style={{
            background: '#030000',
            border: '1px solid #1a0000',
            padding: '1.75rem',
          }}>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.88rem',
              color: '#aa0000',
              lineHeight: 1.9,
              marginBottom: '1.25rem',
            }}>
              Genwunner emerged from Los Angeles with a simple thesis: the kids who grew up on Pokémon Red and Blue never stopped caring about those 151. He turned that thesis into a genre — <span style={{ color: '#f0f0f0' }}>PokéRage</span> — and a song called <span style={{ color: '#e3000f', fontWeight: 700 }}>"BLASTOISE!"</span> turned it into a movement.
            </p>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.88rem',
              color: '#aa0000',
              lineHeight: 1.9,
              marginBottom: '1.25rem',
            }}>
              Released in December 2023, the track became a meme engine by mid-2024. TikTok creators used it for Pokken Tournament edits, anime fight clips, and original animations of Blastoise in his &ldquo;Big Man&rdquo; glory. Kotaku ran a feature. Know Your Meme opened an entry. EDM producer Blastoyz cut an official collab version. A Kickstarter funded the music video. The song crossed 1 million Spotify streams while hundreds of millions of views stacked across user-created content.
            </p>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.88rem',
              color: '#aa0000',
              lineHeight: 1.9,
            }}>
              In 2025, Genwunner proved it wasn&apos;t a one-song act. He played anime conventions nearly every month — Anime Expo, Anime NYC, MomoCon, and dozens of others — building one of the most dedicated live followings in the nerdcore / Pokémon rap space. He appeared at New York&apos;s legendary SOBs three separate times. Then he joined NateWantsToBattle&apos;s headlining Phantom Burial Tour as direct support alongside Cam Steady, covering 25 cities across two coast-to-coast runs in late 2025 and early 2026.
            </p>
          </div>
        </section>

        {/* ── PRESS ── */}
        <section className="mb-16">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // PRESS &amp; COVERAGE
          </div>
          <div style={{ background: '#030000', border: '1px solid #1a0000' }}>
            {[
              {
                outlet: 'Kotaku',
                headline: '"Blastoise Is Finally Winning A Popularity Contest Over Charizard, And It Rules"',
                href: 'https://kotaku.com/pokemon-big-man-blastoise-rap-song-tiktok-genwunner-1851758160',
              },
              {
                outlet: 'Know Your Meme',
                headline: '"Big Man Blastoise" — Official meme documentation entry with full origin, spread, and cultural impact',
                href: 'https://knowyourmeme.com/memes/big-man-blastoise',
              },
              {
                outlet: 'Kickstarter',
                headline: '"BIG MAN BLASTOISE MUSIC VIDEO by Genwunner" — Fan-funded official visual campaign',
                href: 'https://www.kickstarter.com/projects/genwunner/big-man-blastoise-music-video',
              },
              {
                outlet: 'Blastoyz.com',
                headline: '"BIG MAN BLASTOISE!" — Official Blastoyz x Genwunner collab release',
                href: 'https://blastoyz.com/music/big-man-blastoise/',
              },
            ].map(({ outlet, headline, href }) => (
              <a
                key={outlet}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid #0d0000',
                  alignItems: 'flex-start',
                  textDecoration: 'none',
                  transition: 'background 0.12s',
                }}
                className="hover:bg-[#0d0000]"
              >
                <span style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.65rem',
                  color: '#e3000f',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  minWidth: '6rem',
                  marginTop: '0.1rem',
                  flexShrink: 0,
                }}>
                  {outlet}
                </span>
                <span style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.82rem',
                  color: '#880000',
                  lineHeight: 1.6,
                }}>
                  {headline}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── TOUR HISTORY ── */}
        <section className="mb-16">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // TOUR HISTORY
          </div>

          {/* Phantom Burial Tour */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.75rem',
                color: '#f0f0f0',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Phantom Burial Tour — Support for NateWantsToBattle
              </span>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.6rem',
                color: '#e3000f',
                border: '1px solid #e3000f',
                padding: '0.1rem 0.5rem',
                letterSpacing: '0.1em',
              }}>
                DIRECT SUPPORT
              </span>
            </div>

            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.75rem',
              color: '#550000',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
            }}>
              RUN 1 — October 2025 (West Coast)
            </p>
            <div style={{ background: '#030000', border: '1px solid #1a0000', marginBottom: '1.5rem' }}>
              {PHANTOM_BURIAL_RUN1.map(show => (
                <div key={show.city} style={{
                  display: 'grid',
                  gridTemplateColumns: '4rem 1fr 1fr',
                  gap: '1rem',
                  padding: '0.6rem 1.25rem',
                  borderBottom: '1px solid #0d0000',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.78rem',
                  alignItems: 'baseline',
                }}>
                  <span style={{ color: '#550000' }}>{show.date}</span>
                  <span style={{ color: '#aa0000' }}>{show.city}</span>
                  <span style={{ color: '#660000' }}>{show.venue}</span>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.75rem',
              color: '#550000',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
            }}>
              RUN 2 — March–April 2026 (National)
            </p>
            <div style={{ background: '#030000', border: '1px solid #1a0000' }}>
              {PHANTOM_BURIAL_RUN2.map(show => (
                <div key={show.city} style={{
                  display: 'grid',
                  gridTemplateColumns: '4rem 1fr 1fr',
                  gap: '1rem',
                  padding: '0.6rem 1.25rem',
                  borderBottom: '1px solid #0d0000',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.78rem',
                  alignItems: 'baseline',
                }}>
                  <span style={{ color: '#550000' }}>{show.date}</span>
                  <span style={{ color: '#aa0000' }}>{show.city}</span>
                  <span style={{ color: '#660000' }}>{show.venue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Convention circuit */}
          <div>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.75rem',
              color: '#550000',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
            }}>
              2025 CONVENTION &amp; LIVE CIRCUIT (partial)
            </p>
            <div style={{ background: '#030000', border: '1px solid #1a0000', padding: '1.25rem 1.5rem' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {CONVENTION_CIRCUIT.map(venue => (
                  <span key={venue} style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.72rem',
                    color: '#880000',
                    background: '#0d0000',
                    border: '1px solid #1a0000',
                    padding: '0.25rem 0.6rem',
                  }}>
                    {venue}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL DISCOGRAPHY ── */}
        <section className="mb-16">
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // FULL DISCOGRAPHY
          </div>
          <iframe
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ border: '1px solid #1a0000', display: 'block' }}
          />
        </section>

        {/* ── CONTACT ── */}
        <section>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.65rem',
            color: '#e3000f',
            letterSpacing: '0.15em',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1a0000',
            fontWeight: 700,
          }}>
            // CONTACT &amp; BOOKING
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: '#1a0000',
            border: '1px solid #1a0000',
            marginBottom: '2rem',
          }}>
            {[
              { label: 'Booking & Management', email: 'genwunnermgmt@gmail.com' },
              { label: 'Press & Media',         email: 'genwunnermgmt@gmail.com' },
            ].map(c => (
              <div key={c.label} style={{
                background: '#030000',
                padding: '1.25rem 1.5rem',
              }}>
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.6rem',
                  color: '#550000',
                  letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}>
                  {c.label}
                </p>
                <a href={`mailto:${c.email}`} style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.88rem',
                  color: '#e3000f',
                  letterSpacing: '0.04em',
                  fontWeight: 700,
                }}>
                  {c.email}
                </a>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
            {[
              { label: 'Spotify',     href: socialLinks.spotify   },
              { label: 'Apple Music', href: socialLinks.apple     },
              { label: 'YouTube',     href: socialLinks.youtube   },
              { label: 'Instagram',   href: socialLinks.instagram },
              { label: 'TikTok',      href: socialLinks.tiktok    },
              { label: 'Book Now',    href: '/book'               },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-outline btn-sm"
              >
                {l.label} →
              </a>
            ))}
          </div>

          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.55rem',
            color: '#220000',
            letterSpacing: '0.08em',
            lineHeight: 2,
            textAlign: 'center',
          }}>
            ROCKET RECRUITMENT REGIME · KANTO DIVISION · CLASSIFIED DOCUMENT<br />
            FOR PRESS AND INDUSTRY USE ONLY · © {new Date().getFullYear()} GENWUNNER / WUNNLIFE INDUSTRIES
          </p>
        </section>

      </div>
    </div>
  )
}
