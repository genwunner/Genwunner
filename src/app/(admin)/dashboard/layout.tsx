import Link from 'next/link'
import { LayoutDashboard, FileText, Users, BarChart2, Megaphone, ShoppingBag, Calendar, BookOpen, Send, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/admin/SignOutButton'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/epk', label: 'EPK', icon: FileText },
  { href: '/dashboard/fans', label: 'Fans / Wunnerdex', icon: Users },
  { href: '/dashboard/shows', label: 'Shows', icon: Calendar },
  { href: '/dashboard/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/dashboard/submissions', label: 'Fan Submissions', icon: Send },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/content', label: 'Content', icon: Megaphone },
  { href: '/dashboard/merch', label: 'Merch', icon: ShoppingBag },
  { href: '/', label: 'View Site', icon: Globe },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-60 border-r border-black/10 flex flex-col">
        <div className="p-6 border-b border-black/10">
          <p className="text-xs uppercase tracking-widest text-black/40">Admin</p>
          <p className="text-lg font-bold mt-1">Genwunner</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-black/60 hover:text-black hover:bg-black/10 transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-black/10">
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
