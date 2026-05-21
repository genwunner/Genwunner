'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Show {
  id: string
  venue: string
  city: string
  state: string | null
  date: string
  status: 'upcoming' | 'completed' | 'cancelled'
  attendance: number | null
  guarantee: number | null
  merch_sales: number | null
  notes: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-black/10 text-black/40',
}

const EMPTY_FORM = {
  venue: '',
  city: '',
  state: '',
  date: '',
  status: 'upcoming' as Show['status'],
  attendance: '',
  guarantee: '',
  merch_sales: '',
  notes: '',
}

export default function ShowsPage() {
  const supabase = createClient()
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('shows').select('*').order('date', { ascending: false })
    setShows(data ?? [])
    setLoading(false)
  }

  async function addShow(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    const { data } = await supabase.from('shows').insert({
      venue: form.venue,
      city: form.city,
      state: form.state || null,
      date: form.date,
      status: form.status,
      attendance: form.attendance ? parseInt(form.attendance) : null,
      guarantee: form.guarantee ? parseFloat(form.guarantee) : null,
      merch_sales: form.merch_sales ? parseFloat(form.merch_sales) : null,
      notes: form.notes || null,
    }).select().single()
    if (data) setShows(prev => [data, ...prev])
    setForm(EMPTY_FORM)
    setShowForm(false)
    setAdding(false)
  }

  async function updateStatus(id: string, status: Show['status']) {
    await supabase.from('shows').update({ status }).eq('id', id)
    setShows(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  async function deleteShow(id: string) {
    if (!confirm('Delete this show?')) return
    await supabase.from('shows').delete().eq('id', id)
    setShows(prev => prev.filter(s => s.id !== id))
  }

  const upcoming = shows.filter(s => s.status === 'upcoming')
  const completed = shows.filter(s => s.status === 'completed')
  const totalMerch = completed.reduce((sum, s) => sum + (s.merch_sales ?? 0), 0)
  const totalGuarantee = completed.reduce((sum, s) => sum + (s.guarantee ?? 0), 0)

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Show History</h1>
          <p className="text-black/40 text-sm mt-1">Module B — feeds Convention Scout city scoring</p>
        </div>
        <button
          onClick={() => setShowForm(f => !f)}
          className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Show'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Shows', value: completed.length },
          { label: 'Upcoming', value: upcoming.length },
          { label: 'Total Guarantee', value: `$${totalGuarantee.toLocaleString()}` },
          { label: 'Total Merch', value: `$${totalMerch.toLocaleString()}` },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={addShow} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Add Show</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Venue name" required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City" required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="State (e.g. TX)" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Show['status'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input value={form.attendance} onChange={e => setForm(f => ({ ...f, attendance: e.target.value }))} placeholder="Attendance" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.guarantee} onChange={e => setForm(f => ({ ...f, guarantee: e.target.value }))} placeholder="Guarantee ($)" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.merch_sales} onChange={e => setForm(f => ({ ...f, merch_sales: e.target.value }))} placeholder="Merch sales ($)" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes" rows={2} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none col-span-2 resize-none" />
          </div>
          <button type="submit" disabled={adding} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
            {adding ? 'Saving…' : 'Save Show'}
          </button>
        </form>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-black/40 mb-3">Upcoming</h2>
          <div className="space-y-2">
            {upcoming.map(show => (
              <ShowRow key={show.id} show={show} onStatus={updateStatus} onDelete={deleteShow} />
            ))}
          </div>
        </div>
      )}

      {/* Past Shows */}
      <div>
        <h2 className="font-semibold text-sm uppercase tracking-wide text-black/40 mb-3">
          Show History ({completed.length} shows)
        </h2>
        {loading ? (
          <p className="text-black/40 text-sm">Loading…</p>
        ) : completed.length === 0 ? (
          <p className="text-black/30 text-sm text-center py-12">No shows logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 text-black/40 text-xs uppercase tracking-wider">
                  <th className="text-left py-3 pr-4">Date</th>
                  <th className="text-left py-3 pr-4">Venue</th>
                  <th className="text-left py-3 pr-4">City</th>
                  <th className="text-left py-3 pr-4">Attendance</th>
                  <th className="text-left py-3 pr-4">Guarantee</th>
                  <th className="text-left py-3 pr-4">Merch</th>
                  <th className="text-left py-3"></th>
                </tr>
              </thead>
              <tbody>
                {completed.map(show => (
                  <tr key={show.id} className="border-b border-black/5 hover:bg-black/5 group">
                    <td className="py-3 pr-4 text-black/60 text-xs">
                      {new Date(show.date + 'T00:00:00').toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-4 font-medium">{show.venue}</td>
                    <td className="py-3 pr-4 text-black/60">{show.city}{show.state ? `, ${show.state}` : ''}</td>
                    <td className="py-3 pr-4">{show.attendance?.toLocaleString() ?? '—'}</td>
                    <td className="py-3 pr-4">{show.guarantee ? `$${show.guarantee.toLocaleString()}` : '—'}</td>
                    <td className="py-3 pr-4">{show.merch_sales ? `$${show.merch_sales.toLocaleString()}` : '—'}</td>
                    <td className="py-3">
                      <button onClick={() => deleteShow(show.id)} className="text-black/20 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function ShowRow({ show, onStatus, onDelete }: {
  show: Show
  onStatus: (id: string, s: Show['status']) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-sm">{show.venue}</span>
          <span className="text-xs text-black/40">·</span>
          <span className="text-sm text-black/60">{show.city}{show.state ? `, ${show.state}` : ''}</span>
        </div>
        <p className="text-xs text-black/40">{new Date(show.date + 'T00:00:00').toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button onClick={() => onStatus(show.id, 'completed')} className="text-xs bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition-colors">
          Mark Done
        </button>
        <button onClick={() => onStatus(show.id, 'cancelled')} className="text-xs border border-black/20 px-2 py-1 rounded-lg hover:bg-black/5 transition-colors">
          Cancel
        </button>
        <button onClick={() => onDelete(show.id)} className="text-black/20 hover:text-red-400 text-xs transition-colors">
          Delete
        </button>
      </div>
    </div>
  )
}
