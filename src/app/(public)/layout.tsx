import Nav from '@/components/public/Nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />
      <div className="pt-16">
        {children}
      </div>
      <div className="h-14 md:hidden" />
    </div>
  )
}
