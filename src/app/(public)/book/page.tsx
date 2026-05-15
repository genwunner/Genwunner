// src/app/(public)/book/page.tsx
'use client'

import { useState } from 'react'

const eventTypes = [
  'Anime Convention',
  'Gaming Convention',
  'TCG Event',
  'College Show',
  'Nightlife / Club',
  'Brand Activation',
  'Music Festival',
  'Fan Meetup / Pop-up',
  'Private Event',
  'Other',
]

const budgetRanges = [
  'Under $1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000–$10,000',
  '$10,000+',
  "Let's discuss",
]

const deploymentTypes = [
  'Full Live Set',
  'Convention Performance',
  'Short Pop-Up Set',
  'Meet & Greet',
  'Merch Booth',
  'Fan Activation',
  'Unreleased Listening Session',
]

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
    else setError('Transmission failed. Email genwunnermgmt@gmail.com directly.')
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--color-brand-black)' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
            style={{
              background: 'var(--color-brand-red)',
              borderRadius: '50%',
              boxShadow: '0 0 40px rgba(227,0,15,0.4)',
              fontSize: '2rem',
            }}>
            ⚡
          </div>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // Deployment Request Received
          </p>
          <h1 className="section-title mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
            REQUEST FILED
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--color-brand-off)',
            lineHeight: 1.75,
            marginBottom: '0.75rem',
          }}>
            Giovanni has your file. Management will review your deployment request
            and respond within 48 hours.
          </p>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
            marginBottom: '2rem',
          }}>
            Urgent? Transmit directly to{' '}
            <a
              href="mailto:genwunnermgmt@gmail.com"
              style={{ color: 'var(--color-brand-red)', textDecoration: 'underline' }}
            >
              genwunnermgmt@gmail.com
            </a>
          </p>
          <a href="/" className="btn-outline">← Return to HQ</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // REQUEST AN OPERATIVE
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            DEPLOY<br />GENWUNNER
          </h1>
          <p className="mt-4" style={{
            fontSize: '0.88rem',
            color: 'var(--color-brand-off)',
            lineHeight: 1.75,
            maxWidth: 420,
            margin: '1rem auto 0',
          }}>
            Conventions · gaming events · college shows · brand activations · fan meetups.
            Serious deployment requests only.
          </p>
        </div>

        {/* ── Deployment types ── */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {deploymentTypes.map(t => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.34rem',
                letterSpacing: '0.06em',
                color: 'var(--color-brand-off)',
                background: 'var(--color-brand-gray)',
                border: '1px solid var(--color-brand-gray-mid)',
                padding: '0.3rem 0.65rem',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Form ── */}
        <div style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(227,0,15,0.06) 0%, transparent 60%), var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
          padding: '2rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem',
          }}>
            // Deployment Request Form
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Contact Name *</label>
                <input type="text" name="name" required placeholder="Your name" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Company / Event Name</label>
                <input type="text" name="company" placeholder="Organization or event" className="brand-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Comms Channel (Email) *</label>
                <input type="email" name="email" required placeholder="your@email.com" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Secondary Comms (Phone)</label>
                <input type="tel" name="phone" placeholder="Optional" className="brand-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Target Territory (City) *</label>
                <input type="text" name="event_city" required placeholder="City, State / Country" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Deployment Date</label>
                <input type="date" name="event_date" className="brand-input" />
              </div>
            </div>

            <div>
              <label className="brand-label">Venue Name</label>
              <input type="text" name="venue" placeholder="Venue or location" className="brand-input" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Mission Type *</label>
                <select name="event_type" required className="brand-input">
                  <option value="">Select event type...</option>
                  {eventTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="brand-label">Budget Range *</label>
                <select name="budget" required className="brand-input">
                  <option value="">Select budget range...</option>
                  {budgetRanges.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="brand-label">Expected Attendance</label>
                <input type="text" name="expected_attendance" placeholder="Estimated headcount" className="brand-input" />
              </div>
              <div>
                <label className="brand-label">Performance Length</label>
                <input type="text" name="performance_length" placeholder="e.g. 30 min, 1 hour" className="brand-input" />
              </div>
            </div>

            <div>
              <label className="brand-label">Additional Intel</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Special requests, notes, or anything else Giovanni should know..."
                className="brand-input resize-none"
              />
            </div>

            {error && (
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.38rem',
                color: '#f87171',
                letterSpacing: '0.06em',
              }}>
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Transmitting...' : '⚡ Submit Deployment Request'}
            </button>

            <p style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.32rem',
              color: '#444',
              textAlign: 'center',
              letterSpacing: '0.06em',
              lineHeight: 2,
            }}>
              Urgent deployments:{' '}
              <a
                href="mailto:genwunnermgmt@gmail.com"
                style={{ color: 'var(--color-brand-red)', opacity: 0.7 }}
              >
                genwunnermgmt@gmail.com
              </a>
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}
