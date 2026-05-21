import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const AGENTS = [
  {
    href: '/dashboard/conventions',
    name: 'Convention Scout',
    desc: 'Find, score, and pitch anime cons — auto-drafts outreach emails',
    tag: 'Agent 1',
    color: 'border-yellow-200 hover:border-yellow-400',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    href: '/dashboard/tracks',
    name: 'Release Checklist',
    desc: 'Non-negotiable gate — every track goes through before it drops',
    tag: 'Agent 2',
    color: 'border-red-200 hover:border-red-400',
    tagColor: 'bg-red-100 text-red-700',
  },
  {
    href: '/dashboard/epk',
    name: 'EPK Agent',
    desc: 'Electronic Press Kit — always current, shareable link + PDF export',
    tag: 'Agent 3',
    color: 'border-purple-200 hover:border-purple-400',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    href: '/dashboard/content',
    name: 'Social Media',
    desc: 'Schedule YouTube, TikTok, Instagram — unified analytics + posting queue',
    tag: 'Agent 4',
    color: 'border-blue-200 hover:border-blue-400',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    href: '/dashboard/notes',
    name: 'Notes → Actions',
    desc: 'Brain dump → ranked ideas, action steps, scored by feasibility & impact',
    tag: 'Agent 5',
    color: 'border-green-200 hover:border-green-400',
    tagColor: 'bg-green-100 text-green-700',
  },
]

const MODULES = [
  { href: '/dashboard/shows', name: 'Show History', desc: 'Log venues, dates, attendance, merch — feeds Convention Scout' },
  { href: '/dashboard/fans', name: 'Fan CRM', desc: 'Wunnerdex signups — filterable by city' },
  { href: '/dashboard/analytics', name: 'Analytics', desc: 'Unified Spotify, YouTube, TikTok, Instagram stats' },
]

async function safeCount(supabase: Awaited<ReturnType<typeof createClient>>, table: string): Promise<number> {
  try {
    const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
    return count ?? 0
  } catch {
    return 0
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const [fanCount, trackCount, showCount, conventionCount, noteCount] = await Promise.all([
    safeCount(supabase, 'fans'),
    safeCount(supabase, 'tracks'),
    safeCount(supabase, 'shows'),
    safeCount(supabase, 'conventions'),
    safeCount(supabase, 'brain_dumps'),
  ])

  const stats = [
    { label: 'Fans', value: fanCount },
    { label: 'Tracks', value: trackCount },
    { label: 'Shows', value: showCount },
    { label: 'Conventions', value: conventionCount },
    { label: 'Brain Dumps', value: noteCount },
  ]

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Command Center</h1>
        <p className="text-black/40 text-sm mt-1">Rocket Recruitment Regime — Career Hub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1 leading-tight">{label}</p>
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Agents */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-4">Active Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENTS.map(a => (
            <Link
              key={a.href}
              href={a.href}
              className={`block border rounded-xl p-5 transition-colors ${a.color}`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-sm">{a.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.tagColor}`}>{a.tag}</span>
              </div>
              <p className="text-xs text-black/50 leading-relaxed">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-4">Supporting Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MODULES.map(m => (
            <Link key={m.href} href={m.href} className="block border border-black/10 rounded-xl p-4 hover:border-black/25 transition-colors">
              <p className="font-semibold text-sm mb-1">{m.name}</p>
              <p className="text-xs text-black/40 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
