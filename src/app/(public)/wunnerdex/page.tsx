'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WunnerdexPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const res = await fetch('/api/wunnerdex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const json = await res.json()
      router.push(json.redirect ?? '/wunnerdex/welcome')
    } else {
      setError('Transmission failed. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 006 · GRUNT REGISTRATION</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}>THE WUNNERDEX</h1>
          <p className="mt-4" style={{ fontSize: '0.88rem', color: 'var(--color-brand-off)', lineHeight: 1.75, maxWidth: 420, margin: '1rem auto 0' }}>
            Giovanni keeps records on every operative. Register your trainer data. Get drops, shows, and secret links before the civilians.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['Early merch access', 'City raid alerts', 'Secret links', 'Fan challenges', 'Unreleased previews'].map(perk => (
            <span key={perk} style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', letterSpacing: '0.06em', color: 'var(--color-brand-red)', background: 'rgba(227,0,15,0.06)', border: '1px solid rgba(227,0,15,0.3)', padding: '0.3rem 0.65rem' }}>▶ {perk}</span>
          ))}
        </div>

        <div style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(227,0,15,0.1) 0%, transparent 60%), #0e0505', border: '2px solid var(--color-brand-red)', borderRadius: 10, padding: '2rem', position: 'relative', boxShadow: '0 0 0 4px var(--color-brand-black), 0 0 0 5px var(--color-brand-gray-mid), 0 0 40px rgba(227,0,15,0.08)' }}>
          <div style={{ position: 'absolute', top: 8, left: 8, right: 8, bottom: 8, border: '1px solid rgba(227,0,15,0.15)', borderRadius: 6, pointerEvents: 'none' }} />

          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 44, height: 44, background: 'var(--color-brand-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 0 20px rgba(227,0,15,0.4)' }}>🚀</div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading), "Courier New", Courier, monospace', fontWeight: 400, fontSize: '1.8rem', color: 'var(--color-brand-white)', lineHeight: 1 }}>GRUNT REG.</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-red)', letterSpacing: '0.08em', marginTop: 2 }}>// Wunnerdex · RRR Database · Kanto Division</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Operative Name</label>
                <input type="text" name="name" placeholder="Your name" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Comms Channel (Email) *</label>
                <input type="email" name="email" required placeholder="your@email.com" className="brand-input" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Secondary Comms (Phone)</label>
                <input type="tel" name="phone" placeholder="Optional" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Home Territory *</label>
                <input type="text" name="city" required placeholder="City, State / Country" className="brand-input" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Pokémon Specialty</label>
                <input type="text" name="favorite_pokemon" placeholder="Favorite Pokémon?" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Field Handle</label>
                <input type="text" name="social_handle" placeholder="Instagram / TikTok @" className="brand-input" />
              </div>
            </div>
            <div>
              <label className="brand-label">Favorite Mission</label>
              <select name="favorite_song" className="brand-input">
                <option value="">Favorite Genwunner track...</option>
                <option>BLASTOISE!</option>
                <option>PSYDUCK!</option>
                <option>POKEFLUTE! ft. Shofu</option>
                <option>GENGAR</option>
              </select>
            </div>
            <div>
              <label className="brand-label">How did you find the Regime?</label>
              <select name="origin" className="brand-input">
                <option value="">Select origin story...</option>
                <option>BLASTOISE! went viral</option>
                <option>PSYDUCK! brought me in</option>
                <option>Caught a live raid</option>
                <option>Fellow grunt recruited me</option>
                <option>TikTok / Social</option>
                <option>Been here since GENGAR</option>
              </select>
            </div>
            <label className="flex items-start gap-3 cursor-pointer p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-brand-gray-mid)' }}>
              <input type="checkbox" name="want_in_city" value="true" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ accentColor: 'var(--color-brand-red)' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--color-brand-off)', lineHeight: 1.65 }}>I want Genwunner to raid my city. Deploy a show or pop-up.</span>
            </label>
            {error && <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: '#f87171', letterSpacing: '0.06em' }}>⚠ {error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-4" style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Transmitting...' : '[ REPORT FOR DUTY ]'}
            </button>
            <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.72rem', color: '#880000', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 2, marginTop: '1rem' }}>
              WUNNERDEX v1.0 · PROPERTY OF TEAM ROCKET · KANTO DIVISION<br />
              GIOVANNI IS WATCHING · NO SPAM · JUST DROPS AND RAIDS
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}
