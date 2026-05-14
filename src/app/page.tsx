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
    <div className="bg-black text-white min-h-screen">
      <PackOpeningIntro />
      <Nav />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center px-4 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(220,38,38,0.08)_0%,_transparent_60%)]" />

        {/* Left — text */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left z-10 py-20 lg:py-0 lg:pl-8 xl:pl-16 max-w-2xl mx-auto lg:mx-0">
          <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Creator of Big Man Blastoise · PokéRage · Los Angeles
          </p>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-4">
            GENWUNNER
          </h1>
          <p className="text-white/50 text-lg sm:text-xl font-medium mb-4 uppercase tracking-widest">
            Enter the PokéRage Universe
          </p>
          <p className="text-white/30 text-sm max-w-md mb-10">
            Big Man Blastoise lives here. 1B+ UGC views. 543K monthly listeners.
            The sound of the mosh pit after choosing Squirtle.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer"
              className="bg-red-600 text-white font-black uppercase tracking-wide px-6 py-3 rounded-full hover:bg-red-500 transition-colors text-sm">
              Stream Now
            </a>
            <Link href="/wunnerdex"
              className="border border-red-600 text-red-500 font-black uppercase tracking-wide px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-colors text-sm">
              Join the Wunnerdex
            </Link>
            <Link href="/merch"
              className="border border-white/30 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:border-white hover:bg-white/10 transition-colors text-sm">
              Unlock Rare Merch
            </Link>
            <Link href="/book"
              className="border border-white/30 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:border-white hover:bg-white/10 transition-colors text-sm">
              Book Genwunner
            </Link>
          </div>
        </div>

        {/* Right — hero photo */}
        <div className="hidden lg:block relative h-screen w-[480px] xl:w-[560px] flex-shrink-0">
          <Image
            src="/images/hero-stage.jpg"
            alt="Genwunner performing live"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/20 text-xs uppercase tracking-widest hidden lg:block">
          scroll
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-red-600 py-6 overflow-x-auto">
        <div className="flex gap-8 md:gap-0 md:grid md:grid-cols-5 max-w-7xl mx-auto px-6 min-w-max md:min-w-0">
          {artistStats.map((stat) => (
            <div key={stat.label} className="text-center flex-shrink-0">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</p>
              <p className="text-white/70 text-xs uppercase tracking-wider font-semibold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FIGHTER SELECT (G59-style pop-out photos) ── */}
      <section className="py-20 px-4">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-2 text-center">PokéRage Universe</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-center mb-3">SELECT YOUR FIGHTER</h2>
        <p className="text-white/30 text-sm text-center mb-12 uppercase tracking-widest">Choose your side. Join the raid.</p>

        {/* Cards row — horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto pb-4 justify-start lg:justify-center px-2" style={{ scrollbarWidth: 'none' }}>
          {fighterPhotos.map(({ src, alt, label }) => (
            <div
              key={src}
              className="group relative flex-shrink-0 cursor-pointer"
              style={{ width: 180, paddingTop: 56 }}
            >
              {/* Card frame — overflow:visible so photo can break out above */}
              <div
                className="relative rounded-2xl border border-white/10 group-hover:border-red-600/70 bg-zinc-950 transition-all duration-300 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.9)]"
                style={{ height: 280, overflow: 'visible' }}
              >
                {/* Photo — extends 56px above card frame, breaks out on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 rounded-2xl overflow-hidden transition-all duration-500 ease-out origin-bottom group-hover:-translate-y-5 group-hover:scale-105"
                  style={{ top: -56 }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-top"
                    sizes="180px"
                  />
                  {/* Darken overlay that lifts on hover */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                {/* Bottom label bar */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-2xl z-10">
                  <p className="text-white/50 group-hover:text-red-400 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300">
                    {label}
                  </p>
                </div>
              </div>

              {/* Glow floor */}
              <div className="absolute -bottom-3 left-4 right-4 h-6 rounded-full bg-red-600/0 group-hover:bg-red-600/25 blur-xl transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED VIDEO ── */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Watch the Chaos</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-center mb-10">BIG MAN BLASTOISE</h2>
        <div className="aspect-video w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
          {FEATURED_VIDEO_ID !== 'REPLACE_WITH_YOUTUBE_ID' ? (
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
              title="Genwunner - Big Man Blastoise"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
              <p className="text-white/20 text-sm mb-4 uppercase tracking-widest">Video coming soon</p>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                className="bg-red-600 text-white font-black uppercase tracking-wide px-6 py-3 rounded-full hover:bg-red-500 transition-colors text-sm">
                Watch on YouTube →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── LATEST RELEASE ── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="font-black text-white text-xs text-center uppercase leading-tight px-2">Latest Drop</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className="text-red-500 text-xs uppercase tracking-widest font-bold">{latestRelease.label}</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">{latestRelease.title}</h3>
          </div>
          <div className="flex gap-3">
            <a href={latestRelease.spotify} target="_blank" rel="noopener noreferrer"
              className="bg-white text-black font-black uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-red-500 hover:text-white transition-colors text-xs">
              Spotify
            </a>
            <a href={latestRelease.apple} target="_blank" rel="noopener noreferrer"
              className="border border-white/30 text-white font-bold uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors text-xs">
              Apple
            </a>
          </div>
        </div>
      </section>

      {/* ── MUSIC / DISCOGRAPHY ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Stream the Anthems</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-center mb-12">THE DISCOGRAPHY</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div key={song.title} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-red-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-600/10 px-2 py-1 rounded-full">
                  {song.tag}
                </span>
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight leading-tight">{song.title}</h3>
                <p className="text-white/40 text-xs mt-2 leading-relaxed">{song.lore}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <a href={song.spotify} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white/10 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wide py-2 rounded-full text-center transition-colors">
                  Spotify
                </a>
                <a href={song.youtube} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wide py-2 rounded-full text-center transition-colors">
                  YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/music" className="border border-white/30 text-white font-bold uppercase tracking-wide px-8 py-3 rounded-full hover:border-red-500 hover:text-red-500 transition-colors text-sm">
            Full Discography →
          </Link>
        </div>
      </section>

      {/* ── SHOWS ── */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Catch the Next Drop</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-center mb-12">CITY RAIDS</h2>
          {shows && shows.length > 0 ? (
            <div className="space-y-4">
              {shows.map((show: { id: string; event_date: string; city: string; title: string; venue?: string; event_type?: string; ticket_url?: string; rsvp_url?: string }) => (
                <div key={show.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-center sm:text-left sm:w-24 flex-shrink-0">
                    <p className="text-red-500 font-black text-2xl">
                      {new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}
                    </p>
                    <p className="text-white/40 text-xs uppercase tracking-wider">
                      {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg">{show.title}</h3>
                    <p className="text-white/50 text-sm">{show.city}{show.venue ? ` · ${show.venue}` : ''}</p>
                    {show.event_type && (
                      <span className="text-xs uppercase tracking-wider text-red-500/70">{show.event_type}</span>
                    )}
                  </div>
                  {(show.ticket_url || show.rsvp_url) && (
                    <a href={show.ticket_url || show.rsvp_url || '#'} target="_blank" rel="noopener noreferrer"
                      className="bg-red-600 text-white font-black uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-red-500 transition-colors text-xs whitespace-nowrap">
                      RSVP →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900 border border-dashed border-white/20 rounded-2xl p-12 text-center">
              <p className="text-white/30 text-sm uppercase tracking-widest">Shows dropping soon.</p>
              <p className="text-white/20 text-xs mt-2">Join the Wunnerdex to get city raid alerts first.</p>
            </div>
          )}
          <div className="text-center mt-8 flex gap-4 justify-center">
            <Link href="/shows" className="border border-white/30 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:border-red-500 hover:text-red-500 transition-colors text-sm">
              All Shows →
            </Link>
            <Link href="/book" className="border border-red-600 text-red-500 font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-colors text-sm">
              Book Genwunner
            </Link>
          </div>
        </div>
      </section>

      {/* ── MERCH PREVIEW ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Unlock Rare Merch</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-center mb-4">BIG MAN BLASTOISE STORE</h2>
        <p className="text-white/40 text-center text-sm max-w-md mx-auto mb-10">
          Tees, hoodies, parody trading cards, collectible stickers, limited drops. The rarest merch goes fast.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Big Man Blastoise Tee', 'Holographic Drop', 'PokéRage Hoodie', 'Collectible Card'].map((item) => (
            <div key={item} className="bg-zinc-900 border border-white/10 rounded-2xl aspect-square flex items-end p-4 hover:border-red-600/50 transition-colors">
              <p className="font-black text-sm uppercase tracking-tight text-white/60">{item}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/merch"
            className="bg-red-600 text-white font-black uppercase tracking-wide px-8 py-4 rounded-full hover:bg-red-500 transition-colors inline-block">
            Shop the Drop →
          </Link>
        </div>
      </section>

      {/* ── WUNNERDEX SIGNUP ── */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Photo */}
          <div className="relative w-full lg:w-80 xl:w-96 aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0 order-2 lg:order-1">
            <Image
              src="/images/strip-laugh.jpg"
              alt="Genwunner laughing holding Pokémon packs"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </div>
          {/* Form */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <p className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold mb-4">Join the Movement</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">JOIN THE WUNNERDEX</h2>
            <p className="text-white/40 text-sm mb-10 max-w-md lg:mx-0 mx-auto">
              Get drops, shows, secret links, and Big Man Blastoise sightings before the civilians.
            </p>
            <WunnerdexSignupForm />
          </div>
        </div>
      </section>

      {/* ── PRESS QUOTE ── */}
      <section className="py-16 px-4 border-y border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-black italic text-white/80 leading-tight">
            &ldquo;Blastoise is finally winning a popularity contest over Charizard, and it rules.&rdquo;
          </p>
          <p className="text-red-500 text-sm font-bold uppercase tracking-widest mt-4">— Kotaku</p>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="py-20 px-4 bg-red-600">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/70 text-xs uppercase tracking-[0.3em] font-bold mb-4">Book Genwunner</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-4">
            BRING THE POKÉPAGE TO YOUR EVENT
          </h2>
          <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
            Anime conventions · Gaming events · TCG shows · College shows · Brand activations · Fan meetups
          </p>
          <Link href="/book"
            className="bg-black text-white font-black uppercase tracking-wide px-8 py-4 rounded-full hover:bg-zinc-800 transition-colors inline-block">
            Submit Booking Request →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <p className="font-black text-2xl tracking-tighter mb-2">GENWUNNER</p>
              <p className="text-white/30 text-xs uppercase tracking-widest">Creator of Big Man Blastoise · PokéRage</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-2 text-sm">
              {[
                { href: '/music', label: 'Music' },
                { href: '/shows', label: 'Shows' },
                { href: '/merch', label: 'Merch' },
                { href: '/wunnerdex', label: 'Wunnerdex' },
                { href: '/book', label: 'Book Genwunner' },
                { href: '/epk', label: 'EPK / Press' },
                { href: '/contact', label: 'Contact' },
                { href: '/login', label: 'Admin' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-white/40 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              {[
                { href: socialLinks.spotify, label: 'Spotify' },
                { href: socialLinks.apple, label: 'Apple' },
                { href: socialLinks.instagram, label: 'Instagram' },
                { href: socialLinks.tiktok, label: 'TikTok' },
                { href: socialLinks.youtube, label: 'YouTube' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-white/30 hover:text-red-500 text-xs font-bold uppercase tracking-wide transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/20 text-xs">© {new Date().getFullYear()} Genwunner. All rights reserved.</p>
            <p className="text-white/10 text-xs uppercase tracking-widest">PokéRage · Big Man Blastoise Universe</p>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile sticky bar */}
      <div className="h-14 md:hidden" />
    </div>
  )
}

function WunnerdexSignupForm() {
  return (
    <form action="/api/wunnerdex" method="POST" className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email" name="email" required placeholder="Email *"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-colors"
        />
        <input
          type="tel" name="phone" placeholder="Phone (optional)"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text" name="city" required placeholder="Your City *"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-colors"
        />
        <input
          type="text" name="favorite_pokemon" placeholder="Favorite Pokémon?"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="favorite_song"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white/60 outline-none focus:border-red-500 transition-colors">
          <option value="">Favorite Genwunner Song</option>
          <option>BLASTOISE!</option>
          <option>PSYDUCK!</option>
          <option>POKEFLUTE! ft. Shofu</option>
          <option>GENGAR</option>
        </select>
        <input
          type="text" name="social_handle" placeholder="Instagram / TikTok @"
          className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-colors"
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-white/60 cursor-pointer">
        <input type="checkbox" name="want_in_city" value="true" className="accent-red-600 w-4 h-4" />
        I want Genwunner to do a show / pop-up in my city
      </label>
      <button
        type="submit"
        className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-full hover:bg-red-500 transition-colors text-sm"
      >
        Register Now — Join the Wunnerdex
      </button>
      <p className="text-white/20 text-xs text-center">No spam. Just drops, shows, and Big Man Blastoise sightings.</p>
    </form>
  )
}
