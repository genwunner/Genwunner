'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WunnerdexForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name:  (form.elements.namedItem('name')  as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      city:  (form.elements.namedItem('city')  as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value || '',
    }

    try {
      const res = await fetch('/api/wunnerdex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.redirect) {
        router.push(json.redirect)
      } else if (!res.ok) {
        setError('Something went wrong. Try again.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#050000', border: '1px solid #440000', padding: '1.25rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 5, left: 5, right: 5, bottom: 5, border: '1px solid #180000', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
        <div style={{ width: 32, height: 32, background: '#e3000f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>⚡</div>
        <div>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', fontWeight: 700, color: '#cc0000', letterSpacing: '0.05em', textTransform: 'uppercase' }}>GRUNT REG.</div>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.36rem', color: '#440000', letterSpacing: '0.07em', marginTop: 2 }}>// WUNNERDEX · TEAM ROCKET DATABASE</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <label className="brand-label">Trainer Name</label>
        <input name="name" type="text" className="brand-input" placeholder="your name" />
        <label className="brand-label">Home Territory</label>
        <input name="city" type="text" className="brand-input" placeholder="city, state / country" />
        <label className="brand-label">Comms Channel (Email) *</label>
        <input name="email" type="email" required className="brand-input" placeholder="your@email.com" />
        {error && (
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.44rem', color: '#ff5555', letterSpacing: '0.06em' }}>
            &gt; ERROR: {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ marginTop: '0.25rem', width: '100%', justifyContent: 'center', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? '[ PROCESSING... ]' : '[ REPORT FOR DUTY ]'}
        </button>
        <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.3rem', color: '#1a0000', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.8, marginTop: '0.2rem' }}>
          WUNNERDEX v1.0 · NO SPAM · JUST DROPS AND RAIDS
        </div>
      </form>
    </div>
  )
}
