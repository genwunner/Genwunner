import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { targetCities, performanceVenues, upcomingShows } from '@/data/content'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'City Raids | Genwunner' }

export default async function ShowsPage() {
  const supabase = await createClient()

  const [{ data: supabaseUpcoming }, { data: past }] = await Promise.all([
    supabase.from('shows').select('*').eq('is_upcoming', true).order('event_date', { ascending: true }),
    supabase.from('shows').select('*').eq('is_upcoming', false).order('event_date', { ascending: false }).limit(10),
  ])

  // Merge static shows with any Supabase shows, static first
  const upcoming = [...upcomingShows, ...(supabaseUpcoming ?? [])].sort(
    (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-4xl mx-auto px-4 py-20">

        <div className="text-center mb-16">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 004 · ACTIVE CAMPAIGN</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>CITY RAIDS</h1>
          <p className="mt-4" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'var(--color-brand-off)', letterSpacing: '0.08em', lineHeight: 2 }}>
            Anime conventions · Gaming events · TCG shows · Fan activations · Pop-ups<br />
            Genwunner spreading Rocket Recruitment Regime propaganda across Kanto and beyond
          </p>
        </div>

        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>// Upcoming Raids</div>

        {upcoming.length > 0 ? (
          <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)', marginBottom: '4rem' }}>
            {upcoming.map((show: { id: string; event_date: string; city: string; title: string; venue?: string; event_type?: string; ticket_url?: string; rsvp_url?: string }) => (
              <div key={show.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 border-b" style={{ borderColor: 'var(--color-brand-gray-mid)' }}>
                <div className="flex-shrink-0 text-center" style={{ minWidth: 80 }}>
                  <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em' }}>{new Date(show.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: 1, color: 'var(--color-brand-white)' }}>{new Date(show.event_date).toLocaleDateString('en-US', { day: '2-digit' })}</p>
                  <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.34rem', color: 'var(--color-brand-off)', letterSpacing: '0.06em' }}>{new Date(show.event_date).toLocaleDateString('en-US', { year: '2-digit' })}</p>
                </div>
                <div className="flex-1">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{show.title}</h3>
                  <p className="mt-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', letterSpacing: '0.05em' }}>// {show.city}{show.venue ? ` · ${show.venue}` : ''}{show.event_type ? ` · ${show.event_type}` : ''}</p>
                </div>
                {(show.ticket_url || show.rsvp_url) ? (
                  <a href={show.ticket_url || show.rsvp_url || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem' }}>Get Tickets →</a>
                ) : (
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'var(--color-brand-off)', border: '1px solid var(--color-brand-gray-mid)', padding: '0.3rem 0.65rem', letterSpacing: '0.06em' }}>TBA</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16 border" style={{ borderColor: 'var(--color-brand-gray-mid)', borderStyle: 'dashed' }}>
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-off)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Raids incoming.</p>
            <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: '#444', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>Enlist in the Wunnerdex to receive first alerts.</p>
            <Link href="/wunnerdex" className="btn-primary">Enlist Now →</Link>
          </div>
        )}

        <div className="p-8 mb-16" style={{ background: 'var(--color-brand-gray)', border: '1px solid var(--color-brand-gray-mid)' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>// Territory Intelligence</div>
          <h2 className="section-title mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Big Man Blastoise City Raids</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-brand-off)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 480 }}>Fan activations dropping in these territories. Enlist under your city. The territory with the most Wunnerdex operatives gets the next raid.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {targetCities.map(city => (
              <Link key={city} href="/wunnerdex" className="p-4 text-center border transition-all duration-150" style={{ background: 'var(--color-brand-black)', borderColor: 'var(--color-brand-gray-mid)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-brand-off)' }}>
                {city}
              </Link>
            ))}
          </div>
        </div>

        {past && past.length > 0 && (
          <div className="mb-16">
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#444', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>// Past Operations: Territory Secured</div>
            <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
              {past.map((show: { id: string; event_date: string; city: string; title: string }) => (
                <div key={show.id} className="flex items-center gap-4 py-3 border-b" style={{ borderColor: 'var(--color-brand-gray-mid)' }}>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.34rem', color: '#444', letterSpacing: '0.05em', flexShrink: 0, minWidth: 100 }}>{new Date(show.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase', flex: 1, color: 'var(--color-brand-off)' }}>{show.title}</span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.34rem', color: '#444', letterSpacing: '0.04em' }}>{show.city}</span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: '#333', border: '1px solid #2a2a2a', padding: '0.2rem 0.5rem', letterSpacing: '0.06em', flexShrink: 0 }}>Secured</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 mb-16" style={{ background: 'var(--color-brand-gray)', border: '1px solid var(--color-brand-gray-mid)' }}>
          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#444', letterSpacing: '0.1em', marginBottom: '1rem' }}>// Previously Raided Venues</div>
          <div className="flex flex-wrap gap-2">
            {performanceVenues.map(v => (
              <span key={v} style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-brand-off)', background: 'var(--color-brand-black)', border: '1px solid var(--color-brand-gray-mid)', padding: '0.35rem 0.75rem' }}>{v}</span>
            ))}
          </div>
        </div>

        <div className="p-10 text-center" style={{ background: 'var(--color-brand-red)' }}>
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// Request an Operative</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Deploy Genwunner to Your Territory</h3>
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', lineHeight: 2, marginBottom: '1.75rem' }}>Conventions · Gaming events · College shows · Brand activations</p>
          <Link href="/book" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>Submit Deployment Request →</Link>
        </div>

      </div>
    </div>
  )
}
