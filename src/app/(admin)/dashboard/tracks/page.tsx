'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Track {
  id: string
  title: string
  pokemon_name: string | null
  status: 'released' | 'unreleased' | 'in_progress'
  release_date: string | null
  hypeddit_url: string | null
  spotify_url: string | null
  streams: number
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  released: 'bg-green-100 text-green-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  unreleased: 'bg-black/10 text-black/50',
}

export default function TracksPage() {
  const supabase = createClient()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({
    title: '',
    pokemon_name: '',
    status: 'released' as Track['status'],
    release_date: '',
    hypeddit_url: '',
    spotify_url: '',
    streams: '',
  })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .order('release_date', { ascending: false, nullsFirst: false })
    setTracks(data ?? [])
    setLoading(false)
  }

  async function addTrack(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    const { data } = await supabase.from('tracks').insert({
      title: form.title,
      pokemon_name: form.pokemon_name || null,
      status: form.status,
      release_date: form.release_date || null,
      hypeddit_url: form.hypeddit_url || null,
      spotify_url: form.spotify_url || null,
      streams: parseInt(form.streams) || 0,
    }).select().single()

    if (data) {
      // seed default release checklist items
      await seedChecklist(data.id)
      setTracks(prev => [data, ...prev])
      setForm({ title: '', pokemon_name: '', status: 'released', release_date: '', hypeddit_url: '', spotify_url: '', streams: '' })
    }
    setAdding(false)
  }

  async function seedChecklist(trackId: string) {
    const defaultItems = [
      // Creative
      { category: 'creative', item: 'Final master uploaded (WAV, 24-bit minimum)', priority: 'p0', sort_order: 0 },
      { category: 'creative', item: 'Instrumental version delivered', priority: 'p0', sort_order: 1 },
      { category: 'creative', item: 'Cover art finalized (3000×3000 px, RGB)', priority: 'p0', sort_order: 2 },
      { category: 'creative', item: 'Cover art alternate formats (square, vertical, horizontal banner)', priority: 'p1', sort_order: 3 },
      { category: 'creative', item: 'Music video status confirmed (planned / in production / N/A)', priority: 'p1', sort_order: 4 },
      // Legal
      { category: 'legal', item: 'Split sheets signed by all collaborators', priority: 'p0', sort_order: 5 },
      { category: 'legal', item: 'ISRC code assigned', priority: 'p0', sort_order: 6 },
      { category: 'legal', item: 'UPC code assigned (if single/EP/album)', priority: 'p0', sort_order: 7 },
      { category: 'legal', item: 'Publishing registered (ASCAP / BMI)', priority: 'p0', sort_order: 8 },
      { category: 'legal', item: 'Sample clearance documented or fair-use analysis filed', priority: 'p0', sort_order: 9 },
      { category: 'legal', item: 'Pokémon audio/visual references reviewed for IP risk', priority: 'p0', sort_order: 10 },
      // Distribution
      { category: 'distribution', item: 'Distributor upload complete (DistroKid / TuneCore)', priority: 'p0', sort_order: 11 },
      { category: 'distribution', item: 'All DSPs selected (Spotify, Apple, YouTube Music, Amazon, Tidal)', priority: 'p0', sort_order: 12 },
      { category: 'distribution', item: 'Release date set', priority: 'p0', sort_order: 13 },
      { category: 'distribution', item: 'Pre-save link generated', priority: 'p1', sort_order: 14 },
      { category: 'distribution', item: 'Spotify Canvas video uploaded', priority: 'p1', sort_order: 15 },
      { category: 'distribution', item: 'Lyrics submitted to Genius and Musixmatch', priority: 'p1', sort_order: 16 },
      // Promotion
      { category: 'promotion', item: 'Short-form video cuts ready (minimum 3 for TikTok / Reels / Shorts)', priority: 'p0', sort_order: 17 },
      { category: 'promotion', item: 'Announcement post drafted (IG, X, TikTok, YouTube Community)', priority: 'p0', sort_order: 18 },
      { category: 'promotion', item: 'Email blast drafted for fan list', priority: 'p0', sort_order: 19 },
      { category: 'promotion', item: 'Discord announcement scheduled', priority: 'p1', sort_order: 20 },
      { category: 'promotion', item: 'Playlist submission target list checked', priority: 'p1', sort_order: 21 },
      { category: 'promotion', item: 'Submitted to Pokémon / gaming-adjacent press and creators', priority: 'p1', sort_order: 22 },
      // Post-release
      { category: 'post_release', item: '7-day performance review scheduled', priority: 'p1', sort_order: 23 },
      { category: 'post_release', item: '30-day analytics report scheduled', priority: 'p1', sort_order: 24 },
      { category: 'post_release', item: 'Merch tie-in planned (if applicable)', priority: 'p2', sort_order: 25 },
      { category: 'post_release', item: 'Live performance plan — when will this debut on stage?', priority: 'p2', sort_order: 26 },
    ]
    await supabase.from('release_checklist').insert(
      defaultItems.map(i => ({ ...i, track_id: trackId }))
    )
  }

  async function deleteTrack(id: string) {
    if (!confirm('Delete this track and its checklist?')) return
    await supabase.from('tracks').delete().eq('id', id)
    setTracks(prev => prev.filter(t => t.id !== id))
  }

  const released = tracks.filter(t => t.status === 'released')
  const inProgress = tracks.filter(t => t.status === 'in_progress')
  const unreleased = tracks.filter(t => t.status === 'unreleased')

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Release Checklist</h1>
        <p className="text-black/40 text-sm mt-1">Agent 2 — every track goes through the gate before it drops</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Released', value: released.length, color: 'text-green-600' },
          { label: 'In Progress', value: inProgress.length, color: 'text-yellow-600' },
          { label: 'Unreleased', value: unreleased.length, color: 'text-black/40' },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Add Track Form */}
      <form onSubmit={addTrack} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-4">Add Track</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Track title (e.g. Blastoise)"
            required
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
          <input
            value={form.pokemon_name}
            onChange={e => setForm(f => ({ ...f, pokemon_name: e.target.value }))}
            placeholder="Pokémon name (optional)"
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as Track['status'] }))}
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          >
            <option value="released">Released</option>
            <option value="in_progress">In Progress</option>
            <option value="unreleased">Unreleased</option>
          </select>
          <input
            type="date"
            value={form.release_date}
            onChange={e => setForm(f => ({ ...f, release_date: e.target.value }))}
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
          <input
            value={form.hypeddit_url}
            onChange={e => setForm(f => ({ ...f, hypeddit_url: e.target.value }))}
            placeholder="Hypeddit URL"
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
          <input
            value={form.spotify_url}
            onChange={e => setForm(f => ({ ...f, spotify_url: e.target.value }))}
            placeholder="Spotify URL"
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
          <input
            value={form.streams}
            onChange={e => setForm(f => ({ ...f, streams: e.target.value }))}
            placeholder="Total streams"
            type="number"
            min="0"
            className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-black/60"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
        >
          {adding ? 'Adding…' : 'Add Track + Generate Checklist'}
        </button>
      </form>

      {/* Track List */}
      {loading ? (
        <p className="text-black/40 text-sm">Loading…</p>
      ) : (
        <div className="space-y-2">
          {tracks.length === 0 && (
            <p className="text-black/30 text-sm text-center py-12">No tracks yet — add your first above.</p>
          )}
          {tracks.map(track => (
            <div key={track.id} className="flex items-center gap-4 bg-black/5 border border-black/10 rounded-xl px-5 py-4 hover:border-black/20 transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[track.status]}`}>
                    {track.status.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-sm truncate">{track.title}</span>
                  {track.pokemon_name && (
                    <span className="text-xs text-black/30">{track.pokemon_name}</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-black/40">
                  {track.release_date && <span>{new Date(track.release_date + 'T00:00:00').toLocaleDateString()}</span>}
                  {track.streams > 0 && <span>{track.streams.toLocaleString()} streams</span>}
                  {track.hypeddit_url && (
                    <a href={track.hypeddit_url} target="_blank" rel="noopener" className="hover:text-black underline">Hypeddit</a>
                  )}
                  {track.spotify_url && (
                    <a href={track.spotify_url} target="_blank" rel="noopener" className="hover:text-black underline">Spotify</a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/dashboard/tracks/${track.id}`}
                  className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Open Checklist →
                </Link>
                <button
                  onClick={() => deleteTrack(track.id)}
                  className="text-black/20 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
