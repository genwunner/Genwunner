'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Snapshot {
  id: string
  snapshot_date: string
  spotify_monthly_listeners: number | null
  spotify_total_streams: number | null
  spotify_top_city: string | null
  youtube_subscribers: number | null
  youtube_monthly_views: number | null
  tiktok_followers: number | null
  tiktok_monthly_views: number | null
  instagram_followers: number | null
  notes: string | null
  created_at: string
}

const EMPTY_FORM = {
  snapshot_date: new Date().toISOString().split('T')[0],
  spotify_monthly_listeners: '',
  spotify_total_streams: '',
  spotify_top_city: '',
  youtube_subscribers: '',
  youtube_monthly_views: '',
  tiktok_followers: '',
  tiktok_monthly_views: '',
  instagram_followers: '',
  notes: '',
}

function delta(curr: number | null | undefined, prev: number | null | undefined): string | null {
  if (curr == null || prev == null) return null
  const diff = curr - prev
  const pct = prev > 0 ? Math.round((diff / prev) * 100) : null
  const sign = diff >= 0 ? '+' : ''
  return pct != null ? `${sign}${pct}%` : `${sign}${diff.toLocaleString()}`
}

function DeltaBadge({ curr, prev }: { curr: number | null; prev: number | null }) {
  const d = delta(curr, prev)
  if (!d) return null
  const positive = !d.startsWith('-')
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ml-2 ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      {d}
    </span>
  )
}

function StatCard({ label, value, prev, sub }: { label: string; value: number | null; prev: number | null; sub?: string }) {
  return (
    <div className="bg-black/5 border border-black/10 rounded-xl p-4">
      <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-bold">{value != null ? value.toLocaleString() : '—'}</p>
        <DeltaBadge curr={value} prev={prev} />
      </div>
      {sub && <p className="text-xs text-black/30 mt-1">{sub}</p>}
    </div>
  )
}

export default function AnalyticsPage() {
  const supabase = createClient()
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('analytics_snapshots').select('*').order('snapshot_date', { ascending: false })
    setSnapshots(data ?? [])
    setLoading(false)
  }

  async function saveSnapshot(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await supabase.from('analytics_snapshots').insert({
      snapshot_date: form.snapshot_date,
      spotify_monthly_listeners: form.spotify_monthly_listeners ? parseInt(form.spotify_monthly_listeners) : null,
      spotify_total_streams: form.spotify_total_streams ? parseInt(form.spotify_total_streams) : null,
      spotify_top_city: form.spotify_top_city || null,
      youtube_subscribers: form.youtube_subscribers ? parseInt(form.youtube_subscribers) : null,
      youtube_monthly_views: form.youtube_monthly_views ? parseInt(form.youtube_monthly_views) : null,
      tiktok_followers: form.tiktok_followers ? parseInt(form.tiktok_followers) : null,
      tiktok_monthly_views: form.tiktok_monthly_views ? parseInt(form.tiktok_monthly_views) : null,
      instagram_followers: form.instagram_followers ? parseInt(form.instagram_followers) : null,
      notes: form.notes || null,
    }).select().single()
    if (data) setSnapshots(prev => [data, ...prev])
    setForm(EMPTY_FORM)
    setShowForm(false)
    setSaving(false)
  }

  async function deleteSnapshot(id: string) {
    if (!confirm('Delete this snapshot?')) return
    await supabase.from('analytics_snapshots').delete().eq('id', id)
    setSnapshots(prev => prev.filter(s => s.id !== id))
  }

  const latest = snapshots[0]
  const prev = snapshots[1]

  // Total reach calc
  const totalReach = latest ? [
    latest.spotify_monthly_listeners,
    latest.youtube_monthly_views,
    latest.tiktok_monthly_views,
  ].reduce((sum: number, v) => sum + (v ?? 0), 0) : null

  const prevReach = prev ? [
    prev.spotify_monthly_listeners,
    prev.youtube_monthly_views,
    prev.tiktok_monthly_views,
  ].reduce((sum: number, v) => sum + (v ?? 0), 0) : null

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-black/40 text-sm mt-1">Agent 4 — unified stats across all platforms</p>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors">
          {showForm ? 'Cancel' : '+ Log Stats'}
        </button>
      </div>

      {/* Connection notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-700">
        <p className="font-semibold mb-1">Manual logging mode</p>
        <p className="text-xs text-blue-600">
          Log your stats from Spotify for Artists, YouTube Studio, and TikTok Creator Portal. Delta arrows show growth vs. your previous snapshot.
          Auto-sync via API keys can be added later.
        </p>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={saveSnapshot} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Log Stats Snapshot</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">Spotify</p>
              <div className="space-y-2">
                <input value={form.spotify_monthly_listeners} onChange={e => setForm(f => ({ ...f, spotify_monthly_listeners: e.target.value }))} placeholder="Monthly listeners" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
                <input value={form.spotify_total_streams} onChange={e => setForm(f => ({ ...f, spotify_total_streams: e.target.value }))} placeholder="Total streams" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
                <input value={form.spotify_top_city} onChange={e => setForm(f => ({ ...f, spotify_top_city: e.target.value }))} placeholder="Top city" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-2">YouTube</p>
              <div className="space-y-2">
                <input value={form.youtube_subscribers} onChange={e => setForm(f => ({ ...f, youtube_subscribers: e.target.value }))} placeholder="Subscribers" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
                <input value={form.youtube_monthly_views} onChange={e => setForm(f => ({ ...f, youtube_monthly_views: e.target.value }))} placeholder="Monthly views" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black mb-2">TikTok</p>
              <div className="space-y-2">
                <input value={form.tiktok_followers} onChange={e => setForm(f => ({ ...f, tiktok_followers: e.target.value }))} placeholder="Followers" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
                <input value={form.tiktok_monthly_views} onChange={e => setForm(f => ({ ...f, tiktok_monthly_views: e.target.value }))} placeholder="Monthly views" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-2">Instagram</p>
              <div className="space-y-2">
                <input value={form.instagram_followers} onChange={e => setForm(f => ({ ...f, instagram_followers: e.target.value }))} placeholder="Followers" type="number" min="0" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-xs text-black/40 block mb-1">Snapshot date</label>
              <input type="date" value={form.snapshot_date} onChange={e => setForm(f => ({ ...f, snapshot_date: e.target.value }))} className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs text-black/40 block mb-1">Notes</label>
              <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="e.g. posted Blastoise this week" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="mt-4 bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Snapshot'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-black/40 text-sm">Loading…</p>
      ) : snapshots.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-black/30 text-sm mb-3">No stats logged yet.</p>
          <p className="text-xs text-black/20">Click "+ Log Stats" above to add your first snapshot.</p>
        </div>
      ) : (
        <>
          {/* Latest Snapshot Header */}
          {latest && (
            <div className="mb-6">
              <p className="text-xs text-black/40 uppercase tracking-wider mb-3">
                Latest: {new Date(latest.snapshot_date + 'T00:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                {prev && <span className="ml-2">· vs. {new Date(prev.snapshot_date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
              </p>

              {/* Total Reach */}
              <div className="bg-black border border-black text-white rounded-xl p-5 mb-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Total Monthly Reach</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold">{totalReach != null ? totalReach.toLocaleString() : '—'}</p>
                  <DeltaBadge curr={totalReach} prev={prevReach} />
                </div>
                <p className="text-xs text-white/30 mt-1">Spotify listeners + YouTube views + TikTok views</p>
              </div>

              {/* Platform Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <StatCard label="Spotify Listeners" value={latest.spotify_monthly_listeners} prev={prev?.spotify_monthly_listeners ?? null} />
                <StatCard label="Spotify Streams" value={latest.spotify_total_streams} prev={prev?.spotify_total_streams ?? null} />
                <StatCard label="YouTube Subs" value={latest.youtube_subscribers} prev={prev?.youtube_subscribers ?? null} />
                <StatCard label="YouTube Views" value={latest.youtube_monthly_views} prev={prev?.youtube_monthly_views ?? null} sub="monthly" />
                <StatCard label="TikTok Followers" value={latest.tiktok_followers} prev={prev?.tiktok_followers ?? null} />
                <StatCard label="TikTok Views" value={latest.tiktok_monthly_views} prev={prev?.tiktok_monthly_views ?? null} sub="monthly" />
                <StatCard label="Instagram Followers" value={latest.instagram_followers} prev={prev?.instagram_followers ?? null} />
                {latest.spotify_top_city && (
                  <div className="bg-black/5 border border-black/10 rounded-xl p-4">
                    <p className="text-xs text-black/40 uppercase tracking-wider mb-1">Top City</p>
                    <p className="text-xl font-bold">{latest.spotify_top_city}</p>
                    <p className="text-xs text-black/30 mt-1">on Spotify</p>
                  </div>
                )}
              </div>

              {latest.notes && (
                <p className="text-sm text-black/50 italic">{latest.notes}</p>
              )}
            </div>
          )}

          {/* History Table */}
          <div>
            <h2 className="font-semibold text-sm uppercase tracking-wide text-black/40 mb-3">Snapshot History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-black/40 text-xs uppercase tracking-wider">
                    <th className="text-left py-2 pr-4">Date</th>
                    <th className="text-left py-2 pr-4">Spotify Listeners</th>
                    <th className="text-left py-2 pr-4">YT Subs</th>
                    <th className="text-left py-2 pr-4">TikTok</th>
                    <th className="text-left py-2 pr-4">IG</th>
                    <th className="text-left py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {snapshots.map(snap => (
                    <tr key={snap.id} className="border-b border-black/5 hover:bg-black/5 group">
                      <td className="py-2 pr-4 text-xs text-black/50">{new Date(snap.snapshot_date + 'T00:00:00').toLocaleDateString()}</td>
                      <td className="py-2 pr-4">{snap.spotify_monthly_listeners?.toLocaleString() ?? '—'}</td>
                      <td className="py-2 pr-4">{snap.youtube_subscribers?.toLocaleString() ?? '—'}</td>
                      <td className="py-2 pr-4">{snap.tiktok_followers?.toLocaleString() ?? '—'}</td>
                      <td className="py-2 pr-4">{snap.instagram_followers?.toLocaleString() ?? '—'}</td>
                      <td className="py-2">
                        <button onClick={() => deleteSnapshot(snap.id)} className="text-xs text-black/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
