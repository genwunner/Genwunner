'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { X, Menu } from 'lucide-react'

const navLinks = [
  { href: '/music',     label: 'Arsenal',     sub: 'Music'     },
  { href: '/shows',     label: 'City Raids',  sub: 'Shows'     },
  { href: '/merch',     label: 'Supply Drop', sub: 'Merch'     },
  { href: '/wunnerdex', label: 'Enlist',      sub: 'Wunnerdex' },
  { href: '/book',      label: 'Deploy',      sub: 'Book'      },
  { href: '/epk',       label: 'Dossier',     sub: 'EPK'       },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* ── Transmission Ticker ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-6 overflow-hidden flex items-center"
        style={{ background: 'var(--color-brand-red)' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            letterSpacing: '0.1em',
            color: 'white',
            whiteSpace: 'nowrap',
            animation: 'ticker 35s linear infinite',
          }}
        >
          ⚡ INCOMING TRANSMISSION FROM GIOVANNI &nbsp;·&nbsp;
          THE REGIME IS RECRUITING &nbsp;·&nbsp;
          EU TOUR OCT 1–21 &nbsp;·&nbsp;
          BLUE + RED VERSION EPs — SUMMER 2026 &nbsp;·&nbsp;
          BIG MAN BLASTOISE: 1B+ UGC VIEWS &nbsp;·&nbsp;
          PSYDUCK! GAINING TRACTION &nbsp;·&nbsp;
          ENLIST AT WUNNERDEX NOW &nbsp;·&nbsp;
          PALLET TOWN&apos;S MOST WANTED &nbsp;·&nbsp;
          ⚡ INCOMING TRANSMISSION FROM GIOVANNI &nbsp;·&nbsp;
          THE REGIME IS RECRUITING &nbsp;·&nbsp;
          EU TOUR OCT 1–21 &nbsp;·&nbsp;
          BLUE + RED VERSION EPs — SUMMER 2026 &nbsp;·&nbsp;
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav
        className="fixed top-6 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ background: 'rgba(8,8,8,0.96)', borderColor: 'var(--color-brand-gray-mid)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logos/g1r-ball-white.png"
              alt="Genwunner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.35rem',
                letterSpacing: '0.1em',
                color: 'var(--color-brand-red)',
                lineHeight: 1,
              }}
            >
              Rocket Recruitment Regime · Kanto Division
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.38rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--color-brand-red)' : 'rgba(240,240,240,0.45)',
                    border: `1px solid ${active ? 'var(--color-brand-red)' : 'transparent'}`,
                    padding: '0.3rem 0.65rem',
                    transition: 'color 0.15s, border-color 0.15s',
                    display: 'block',
                  }}
                  className="hover:!text-[var(--color-brand-red)] hover:!border-[var(--color-brand-red)]"
                >
                  {link.label}
                </Link>
              )
            })}
            <Link href="/wunnerdex" className="btn-primary ml-3" style={{ fontSize: '0.85rem' }}>
              ⚡ Enlist
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1"
            style={{ color: 'var(--color-brand-white)' }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden border-t px-6 py-4"
            style={{ background: 'var(--color-brand-black)', borderColor: 'var(--color-brand-gray-mid)' }}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-3 border-b"
                style={{ borderColor: 'var(--color-brand-gray-mid)' }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? 'var(--color-brand-red)' : 'var(--color-brand-white)',
                }}>
                  {link.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.34rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-brand-off)',
                }}>
                  {link.sub}
                </span>
              </Link>
            ))}
            <Link
              href="/wunnerdex"
              onClick={() => setOpen(false)}
              className="btn-primary block text-center mt-5 w-full"
            >
              ⚡ Enlist in the Regime
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden grid grid-cols-4 border-t"
        style={{ background: 'var(--color-brand-black)', borderColor: 'var(--color-brand-gray-mid)' }}
      >
        {[
          { href: 'https://open.spotify.com/artist/1IHBjpJTLFMBP9H6VBfroD', label: 'Stream',  external: true,  primary: false },
          { href: '/shows',     label: 'Raids',  external: false, primary: false },
          { href: '/wunnerdex', label: 'Enlist', external: false, primary: true  },
          { href: '/book',      label: 'Deploy', external: false, primary: false },
        ].map(item => {
          const style: React.CSSProperties = {
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.34rem',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            background: item.primary ? 'var(--color-brand-red)' : 'transparent',
            color: item.primary ? 'white' : 'rgba(240,240,240,0.45)',
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
