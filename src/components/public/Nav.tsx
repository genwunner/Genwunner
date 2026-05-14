'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/music', label: 'Music' },
  { href: '/shows', label: 'Shows' },
  { href: '/merch', label: 'Merch' },
  { href: '/wunnerdex', label: 'Wunnerdex' },
  { href: '/book', label: 'Book' },
  { href: '/epk', label: 'EPK' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="nav-link text-xl">
            GENWUNNER
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link text-sm opacity-60 hover:opacity-100">
                {link.label}
              </Link>
            ))}
            <Link href="/wunnerdex" className="btn-primary text-sm">
              Join the Wunnerdex
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-link block py-3 border-b border-white/5 opacity-70 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wunnerdex"
              onClick={() => setOpen(false)}
              className="btn-primary block text-center mt-4"
            >
              Join the Wunnerdex
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black border-t border-white/10 grid grid-cols-4">
        <a href="https://open.spotify.com/artist/1IHBjpJTLFMBP9H6VBfroD" target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center py-3 nav-link text-xs opacity-60 hover:opacity-100">
          Stream
        </a>
        <Link href="/merch" className="flex flex-col items-center py-3 nav-link text-xs opacity-60 hover:opacity-100">
          Merch
        </Link>
        <Link href="/wunnerdex" className="flex flex-col items-center justify-center py-3 bg-[var(--color-brand-red)] nav-link text-xs text-white">
          Join
        </Link>
        <Link href="/book" className="flex flex-col items-center py-3 nav-link text-xs opacity-60 hover:opacity-100">
          Book
        </Link>
      </div>
    </>
  )
}
