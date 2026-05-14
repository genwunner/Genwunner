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
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-black text-black text-2xl">✓</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">REQUEST RECEIVED</h1>
          <p className="text-white/50 text-sm mb-8">
            We&apos;ll review your inquiry and get back to you within 48 hours. For urgent requests, email{' '}
            <a href="mailto:genwunnermgmt@gmail.com" className="text-yellow-400 underline">genwunnermgmt@gmail.com</a>
          </p>
          <a href="/" className="border border-white/30 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm inline-block">
            Back to the Universe →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Book Genwunner</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-center mb-4">BRING THE POKéRAGE</h1>
        <p className="text-white/40 text-center text-sm mb-4 max-w-md mx-auto">
          For conventions, shows, brand activations, college events, and fan meetups. Serious inquiries only.
        </p>

        {/* Performance types */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['Full Live Set', 'Convention Performance', 'Short Pop-Up Set', 'Meet & Greet',
            'Merch Booth', 'Fan Activation', 'Unreleased Listening Session'].map(t => (
            <span key={t} className="bg-zinc-900 border border-white/10 text-white/50 text-xs px-3 py-1.5 rounded-full uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" required placeholder="Your Name *"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
            <input type="text" name="company" placeholder="Company / Event Name"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="email" name="email" required placeholder="Email *"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
            <input type="tel" name="phone" placeholder="Phone"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="event_city" required placeholder="Event City *"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
            <input type="date" name="event_date" placeholder="Event Date"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white/60 outline-none focus:border-yellow-400 transition-colors" />
          </div>
          <input type="text" name="venue" placeholder="Venue Name"
            className="w-full bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="event_type" required
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white/60 outline-none focus:border-yellow-400 transition-colors">
              <option value="">Type of Event *</option>
              {eventTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select name="budget" required
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white/60 outline-none focus:border-yellow-400 transition-colors">
              <option value="">Budget Range *</option>
              {budgetRanges.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="expected_attendance" placeholder="Expected Attendance"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
            <input type="text" name="performance_length" placeholder="Performance Length"
              className="bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors" />
          </div>
          <textarea name="message" rows={4} placeholder="Additional notes, special requests, or details…"
            className="w-full bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-yellow-400 transition-colors resize-none" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-full hover:bg-yellow-300 disabled:opacity-60 transition-colors text-sm">
            {loading ? 'Submitting…' : 'Submit Booking Request'}
          </button>
          <p className="text-white/20 text-xs text-center">
            For urgent inquiries: <a href="mailto:genwunnermgmt@gmail.com" className="text-yellow-400/50 hover:text-yellow-400 underline">genwunnermgmt@gmail.com</a>
          </p>
        </form>
      </div>
    </div>
  )
}
