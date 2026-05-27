'use client'

// src/app/(public)/merch/page.tsx
import Image from 'next/image'
import { useState } from 'react'
import { products } from '@/data/content'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const CATEGORIES = ['all', 'apparel', 'poster', 'flag', 'stickers']

function ProductCard({ product }: { product: typeof products[0] }) {
  const [size, setSize] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleBuy() {
    if (product.hasSize && !size) {
      setError('Select a size')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: product.stripePrice,
          productTitle: product.title,
          size,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Try again.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="group"
      style={{ background: 'var(--color-brand-black)', border: '1px solid #1a0000', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#e3000f'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a0000'}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: '#0a0000', overflow: 'hidden' }}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div style={{ padding: '1rem', borderTop: '1px solid #1a0000', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.5rem', color: '#550000', letterSpacing: '0.1em' }}>{product.tag}</div>
        <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.9rem', fontWeight: 700, color: '#cc0000', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.2 }}>{product.title}</div>
        <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.55rem', color: '#660000', lineHeight: 1.7, letterSpacing: '0.03em', flex: 1 }}>{product.desc}</p>
        <div style={{ fontFamily: '"Courier New", monospace', fontSize: '1.1rem', fontWeight: 700, color: '#e3000f', marginTop: '0.25rem' }}>{product.price}</div>
        {product.hasSize && (
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => { setSize(s); setError('') }}
                style={{
                  fontFamily: '"Courier New", monospace', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.08em',
                  padding: '0.25rem 0.5rem', border: '1px solid',
                  borderColor: size === s ? '#e3000f' : '#330000',
                  background: size === s ? '#e3000f' : 'transparent',
                  color: size === s ? '#000' : '#880000',
                  cursor: 'pointer', transition: 'all 0.12s',
                }}
              >{s}</button>
            ))}
          </div>
        )}
        {error && <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.48rem', color: '#ff5555', letterSpacing: '0.06em' }}>&gt; {error}</div>}
        <button
          onClick={handleBuy}
          disabled={loading}
          style={{
            fontFamily: '"Courier New", monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#000', background: loading ? '#880000' : '#e3000f', border: '1px solid #e3000f',
            padding: '0.6rem 1rem', cursor: loading ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase', marginTop: '0.25rem', transition: 'background 0.12s',
          }}
        >{loading ? '[ PROCESSING... ]' : '[ ACQUIRE ]'}</button>
      </div>
    </div>
  )
}

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: 'var(--color-brand-red)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            // OPERATIVE SUPPLY DROP · OFFICIAL REGIME GEAR
          </p>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>SUPPLY DROP</h1>
          <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.85rem', color: '#880000', letterSpacing: '0.05em', lineHeight: 1.8, margin: '1rem auto 0', maxWidth: 400 }}>
            Official Rocket Recruitment Regime gear.<br />Acquire your uniform. Represent the regime.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: '"Courier New", monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                padding: '0.4rem 1rem', border: '1px solid',
                borderColor: activeCategory === cat ? '#e3000f' : '#330000',
                background: activeCategory === cat ? '#e3000f' : 'transparent',
                color: activeCategory === cat ? '#000' : '#880000',
                cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.12s',
              }}
            >{cat === 'all' ? '[ ALL ]' : `[ ${cat.toUpperCase()} ]`}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#1a0000', border: '1px solid #1a0000' }}>
          {filtered.map(product => <ProductCard key={product.handle} product={product} />)}
        </div>
        <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.55rem', color: '#330000', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 2, marginTop: '2rem' }}>
          SUPPLY DROP v2.0 · ROCKET RECRUITMENT REGIME · ALL PROCEEDS FUND THE REGIME<br />
          SECURE CHECKOUT VIA STRIPE · SHIPS WORLDWIDE · GIOVANNI IS WATCHING
        </p>
      </div>
    </div>
  )
}
