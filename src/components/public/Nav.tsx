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
          <Link href="/" className="font-black text-white text-xl tracking-tighter hover:text-yellow-400 transition-colors">
            GENWUNNER
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wunnerdex"
              className="bg-yellow-400 text-black text-sm font-black px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors uppercase tracking-wide"
            >
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
                className="block text-white/70 hover:text-white font-semibold uppercase tracking-wide py-3 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wunnerdex"
              onClick={() => setOpen(false)}
              className="block bg-yellow-400 text-black font-black uppercase tracking-wide px-4 py-3 rounded-full text-center mt-4"
            >
              Join the Wunnerdex
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black border-t border-white/10 grid grid-cols-4">
        <a href="https://open.spotify.com/artist/1IHBjpJTLFMBP9H6VBfroD" target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center py-3 text-white/60 hover:text-white transition-colors">
          <span className="text-xs font-bold uppercase tracking-wide">Stream</span>
        </a>
        <Link href="/merch" className="flex flex-col items-center py-3 text-white/60 hover:text-white transition-colors">
          <span className="text-xs font-bold uppercase tracking-wide">Merch</span>
        </Link>
        <Link href="/wunnerdex" className="flex flex-col items-center py-3 bg-yellow-400 text-black">
          <span className="text-xs font-black uppercase tracking-wide">Join</span>
        </Link>
        <Link href="/book" className="flex flex-col items-center py-3 text-white/60 hover:text-white transition-colors">
          <span className="text-xs font-bold uppercase tracking-wide">Book</span>
        </Link>
      </div>
    </>
  )
}
