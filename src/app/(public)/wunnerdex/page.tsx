'use client'

import { useState } from 'react'

export default function WunnerdexPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const res = await fetch('/api/wunnerdex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-black text-black text-2xl">!</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">YOU&apos;RE IN THE WUNNERDEX</h1>
          <p className="text-white/50 text-sm mb-8">
            Expect drops, shows, secret links, and Big Man Blastoise sightings before the civilians.
          </p>
          <a href="/" className="border border-white/30 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:border-red-600 hover:text-red-600 transition-colors text-sm inline-block">
            Back to the Universe →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-red-600 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Fan Registry</p>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center mb-4">THE WUNNERDEX</h1>
        <p className="text-white/40 text-center text-sm mb-4 max-w-md mx-auto">
          Genwunner&apos;s fan registry. Register your trainer. Get drops, shows, secret links, and Big Man Blastoise sightings before the civilians.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['Early merch access', 'City raid alerts', 'Secret links', 'Fan challenges', 'Unreleased previews'].map(perk => (
            <span key={perk} className="bg-red-600/10 border border-red-600/30 text-red-600 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
              {perk}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="email" name="email" required placeholder="Email *"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-colors" />
            <input type="tel" name="phone" placeholder="Phone (optional)"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="city" required placeholder="Your City *"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-colors" />
            <input type="text" name="favorite_pokemon" placeholder="Favorite Pokémon?"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="favorite_song"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white/60 outline-none focus:border-red-600 transition-colors">
              <option value="">Favorite Genwunner Song</option>
              <option>BLASTOISE!</option>
              <option>PSYDUCK!</option>
              <option>POKEFLUTE! ft. Shofu</option>
              <option>GENGAR</option>
            </select>
            <input type="text" name="social_handle" placeholder="Instagram / TikTok @"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-colors" />
          </div>
          <label className="flex items-start gap-3 text-sm text-white/60 cursor-pointer p-4 bg-zinc-900 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
            <input type="checkbox" name="want_in_city" value="true" className="accent-red-600 w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>I want Genwunner to do a show / pop-up / city raid in my city</span>
          </label>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-red-600 text-black font-black uppercase tracking-widest py-4 rounded-full hover:bg-red-500 disabled:opacity-60 transition-colors text-sm">
            {loading ? 'Registering…' : 'Register Now — Join the Wunnerdex'}
          </button>
          <p className="text-white/20 text-xs text-center">No spam. Just drops, shows, and Big Man Blastoise sightings.</p>
        </form>
      </div>
    </div>
  )
}
