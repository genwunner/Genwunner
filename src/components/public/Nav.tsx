// src/components/public/Nav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import SpinningPokeball from './SpinningPokeball'

const navLinks = [
  { href: '/',          label: 'Home',        sub: 'Main'      },
  { href: '/music',     label: 'Arsenal',     sub: 'Music'     },
  { href: '/shows',     label: 'City Raids',  sub: 'Shows'     },
  { href: '/merch',     label: 'Supply Drop', sub: 'Merch'     },
  { href: '/wunnerdex', label: 'Enlist',      sub: 'Wunnerdex' },
  { href: '/book',      label: 'Deploy',      sub: 'Book'      },
  { href: '/epk',       label: 'Dossier',     sub: 'EPK'       },
  { href: '/contact',   label: 'Intel',       sub: 'Contact'   },
]

const socials = [
  { href: 'https://instagram.com/genwunnr',                          label: 'Instagram'   },
  { href: 'https://tiktok.com/@genwunnr',                            label: 'TikTok'      },
  { href: 'https://youtube.com/@genwunnr',                           label: 'YouTube'     },
  { href: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO', label: 'Spotify'     },
  { href: 'https://x.com/genwunnrr',                                 label: 'X / Twitter' },
  { href: 'https://discord.gg/6c28f8JXKV',                           label: 'Discord'     },
]

const TICKER_TEXT = [
  'INCOMING TRANSMISSION FROM GIOVANNI',
  'THE REGIME IS RECRUITING',
  'EU TOUR OCT 1–21',
  'BLUE + RED VERSION EPs — SUMMER 2026',
  'BIG MAN BLASTOISE: 1B+ UGC VIEWS',
  'PSYDUCK! GAINING TRACTION',
  'ENLIST AT WUNNERDEX NOW',
  "PALLET TOWN'S MOST WANTED",
  'POKEFLUTE! FT. SHOFU — OUT NOW',
].join(' · ')

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Ticker ── */}
      <div style={{
        background: '#0a0000',
        borderBottom: '1px solid #1a0000',
        height: 28,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
      }}>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#e3000f',
          letterSpacing: '0.12em',
          textShadow: '0 0 10px rgba(227,0,15,0.5)',
          whiteSpace: 'nowrap',
          animation: 'ticker 40s linear infinite',
        }}>
          &gt;&gt;&nbsp;{TICKER_TEXT}&nbsp;·&nbsp;&gt;&gt;&nbsp;{TICKER_TEXT}&nbsp;·&nbsp;
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav style={{
        position: 'fixed',
        top: 28,
        left: 0, right: 0,
        zIndex: 50,
        background: '#000',
        borderBottom: '1px solid #1a0000',
        height: 58,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/rrr-logo.jpg"
            alt="Genwunner"
            width={40}
            height={40}
            style={{ display: 'block', objectFit: 'contain' }}
          />
          <span style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 'clamp(0.48rem, 1.3vw, 0.65rem)',
            fontWeight: 700,
            color: '#e3000f',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Rocket Recruitment Regime · Kanto Division
          </span>
        </Link>

        {/* Right side — spinning logo + menu toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SpinningPokeball size={38} speed="4s" className="hidden md:block" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(0.42rem, 1.8vw, 0.65rem)',
              fontWeight: 700,
              letterSpacing: 'clamp(0.04em, 0.4vw, 0.12em)',
              color: menuOpen ? '#e3000f' : '#550000',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem 0.4rem',
              transition: 'color 0.12s',
              whiteSpace: 'nowrap',
            }}
          >
            {menuOpen ? '[ CLOSE ✕ ]' : '[ MENU ]'}
          </button>
        </div>
      </nav>

      {/* ── Fullscreen Menu Overlay ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Artist photo — mobile full-screen background */}
        <div style={{
          position: 'absolute', inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s ease 0.2s',
        }} className="block sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-stage.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, #000 85%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(227,0,15,0.05)' }} />
        </div>

        {/* Artist photo — right panel */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '38%',
          overflow: 'hidden',
          zIndex: 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s ease 0.2s',
        }} className="hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-stage.jpg"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.15) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, #000 100%)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(227,0,15,0.06)' }} />
        </div>

        {/* Scanlines on overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Overlay nav bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: 80,
          borderBottom: '1px solid #1a0000',
          position: 'relative',
          zIndex: 1,
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/rrr-logo.jpg"
              alt="Genwunner"
              width={40}
              height={40}
              style={{ display: 'block', objectFit: 'contain' }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#e3000f',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                Rocket Recruitment Regime
              </span>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.55rem',
                color: '#550000',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                · Kanto Division
              </span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#e3000f',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            [ CLOSE ✕ ]
          </button>
        </div>

        {/* Nav links */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
          borderBottom: '1px solid #0d0000',
        }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '0.5rem',
            color: '#330000',
            letterSpacing: '0.15em',
            marginBottom: '1.5rem',
          }}>
            // NAVIGATE THE REGIME
          </div>

          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                borderBottom: '1px solid #0d0000',
                padding: '1rem 0',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-8px)',
                transition: `opacity 0.25s ease ${i * 0.04 + 0.05}s, transform 0.25s ease ${i * 0.04 + 0.05}s`,
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive(link.href) ? '#e3000f' : '#880000',
                transition: 'color 0.12s',
                lineHeight: 1.1,
              }}>
                {link.label}
              </span>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.5rem',
                color: '#330000',
                letterSpacing: '0.1em',
              }}>
                // {link.sub} →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom — socials + enlist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '1rem',
          padding: '1.25rem 2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '1.25rem' }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.55rem',
                  color: '#440000',
                  letterSpacing: '0.08em',
                  transition: 'color 0.12s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e3000f'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#440000'}
              >
                {s.label}
              </a>
            ))}
          </div>
          <Link
            href="/wunnerdex"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#000',
              background: '#e3000f',
              border: '1px solid #e3000f',
              padding: '0.6rem 1.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              alignSelf: 'flex-start',
            }}
          >
            ⚡ [ ENLIST IN THE REGIME ]
          </Link>
        </div>
      </div>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: '#000',
          borderTop: '1px solid #1a0000',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}
      >
        {[
          { href: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO', label: 'Stream',  external: true  },
          { href: 'https://discord.gg/6c28f8JXKV',                           label: 'Discord', external: true  },
          { href: '/',                                                         label: 'Home',    external: false },
          { href: '/wunnerdex',                                               label: 'Enlist',  external: false },
          { href: '/shows',                                                   label: 'Raids',   external: false },
        ].map(item => {
          const active = !item.external && isActive(item.href)
          const style: React.CSSProperties = {
            fontFamily: "'Courier New', monospace",
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '0.9rem',
            paddingBottom: '0.9rem',
            background: active ? '#e3000f' : 'transparent',
            color: active ? '#000' : '#880000',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'background 0.12s, color 0.12s',
          }
          const onEnter = (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = '#e3000f'
            el.style.color = '#000'
          }
          const onLeave = (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = active ? '#e3000f' : 'transparent'
            el.style.color = active ? '#000' : '#880000'
          }
          return item.external ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              {item.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
