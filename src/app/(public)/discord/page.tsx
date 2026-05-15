// src/app/(public)/discord/page.tsx
export const metadata = { title: 'Discord HQ | Genwunner · Rocket Recruitment Regime' }

const perks = [
  { label: 'City Raid Alerts',    desc: 'First to know when shows drop in your territory'   },
  { label: 'Classified Drops',    desc: 'Unreleased snippets and previews in #the-vault'    },
  { label: "Giovanni's Journal",  desc: 'Direct updates from Genwunner himself'              },
  { label: 'Grunt Rank System',   desc: 'Level up from New Recruit to Right Hand of Giovanni' },
  { label: "Who's That Pokémon",  desc: 'Daily games and community events'                  },
  { label: 'Raid Attendee Role',  desc: "Special role if you've been to a live city raid"   },
]

export default function DiscordPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // THE REGIME HAS A HOME BASE
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            DISCORD HQ
          </h1>
          <p className="mt-3" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.36rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
          }}>
            The official home base of the Rocket Recruitment Regime.<br />
            Giovanni keeps records on every operative who enlists.
          </p>
        </div>

        {/* Discord Widget */}
        <div style={{ border: '1px solid var(--color-brand-gray-mid)', marginBottom: '1rem' }}>
          <iframe
            src="https://discord.com/widget?id=1387304356810068110&theme=dark"
            width="100%"
            height="500"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style={{ display: 'block', border: 'none' }}
          />
        </div>

        {/* Join CTA */}
        <div className="text-center my-8">
          <a
            href="https://discord.gg/6c28f8JXKV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '1.2rem' }}
          >
            🚀 Enter HQ · Join the Server →
          </a>
        </div>

        {/* Perks */}
        <div style={{ borderTop: '1px solid var(--color-brand-gray-mid)', marginTop: '2rem' }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.1em',
            margin: '1.5rem 0 1rem',
          }}>
            // What you get as an operative
          </p>
          {perks.map((perk, i) => (
            <div
              key={perk.label}
              className="flex items-start gap-4 py-4 border-b"
              style={{ borderColor: 'var(--color-brand-gray-mid)' }}
            >
              <span style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.38rem',
                color: 'var(--color-brand-red)',
                flexShrink: 0,
                marginTop: 2,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-white)',
                }}>
                  {perk.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.34rem',
                  color: 'var(--color-brand-off)',
                  letterSpacing: '0.04em',
                  marginTop: 4,
                  lineHeight: 1.8,
                }}>
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 p-8 text-center" style={{ background: 'var(--color-brand-red)' }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            lineHeight: 2,
          }}>
            The regime is only getting started.<br />
            Show up early. Giovanni remembers.
          </p>
          <a
            href="https://discord.gg/6c28f8JXKV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ borderColor: 'white', color: 'white' }}
          >
            🚀 Join the Rocket Recruitment Regime →
          </a>
        </div>

        <p style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: '0.28rem',
          color: '#2a2a2a',
          textAlign: 'center',
          letterSpacing: '0.06em',
          lineHeight: 2,
          marginTop: '2rem',
        }}>
          ROCKET RECRUITMENT REGIME · KANTO DIVISION · DISCORD HQ
        </p>

      </div>
    </div>
  )
}
