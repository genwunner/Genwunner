import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/public/Nav'
import PackOpeningIntro from '@/components/public/PackOpeningIntro'
import { artistStats, songs, latestRelease, socialLinks, FEATURED_VIDEO_ID } from '@/data/content'
import { createClient } from '@/lib/supabase/server'

const fighterPhotos = [
  { src: '/images/strip-jacket.jpg', alt: 'Genwunner custom Pokémon denim jacket on stage', label: 'On Tour' },
  { src: '/images/strip-crowd.jpg', alt: 'Genwunner live on stage, leaning into crowd', label: 'Live' },
  { src: '/images/motion-stage.jpg', alt: 'Genwunner on stage — motion blur', label: 'Pure Rage' },
  { src: '/images/strip-cards.jpg', alt: 'Genwunner holding Pokémon cards', label: 'Collector' },
  { src: '/images/strip-varsity.jpg', alt: 'Genwunner in Blastoise varsity jacket', label: 'Blastoise' },
  { src: '/images/strip-reach.jpg', alt: 'Genwunner reaching toward the crowd', label: 'The Raid' },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: shows } = await supabase
    .from('shows')
    .select('*')
    .eq('is_upcoming', true)
    .order('event_date', { ascending: true })
    .limit(3)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <PackOpeningIntro />
      <Nav />

      {/* offset: 24px ticker + 56px nav */}
      <div style={{ height: 80 }} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col lg:flex-row items-stretch relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 60% at 72% 40%, rgba(227,0,15,0.13) 0%, transparent 65%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 50% at 10% 85%, rgba(42,109,245,0.06) 0%, transparent 55%)' }} />
          <div className="absolute" style={{ top: 0, right: '18%', width: 1, height: '55%', background: 'linear-gradient(to bottom, transparent, rgba(227,0,15,0.5), transparent)', transform: 'rotate(10deg)' }} />
        </div>

        <div className="flex-1 flex flex-col justify-end lg:justify-center px-6 lg:px-12 xl:px-20 py-20 lg:py-0 z-10 max-w-3xl mx-auto lg:mx-0">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', letterSpacing: '0.15em', color: 'var(--color-brand-red)', border: '1px solid var(--color-brand-red)', padding: '0.3rem 0.7rem' }}>
              ⚠ CLASSIFIED
            </span>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.35rem', letterSpacing: '0.08em', color: 'var(--color-brand-off)' }}>
              OPERATIVE FILE #001 · KANTO DIVISION
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 13vw, 10rem)', lineHeight: 0.9, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-brand-white)' }}>
            <span style={{ WebkitTextStroke: '1px rgba(240,240,240,0.25)', color: 'transparent' }}>ROCKET</span><br />
            RECRUIT<br />
            <span style={{ color: 'var(--color-brand-red)', textShadow: '0 0 60px rgba(227,0,15,0.3)' }}>MENT</span><br />
            REGIME.
          </h1>

          <div className="mt-6 max-w-lg" style={{ borderLeft: '2px solid var(--color-brand-red)', paddingLeft: '1.25rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-brand-off)', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--color-brand-white)', fontWeight: 500 }}>Operative: GENWUNNER.</strong>{' '}
              Born Genesis Tajiri. Raised in Pallet Town alongside Ash Ketchum and Gary Oak. Forsook the Pokémon League. Joined Team Rocket instead.
            </p>
            <p className="mt-3" style={{ fontSize: '0.9rem', color: 'var(--color-brand-off)', lineHeight: 1.75 }}>
              Appointed by Giovanni to lead the newly formed RRR — tasked with spreading Team Rocket&apos;s message through high-octane lyricism and face-melting production. 1B+ UGC propaganda views. 543K monthly operatives.
            </p>
            <p className="mt-3" style={{ fontSize: '0.9rem', color: 'var(--color-brand-off)', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--color-brand-white)', fontWeight: 500 }}>The mission:</strong>{' '}
              Conquer Kanto. One city at a time. One song at a time. Will you answer the call?
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/wunnerdex" className="btn-primary">⚡ Enlist Now</Link>
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="btn-outline">Stream the Arsenal</a>
            <Link href="/shows" className="btn-outline">City Raids</Link>
          </div>
        </div>

        <div className="hidden lg:block relative w-[440px] xl:w-[520px] flex-shrink-0">
          <Image src="/images/hero-stage.jpg" alt="Genwunner performing live" fill className="object-cover object-top" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--color-brand-black) 0%, rgba(8,8,8,0.15) 40%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 40%)' }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="grid border-t border-b" style={{ borderColor: 'var(--color-brand-gray-mid)', gridTemplateColumns: `repeat(${artistStats.length}, 1fr)` }}>
        {artistStats.map((stat, i) => (
          <div key={stat.label} className="py-6 px-4 text-center" style={{ borderRight: i < artistStats.length - 1 ? '1px solid var(--color-brand-gray-mid)' : 'none' }}>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── ACTIVE TRANSMISSION ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5 border-b" style={{ background: 'var(--color-brand-gray)', borderColor: 'var(--color-brand-gray-mid)' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', letterSpacing: '0.1em', color: 'var(--color-brand-red)', border: '1px solid var(--color-brand-red)', padding: '0.3rem 0.65rem', flexShrink: 0 }}>
          // INCOMING
        </span>
        <div className="flex-1">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            The Rocket Recruitment Regime Tour — Kanto + EU 2026
          </p>
          <p className="mt-0.5" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.06em' }}>
            // 10-date EU leg begins OCT 1 · w/ Cam Steady &amp; NateWantsToBattle · Ends OCT 21
          </p>
        </div>
        <Link href="/shows" className="btn-outline" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem' }}>
          View All Raids →
        </Link>
      </div>

      {/* ── FIGHTER SELECT ── */}
      <section className="py-20 px-4">
        <div className="text-center mb-12">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 001 · OPERATIVE DOSSIER</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>SELECT YOUR FIGHTER</h2>
          <p className="mt-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'var(--color-brand-off)', letterSpacing: '0.08em' }}>Choose your side. Join the raid.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 justify-start lg:justify-center px-2" style={{ scrollbarWidth: 'none' }}>
          {fighterPhotos.map(({ src, alt, label }) => (
            <div key={src} className="group relative flex-shrink-0 cursor-pointer" style={{ width: 180, paddingTop: 56 }}>
              <div className="relative transition-all duration-300" style={{ height: 280, overflow: 'visible', border: '1px solid var(--color-brand-gray-mid)', background: 'var(--color-brand-gray)' }}>
                <div className="absolute inset-x-0 bottom-0 overflow-hidden transition-all duration-500 ease-out origin-bottom group-hover:-translate-y-4 group-hover:scale-105" style={{ top: -56 }}>
                  <Image src={src} alt={alt} fill className="object-cover object-top" sizes="180px" />
                  <div className="absolute inset-0 transition-colors duration-500" style={{ background: 'rgba(0,0,0,0.4)' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 py-3 z-10" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95), transparent)' }}>
                  <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', letterSpacing: '0.2em', color: 'rgba(240,240,240,0.45)', textTransform: 'uppercase', transition: 'color 0.3s' }} className="group-hover:!text-[var(--color-brand-red)]">
                    {label}
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: '1px solid var(--color-brand-red)' }} />
              </div>
              <div className="absolute -bottom-3 left-4 right-4 h-5 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" style={{ background: 'rgba(227,0,15,0.3)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED VIDEO ── */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 002 · PROPAGANDA BROADCAST</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>BIG MAN BLASTOISE</h2>
        </div>
        <div className="aspect-video w-full overflow-hidden border" style={{ background: 'var(--color-brand-gray)', borderColor: 'var(--color-brand-gray-mid)' }}>
          <iframe src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`} title="Genwunner - Big Man Blastoise" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
        </div>
      </section>

      {/* ── LATEST RELEASE ── */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto brand-card p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-brand-red)' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'white', textAlign: 'center', letterSpacing: '0.05em', lineHeight: 1.8, padding: '0 0.5rem' }}>LATEST DROP</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', marginBottom: '0.4rem' }}>{latestRelease.label}</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em' }}>{latestRelease.title}</h3>
          </div>
          <div className="flex gap-3">
            <a href={latestRelease.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary">Spotify</a>
            <a href={latestRelease.apple} target="_blank" rel="noopener noreferrer" className="btn-outline">Apple</a>
          </div>
        </div>
      </section>

      {/* ── ARSENAL ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 003 · DEPLOYED OPERATIVES</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>THE ARSENAL</h2>
          <p className="mt-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.06em' }}>Pokémon deployed on the Kanto campaign — each song a weapon, each name an operative</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--color-brand-gray-mid)', border: '1px solid var(--color-brand-gray-mid)' }}>
          {songs.map((song) => (
            <div key={song.title} className="group p-6 flex flex-col gap-4" style={{ background: 'var(--color-brand-gray)', position: 'relative' }}>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" style={{ background: 'var(--color-brand-red)' }} />
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', letterSpacing: '0.08em', color: 'var(--color-brand-red)', border: '1px solid rgba(227,0,15,0.3)', padding: '0.25rem 0.5rem', alignSelf: 'flex-start', background: 'rgba(227,0,15,0.06)' }}>{song.tag}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.04em' }}>{song.title}</h3>
                <p className="mt-2" style={{ fontSize: '0.78rem', color: 'var(--color-brand-off)', lineHeight: 1.65, fontStyle: 'italic' }}>{song.lore}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm flex-1 text-center">Spotify</a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm flex-1 text-center">YouTube</a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/music" className="btn-outline">Full Arsenal →</Link>
        </div>
      </section>

      {/* ── CITY RAIDS ── */}
      <section className="py-20 px-4" style={{ background: 'var(--color-brand-gray)', borderTop: '1px solid var(--color-brand-gray-mid)', borderBottom: '1px solid var(--color-brand-gray-mid)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 004 · ACTIVE CAMPAIGN</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>CITY RAIDS</h2>
            <p className="mt-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.06em' }}>Genwunner spreading Team Rocket propaganda across Kanto and beyond</p>
          </div>
          {shows && shows.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
              {shows.map((show: { id: string; event_date: string; city: string; title: string; venue?: string; event_type?: string; ticket_url?: string; rsvp_url?: string }) => (
                <div key={show.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 border-b" style={{ borderColor: 'var(--color-brand-gray-mid)' }}>
                  <div className="flex-shrink-0 text-center" style={{ minWidth: 72 }}>
                    <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em' }}>{new Date(show.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', lineHeight: 1, color: 'var(--color-brand-white)' }}>{new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}</p>
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{show.title}</h3>
                    <p className="mt-0.5" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.05em' }}>// {show.city}{show.venue ? ` · ${show.venue}` : ''}{show.event_type ? ` · ${show.event_type}` : ''}</p>
                  </div>
                  {(show.ticket_url || show.rsvp_url) && (
                    <a href={show.ticket_url || show.rsvp_url || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem' }}>Get Tickets →</a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border" style={{ borderColor: 'var(--color-brand-gray-mid)', borderStyle: 'dashed' }}>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-off)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Raids incoming.</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: '#444', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>Enlist in the Wunnerdex to receive first alerts.</p>
              <Link href="/wunnerdex" className="btn-primary">Enlist Now →</Link>
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/shows" className="btn-outline">All City Raids →</Link>
            <Link href="/book" className="btn-primary">Deploy Genwunner</Link>
          </div>
        </div>
      </section>

      {/* ── SUPPLY DROP (MERCH) ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 005 · SUPPLY DROP</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>BIG MAN BLASTOISE STORE</h2>
          <p className="mt-3" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.06em', maxWidth: 400, margin: '0.75rem auto 0' }}>Tees · hoodies · parody trading cards · collectible stickers · limited drops. The rarest merch goes fast.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-8" style={{ background: 'var(--color-brand-gray-mid)', border: '1px solid var(--color-brand-gray-mid)' }}>
          {['Big Man Blastoise Tee', 'Holographic Drop', 'PokéRage Hoodie', 'Collectible Card'].map((item) => (
            <div key={item} className="aspect-square flex items-end p-4 group" style={{ background: 'var(--color-brand-gray)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-brand-off)', transition: 'color 0.2s' }} className="group-hover:!text-[var(--color-brand-white)]">{item}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/merch" className="btn-primary">Shop the Drop →</Link>
        </div>
      </section>

      {/* ── WUNNERDEX ENLISTMENT ── */}
      <section className="py-20 px-4" style={{ background: 'var(--color-brand-gray)', borderTop: '1px solid var(--color-brand-gray-mid)', borderBottom: '1px solid var(--color-brand-gray-mid)' }}>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="relative w-full lg:w-80 xl:w-96 aspect-[3/4] overflow-hidden flex-shrink-0 order-2 lg:order-1" style={{ border: '1px solid var(--color-brand-gray-mid)' }}>
            <Image src="/images/strip-laugh.jpg" alt="Genwunner laughing holding Pokémon packs" fill className="object-cover object-center" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)' }} />
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 006 · ENLISTMENT</p>
            <h2 className="section-title mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>THE BOSS IS<br />WATCHING.</h2>
            <p className="mb-4" style={{ fontSize: '0.88rem', color: 'var(--color-brand-off)', lineHeight: 1.75, maxWidth: 440 }}>
              Giovanni keeps records on every operative. Register in the Wunnerdex — get drops, city raid alerts, secret links, and Big Man Blastoise sightings before the civilians. Genwunner remembers who showed up early.
            </p>
            <WunnerdexSignupForm />
          </div>
        </div>
      </section>

      {/* ── PRESS INTERCEPT ── */}
      <section className="py-16 px-4 border-y" style={{ borderColor: 'var(--color-brand-gray-mid)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>// INTERCEPTED CIVILIAN TRANSMISSION</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: 'rgba(240,240,240,0.85)', lineHeight: 1.2, fontStyle: 'italic' }}>
            &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
          </p>
          <p className="mt-4" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em' }}>— Kotaku</p>
        </div>
      </section>

      {/* ── DEPLOY CTA ── */}
      <section className="py-20 px-4" style={{ background: 'var(--color-brand-red)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// REQUEST AN OPERATIVE</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', lineHeight: 1, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            DEPLOY GENWUNNER<br />TO YOUR TERRITORY
          </h2>
          <p className="mt-4 mb-8" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', lineHeight: 2 }}>
            Anime conventions · Gaming events · TCG shows · College shows · Brand activations · Fan meetups
          </p>
          <Link href="/book" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>Submit Deployment Request →</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--color-brand-black)', borderTop: '1px solid var(--color-brand-gray-mid)' }} className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.1em', color: 'var(--color-brand-white)' }}>GENWUNNER</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em', marginTop: '0.25rem', marginBottom: '0.75rem' }}>Rocket Recruitment Regime · Kanto Division · Est. 2022</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-brand-off)', lineHeight: 1.7, maxWidth: 280 }}>Creator of PokéRage. Right hand of Giovanni. Pallet Town&apos;s most wanted. The regime is only getting started.</p>
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
                <Link key={link.href} href={link.href} style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-brand-off)', display: 'block', padding: '0.25rem 0', transition: 'color 0.15s' }} className="hover:!text-[var(--color-brand-red)]">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {[
                { href: socialLinks.spotify,   label: 'Spotify'   },
                { href: socialLinks.apple,     label: 'Apple'     },
                { href: socialLinks.instagram, label: 'Instagram' },
                { href: socialLinks.tiktok,    label: 'TikTok'    },
                { href: socialLinks.youtube,   label: 'YouTube'   },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-brand-off)', transition: 'color 0.15s' }} className="hover:!text-[var(--color-brand-white)]">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: '#333', letterSpacing: '0.06em', lineHeight: 2 }}>© {new Date().getFullYear()} ROCKET RECRUITMENT REGIME · KANTO DIVISION · ALL INTEL RESERVED TO GIOVANNI</p>
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.3rem', color: '#2a2a2a', letterSpacing: '0.06em' }}>NOT AFFILIATED WITH THE POKÉMON COMPANY</p>
          </div>
        </div>
      </footer>

      <div className="h-14 md:hidden" />
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
            <option>PSYDUCK!</option>
            <option>POKEFLUTE! ft. Shofu</option>
            <option>GENGAR</option>
          </select>
        </div>
        <div>
          <label className="brand-label">Field Handle</label>
          <input type="text" name="social_handle" placeholder="Instagram / TikTok @" className="brand-input" />
        </div>
      </div>
      <label className="flex items-start gap-3 cursor-pointer p-4" style={{ background: 'var(--color-brand-gray)', border: '1px solid var(--color-brand-gray-mid)' }}>
        <input type="checkbox" name="want_in_city" value="true" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ accentColor: 'var(--color-brand-red)' }} />
        <span style={{ fontSize: '0.82rem', color: 'var(--color-brand-off)', lineHeight: 1.6 }}>I want Genwunner to raid my city — deploy a show or pop-up to my territory</span>
      </label>
      <button type="submit" className="btn-primary w-full py-4">⚡ Report for Duty — Enlist in the Wunnerdex</button>
      <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: '#333', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 2 }}>No spam. Just drops, raids, and Big Man Blastoise sightings.</p>
    </form>
  )
}
