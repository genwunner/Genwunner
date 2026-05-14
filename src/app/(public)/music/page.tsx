import { songs, socialLinks } from '@/data/content'

export const metadata = { title: 'Music — Genwunner' }

export default function MusicPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Stream the Anthems</p>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center mb-4">THE DISCOGRAPHY</h1>
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
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
              className="border border-white/20 text-white font-bold uppercase tracking-wide px-6 py-2.5 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm">
              {p.label}
            </a>
          ))}
        </div>

        {/* Song Cards */}
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div key={song.title} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-yellow-400/40 transition-colors">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-black text-black text-xl">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-black text-xl sm:text-2xl tracking-tight">{song.title}</h2>
                  <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                    {song.tag}
                  </span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{song.lore}</p>
              </div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <a href={song.spotify} target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-yellow-400 hover:text-black text-white text-xs font-black uppercase tracking-wide px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                  Spotify
                </a>
                <a href={song.apple} target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wide px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                  Apple
                </a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wide px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                  YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Spotify embed placeholder */}
        <div className="mt-16 bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-white/40 text-sm mb-4 uppercase tracking-widest">Full Catalog on Spotify</p>
          <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer"
            className="bg-yellow-400 text-black font-black uppercase tracking-wide px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors inline-block text-sm">
            Open Spotify Profile →
          </a>
        </div>
      </div>
    </div>
  )
}
