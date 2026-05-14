import Nav from '@/components/public/Nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }} className="min-h-screen">
      <Nav />
      <div className="pt-[80px]">
        {children}
      </div>
      <div className="h-14 md:hidden" />
    </div>
  )
}
