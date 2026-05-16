// src/app/(public)/layout.tsx
import Nav from '@/components/public/Nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#000', color: '#cc0000', minHeight: '100vh', position: 'relative' }}>
      {/* Moving scanline sweep — subtle, matches terminal intro */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(to bottom, transparent, rgba(227,0,15,0.03), transparent)',
          animation: 'scanline-sweep 6s linear infinite',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      <Nav />
      <div style={{ paddingTop: 80 }}>
        {children}
      </div>
      {/* Mobile bottom bar spacer */}
      <div style={{ height: '3.5rem' }} className="md:hidden" />
    </div>
  )
}
