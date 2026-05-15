// src/app/(public)/merch/page.tsx
import Image from 'next/image'
import { products } from '@/data/content'

export const metadata = { title: 'Supply Drop | Genwunner · Rocket Recruitment Regime' }

export default function MerchPage() {
  return (
    <div className="min-h-screen py-20 px-4"
      style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.4rem',
            color: 'var(--color-brand-red)',
            letterSpacing: '0.15em',
            marginBottom: '0.75rem',
          }}>
            // OPERATIVE SUPPLY DROP · OFFICIAL REGIME GEAR
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            SUPPLY DROP
          </h1>
          <p className="mt-4" style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.08em',
            lineHeight: 2,
          }}>
            Official Rocket Recruitment Regime gear.<br />
            Acquire your uniform. Represent the regime.
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--color-brand-gray-mid)', border: '1px solid var(--color-brand-gray-mid)' }}
        >
          {products.map(p => (
            <a
              key={p.handle}
              href={`https://genwunnr.myshopify.com/products/${p.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              style={{ background: 'var(--color-brand-black)' }}
            >
              <div
                className="relative aspect-square overflow-hidden"
                style={{ background: 'var(--color-brand-gray)' }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
                >
                  <span style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.38rem',
                    color: 'var(--color-brand-red)',
                    letterSpacing: '0.1em',
                  }}>
                    ▶ Acquire →
                  </span>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: '1px solid var(--color-brand-red)' }}
                />
              </div>

              <div className="p-4" style={{ borderTop: '1px solid var(--color-brand-gray-mid)' }}>
                <p style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.32rem',
                  color: 'var(--color-brand-red)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                }}>
                  {p.tag}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-white)',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: 'var(--color-brand-red)',
                }}>
                  {p.price}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Full Store CTA */}
        <div className="mt-4 p-8 text-center" style={{
          background: 'var(--color-brand-gray)',
          border: '1px solid var(--color-brand-gray-mid)',
        }}>
          <p style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.38rem',
            color: 'var(--color-brand-off)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            lineHeight: 2,
          }}>
            Full inventory · size guides · order tracking
          </p>
          <a
            href="https://genwunnr.myshopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Enter the Supply Depot →
          </a>
        </div>

        {/* Collector Edition Teaser */}
        <div className="mt-4 p-8" style={{ background: 'var(--color-brand-red)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.38rem',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.12em',
                marginBottom: '0.4rem',
              }}>
                // INCOMING · SUMMER 2026 · LIMIT 2 PER GRUNT
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                color: 'white',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Blue Version + Red Version<br />Collector Editions
              </h3>
              <p style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.34rem',
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.06em',
                marginTop: '0.4rem',
                lineHeight: 2,
              }}>
                Gameboy cartridge USB · holographic signed trainer card · album booklet · poster
              </p>
            </div>
            <a
              href="/wunnerdex"
              className="btn-outline flex-shrink-0"
              style={{ borderColor: 'white', color: 'white' }}
            >
              Enlist for Early Access →
            </a>
          </div>
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
          SUPPLY DROP v1.0 · ROCKET RECRUITMENT REGIME · ALL PROCEEDS FUND THE REGIME
        </p>

      </div>
    </div>
  )
}
