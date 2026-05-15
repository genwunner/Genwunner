// src/components/public/Nav.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  { href: 'https://instagram.com/genwunnr',                              label: 'Instagram' },
  { href: 'https://tiktok.com/@genwunnr',                                label: 'TikTok'    },
  { href: 'https://youtube.com/@genwunnr',                               label: 'YouTube'   },
  { href: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO',     label: 'Spotify'   },
  { href: 'https://x.com/genwunnrr',                                     label: 'X / Twitter' },
  { href: 'https://discord.gg/6c28f8JXKV',                               label: 'Discord'   },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      {/* ── Transmission Ticker ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-6 overflow-hidden flex items-center justify-center gap-3"
        style={{ background: 'var(--color-brand-red)' }}
      >
        {/* Spinning Pokéball sits dead-center in the ticker */}
        <SpinningPokeball size={14} speed="5s" style={{ opacity: 0.9, flexShrink: 0 }} />
        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            letterSpacing: '0.12em',
            color: 'white',
            whiteSpace: 'nowrap',
            animation: 'ticker 35s linear infinite',
          }}
        >
          INCOMING TRANSMISSION FROM GIOVANNI &nbsp;·&nbsp;
          THE REGIME IS RECRUITING &nbsp;·&nbsp;
          EU TOUR OCT 1–21 &nbsp;·&nbsp;
          BLUE + RED VERSION EPs — SUMMER 2026 &nbsp;·&nbsp;
          BIG MAN BLASTOISE: 1B+ UGC VIEWS &nbsp;·&nbsp;
          PSYDUCK! GAINING TRACTION &nbsp;·&nbsp;
          ENLIST AT WUNNERDEX NOW &nbsp;·&nbsp;
          PALLET TOWN&apos;S MOST WANTED &nbsp;·&nbsp;
          INCOMING TRANSMISSION FROM GIOVANNI &nbsp;·&nbsp;
          THE REGIME IS RECRUITING &nbsp;·&nbsp;
        </div>
        <SpinningPokeball size={14} speed="5s" style={{ opacity: 0.9, flexShrink: 0 }} />
      </div>

      {/* ── Main Nav Bar ── */}
      <nav
        className="fixed top-6 left-0 right-0 z-50 border-b"
        style={{
          background: 'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--color-brand-gray-mid)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10">
            <Image
              src="/images/rrr-logo.jpg"
              alt="RRR"
              width={48}
              height={48}
              style={{ flexShrink: 0, display: 'block' }}
              priority
            />
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.32rem',
                letterSpacing: '0.1em',
                color: 'var(--color-brand-red)',
                lineHeight: 1,
              }}
            >
              Rocket Recruitment Regime · Kanto Division
            </span>
          </Link>

          {/* MENU button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 z-10 group"
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
          >
            {menuOpen ? (
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-brand-white)',
                }}
              >
                CLOSE ✕
              </span>
            ) : (
              <>
                <SpinningPokeball size={28} speed="4s" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    letterSpacing: '0.15em',
                    color: 'var(--color-brand-white)',
                    transition: 'color 0.15s',
                  }}
                  className="group-hover:!text-[var(--color-brand-red)]"
                >
                  MENU
                </span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ── Fullscreen Menu Overlay ── */}
      <div
        className="fixed inset-0 z-[200] flex flex-col"
        style={{
          background: 'var(--color-brand-black)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: '-5%',
              right: '-3%',
              bottom: '-5%',
              width: '85%',
              transform: 'skewX(-3deg)',
              transformOrigin: 'top right',
              filter: 'blur(1px)',
            }}>
              <Image
                src="/images/menu-bg.jpg"
                alt=""
                fill
                className="object-contain"
                style={{ opacity: 0.38, objectPosition: 'right center' }}
                priority
              />
            </div>
          </div>
          {/* Gradient left-to-right — softer so image shows on mobile */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, var(--color-brand-black) 5%, rgba(8,8,8,0.75) 35%, rgba(8,8,8,0.2) 65%, rgba(8,8,8,0.45) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 20%, transparent 75%, rgba(8,8,8,0.6) 100%)',
          }} />
          {/* Red glow on right */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 85% 40%, rgba(227,0,15,0.1) 0%, transparent 55%)',
          }} />
        </div>

        {/* Overlay nav bar */}
        <div
          className="relative z-10 flex items-center justify-between px-5 border-b"
          style={{ height: 80, borderColor: 'var(--color-brand-gray-mid)' }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/rrr-logo.jpg"
              alt="RRR"
              width={48}
              height={48}
              style={{ display: 'block' }}
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              letterSpacing: '0.15em',
              color: 'var(--color-brand-white)',
            }}>
              CLOSE ✕
            </span>
          </button>
        </div>

        {/* Nav links — main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16">
          <div
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.4rem',
              color: 'var(--color-brand-red)',
              letterSpacing: '0.15em',
              marginBottom: '1.5rem',
            }}
          >
            // NAVIGATE THE REGIME
          </div>

          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline justify-between border-b py-4 md:py-5"
                style={{
                  borderColor: 'var(--color-brand-gray-mid)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.3s ease ${i * 0.04 + 0.1}s, transform 0.3s ease ${i * 0.04 + 0.1}s`,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'var(--color-brand-red)' : 'var(--color-brand-white)',
                    transition: 'color 0.15s',
                    lineHeight: 1.1,
                  }}
                  className="group-hover:!text-[var(--color-brand-red)]"
                >
                  {link.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.38rem',
                    color: 'var(--color-brand-off)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {link.sub} →
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom — socials + enlist */}
        <div
          className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 md:px-16 py-6 border-t"
          style={{ borderColor: 'var(--color-brand-gray-mid)' }}
        >
          <div className="flex flex-wrap gap-4">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.38rem',
                  color: 'var(--color-brand-off)',
                  letterSpacing: '0.08em',
                  transition: 'color 0.15s',
                }}
                className="hover:!text-[var(--color-brand-white)]"
              >
                {s.label}
              </a>
            ))}
          </div>
          <Link
            href="/wunnerdex"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
          >
            ⚡ Enlist in the Regime
          </Link>
        </div>
      </div>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden grid grid-cols-4 border-t"
        style={{
          background: 'var(--color-brand-black)',
          borderColor: 'var(--color-brand-gray-mid)',
        }}
      >
        {[
          { href: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO', label: 'Stream',  external: true,  primary: false },
          { href: 'https://discord.gg/6c28f8JXKV',                               label: 'Discord', external: true,  primary: false },
          { href: '/wunnerdex', label: 'Enlist', external: false, primary: true  },
          { href: '/shows',     label: 'Raids',  external: false, primary: false },
        ].map((item, _i, arr) => {
          const anyInternalActive = arr.some(i => !i.external && pathname.startsWith(i.href))
          const isActive = !item.external && pathname.startsWith(item.href)
          const highlighted = isActive || (item.primary && !anyInternalActive)
          const style: React.CSSProperties = {
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.34rem',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            background: highlighted ? 'var(--color-brand-red)' : 'transparent',
            color: highlighted ? 'white' : 'rgba(240,240,240,0.45)',
            transition: 'background 0.15s, color 0.15s',
          }
          return item.external ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={style}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} style={style}>
              {item.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
