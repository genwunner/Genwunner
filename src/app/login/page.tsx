'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.55rem', color: '#440000', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            // ROCKET RECRUITMENT REGIME · CLASSIFIED ACCESS
          </div>
          <div style={{
            fontFamily: 'var(--font-heading), "Courier New", Courier, monospace',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#cc0000',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            GENWUNNER
          </div>
          <div style={{ fontSize: '0.55rem', color: '#440000', letterSpacing: '0.12em', marginTop: '0.5rem' }}>
            OPERATIVE COMMAND TERMINAL
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{
          background: '#050000',
          border: '1px solid #330000',
          padding: '2rem',
          position: 'relative',
        }}>
          {/* Inner border */}
          <div style={{ position: 'absolute', inset: 4, border: '1px solid #180000', pointerEvents: 'none' }} />

          <div style={{ marginBottom: '0.5rem', fontSize: '0.55rem', color: '#e3000f', letterSpacing: '0.1em' }}>
            // AUTHENTICATE OPERATIVE
          </div>

          <div style={{ height: '1px', background: '#1a0000', marginBottom: '1.5rem' }} />

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.6rem', color: '#cc0000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Comms Channel (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: '100%',
                background: '#0a0000',
                border: '1px solid #280000',
                color: '#cc0000',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.85rem',
                padding: '0.6rem 0.75rem',
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.04em',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#e3000f')}
              onBlur={e => (e.currentTarget.style.borderColor = '#280000')}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.6rem', color: '#cc0000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                background: '#0a0000',
                border: '1px solid #280000',
                color: '#cc0000',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.85rem',
                padding: '0.6rem 0.75rem',
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.08em',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#e3000f')}
              onBlur={e => (e.currentTarget.style.borderColor = '#280000')}
            />
          </div>

          {error && (
            <div style={{ fontSize: '0.6rem', color: '#ff5555', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              &gt; ACCESS DENIED: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#1a0000' : '#e3000f',
              color: loading ? '#440000' : '#000',
              border: 'none',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.85rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.12s, color 0.12s',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#ff1a1a' }}
            onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#e3000f' }}
          >
            {loading ? '[ AUTHENTICATING... ]' : '[ ENTER THE REGIME ]'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.44rem', color: '#220000', letterSpacing: '0.08em', marginTop: '1.25rem' }}>
            UNAUTHORIZED ACCESS WILL BE REPORTED TO GIOVANNI
          </div>
        </form>

      </div>
    </div>
  )
}
