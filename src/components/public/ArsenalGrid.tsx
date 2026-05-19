'use client'

import { useState } from 'react'
import Image from 'next/image'
import { songs } from '@/data/content'

const INITIAL_COUNT = 6

export default function ArsenalGrid() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? songs : songs.slice(0, INITIAL_COUNT)
  const remaining = songs.length - INITIAL_COUNT

  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-3"
        style={{ gap: '1px', background: '#0d0000', border: '1px solid #0d0000', marginBottom: '1.5rem' }}
      >
        {visible.map(song => (
          <a
            key={song.title}
            href={song.hypeddit}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            style={{ display: 'block', background: '#030000', textDecoration: 'none', position: 'relative' }}
          >
            <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src={song.cover}
                alt={song.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
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
                style={{
                  fontFamily: 'var(--font-heading), "Courier New", Courier, monospace',
                  fontWeight: 400,
                  fontSize: 'clamp(0.75rem, 2vw, 1.6rem)',
                  color: '#cc0000',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  transition: 'color 0.12s',
                }}
              >
                {song.title}
              </div>
            </div>
          </a>
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <button
            onClick={() => setShowAll(true)}
            className="btn-outline"
          >
            [ SEE MORE — {remaining} MORE OPERATIVES ]
          </button>
        </div>
      )}
    </>
  )
}
