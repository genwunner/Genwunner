import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { targetCities, performanceVenues } from '@/data/content'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Shows — Genwunner' }

export default async function ShowsPage() {
  const supabase = await createClient()

  const [{ data: upcoming }, { data: past }] = await Promise.all([
    supabase.from('shows').select('*').eq('is_upcoming', true).order('event_date', { ascending: true }),
    supabase.from('shows').select('*').eq('is_upcoming', false).order('event_date', { ascending: false }).limit(10),
  ])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-[var(--color-brand-red)] text-xs uppercase tracking-[0.3em] font-bold mb-4 text-center">Catch the Next Drop</p>
        <h1 className="text-5xl sm:text-7xl text-center mb-4">CITY RAIDS</h1>
        <p className="text-white/30 text-center text-sm mb-16 max-w-md mx-auto">
          Anime conventions · Gaming events · TCG shows · Fan activations · Pop-ups
        </p>

        {/* Upcoming */}
        <p className="font-pixel text-[var(--color-brand-red)] mb-6">Upcoming Shows</p>
        {upcoming && upcoming.length > 0 ? (
          <div className="space-y-4 mb-16">
            {upcoming.map((show: { id: string; event_date: string; city: string; title: string; venue?: string; event_type?: string; ticket_url?: string; rsvp_url?: string }) => (
              <div key={show.id} className="brand-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-center sm:w-20 flex-shrink-0">
                  <p className="stat-number text-3xl">{new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">
                    {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl">{show.title}</h3>
                  <p className="text-white/50 text-sm mt-0.5">{show.city}{show.venue ? ` · ${show.venue}` : ''}</p>
                  {show.event_type && (
                    <span className="font-pixel text-[var(--color-brand-red)]/70">{show.event_type}</span>
                  )}
                </div>
                {(show.ticket_url || show.rsvp_url) && (
                  <a href={show.ticket_url || show.rsvp_url || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Get Tickets →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="brand-card border-dashed p-16 text-center mb-16">
            <p className="text-white/20 text-sm uppercase tracking-widest mb-2">Raids incoming.</p>
            <p className="text-white/15 text-xs mb-6">Join the Wunnerdex to get first alerts.</p>
            <Link href="/wunnerdex" className="btn-primary">Join Wunnerdex →</Link>
          </div>
        )}

        {/* Target City Raids */}
        <div className="brand-card p-8 mb-16">
          <h2 className="text-2xl mb-2">BIG MAN BLASTOISE CITY RAIDS</h2>
          <p className="text-white/40 text-sm mb-6">
            Fan activations dropping in these cities. Sign up under your city — the city with most Wunnerdex signups gets the next raid.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {targetCities.map(city => (
              <Link key={city} href="/wunnerdex"
                className="brand-card p-4 text-center nav-link text-sm hover:text-[var(--color-brand-red)]">
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Past Shows */}
        {past && past.length > 0 && (
          <>
            <p className="font-pixel text-white/30 mb-6">Past Performances</p>
            <div className="space-y-2 mb-16">
              {past.map((show: { id: string; event_date: string; city: string; title: string; venue?: string }) => (
                <div key={show.id} className="flex items-center gap-4 py-3 border-b border-white/5 text-sm">
                  <span className="text-white/30 w-24 flex-shrink-0">
                    {new Date(show.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="font-semibold flex-1">{show.title}</span>
                  <span className="text-white/40">{show.city}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Venue History */}
        <div className="brand-card p-8">
          <h3 className="text-lg text-white/60 mb-4">Previous Venues Include</h3>
          <div className="flex flex-wrap gap-2">
            {performanceVenues.map(v => (
              <span key={v} className="brand-card px-3 py-1.5 text-white/50 text-xs uppercase tracking-wide">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Book CTA */}
        <div className="mt-12 p-8 text-center" style={{ background: 'var(--color-brand-red)' }}>
          <h3 className="text-2xl text-white mb-2">BOOK GENWUNNER FOR YOUR EVENT</h3>
          <p className="text-white/70 text-sm mb-6">Conventions · Gaming events · College shows · Brand activations</p>
          <Link href="/book" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>
            Submit Request →
          </Link>
        </div>
      </div>
    </div>
  )
}
