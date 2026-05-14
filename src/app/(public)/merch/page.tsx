import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/content'

export default function MerchPage() {
  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>// 005 · OPERATIVE SUPPLY DROP</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>SUPPLY DROP</h1>
          <p className="mt-4" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'var(--color-brand-off)', letterSpacing: '0.08em', lineHeight: 2 }}>
            Official Rocket Recruitment Regime gear<br />
            Acquire your uniform. Represent the regime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--color-brand-gray-mid)' }}>
          {products.map(p => (
            <a
              key={p.handle}
              href={`https://genwunnr.myshopify.com/products/${p.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              style={{ background: 'var(--color-brand-black)' }}
            >
              <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--color-brand-gray)' }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'var(--color-brand-red)', letterSpacing: '0.1em' }}>▶ Acquire →</span>
                </div>
              </div>
              <div className="p-4">
                <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: 'var(--color-brand-red)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>{p.tag}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-brand-white)', lineHeight: 1.2, marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-brand-red)' }}>{p.price}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-8 text-center" style={{ border: '1px solid var(--color-brand-gray-mid)' }}>
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: 'var(--color-brand-off)', letterSpacing: '0.1em', marginBottom: '1rem', lineHeight: 2 }}>
            View full inventory · Size guides · Order tracking
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

        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: '#333', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 2, marginTop: '2rem' }}>
          SUPPLY DROP v1.0 · ROCKET RECRUITMENT REGIME · ALL PROCEEDS FUND THE REGIME
        </p>

      </div>
    </div>
  )
}
