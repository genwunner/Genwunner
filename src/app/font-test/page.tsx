// TEMPORARY — delete after font is chosen
import {
  Black_Ops_One,
  Orbitron,
  Bebas_Neue,
  Rajdhani,
  Russo_One,
  Share_Tech_Mono,
  Nova_Mono,
  Syncopate,
  Oxanium,
  Iceland,
} from 'next/font/google'

const blackOps    = Black_Ops_One(  { weight: '400', subsets: ['latin'], display: 'swap' })
const orbitron    = Orbitron(       { weight: '700', subsets: ['latin'], display: 'swap' })
const bebas       = Bebas_Neue(     { weight: '400', subsets: ['latin'], display: 'swap' })
const rajdhani    = Rajdhani(       { weight: '700', subsets: ['latin'], display: 'swap' })
const russo       = Russo_One(      { weight: '400', subsets: ['latin'], display: 'swap' })
const shareTech   = Share_Tech_Mono({ weight: '400', subsets: ['latin'], display: 'swap' })
const novaMono    = Nova_Mono(      { weight: '400', subsets: ['latin'], display: 'swap' })
const syncopate   = Syncopate(      { weight: '700', subsets: ['latin'], display: 'swap' })
const oxanium     = Oxanium(        { weight: '700', subsets: ['latin'], display: 'swap' })
const iceland     = Iceland(        { weight: '400', subsets: ['latin'], display: 'swap' })

const WORDS = ['GENWUNNER', 'THE ARSENAL', 'CITY RAIDS', 'THE BOSS IS WATCHING.']

const fonts = [
  {
    section: '── MILITARY / STENCIL ──',
    entries: [
      { name: 'Black Ops One', desc: 'Military stencil — made for the Regime. Tough, bold, no-nonsense.',       cls: blackOps.className  },
      { name: 'Orbitron',      desc: 'Command-center sci-fi. Geometric, futuristic, reads like a terminal.',    cls: orbitron.className  },
      { name: 'Bebas Neue',    desc: 'Condensed powerhouse. Was in the original design — proven impact.',       cls: bebas.className     },
      { name: 'Rajdhani',      desc: 'Technical military. Slightly condensed, sharp edges, strong readability.',cls: rajdhani.className  },
      { name: 'Russo One',     desc: 'Bold geometric. Heavy presence, clean lines, works at any size.',         cls: russo.className     },
    ],
  },
  {
    section: '── COMPUTER / TERMINAL ──',
    entries: [
      { name: 'Share Tech Mono', desc: 'Actual monospace terminal font. Looks like real command-line output.',  cls: shareTech.className },
      { name: 'Nova Mono',       desc: 'Elegant monospace. Cleaner than Courier, still pure terminal.',         cls: novaMono.className  },
      { name: 'Syncopate',       desc: 'Wide geometric. Letters feel like circuit traces — very digital.',      cls: syncopate.className },
      { name: 'Oxanium',         desc: 'Modern sci-fi terminal. Rounded but angular — like a HUD display.',     cls: oxanium.className   },
      { name: 'Iceland',         desc: 'Cold precision. Tight, technical, feels like classified data readout.', cls: iceland.className   },
    ],
  },
]

export default function FontTest() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ fontFamily: 'Courier New', fontSize: '0.6rem', color: '#e3000f', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
        // FONT PREVIEW — TEMPORARY PAGE
      </div>
      <div style={{ fontFamily: 'Courier New', fontSize: '0.5rem', color: '#440000', letterSpacing: '0.1em', marginBottom: '3rem' }}>
        Pick your favourite, then tell Claude which one.
      </div>

      {fonts.map(group => (
        <div key={group.section}>
          <div style={{ fontFamily: 'Courier New', fontSize: '0.55rem', color: '#e3000f', letterSpacing: '0.2em', padding: '2rem 0 1rem', borderTop: '1px solid #330000' }}>
            {group.section}
          </div>
          {group.entries.map((font, i) => (
            <div key={font.name} style={{
              paddingTop: '1.75rem',
              paddingBottom: '1.75rem',
              borderBottom: '1px solid #0d0000',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'Courier New', fontSize: '0.5rem', color: '#e3000f', letterSpacing: '0.15em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'Courier New', fontSize: '0.65rem', fontWeight: 700, color: '#cc0000', letterSpacing: '0.1em' }}>
                  {font.name}
                </span>
                <span style={{ fontFamily: 'Courier New', fontSize: '0.48rem', color: '#550000', letterSpacing: '0.06em' }}>
                  — {font.desc}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className={font.cls} style={{
                  fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  color: '#000',
                  background: '#e3000f',
                  display: 'inline-block',
                  padding: '0.05em 0.18em',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}>
                  GENWUNNER
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {['THE ARSENAL', 'CITY RAIDS', 'THE BOSS IS WATCHING.'].map(w => (
                    <div key={w} className={font.cls} style={{
                      fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                      fontWeight: 700,
                      color: '#cc0000',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                    }}>
                      {w}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.1rem' }}>
                  {['BIG MAN BLASTOISE', 'POKEFLUTE! FT. SHOFU', 'SUPPLY DROP'].map(w => (
                    <div key={w} className={font.cls} style={{
                      fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                      fontWeight: 700,
                      color: '#880000',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                    }}>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ fontFamily: 'Courier New', fontSize: '0.48rem', color: '#330000', letterSpacing: '0.1em', marginTop: '2rem' }}>
        // END PREVIEW — tell Claude your pick and this page will be deleted
      </div>
    </div>
  )
}
