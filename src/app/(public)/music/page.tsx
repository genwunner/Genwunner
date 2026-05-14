import Image from 'next/image'
import { songs, socialLinks } from '@/data/content'

export const metadata = { title: 'Music — Genwunner' }

export default function MusicPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[var(--color-brand-red)] text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Stream the Anthems</p>
        <h1 className="text-5xl sm:text-7xl text-center mb-4">THE DISCOGRAPHY</h1>
        <p className="text-white/30 text-center text-sm uppercase tracking-widest mb-16">
          PokéRage · Creator of Big Man Blastoise
        </p>

        {/* Stream Everywhere */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {[
            { label: 'Spotify', href: socialLinks.spotify },
            { label: 'Apple Music', href: socialLinks.apple },
            { label: 'YouTube', href: socialLinks.youtube },
            { label: 'TikTok', href: socialLinks.tiktok },
          ].map(p => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {p.label}
            </a>
          ))}
        </div>

        {/* Song Cards */}
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div key={song.title} className="brand-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                {song.cover ? (
                  <Image src={song.cover} alt={song.title} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full bg-[var(--color-brand-red)] flex items-center justify-center">
                    <span className="font-black text-white text-xl">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl">{song.title}</h2>
                  <span className="font-pixel text-[var(--color-brand-red)] bg-[var(--color-brand-red)]/10 border border-[var(--color-brand-red)]/30 px-2 py-0.5">
                    {song.tag}
                  </span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{song.lore}</p>
              </div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary">Spotify</a>
                <a href={song.apple} target="_blank" rel="noopener noreferrer" className="btn-outline">Apple</a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">YouTube</a>
              </div>
            </div>
          ))}
        </div>

        {/* Spotify CTA */}
        <div className="mt-16 brand-card p-8 text-center">
          <p className="text-white/40 text-sm mb-4 uppercase tracking-widest">Full Catalog on Spotify</p>
          <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open Spotify Profile →
          </a>
        </div>
      </div>
    </div>
  )
}
