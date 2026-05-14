'use client'

import { useState } from 'react'

const eventTypes = [
  'Anime Convention', 'Gaming Convention', 'TCG Event', 'College Show',
  'Nightlife / Club', 'Brand Activation', 'Music Festival', 'Fan Meetup / Pop-up',
  'Private Event', 'Other',
]

const budgetRanges = ['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000–$10,000', '$10,000+', 'Let\'s discuss']

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) setSubmitted(true)
    else setError('Something went wrong. Email genwunnermgmt@gmail.com directly.')
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[var(--color-brand-red)] flex items-center justify-center mx-auto mb-6">
            <span className="font-black text-white text-2xl">✓</span>
          </div>
          <h1 className="text-4xl mb-4">REQUEST RECEIVED</h1>
          <p className="text-white/50 text-sm mb-8">
            We&apos;ll review your inquiry and get back to you within 48 hours. For urgent requests, email{' '}
            <a href="mailto:genwunnermgmt@gmail.com" className="text-[var(--color-brand-red)] underline">genwunnermgmt@gmail.com</a>
          </p>
          <a href="/" className="btn-outline">Back to the Universe →</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-[var(--color-brand-red)] text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Book Genwunner</p>
        <h1 className="text-5xl sm:text-6xl text-center mb-4">BRING THE POKéRAGE</h1>
        <p className="text-white/40 text-center text-sm mb-4 max-w-md mx-auto">
          For conventions, shows, brand activations, college events, and fan meetups. Serious inquiries only.
        </p>

        {/* Performance types */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['Full Live Set', 'Convention Performance', 'Short Pop-Up Set', 'Meet & Greet',
            'Merch Booth', 'Fan Activation', 'Unreleased Listening Session'].map(t => (
            <span key={t} className="brand-card px-3 py-1.5 text-white/50 text-xs uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" required placeholder="Your Name *" className="brand-input" />
            <input type="text" name="company" placeholder="Company / Event Name" className="brand-input" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="email" name="email" required placeholder="Email *" className="brand-input" />
            <input type="tel" name="phone" placeholder="Phone" className="brand-input" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="event_city" required placeholder="Event City *" className="brand-input" />
            <input type="date" name="event_date" className="brand-input" />
          </div>
          <input type="text" name="venue" placeholder="Venue Name" className="brand-input" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="event_type" required className="brand-input">
              <option value="">Type of Event *</option>
              {eventTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select name="budget" required className="brand-input">
              <option value="">Budget Range *</option>
              {budgetRanges.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="expected_attendance" placeholder="Expected Attendance" className="brand-input" />
            <input type="text" name="performance_length" placeholder="Performance Length" className="brand-input" />
          </div>
          <textarea name="message" rows={4} placeholder="Additional notes, special requests, or details…"
            className="brand-input resize-none" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 disabled:opacity-60">
            {loading ? 'Submitting…' : 'Submit Booking Request'}
          </button>
          <p className="text-white/20 text-xs text-center">
            For urgent inquiries:{' '}
            <a href="mailto:genwunnermgmt@gmail.com" className="text-[var(--color-brand-red)]/50 hover:text-[var(--color-brand-red)] underline">
              genwunnermgmt@gmail.com
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
