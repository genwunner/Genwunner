// src/app/(public)/discord/page.tsx
export const metadata = { title: 'Discord — Genwunner · Rocket Recruitment Regime' }

export default function DiscordPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
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
            City raid alerts · classified drops · direct line to the operative
          </p>
        </div>

        {/* Discord widget */}
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

        <div className="mt-6 text-center">
          <a
            href="https://discord.gg/6c28f8JXKV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            🚀 Join the Server →
          </a>
        </div>

      </div>
    </div>
  )
}
