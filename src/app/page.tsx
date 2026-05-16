// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/public/Nav'
import TerminalIntro from '@/components/public/TerminalIntro'
import { songs, socialLinks, upcomingShows, artistStats } from '@/data/content'
import { createClient } from '@/lib/supabase/server'

// ── ASCII block headings — same characters as the terminal intro ──
// Built from Courier New monospace block chars, not a font
const ASCII = {
  genwunner: [
    ' ███████ ████████████   ██████    ██████   ███████   ███████   ██████████████████ ',
    '████████ █████████████  ██████    ██████   ████████  ████████  ███████████████████',
    '███  ████████  ██████ ██████ ██ ██████   █████████ █████████ ████████  ████████',
    '███   ███████  ███████████████████████   █████████████████████████████  ████████',
    '████████████████████ ████████████████████████ █████████ █████████████████  ███',
    ' ███████ █████████████  █████ ████████  ███████ ███  ████████  ████████████████  ███',
  ],
  arsenal: [
    ' ██████ ███████ ██████████████████   ███ ██████ ███     ',
    '█████████████████████████████████████  █████████████     ',
    '█████████████████████████████  ██████ ████████████████     ',
    '█████████████████████████████  ███████████████████████     ',
    '███  ██████  ██████████████████████ ████████  █████████████',
    '███  ██████  ████████████████████  ████████  █████████████',
  ],
  cityRaids: [
    ' ██████████████████████   ███    ███████  ██████ ██████████ ████████',
    '████████████████████████ ████    █████████████████████████████████████',
    '███     ███   ███    ███████     ████████████████████████  ███████████ ',
    '███     ███   ███     █████      ████████████████████████  ███████████ ',
    '█████████████   ███      ███       ███  ██████  ██████████████████████ ',
    ' ██████████   ███      ███       ███  ██████  ███████████████ ████████ ',
  ],
  theBoss: [
    '████████████  ███████████    ███████  ███████ ██████████████████',
    '████████████  ███████████    █████████████████████████████████████',
    '   ███   █████████████████      █████████   ███████████████████████',
    '   ███   █████████████████      █████████   ███████████████████████',
    '   ███   ███  █████████████    █████████████████████████████████████',
    '   ███   ███  █████████████    ███████  ███████ ██████████████████',
  ],
}

function ASCIIHeading({ lines, color = '#cc0000', dim = '#880000', scale = 1 }: {
  lines: string[]
  color?: string
  dim?: string
  scale?: number
}) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: `clamp(0.28rem, ${0.55 * scale}vw, ${0.65 * scale}rem)`,
          color: i === 0 ? dim : i === lines.length - 1 ? dim : color,
          whiteSpace: 'pre',
          lineHeight: 1.25,
          letterSpacing: '0.02em',
          textShadow: `0 0 12px rgba(227,0,15,0.4)`,
        }}>
          {line}
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: supabaseShows } = await supabase
    .from('shows')
    .select('*')
    .eq('is_upcoming', true)
    .order('event_date', { ascending: true })

  const shows = [...upcomingShows, ...(supabaseShows ?? [])]
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 4)

  return (
    <div style={{ background: '#000', color: '#cc0000', minHeight: '100vh' }}>
      <TerminalIntro />
      <Nav />

      {/* ── SECTION 1: HERO ── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        borderBottom: '1px solid #1a0000',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Photo — right side desktop */}
        <div className="absolute right-0 top-0 bottom-0 hidden md:block" style={{ width: '42%' }}>
          <Image
            src="/images/hero-stage.jpg"
            alt="Genwunner"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.2) 70%, transparent 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, transparent 50%, #000 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'rgba(227,0,15,0.05)',
            mixBlendMode: 'multiply',
          }} />
        </div>

        {/* Mobile photo */}
        <div className="absolute inset-0 md:hidden">
          <Image src="/images/hero-stage.jpg" alt="" fill className="object-cover object-top" style={{ opacity: 0.25 }} priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, #000 80%)' }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3 }} className="max-w-full md:max-w-[62%]">

          {/* Tag line */}
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.6rem',
            color: '#550000',
            letterSpacing: '0.15em',
            marginBottom: '2rem',
          }}>
            <span style={{ color: '#e3000f' }}>⚠ CLASSIFIED</span>
            {' '}·{' '}OPERATIVE FILE #001 · KANTO DIVISION
          </div>

          {/* ASCII GENWUNNER heading */}
          <ASCIIHeading lines={ASCII.genwunner} scale={1} />

          {/* Dossier copy */}
          <div style={{
            borderLeft: '2px solid #330000',
            paddingLeft: '1rem',
            marginTop: '1.5rem',
            maxWidth: 520,
          }}>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.65rem',
              color: '#660000',
              lineHeight: 1.9,
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
            }}>
              <span style={{ color: '#cc0000' }}>&gt; OPERATIVE: GENWUNNER.</span>{' '}
              Born Genesis Tajiri. Raised in Pallet Town alongside Ash Ketchum and Gary Oak.
              Forsook the Pokémon League. Joined Team Rocket instead.
            </p>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.65rem',
              color: '#550000',
              lineHeight: 1.9,
              letterSpacing: '0.04em',
            }}>
              <span style={{ color: '#cc0000' }}>&gt; MISSION:</span>{' '}
              Conquer Kanto. One city at a time. One song at a time.
              Creator of PokéRage. Right hand of Giovanni.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/wunnerdex" className="btn-primary">[ ENLIST NOW ]</Link>
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="btn-outline">[ STREAM THE ARSENAL ]</a>
            <Link href="/shows" className="btn-outline">[ CITY RAIDS ]</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        borderBottom: '1px solid #1a0000',
      }}>
        {artistStats.map((stat, i) => (
          <div key={stat.label} style={{
            padding: '1.25rem 1rem',
            borderRight: i < artistStats.length - 1 ? '1px solid #0d0000' : 'none',
          }}>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── TRANSMISSION BANNER ── */}
      <div style={{
        background: '#060000',
        borderBottom: '1px solid #1a0000',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.5rem',
          color: '#e3000f',
          border: '1px solid #440000',
          padding: '0.2rem 0.5rem',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          // INCOMING
        </span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.6rem',
            color: '#880000',
            letterSpacing: '0.05em',
          }}>
            THE ROCKET RECRUITMENT REGIME TOUR — EU 2026
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.44rem',
            color: '#440000',
            marginTop: '0.2rem',
            letterSpacing: '0.04em',
          }}>
            &gt; OCT 2 Birmingham · OCT 4 Manchester · OCT 5 Glasgow · OCT 7 London
          </div>
        </div>
        <Link href="/shows" className="btn-outline" style={{ fontSize: '0.5rem', padding: '0.3rem 0.65rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
          VIEW ALL RAIDS &gt;
        </Link>
      </div>

      {/* ── SECTION 2: ARSENAL ── */}
      <section style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#e3000f',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            // 001 · DEPLOYED OPERATIVES
          </div>
          <ASCIIHeading lines={ASCII.arsenal} scale={0.85} />
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#440000',
            letterSpacing: '0.06em',
            marginTop: '0.5rem',
          }}>
            &gt; Each song a weapon. Each name an operative.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#0d0000',
          border: '1px solid #0d0000',
        }}>
          {songs.map(song => (
            <div key={song.title} className="brand-card" style={{ padding: '1rem' }}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.42rem',
                color: '#660000',
                letterSpacing: '0.06em',
                border: '1px solid #1a0000',
                padding: '0.15rem 0.35rem',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}>
                {song.tag}
              </div>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)',
                fontWeight: 700,
                color: '#cc0000',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                {song.title}
              </div>
              <p style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.48rem',
                color: '#440000',
                lineHeight: 1.8,
                fontStyle: 'italic',
                letterSpacing: '0.03em',
              }}>
                {song.lore}
              </p>
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.65rem' }}>
                <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  Spotify
                </a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <Link href="/music" className="btn-outline">[ FULL ARSENAL → ]</Link>
        </div>
      </section>

      {/* ── SECTION 3: CITY RAIDS ── */}
      <section style={{ padding: '2.5rem 1.5rem', background: '#030000', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#e3000f',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            // 002 · ACTIVE CAMPAIGN
          </div>
          <ASCIIHeading lines={ASCII.cityRaids} scale={0.85} />
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#440000',
            letterSpacing: '0.06em',
            marginTop: '0.5rem',
          }}>
            &gt; Genwunner spreading Team Rocket propaganda across Kanto and beyond
          </div>
        </div>

        <div style={{ borderTop: '1px solid #0a0000' }}>
          {shows.length > 0 ? shows.map((show: {
            id: string; event_date: string; city: string; title: string;
            venue?: string; event_type?: string; ticket_url?: string; rsvp_url?: string
          }) => (
            <div key={show.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0.9rem 0',
              borderBottom: '1px solid #0a0000',
            }}>
              <div style={{ textAlign: 'center', minWidth: 56, flexShrink: 0 }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '0.46rem',
                  color: '#660000',
                  letterSpacing: '0.1em',
                }}>
                  {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#cc0000',
                  lineHeight: 1,
                }}>
                  {new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#aa0000',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {show.title}
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '0.46rem',
                  color: '#440000',
                  letterSpacing: '0.04em',
                  marginTop: '0.15rem',
                }}>
                  // {show.city}{show.venue ? ` · ${show.venue}` : ''}
                </div>
              </div>
              {(show.ticket_url || show.rsvp_url) && (
                <a
                  href={show.ticket_url || show.rsvp_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: '0.5rem', padding: '0.3rem 0.65rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  GET TICKETS →
                </a>
              )}
            </div>
          )) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              border: '1px dashed #1a0000',
              marginTop: '1rem',
            }}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.5rem',
                color: '#440000',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                &gt; Raids incoming. Stand by.
              </div>
              <Link href="/wunnerdex" className="btn-primary">[ ENLIST FOR EARLY ALERTS ]</Link>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/shows" className="btn-outline">[ ALL CITY RAIDS → ]</Link>
          <Link href="/book" className="btn-primary">[ DEPLOY GENWUNNER ]</Link>
        </div>
      </section>

      {/* ── DISCORD BANNER ── */}
      <section style={{
        background: '#e3000f',
        padding: '2rem 1.5rem',
        borderBottom: '1px solid #880000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.48rem',
            color: 'rgba(0,0,0,0.5)',
            letterSpacing: '0.15em',
            marginBottom: '0.4rem',
          }}>
            // THE REGIME HAS A HOME BASE
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            fontWeight: 700,
            color: '#000',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            JOIN THE DISCORD
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.48rem',
            color: 'rgba(0,0,0,0.55)',
            letterSpacing: '0.06em',
            marginTop: '0.4rem',
            lineHeight: 1.9,
          }}>
            City raid alerts · classified drops · Giovanni&apos;s journal · direct line
          </div>
        </div>
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#e3000f',
            background: '#000',
            border: '1px solid #000',
            padding: '0.6rem 1.5rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          [ ENTER HQ → ]
        </a>
      </section>

      {/* ── SECTION 4: ENLISTMENT ── */}
      <section style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#e3000f',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            // 003 · GRUNT REGISTRATION
          </div>
          <ASCIIHeading lines={ASCII.theBoss} scale={0.85} />
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.5rem',
            color: '#440000',
            letterSpacing: '0.06em',
            marginTop: '0.5rem',
          }}>
            &gt; Giovanni keeps records on every operative
          </div>
        </div>

        <div style={{ display: 'grid', gap: '2rem', alignItems: 'start' }} className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.58rem',
              color: '#550000',
              lineHeight: 1.85,
              letterSpacing: '0.04em',
              marginBottom: '1rem',
            }}>
              Register in the Wunnerdex.{' '}
              <span style={{ color: '#aa0000' }}>Genwunner remembers who showed up early.</span>
            </p>
            {[
              'Early access to drops & collector editions',
              'City Raid alerts before public announce',
              'Classified mission intel from HQ',
              'Exclusive Grunt status & Wunnerdex ID',
              'Direct comms from the operative himself',
              'Unlock #the-vault on Discord',
            ].map(perk => (
              <div key={perk} style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.52rem',
                color: '#660000',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.4rem',
                marginBottom: '0.45rem',
                lineHeight: 1.6,
              }}>
                <span style={{ color: '#e3000f', flexShrink: 0 }}>&gt;</span>
                {perk}
              </div>
            ))}
          </div>

          <WunnerdexSignupForm />
        </div>
      </section>

      {/* ── PRESS QUOTE ── */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #1a0000',
        textAlign: 'center',
        background: '#030000',
      }}>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.46rem',
          color: '#440000',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem',
        }}>
          // INTERCEPTED CIVILIAN TRANSMISSION
        </div>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: 'clamp(0.7rem, 1.8vw, 1rem)',
          color: '#880000',
          letterSpacing: '0.05em',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}>
          &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
        </div>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.5rem',
          color: '#e3000f',
          letterSpacing: '0.18em',
          marginTop: '0.65rem',
        }}>
          — KOTAKU
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '2.5rem 1.5rem', borderTop: '1px solid #1a0000' }}>
        <div style={{ gap: '2rem', marginBottom: '1.5rem' }} className="grid grid-cols-1 md:grid-cols-4">
          <div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#cc0000',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              GENWUNNER
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.38rem',
              color: '#330000',
              letterSpacing: '0.08em',
              margin: '0.25rem 0 0.75rem',
            }}>
              ROCKET RECRUITMENT REGIME · KANTO DIVISION · EST. 2022
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.5rem',
              color: '#330000',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
            }}>
              Creator of PokéRage. Right hand of Giovanni.<br />
              Pallet Town&apos;s most wanted.<br />
              The regime is only getting started.
            </div>
          </div>

          {[
            {
              title: '// Navigate',
              links: [
                { href: '/music',     label: 'Arsenal'     },
                { href: '/shows',     label: 'City Raids'  },
                { href: '/merch',     label: 'Supply Drop' },
                { href: '/wunnerdex', label: 'Enlist'      },
                { href: '/book',      label: 'Deploy'      },
                { href: '/epk',       label: 'Dossier'     },
                { href: '/contact',   label: 'Intel'       },
              ],
            },
            {
              title: '// Transmissions',
              links: [
                { href: socialLinks.spotify,   label: 'Spotify'     },
                { href: socialLinks.apple,     label: 'Apple Music' },
                { href: socialLinks.youtube,   label: 'YouTube'     },
                { href: socialLinks.tiktok,    label: 'TikTok'      },
                { href: socialLinks.instagram, label: 'Instagram'   },
                { href: socialLinks.discord,   label: 'Discord'     },
                { href: socialLinks.twitter,   label: 'X / Twitter' },
              ],
            },
            {
              title: '// Operations',
              links: [
                { href: '/book',             label: 'Book / Deploy' },
                { href: '/epk',              label: 'Press / EPK'   },
                { href: '/contact',          label: 'Management'    },
                { href: socialLinks.discord, label: 'Discord HQ'    },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.44rem',
                color: '#550000',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
              }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '0.6rem',
                    color: '#380000',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block',
                    padding: '0.2rem 0',
                    textDecoration: 'none',
                    transition: 'color 0.12s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid #0d0000',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.35rem',
            color: '#1e0000',
            letterSpacing: '0.06em',
            lineHeight: 1.8,
          }}>
            © {new Date().getFullYear()} ROCKET RECRUITMENT REGIME · KANTO DIVISION · ALL INTEL RESERVED TO GIOVANNI
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.32rem',
            color: '#150000',
            letterSpacing: '0.05em',
          }}>
            NOT AFFILIATED WITH THE POKÉMON COMPANY
          </div>
        </div>
      </footer>

      {/* Mobile spacer */}
      <div style={{ height: '3.5rem' }} className="md:hidden" />
    </div>
  )
}

function WunnerdexSignupForm() {
  return (
    <div style={{
      background: '#050000',
      border: '1px solid #440000',
      padding: '1.25rem',
      position: 'relative',
    }}>
      {/* Inner border */}
      <div style={{
        position: 'absolute',
        top: 5, left: 5, right: 5, bottom: 5,
        border: '1px solid #1a0000',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
        <div style={{
          width: 34, height: 34,
          background: '#e3000f',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          flexShrink: 0,
        }}>
          ⚡
        </div>
        <div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#cc0000',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            GRUNT REG.
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.38rem',
            color: '#550000',
            letterSpacing: '0.07em',
          }}>
            // WUNNERDEX · TEAM ROCKET DATABASE
          </div>
        </div>
      </div>

      <form action="/api/wunnerdex" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label className="brand-label">Trainer Name</label>
        <input type="text" name="name" className="brand-input" placeholder="your name" />
        <label className="brand-label">Home Territory</label>
        <input type="text" name="city" className="brand-input" placeholder="city, state / country" />
        <label className="brand-label">Comms Channel (Email) *</label>
        <input type="email" name="email" required className="brand-input" placeholder="your@email.com" />
        <button type="submit" className="btn-primary" style={{ marginTop: '0.25rem', width: '100%', justifyContent: 'center' }}>
          [ REPORT FOR DUTY ]
        </button>
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.32rem',
          color: '#1e0000',
          textAlign: 'center',
          letterSpacing: '0.06em',
          lineHeight: 1.8,
          marginTop: '0.25rem',
        }}>
          WUNNERDEX v1.0 · NO SPAM · JUST DROPS AND RAIDS
        </div>
      </form>
    </div>
  )
}
