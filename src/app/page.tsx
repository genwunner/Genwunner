// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/public/Nav'
import PackOpeningIntro from '@/components/public/PackOpeningIntro'
import FloatingPokeballs from '@/components/public/FloatingPokeballs'
import { songs, socialLinks, upcomingShows } from '@/data/content'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: supabaseShows } = await supabase
    .from('shows')
    .select('*')
    .eq('is_upcoming', true)
    .order('event_date', { ascending: true })

  const shows = [...upcomingShows, ...(supabaseShows ?? [])]
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 3)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <PackOpeningIntro />
      <Nav />

      {/* ── SECTION 1: FULLSCREEN ENTRANCE ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100svh', minHeight: 600 }}
      >
        {/* Full bleed background photo */}
        <Image
          src="/images/hero-stage.jpg"
          alt="Genwunner performing live"
          fill
          className="object-cover"
          style={{ zIndex: 0, objectPosition: 'center 15%' }}
          priority
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.92) 100%)',
            zIndex: 1,
          }}
        />

        {/* Red atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(227,0,15,0.1) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />

        {/* Floating Pokéballs */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <FloatingPokeballs />
        </div>

        {/* Center content */}
        <div className="relative flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 3 }}>
          {/* Classified tag */}
          <div className="flex items-center gap-3 mb-6">
            <span style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.38rem',
              letterSpacing: '0.15em',
              color: 'var(--color-brand-red)',
              border: '1px solid var(--color-brand-red)',
              padding: '0.3rem 0.7rem',
            }}>
              ⚠ CLASSIFIED
            </span>
            <span style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.32rem',
              letterSpacing: '0.08em',
              color: 'rgba(240,240,240,0.4)',
            }}>
              OPERATIVE FILE #001 · KANTO DIVISION
            </span>
          </div>

          {/* Wordmark */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              lineHeight: 0.88,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-white)',
              textShadow: '0 4px 60px rgba(0,0,0,0.8)',
            }}
          >
            GEN<span style={{ color: 'var(--color-brand-red)', textShadow: '0 0 80px rgba(227,0,15,0.4)' }}>WUNN</span>ER
          </h1>

          {/* Tagline */}
          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.42rem',
              letterSpacing: '0.18em',
              color: 'rgba(240,240,240,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Creator of PokéRage · Right Hand of Giovanni · Pallet Town, Kanto
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/wunnerdex" className="btn-primary">⚡ Enlist Now</Link>
            <a
              href={socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Stream the Arsenal
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 3, animation: 'fadeUp 1s 1.5s ease both', opacity: 0 }}
        >
          <span style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.32rem',
            color: 'rgba(240,240,240,0.3)',
            letterSpacing: '0.15em',
          }}>
            scroll
          </span>
          <div style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(227,0,15,0.6), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ── SECTION 2: ARSENAL ── */}
      <section
        className="px-4 py-20"
        style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.4rem',
              color: 'var(--color-brand-red)',
              letterSpacing: '0.1em',
            }}>
              // 001
            </span>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              The Arsenal
            </h2>
          </div>
          <p
            className="mb-10"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.36rem',
              color: 'var(--color-brand-off)',
              letterSpacing: '0.06em',
              paddingLeft: '3.5rem',
            }}
          >
            Pokémon deployed on the Kanto campaign — each song a weapon, each name an operative
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{
              background: 'var(--color-brand-gray-mid)',
              border: '1px solid var(--color-brand-gray-mid)',
            }}
          >
            {songs.map((song) => (
              <div
                key={song.title}
                className="group p-6 flex flex-col gap-4"
                style={{ background: 'var(--color-brand-gray)', position: 'relative' }}
              >
                {/* Red slash on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                  style={{ background: 'var(--color-brand-red)' }}
                />

                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.36rem',
                  letterSpacing: '0.06em',
                  color: 'var(--color-brand-red)',
                  border: '1px solid rgba(227,0,15,0.3)',
                  padding: '0.25rem 0.5rem',
                  alignSelf: 'flex-start',
                  background: 'rgba(227,0,15,0.06)',
                }}>
                  {song.tag}
                </span>

                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {song.title}
                  </h3>
                  <p className="mt-2" style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-brand-off)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                  }}>
                    {song.lore}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <a
                    href={song.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm flex-1 text-center"
                  >
                    Spotify
                  </a>
                  <a
                    href={song.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn-sm flex-1 text-center"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/music" className="btn-outline">Full Arsenal →</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CITY RAIDS ── */}
      <section
        className="px-4 py-20"
        style={{
          background: 'var(--color-brand-gray)',
          borderTop: '1px solid var(--color-brand-gray-mid)',
          borderBottom: '1px solid var(--color-brand-gray-mid)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.4rem',
              color: 'var(--color-brand-red)',
              letterSpacing: '0.1em',
            }}>
              // 002
            </span>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              City Raids
            </h2>
          </div>
          <p
            className="mb-10"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.36rem',
              color: 'var(--color-brand-off)',
              letterSpacing: '0.06em',
              paddingLeft: '3.5rem',
            }}
          >
            Active campaign — Genwunner spreading Team Rocket propaganda across Kanto and beyond
          </p>

          {shows && shows.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
              {shows.map((show: {
                id: string
                event_date: string
                city: string
                title: string
                venue?: string
                event_type?: string
                ticket_url?: string
                rsvp_url?: string
              }) => (
                <div
                  key={show.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 border-b group"
                  style={{ borderColor: 'var(--color-brand-gray-mid)' }}
                >
                  <div className="flex-shrink-0 text-center" style={{ minWidth: 72 }}>
                    <p style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.38rem',
                      color: 'var(--color-brand-red)',
                      letterSpacing: '0.1em',
                    }}>
                      {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.8rem',
                      lineHeight: 1,
                      color: 'var(--color-brand-white)',
                    }}>
                      {new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-white)',
                    }}>
                      {show.title}
                    </h3>
                    <p className="mt-1" style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.34rem',
                      color: 'var(--color-brand-off)',
                      letterSpacing: '0.05em',
                    }}>
                      // {show.city}{show.venue ? ` · ${show.venue}` : ''}{show.event_type ? ` · ${show.event_type}` : ''}
                    </p>
                  </div>

                  {(show.ticket_url || show.rsvp_url) && (
                    <a
                      href={show.ticket_url || show.rsvp_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem' }}
                    >
                      Get Tickets →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 border"
              style={{ borderColor: 'var(--color-brand-gray-mid)', borderStyle: 'dashed' }}
            >
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.4rem',
                color: 'var(--color-brand-off)',
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
              }}>
                Raids incoming.
              </p>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.34rem',
                color: '#444',
                letterSpacing: '0.06em',
                marginBottom: '1.5rem',
              }}>
                Enlist in the Wunnerdex to receive first alerts.
              </p>
              <Link href="/wunnerdex" className="btn-primary">Enlist Now →</Link>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/shows" className="btn-outline">All City Raids →</Link>
            <Link href="/book" className="btn-primary">Deploy Genwunner</Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ENLISTMENT ── */}
      <section
        className="px-4 py-20"
        style={{ borderBottom: '1px solid var(--color-brand-gray-mid)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Photo */}
          <div
            className="relative w-full lg:w-80 xl:w-96 aspect-[3/4] overflow-hidden flex-shrink-0 order-2 lg:order-1"
            style={{ border: '1px solid var(--color-brand-gray-mid)' }}
          >
            <Image
              src="/images/strip-laugh.jpg"
              alt="Genwunner laughing holding Pokémon packs"
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)' }}
            />
          </div>

          {/* Form */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="flex items-baseline gap-4 mb-2">
              <span style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.4rem',
                color: 'var(--color-brand-red)',
                letterSpacing: '0.1em',
              }}>
                // 003
              </span>
              <h2
                className="section-title"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                THE BOSS IS<br />WATCHING.
              </h2>
            </div>
            <p
              className="mb-6 mt-3"
              style={{
                fontSize: '0.88rem',
                color: 'var(--color-brand-off)',
                lineHeight: 1.75,
                maxWidth: 440,
              }}
            >
              Giovanni keeps records on every operative. Register in the Wunnerdex —
              get drops, city raid alerts, secret links, and Big Man Blastoise sightings
              before the civilians. Genwunner remembers who showed up early.
            </p>
            <WunnerdexSignupForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-14 px-4"
        style={{
          background: 'var(--color-brand-black)',
          borderTop: '1px solid var(--color-brand-gray-mid)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                color: 'var(--color-brand-white)',
              }}>
                GENWUNNER
              </p>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.34rem',
                color: 'var(--color-brand-red)',
                letterSpacing: '0.1em',
                marginTop: '0.25rem',
                marginBottom: '0.75rem',
              }}>
                Rocket Recruitment Regime · Kanto Division · Est. 2022
              </p>
              <p style={{
                fontSize: '0.78rem',
                color: 'var(--color-brand-off)',
                lineHeight: 1.7,
                maxWidth: 280,
              }}>
                Creator of PokéRage. Right hand of Giovanni. Pallet Town&apos;s most wanted.
                The regime is only getting started.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-1">
              {[
                { href: '/music',     label: 'Arsenal'     },
                { href: '/shows',     label: 'City Raids'  },
                { href: '/merch',     label: 'Supply Drop' },
                { href: '/wunnerdex', label: 'Enlist'      },
                { href: '/book',      label: 'Deploy'      },
                { href: '/epk',       label: 'Dossier'     },
                { href: '/contact',   label: 'Intel'       },
                { href: '/login',     label: 'HQ Access'   },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-off)',
                    display: 'block',
                    padding: '0.25rem 0',
                    transition: 'color 0.15s',
                  }}
                  className="hover:!text-[var(--color-brand-red)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {[
                { href: socialLinks.spotify,   label: 'Spotify'     },
                { href: socialLinks.apple,     label: 'Apple Music' },
                { href: socialLinks.instagram, label: 'Instagram'   },
                { href: socialLinks.tiktok,    label: 'TikTok'      },
                { href: socialLinks.youtube,   label: 'YouTube'     },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-off)',
                    transition: 'color 0.15s',
                  }}
                  className="hover:!text-[var(--color-brand-white)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6"
            style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}
          >
            <p style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.3rem',
              color: '#333',
              letterSpacing: '0.06em',
              lineHeight: 2,
            }}>
              © {new Date().getFullYear()} ROCKET RECRUITMENT REGIME · KANTO DIVISION · ALL INTEL RESERVED TO GIOVANNI
            </p>
            <p style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.28rem',
              color: '#2a2a2a',
              letterSpacing: '0.06em',
            }}>
              NOT AFFILIATED WITH THE POKÉMON COMPANY
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile spacer */}
      <div className="h-14 md:hidden" />

      {/* Scroll indicator animation */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.2); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function WunnerdexSignupForm() {
  return (
    <form action="/api/wunnerdex" method="POST" className="space-y-3 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="brand-label">Comms Channel (Email) *</label>
          <input type="email" name="email" required placeholder="your@email.com" className="brand-input" />
        </div>
        <div>
          <label className="brand-label">Secondary Comms (Phone)</label>
          <input type="tel" name="phone" placeholder="Optional" className="brand-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="brand-label">Home Territory *</label>
          <input type="text" name="city" required placeholder="City, State" className="brand-input" />
        </div>
        <div>
          <label className="brand-label">Pokémon Specialty</label>
          <input type="text" name="favorite_pokemon" placeholder="Favorite Pokémon?" className="brand-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="brand-label">Favorite Mission</label>
          <select name="favorite_song" className="brand-input">
            <option value="">Favorite Genwunner track...</option>
            <option>BLASTOISE!</option>
            <option>CHARIZARD!</option>
            <option>VENUSAUR!</option>
            <option>PSYDUCK!</option>
            <option>HITMONCHAN!</option>
            <option>GASTLY!</option>
          </select>
        </div>
        <div>
          <label className="brand-label">Field Handle</label>
          <input type="text" name="social_handle" placeholder="Instagram / TikTok @" className="brand-input" />
        </div>
      </div>
      <label
        className="flex items-start gap-3 cursor-pointer p-4"
        style={{ background: 'var(--color-brand-gray)', border: '1px solid var(--color-brand-gray-mid)' }}
      >
        <input
          type="checkbox"
          name="want_in_city"
          value="true"
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          style={{ accentColor: 'var(--color-brand-red)' }}
        />
        <span style={{ fontSize: '0.82rem', color: 'var(--color-brand-off)', lineHeight: 1.6 }}>
          I want Genwunner to raid my city — deploy a show or pop-up to my territory
        </span>
      </label>
      <button type="submit" className="btn-primary w-full py-4">
        ⚡ Report for Duty — Enlist in the Wunnerdex
      </button>
      <p style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: '0.3rem',
        color: '#333',
        textAlign: 'center',
        letterSpacing: '0.06em',
        lineHeight: 2,
      }}>
        No spam. Just drops, raids, and Big Man Blastoise sightings.
      </p>
    </form>
  )
}
