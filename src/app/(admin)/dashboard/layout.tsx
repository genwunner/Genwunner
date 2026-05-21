import Link from 'next/link'
import { LayoutDashboard, FileText, Users, BarChart2, Megaphone, Calendar, Globe, Map, Music, Lightbulb, Telescope } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/admin/SignOutButton'

const navSections = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Command Center', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Agents',
    items: [
      { href: '/dashboard/conventions', label: 'Convention Scout', icon: Telescope },
      { href: '/dashboard/tracks', label: 'Release Checklist', icon: Music },
      { href: '/dashboard/epk', label: 'EPK Agent', icon: FileText },
      { href: '/dashboard/content', label: 'Social Media', icon: Megaphone },
      { href: '/dashboard/notes', label: 'Notes → Actions', icon: Lightbulb },
    ],
  },
  {
    label: 'Modules',
    items: [
      { href: '/dashboard/shows', label: 'Show History', icon: Calendar },
      { href: '/dashboard/fans', label: 'Fan CRM', icon: Users },
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
    ],
  },
  {
    label: 'Site',
    items: [
      { href: '/', label: 'View Site', icon: Globe },
    ],
  },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-56 border-r border-black/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-black/10">
          <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Admin</p>
          <p className="text-base font-bold leading-tight">Genwunner</p>
          <p className="text-xs text-black/30 mt-0.5">Rocket Recruitment Regime</p>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {navSections.map(section => (
            <div key={section.label} className="mb-4">
              <p className="text-xs uppercase tracking-widest text-black/25 font-semibold px-2 mb-1">
                {section.label}
              </p>
              {section.items.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-black/60 hover:text-black hover:bg-black/8 transition-colors"
                >
                  <Icon size={15} />
                  {label}
                </Link>
              ))}
            </div>
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
