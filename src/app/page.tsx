// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/public/Nav'
import TerminalIntro from '@/components/public/TerminalIntro'
import { homepageFeaturedSongs, socialLinks, upcomingShows, artistStats, pressQuotes, products } from '@/data/content'
import { arsenalAscii } from '@/data/ascii'
import PressTicker from '@/components/public/PressTicker'
import WunnerdexForm from '@/components/public/WunnerdexForm'
import { createClient } from '@/lib/supabase/server'

function TermHead({
  text,
  size = 'lg',
  cursor = false,
  color = '#cc0000',
  dim,
  highlight,
}: {
  text: string
  size?: 'hero' | 'lg' | 'md' | 'sm'
  cursor?: boolean
  color?: string
  dim?: boolean
  highlight?: boolean
}) {
  const fontSize = {
    hero: 'clamp(2.2rem, 6vw, 5rem)',
    lg:   'clamp(1.6rem, 4vw, 3rem)',
    md:   'clamp(1.1rem, 2.5vw, 1.8rem)',
    sm:   'clamp(0.85rem, 1.8vw, 1.2rem)',
  }[size]

  return (
    <div style={{
      fontFamily: 'var(--font-heading), "Courier New", Courier, monospace',
      fontSize,
      fontWeight: 400,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      lineHeight: 1.1,
      display: 'flex',
      alignItems: 'stretch',
      gap: '0.12em',
      flexWrap: 'wrap' as const,
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        background: highlight ? '#e3000f' : 'transparent',
        color: highlight ? '#000' : dim ? '#880000' : color,
        padding: highlight ? '0.08em 0.18em' : undefined,
        textShadow: highlight || dim ? 'none' : '0 0 20px rgba(227,0,15,0.25)',
      }}>
        {text}
      </span>
      {cursor && (
        <span style={{
          display: 'block',
          width: highlight ? '0.55em' : '0.55em',
          alignSelf: 'stretch',
          background: '#e3000f',
          flexShrink: 0,
          animation: 'terminal-blink 0.9s step-end infinite',
          boxShadow: '0 0 10px rgba(227,0,15,0.8)',
        }} />
      )}
    </div>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: supabaseShows } = await supabase
    .from('shows')
    .select('*')
    .eq('status', 'upcoming')
    .gte('event_date', today)
    .order('event_date', { ascending: true })

  const shows = [...upcomingShows, ...(supabaseShows ?? [])]
    .filter(s => s.event_date >= today)
    .filter((show, index, self) =>
      index === self.findIndex(s => s.event_date === show.event_date && s.city === show.city)
    )
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 4)

  return (
    <div style={{ background: '#000', color: '#cc0000', minHeight: '100vh' }}>
      <TerminalIntro />
      <Nav />

      {/* ── SECTION 1: HERO ── */}
      <section
        className="hero-section"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column' as const,
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          borderBottom: '1px solid #1a0000',
          position: 'relative',
          overflow: 'hidden',
        }}>
        {/* Stage photo — desktop right side */}
        <div className="absolute right-0 top-0 bottom-0 hidden md:block" style={{ width: '42%' }}>
          <Image
            src="/images/hero-stage.jpg"
            alt="Genwunner"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.15) 70%, transparent 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, transparent 55%, #000 100%)',
          }} />
          <div className="absolute inset-0" style={{ background: 'rgba(227,0,15,0.04)' }} />
        </div>

        {/* Stage photo — mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image src="/images/hero-stage.jpg" alt="" fill className="object-cover object-top" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.85) 70%, #000 90%)' }} />
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 680 }}>
          {/* Classified tag */}
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.65rem',
            color: '#770000',
            letterSpacing: '0.15em',
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: '#e3000f' }}>⚠ CLASSIFIED</span>
            <span className="hidden md:inline">{' '}·{' '}</span>
            <span className="op-file">OPERATIVE FILE #001 · KANTO DIVISION</span>
          </div>

          <TermHead text="GENWUNNER" size="hero" cursor={true} highlight={true} />

          <div style={{ marginTop: '0.5rem' }}>
            <TermHead text="ROCKET RECRUITMENT REGIME" size="md" dim={true} />
          </div>

          {/* Dossier — hidden on mobile to keep text block short */}
          <div className="hidden md:block" style={{
            borderLeft: '2px solid #440000',
            paddingLeft: '1rem',
            marginTop: '1.5rem',
            maxWidth: 520,
          }}>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.8rem',
              color: '#aa0000',
              lineHeight: 1.9,
              letterSpacing: '0.04em',
              marginBottom: '0.6rem',
            }}>
              <span style={{ color: '#cc0000' }}>&gt; OPERATIVE: GENWUNNER.</span>{' '}
              Born Genesis Tajiri. Raised in Pallet Town. Joined Team Rocket instead of the Pokémon League.
            </p>
            <p style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.8rem',
              color: '#880000',
              lineHeight: 1.9,
              letterSpacing: '0.04em',
            }}>
              <span style={{ color: '#cc0000' }}>&gt; MISSION:</span>{' '}
              Conquer Kanto through PokéRage.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' as const }}>
            <Link href="/wunnerdex" className="btn-primary">[ ENLIST NOW ]</Link>
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="btn-outline">[ STREAM THE ARSENAL ]</a>
            <Link href="/shows" className="btn-outline">[ CITY RAIDS ]</Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        borderBottom: '1px solid #1a0000',
      }}>
        {artistStats.map((stat, i) => (
          <div key={stat.label} style={{
            padding: '1.1rem 0.85rem',
            borderRight: i < artistStats.length - 1 ? '1px solid #0d0000' : 'none',
          }}>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── SECTION 2: ARSENAL ── */}
      <section style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 700, color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            // 001 · DEPLOYED OPERATIVES
          </div>
          <TermHead text="THE ARSENAL" size="lg" cursor={true} />
          <div className="dt-body" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#770000', letterSpacing: '0.06em', marginTop: '0.4rem' }}>
            &gt; Each song a weapon. Each name an operative. Propaganda deployed on the Kanto campaign.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#0d0000',
          border: '1px solid #0d0000',
        }}>
          {homepageFeaturedSongs.map(song => {

            return (
              <div key={song.title} className="brand-card arsenal-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div className="arsenal-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                  <div className={song.isNewest ? 'mobile-hidden' : 'arsenal-card-tag-text'} style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '0.75rem',
                    color: '#770000',
                    letterSpacing: '0.06em',
                    border: '1px solid #1a0000',
                    padding: '0.18rem 0.45rem',
                    display: 'inline-block',
                  }}>
                    {song.tag}
                  </div>
                  {song.isNewest && (
                    <div className="arsenal-newest-badge" style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '0.6rem',
                      color: '#000',
                      background: '#e3000f',
                      padding: '0.18rem 0.5rem',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                      animation: 'terminal-blink 1.2s step-end infinite',
                      display: 'inline-block',
                    }}>
                      ⚡ WILD GYARADOS APPEARED
                    </div>
                  )}
                </div>
                {arsenalAscii[song.title] && (
                  <div className="arsenal-art-container" style={{ height: 'clamp(7.5rem, 16.7vw, 15.5rem)', overflow: 'hidden', margin: '0.4rem 0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <pre style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: 'clamp(0.18rem, 0.42vw, 0.38rem)',
                      lineHeight: 1.2,
                      color: '#aa0000',
                      margin: 0,
                      whiteSpace: 'pre',
                      flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
                    className={`arsenal-ascii${
                        song.title === 'PSYDUCK!'    ? ' arsenal-art-psyduck'    :
                        song.title === 'BLASTOISE!'  ? ' arsenal-art-blastoise'  :
                        song.title === 'CHARIZARD!'  ? ' arsenal-art-charizard'  :
                        song.title === 'VENUSAUR!'   ? ' arsenal-art-venusaur'   :
                        song.title === 'GENGAR!'     ? ' arsenal-art-gengar'     :
                        song.title === 'GYARADOS!'   ? ' arsenal-art-gyarados'   : ''
                      }`}
                    >
                      {arsenalAscii[song.title]}
                    </pre>
                  </div>
                )}
                <TermHead text={song.title} size="sm" color="#cc0000" />
                <p className="hidden md:block dt-lore" style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '0.85rem',
                  color: '#880000',
                  lineHeight: 1.7,
                  marginTop: '0.4rem',
                  fontStyle: 'italic',
                  letterSpacing: '0.03em',
                }}>
                  {song.lore}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '0.65rem' }}>
                  <a href={song.hypeddit} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    [ STREAM ]
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <Link href="/music" className="btn-outline">[ FULL ARSENAL → ]</Link>
        </div>
      </section>

      {/* ── SECTION 3: CITY RAIDS ── */}
      <section style={{ padding: '2.5rem 1.5rem', background: '#030000', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 700, color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            // 002 · ACTIVE CAMPAIGN
          </div>
          <TermHead text="CITY RAIDS" size="lg" cursor={true} />
          <div className="dt-body" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#770000', letterSpacing: '0.06em', marginTop: '0.4rem' }}>
            &gt; Expanding the regime&apos;s reach across Kanto and beyond
          </div>
        </div>

        <div style={{ borderTop: '1px solid #0a0000' }}>
          {shows.length > 0 ? shows.map((show: {
            id: string; event_date: string; city: string; title: string;
            venue?: string; ticket_url?: string; rsvp_url?: string
          }) => (
            <div key={show.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0.85rem 0',
              borderBottom: '1px solid #0a0000',
            }}>
              <div style={{ textAlign: 'center', minWidth: 52, flexShrink: 0 }}>
                <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.55rem', color: '#770000', letterSpacing: '0.1em' }}>
                  {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div style={{ fontFamily: '"Courier New", monospace', fontSize: '1.5rem', fontWeight: 700, color: '#cc0000', lineHeight: 1 }}>
                  {new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <TermHead text={show.title} size="sm" color="#aa0000" />
                <div className="dt-sub" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem', color: '#770000', letterSpacing: '0.04em', marginTop: '0.2rem' }}>
                  // {show.city}{show.venue ? ` · ${show.venue}` : ''}
                </div>
              </div>
              {(show.ticket_url || show.rsvp_url) && (
                <a href={show.ticket_url || show.rsvp_url || '#'} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.55rem', padding: '0.28rem 0.6rem', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
                  GET TICKETS →
                </a>
              )}
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed #1a0000', marginTop: '1rem' }}>
              <div className="dt-body" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#770000', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                &gt; Raids incoming. Stand by.
              </div>
              <Link href="/wunnerdex" className="btn-primary">[ ENLIST FOR EARLY ALERTS ]</Link>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          <Link href="/shows" className="btn-outline">[ ALL CITY RAIDS → ]</Link>
          <Link href="/book" className="btn-primary">[ DEPLOY GENWUNNER ]</Link>
        </div>
      </section>

      {/* ── DISCORD BANNER ── */}
      <section className="discord-banner-section" style={{
        background: '#e3000f',
        padding: '2rem 1.5rem',
        borderBottom: '1px solid #880000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap' as const,
      }}>
        <div className="discord-banner-text">
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem', fontWeight: 700, color: 'rgba(0,0,0,0.7)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
            // THE REGIME HAS A HOME BASE
          </div>
          <div style={{ fontFamily: 'var(--font-heading), "Courier New", Courier, monospace', fontWeight: 400, fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', color: '#000', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
            JOIN THE DISCORD
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.06em', marginTop: '0.4rem', lineHeight: 1.8 }}>
            City raid alerts · classified drops<span className="block md:inline"> · Giovanni&apos;s journal</span>
          </div>
        </div>
        <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#e3000f',
          background: '#000',
          border: '1px solid #000',
          padding: '0.6rem 1.5rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap' as const,
          flexShrink: 0,
        }}>
          [ ENTER HQ → ]
        </a>
      </section>

      {/* ── SECTION 3: SUPPLY DROP ── */}
      <section style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 700, color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            // 003 · SUPPLY DROP
          </div>
          <TermHead text="SUPPLY DROP" size="lg" cursor={true} />
          <div className="dt-body" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#770000', letterSpacing: '0.06em', marginTop: '0.4rem' }}>
            &gt; Official Regime gear. Represent the RRR.
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3"
          style={{ gap: '1px', background: '#0d0000', border: '1px solid #0d0000', marginBottom: '1.25rem' }}
        >
          {products.slice(0, 6).map(p => (
            <a
              key={p.handle}
              href={`https://genwunnr.myshopify.com/products/${p.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group brand-card"
              style={{ display: 'block', textDecoration: 'none', padding: 0 }}
            >
              <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: 'rgba(227,0,15,0.15)' }}
                />
                <div
                  className="absolute left-0 top-0 bottom-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-bottom"
                  style={{ width: 3, background: '#e3000f' }}
                />
              </div>
              <div style={{ padding: '0.6rem', borderTop: '1px solid #0d0000', textAlign: 'center' }}>
                <div
                  className="group-hover:text-[#e3000f]"
                  style={{ fontFamily: 'var(--font-heading), "Courier New", Courier, monospace', fontWeight: 400, fontSize: 'clamp(0.6rem, 1.6vw, 1.1rem)', color: '#cc0000', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.25rem', transition: 'color 0.12s' }}
                >
                  {p.title}
                </div>
                <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#e3000f', fontWeight: 700, letterSpacing: '0.06em' }}>
                  {p.price}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/merch" className="btn-outline">[ FULL SUPPLY DROP → ]</Link>
        </div>
      </section>

      {/* ── SECTION 4: ENLISTMENT ── */}
      <section style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #1a0000' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: 'clamp(1.1rem, 3vw, 2rem)', fontWeight: 700, color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            // RRR DATABASE
          </div>
          <TermHead text="THE BOSS IS WATCHING." size="lg" cursor={true} />
          <div className="dt-body" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#770000', letterSpacing: '0.06em', marginTop: '0.4rem' }}>
            &gt; Giovanni keeps records on every operative
          </div>
        </div>

        <div className="enlist-grid" style={{ display: 'grid', gap: '1rem', alignItems: 'start' }}>
          <div>
            <div className="hidden md:block">
              {[
                'Early access to drops & collector editions',
                'City Raid alerts before public announce',
                'Classified mission intel from HQ',
                'Exclusive Grunt status & Wunnerdex ID',
                'Direct comms from the operative himself',
                'Unlock #the-vault on Discord',
              ].map(perk => (
                <div key={perk} className="dt-sub" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.68rem', color: '#880000', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.5rem', lineHeight: 1.6, letterSpacing: '0.04em' }}>
                  <span style={{ color: '#e3000f', flexShrink: 0 }}>&gt;</span>
                  {perk}
                </div>
              ))}
            </div>
          </div>
          <WunnerdexForm />
        </div>
      </section>

      {/* ── PRESS QUOTE ── */}
      <PressTicker quotes={pressQuotes} />

      {/* ── FOOTER ── */}
      <footer style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
          <div>
            <TermHead text="GENWUNNER" size="md" color="#cc0000" />
            <div className="hidden md:block" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.48rem', color: '#550000', letterSpacing: '0.08em', margin: '0.35rem 0 0.75rem' }}>
              ROCKET RECRUITMENT REGIME · KANTO DIVISION · EST. 1996
            </div>
            <div className="dt-foot" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem', color: '#660000', lineHeight: 1.8, letterSpacing: '0.04em' }}>
              Creator of PokéRage.<br />
              Right hand of Giovanni.<br />
              Pallet Town&apos;s most wanted.
            </div>
          </div>
          {[
            { title: '// Navigate', links: [
              { href: '/music',     label: 'Arsenal'     },
              { href: '/shows',     label: 'City Raids'  },
              { href: '/merch',     label: 'Supply Drop' },
              { href: '/wunnerdex', label: 'Enlist'      },
              { href: '/book',      label: 'Deploy'      },
              { href: '/epk',       label: 'Dossier'     },
              { href: '/contact',   label: 'Intel'       },
            ]},
            { title: '// Transmissions', links: [
              { href: socialLinks.spotify,   label: 'Spotify'     },
              { href: socialLinks.apple,     label: 'Apple Music' },
              { href: socialLinks.youtube,   label: 'YouTube'     },
              { href: socialLinks.tiktok,    label: 'TikTok'      },
              { href: socialLinks.instagram, label: 'Instagram'   },
              { href: socialLinks.discord,   label: 'Discord'     },
              { href: socialLinks.twitter,   label: 'X / Twitter' },
            ]},
            { title: '// Operations', links: [
              { href: '/book',    label: 'Book / Deploy' },
              { href: '/epk',     label: 'Press / EPK'   },
              { href: '/contact', label: 'Management'    },
            ]},
          ].map(col => (
            <div key={col.title}>
              <div className="dt-foot-col" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.52rem', color: '#660000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <Link key={link.label} href={link.href} className="dt-foot-link" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#660000', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', padding: '0.18rem 0', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #0d0000', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
          <div className="dt-copy" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.44rem', color: '#550000', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} ROCKET RECRUITMENT REGIME · KANTO DIVISION · ALL INTEL RESERVED TO GIOVANNI
          </div>
          <div className="dt-copy" style={{ fontFamily: '"Courier New", monospace', fontSize: '0.42rem', color: '#440000', letterSpacing: '0.05em' }}>
            NOT AFFILIATED WITH THE POKÉMON COMPANY
          </div>
        </div>
      </footer>

      <div style={{ height: '3.5rem' }} className="md:hidden" />
    </div>
  )
}

