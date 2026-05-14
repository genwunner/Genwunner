import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: fanCount }, { count: epkViews }] = await Promise.all([
    supabase.from('fans').select('*', { count: 'exact', head: true }),
    supabase.from('epk_views').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Total Fans', value: fanCount ?? 0 },
    { label: 'EPK Views', value: epkViews ?? 0 },
    { label: 'Active Campaigns', value: 0 },
    { label: 'Posts Scheduled', value: 0 },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-white/40 text-sm mb-8">Welcome back.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/dashboard/epk" className="block px-4 py-3 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Update EPK →
            </a>
            <a href="/dashboard/fans" className="block px-4 py-3 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Manage Fans →
            </a>
            <a href="/dashboard/content" className="block px-4 py-3 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Content Automation →
            </a>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-semibold mb-4">System Status</h2>
          <div className="space-y-3 text-sm">
            {[
              { name: 'Supabase DB', status: 'connected' },
              { name: 'Resend Email', status: 'connected' },
              { name: 'Shopify Store', status: 'pending setup' },
              { name: 'Laylo SMS', status: 'pending setup' },
              { name: 'Content Automation', status: 'coming soon' },
            ].map(({ name, status }) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-white/60">{name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  status === 'connected' ? 'bg-green-500/20 text-green-400' :
                  status === 'pending setup' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-white/10 text-white/40'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
