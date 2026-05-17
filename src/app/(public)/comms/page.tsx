'use client'

// src/app/(public)/discord/page.tsx
// RRR Discord page — Widgetbot live embed + terminal aesthetic

import { useEffect, useState } from 'react'

const SERVER_ID  = '1387304356810068110'

const CHANNELS = [
  { id: '1504613787632799744', label: "#giovanni's-journal", desc: 'Direct transmissions from Genwunner'         },
  { id: '1504614368732774441', label: '#team-rocket-hq',     desc: 'General — the crew'                          },
  { id: '1504613383067013161', label: '#city-raids',         desc: 'Show announcements & raid reports'           },
  { id: '1504613417200124025', label: '#supply-drops',       desc: 'Merch drops & collector editions'            },
  { id: '1504613454261125280', label: '#grunt-intros',       desc: 'New operative introductions'                 },
]

export default function DiscordPage() {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0].id)
  const [loaded, setLoaded] = useState(false)
  const [onlineCount, setOnlineCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${SERVER_ID}/widget.json`)
      .then(r => r.json())
      .then(data => { if (data.members) setOnlineCount(data.members.length) })
      .catch(() => {})
  }, [])

  const activeChannelData = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0]

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#cc0000', fontFamily: '"Courier New", Courier, monospace' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ borderBottom: '1px solid #1a0000', padding: '2rem 1.5rem 1.5rem' }}>
        <div style={{ fontSize: '0.5rem', color: '#330000', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
          // TEAM ROCKET HQ · LIVE COMMS · ROCKET RECRUITMENT REGIME
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{
              margin: '0 0 0.25rem',
              fontFamily: '"Courier New", monospace',
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#cc0000',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.2em',
            }}>
              TEAM ROCKET HQ
              <span style={{
                display: 'inline-block',
                width: '0.5em',
                height: '1em',
                background: '#e3000f',
                verticalAlign: 'middle',
                marginLeft: '0.1em',
                animation: 'terminal-blink 0.9s step-end infinite',
                boxShadow: '0 0 8px rgba(227,0,15,0.7)',
              }} />
            </h1>
            <p style={{ margin: 0, fontSize: '0.55rem', color: '#440000', letterSpacing: '0.1em' }}>
              Rocket Recruitment Regime · Kanto Division · Live
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Courier New", monospace', fontSize: '1.2rem', fontWeight: 700, color: '#ff5555', lineHeight: 1 }}>
                {onlineCount !== null ? `${onlineCount}` : '—'}
              </div>
              <div style={{ fontSize: '0.4rem', color: '#440000', letterSpacing: '0.08em', marginTop: 2 }}>ONLINE NOW</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#44cc44', boxShadow: '0 0 8px rgba(68,204,68,0.8)', animation: 'pulse 2s ease infinite' }} />
            <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.48rem', color: '#44cc44', letterSpacing: '0.1em', fontWeight: 700 }}>
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        height: 'calc(100vh - 200px)',
        minHeight: 500,
        borderBottom: '1px solid #1a0000',
      }}>

        {/* ── LEFT — Channel selector ── */}
        <div style={{ borderRight: '1px solid #1a0000', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #0d0000', fontSize: '0.42rem', color: '#330000', letterSpacing: '0.12em' }}>
            // CHANNELS
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CHANNELS.map(ch => (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch.id); setLoaded(false) }}
                style={{
                  width: '100%',
                  background: activeChannel === ch.id ? '#0d0000' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #080000',
                  borderLeft: activeChannel === ch.id ? '2px solid #e3000f' : '2px solid transparent',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                }}
                onMouseEnter={e => { if (activeChannel !== ch.id) (e.currentTarget as HTMLElement).style.background = '#060000' }}
                onMouseLeave={e => { if (activeChannel !== ch.id) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.52rem', color: activeChannel === ch.id ? '#e3000f' : '#550000', letterSpacing: '0.05em', fontWeight: activeChannel === ch.id ? 700 : 400, marginBottom: '0.2rem' }}>
                  {ch.label}
                </div>
                <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.38rem', color: '#280000', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                  {ch.desc}
                </div>
              </button>
            ))}
          </div>

          <div style={{ padding: '0.75rem', borderTop: '1px solid #0d0000' }}>
            <a
              href="https://discord.gg/6c28f8JXKV"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                fontFamily: '"Courier New", monospace',
                fontSize: '0.5rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#000',
                background: '#e3000f',
                border: '1px solid #e3000f',
                padding: '0.5rem',
                textAlign: 'center',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              join the regime
            </a>
          </div>
        </div>

        {/* ── RIGHT — Widgetbot iframe ── */}
        <div style={{ position: 'relative', background: '#000' }}>
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', zIndex: 2 }}>
              <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.55rem', color: '#440000', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                &gt; CONNECTING TO {activeChannelData.label.toUpperCase()}...
              </div>
              <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.42rem', color: '#280000', letterSpacing: '0.08em' }}>
                &gt; ESTABLISHING SECURE UPLINK...
              </div>
            </div>
          )}
          <iframe
            key={activeChannel}
            src={`https://e.widgetbot.io/channels/${SERVER_ID}/${activeChannel}`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            onLoad={() => setLoaded(true)}
            allow="clipboard-write; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      {/* ── BOTTOM INFO STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a0000', borderBottom: '1px solid #1a0000' }}>
        {[
          { label: '// What is this',       body: 'Team Rocket HQ is the live command center for the Rocket Recruitment Regime. Direct comms, city raid alerts, supply drops, classified intel.' },
          { label: '// The Vault',           body: 'Wunnerdex-registered operatives unlock #the-vault — exclusive content, early previews, classified drops. Enlist at genwunner.com/wunnerdex.' },
          { label: "// Giovanni's Journal",  body: 'Direct transmissions from Genwunner himself. Personal updates, behind the scenes, mission intel. The most direct line to the operative.' },
        ].map(item => (
          <div key={item.label} style={{ background: '#000', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.44rem', color: '#e3000f', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{item.label}</div>
            <p style={{ margin: 0, fontSize: '0.5rem', color: '#550000', lineHeight: 1.8, letterSpacing: '0.04em' }}>{item.body}</p>
          </div>
        ))}
      </div>

      {/* ── ENLIST CTA ── */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #1a0000', background: '#030000' }}>
        <div>
          <div style={{ fontSize: '0.44rem', color: '#330000', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>// NOT IN THE WUNNERDEX YET?</div>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 700, color: '#880000', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Register to unlock #the-vault
          </div>
        </div>
        <a
          href="/wunnerdex"
          style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#000', background: '#e3000f', border: '1px solid #e3000f', padding: '0.6rem 1.5rem', textDecoration: 'none', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
        >
          [ ENLIST IN THE REGIME ]
        </a>
      </div>

      <style>{`
        @keyframes terminal-blink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #330000; }
      `}</style>
    </div>
  )
}
