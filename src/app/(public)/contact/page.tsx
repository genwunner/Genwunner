// src/app/(public)/contact/page.tsx
import Link from 'next/link'

export const metadata = { title: 'Intel | Genwunner' }

const channels = [
  {
    title: 'Booking & Shows',
    sub: 'Deploy',
    desc: 'Conventions · college shows · gaming events · brand activations · fan meetups',
    href: '/book',
    cta: 'Submit Deployment Request',
    primary: true,
    external: false,
  },
  {
    title: 'Press & Media',
    sub: 'Intel',
    desc: 'Interviews · features · editorial · playlisting · coverage',
    email: 'genwunnermgmt@gmail.com',
    cta: 'Transmit →',
    primary: false,
  },
  {
    title: 'Management & Business',
    sub: 'Operations',
    desc: 'Label inquiries · brand deals · partnerships · sync licensing',
    email: 'genwunnermgmt@gmail.com',
    cta: 'Transmit →',
    primary: false,
  },
  {
    title: 'Collabs & Features',
    sub: 'Alliance',
    desc: 'Artist collabs · features · remixes · co-productions',
    email: 'genwunnermgmt@gmail.com',
    cta: 'Transmit →',
    primary: false,
  },
  {
    title: 'Fan Submissions',
    sub: 'Propaganda Dept',
    desc: 'Fan art · edits · memes · Big Man Blastoise sightings · UGC',
    href: 'https://discord.gg/6c28f8JXKV',
    cta: 'Post in Discord →',
    primary: false,
    external: true,
  },
  {
    title: 'Merch Support',
    sub: 'Supply Drop',
    desc: 'Order issues · shipping inquiries · returns · collector edition questions',
    email: 'genwunnermgmt@gmail.com',
    cta: 'Transmit →',
    primary: false,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // CONTACT HQ
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            INTEL
          </h1>
          <p className="mt-4" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
          }}>
            Use the right channel. Giovanni reads everything.
          </p>
        </div>

        {/* ── Contact Channels ── */}
        <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
          {channels.map((ch, i) => (
            <div
              key={ch.title}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 border-b"
              style={{ borderColor: 'var(--color-brand-gray-mid)', position: 'relative' }}
            >
              {/* Red slash on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                style={{ background: 'var(--color-brand-red)' }}
              />

              {/* Number */}
              <div className="flex-shrink-0" style={{ minWidth: 32 }}>
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.38rem',
                  color: 'var(--color-brand-red)',
                  letterSpacing: '0.05em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-white)',
                  }}>
                    {ch.title}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.34rem',
                    color: 'var(--color-brand-off)',
                    letterSpacing: '0.06em',
                  }}>
                    // {ch.sub}
                  </span>
                </div>
                <p className="mt-1" style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.34rem',
                  color: 'var(--color-brand-off)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.8,
                }}>
                  {ch.desc}
                </p>
              </div>

              {/* CTA */}
              {'href' in ch && ch.href ? (
                ch.external ? (
                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ch.primary ? 'btn-primary' : 'btn-outline'}
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.38rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {ch.cta}
                  </a>
                ) : (
                  <Link
                    href={ch.href}
                    className={ch.primary ? 'btn-primary' : 'btn-outline'}
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.38rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {ch.cta}
                  </Link>
                )
              ) : (
                <a
                  href={`mailto:${'email' in ch ? ch.email : ''}`}
                  className="btn-outline"
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.38rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {ch.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── General Inquiries ── */}
        <div className="mt-12 p-8 text-center" style={{
          background: 'var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
          }}>
            // General Transmissions
          </p>
          <a
            href="mailto:genwunnermgmt@gmail.com"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              letterSpacing: '0.05em',
              color: 'var(--color-brand-red)',
              transition: 'color 0.15s',
            }}
            className="hover:!text-[var(--color-brand-red-dark)]"
          >
            genwunnermgmt@gmail.com
          </a>
          <p className="mt-3" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.34rem',
            color: '#444',
            letterSpacing: '0.06em',
            lineHeight: 2,
          }}>
            Management responds within 48 hours.<br />
            Giovanni is watching all transmissions.
          </p>
        </div>

      </div>
    </div>
  )
}
