'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { use } from 'react'

interface Track {
  id: string
  title: string
  pokemon_name: string | null
  status: string
  release_date: string | null
  hypeddit_url: string | null
  spotify_url: string | null
  streams: number
  isrc: string | null
  upc: string | null
  notes: string | null
}

interface ChecklistItem {
  id: string
  category: string
  item: string
  completed: boolean
  priority: string
  sort_order: number
}

const CATEGORY_ORDER = ['creative', 'legal', 'distribution', 'promotion', 'post_release']
const CATEGORY_LABELS: Record<string, string> = {
  creative: 'Creative & Production',
  legal: 'Legal & Rights',
  distribution: 'Distribution',
  promotion: 'Content & Promotion',
  post_release: 'Post-Release',
}
const CATEGORY_COLORS: Record<string, string> = {
  creative: 'bg-purple-100 text-purple-700',
  legal: 'bg-red-100 text-red-700',
  distribution: 'bg-blue-100 text-blue-700',
  promotion: 'bg-orange-100 text-orange-700',
  post_release: 'bg-green-100 text-green-700',
}

export default function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const supabase = createClient()
  const [track, setTrack] = useState<Track | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Track>>({})

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    const [{ data: t }, { data: c }] = await Promise.all([
      supabase.from('tracks').select('*').eq('id', id).single(),
      supabase.from('release_checklist').select('*').eq('track_id', id).order('sort_order'),
    ])
    if (t) { setTrack(t); setEditForm(t) }
    if (c) setChecklist(c)
    setLoading(false)
  }

  async function toggleItem(itemId: string, current: boolean) {
    await supabase.from('release_checklist').update({
      completed: !current,
      completed_at: !current ? new Date().toISOString() : null,
    }).eq('id', itemId)
    setChecklist(prev => prev.map(i => i.id === itemId ? { ...i, completed: !current } : i))
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from('tracks').update(editForm).eq('id', id)
    setTrack(prev => ({ ...prev!, ...editForm }))
    setEditing(false)
  }

  if (loading) return <div className="p-8 text-black/40">Loading…</div>
  if (!track) return <div className="p-8 text-black/40">Track not found.</div>

  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    items: checklist.filter(i => i.category === cat),
  }))

  const totalItems = checklist.length
  const completedItems = checklist.filter(i => i.completed).length
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  const p0Remaining = checklist.filter(i => i.priority === 'p0' && !i.completed).length
  const canRelease = p0Remaining === 0

  return (
    <div className="p-8 max-w-4xl">
      {/* Back */}
      <Link href="/dashboard/tracks" className="text-xs text-black/40 hover:text-black mb-6 inline-block">
        ← All Tracks
      </Link>

      {/* Track Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{track.title}</h1>
          {track.pokemon_name && (
            <p className="text-black/40 text-sm">{track.pokemon_name}</p>
          )}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs border border-black/20 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
        >
          {editing ? 'Cancel' : 'Edit Track'}
        </button>
      </div>

      {/* Edit Form */}
      {editing && (
        <form onSubmit={saveEdit} className="bg-black/5 border border-black/10 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <input value={editForm.title ?? ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={editForm.pokemon_name ?? ''} onChange={e => setEditForm(f => ({ ...f, pokemon_name: e.target.value }))} placeholder="Pokémon name" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <select value={editForm.status ?? ''} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="released">Released</option>
              <option value="in_progress">In Progress</option>
              <option value="unreleased">Unreleased</option>
            </select>
            <input type="date" value={editForm.release_date ?? ''} onChange={e => setEditForm(f => ({ ...f, release_date: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={editForm.hypeddit_url ?? ''} onChange={e => setEditForm(f => ({ ...f, hypeddit_url: e.target.value }))} placeholder="Hypeddit URL" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={editForm.spotify_url ?? ''} onChange={e => setEditForm(f => ({ ...f, spotify_url: e.target.value }))} placeholder="Spotify URL" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={editForm.isrc ?? ''} onChange={e => setEditForm(f => ({ ...f, isrc: e.target.value }))} placeholder="ISRC" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={editForm.upc ?? ''} onChange={e => setEditForm(f => ({ ...f, upc: e.target.value }))} placeholder="UPC" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <textarea value={editForm.notes ?? ''} onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes" rows={2} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none col-span-2 resize-none" />
          </div>
          <button type="submit" className="mt-3 bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors">Save</button>
        </form>
      )}

      {/* Progress Gate */}
      <div className={`rounded-xl p-5 mb-6 border ${canRelease ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-sm">
              {canRelease ? '✓ Gate cleared — ready to release' : `⚠ Gate blocked — ${p0Remaining} required item${p0Remaining === 1 ? '' : 's'} incomplete`}
            </p>
            <p className="text-xs text-black/40 mt-0.5">{completedItems} / {totalItems} items done</p>
          </div>
          <span className={`text-3xl font-bold ${canRelease ? 'text-green-600' : 'text-red-500'}`}>{pct}%</span>
        </div>
        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${canRelease ? 'bg-green-500' : 'bg-red-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-6">
        {grouped.map(({ cat, items }) => {
          if (items.length === 0) return null
          const catDone = items.filter(i => i.completed).length
          return (
            <div key={cat} className="bg-black/5 border border-black/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[cat]}`}>
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>
                <span className="text-xs text-black/40">{catDone}/{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id, item.completed)}
                      className="mt-0.5 accent-black shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm ${item.completed ? 'line-through text-black/30' : 'text-black/80'}`}>
                        {item.item}
                      </span>
                      {item.priority === 'p0' && !item.completed && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">REQUIRED</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Track metadata */}
      <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 gap-4 text-xs text-black/40">
        {track.hypeddit_url && <a href={track.hypeddit_url} target="_blank" rel="noopener" className="hover:text-black underline">Hypeddit →</a>}
        {track.spotify_url && <a href={track.spotify_url} target="_blank" rel="noopener" className="hover:text-black underline">Spotify →</a>}
        {track.isrc && <span>ISRC: {track.isrc}</span>}
        {track.upc && <span>UPC: {track.upc}</span>}
        {track.notes && <p className="col-span-2 text-black/50">{track.notes}</p>}
      </div>
    </div>
  )
}
