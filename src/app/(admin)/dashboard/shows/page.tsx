'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Show {
  id: string
  venue: string | null
  city: string | null
  state: string | null
  country: string | null
  event_date: string | null
  event_date_text: string | null
  status: 'upcoming' | 'completed' | 'cancelled'
  role: 'headliner' | 'opener' | 'support' | 'feature' | 'unknown' | null
  headline_act: string | null
  tour_name: string | null
  attendance: number | null
  sold_out: boolean | null
  guarantee: number | null
  merch_sales: number | null
  confidence: string | null
  source_urls: string | null
  notes: string | null
  created_at: string
}

const ROLE_COLORS: Record<string, string> = {
  headliner: 'bg-yellow-100 text-yellow-700',
  opener: 'bg-blue-100 text-blue-700',
  support: 'bg-purple-100 text-purple-700',
  feature: 'bg-green-100 text-green-700',
  unknown: 'bg-black/8 text-black/50',
}

const EMPTY_FORM = {
  venue: '',
  city: '',
  state: '',
  country: '',
  date: '',
  status: 'upcoming' as Show['status'],
  role: 'headliner' as Show['role'],
  headline_act: '',
  tour_name: '',
  attendance: '',
  guarantee: '',
  merch_sales: '',
  notes: '',
}

function locationStr(show: Show) {
  const parts = [show.city, show.state || show.country].filter(Boolean)
  return parts.join(', ')
}

function dateStr(show: Show) {
  if (show.event_date) {
    return new Date(show.event_date + 'T00:00:00').toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }
  return show.event_date_text || '—'
}

export default function ShowsPage() {
  const supabase = createClient()
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('shows').select('*').order('event_date', { ascending: false, nullsFirst: false })
    setShows(data ?? [])
    setLoading(false)
  }

  async function addShow(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    const { data } = await supabase.from('shows').insert({
      venue: form.venue || null,
      city: form.city || null,
      state: form.state || null,
      country: form.country || null,
      event_date: form.date || null,
      status: form.status,
      role: form.role,
      headline_act: form.headline_act || null,
      tour_name: form.tour_name || null,
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

  async function updateGuarantee(id: string, value: string) {
    const guarantee = value ? parseFloat(value) : null
    await supabase.from('shows').update({ guarantee }).eq('id', id)
    setShows(prev => prev.map(s => s.id === id ? { ...s, guarantee } : s))
  }

  async function deleteShow(id: string) {
    if (!confirm('Delete this show?')) return
    await supabase.from('shows').delete().eq('id', id)
    setShows(prev => prev.filter(s => s.id !== id))
  }

  const upcoming = shows.filter(s => s.status === 'upcoming').sort((a, b) => {
    if (!a.event_date) return 1
    if (!b.event_date) return -1
    return a.event_date.localeCompare(b.event_date)
  })
  const past = shows.filter(s => s.status !== 'upcoming')
  const totalGuarantee = past.reduce((sum, s) => sum + (s.guarantee ?? 0), 0)
  const totalMerch = past.reduce((sum, s) => sum + (s.merch_sales ?? 0), 0)

  const displayed = tab === 'upcoming' ? upcoming : past

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Show History</h1>
          <p className="text-black/40 text-sm mt-1">All performances — feeds Convention Scout city scoring</p>
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
          { label: 'Total Shows', value: past.length, sub: 'completed' },
          { label: 'Upcoming', value: upcoming.length, sub: 'booked' },
          { label: 'Rates Logged', value: `$${totalGuarantee.toLocaleString()}`, sub: 'total paid' },
          { label: 'Merch', value: `$${totalMerch.toLocaleString()}`, sub: 'total sold' },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-black/30 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={addShow} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Add Show</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Venue" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="State (e.g. TX)" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="Country (if international)" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Show['status'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select value={form.role ?? ''} onChange={e => setForm(f => ({ ...f, role: e.target.value as Show['role'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="headliner">Headliner</option>
              <option value="opener">Opener</option>
              <option value="support">Support</option>
              <option value="feature">Feature</option>
              <option value="unknown">Unknown</option>
            </select>
            <input value={form.headline_act} onChange={e => setForm(f => ({ ...f, headline_act: e.target.value }))} placeholder="Headliner (if supporting)" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.tour_name} onChange={e => setForm(f => ({ ...f, tour_name: e.target.value }))} placeholder="Tour name" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.attendance} onChange={e => setForm(f => ({ ...f, attendance: e.target.value }))} placeholder="Attendance" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.guarantee} onChange={e => setForm(f => ({ ...f, guarantee: e.target.value }))} placeholder="Rate paid ($)" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.merch_sales} onChange={e => setForm(f => ({ ...f, merch_sales: e.target.value }))} placeholder="Merch sales ($)" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes" rows={2} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none col-span-3 resize-none" />
          </div>
          <button type="submit" disabled={adding} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
            {adding ? 'Saving…' : 'Save Show'}
          </button>
        </form>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
          { key: 'past', label: `Past Shows (${past.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${tab === t.key ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-black/40 text-sm">Loading…</p>
      ) : displayed.length === 0 ? (
        <p className="text-black/30 text-sm text-center py-16">
          {tab === 'upcoming' ? 'No upcoming shows yet.' : 'No past shows logged yet.'}
        </p>
      ) : tab === 'upcoming' ? (
        <div className="space-y-3">
          {upcoming.map(show => (
            <UpcomingRow key={show.id} show={show} onStatus={updateStatus} onDelete={deleteShow} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-black/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 pr-4 whitespace-nowrap">Date</th>
                <th className="text-left py-3 pr-4">Role</th>
                <th className="text-left py-3 pr-4">Venue</th>
                <th className="text-left py-3 pr-4">Location</th>
                <th className="text-left py-3 pr-4">Tour</th>
                <th className="text-left py-3 pr-4">Attendance</th>
                <th className="text-left py-3 pr-4">Rate Paid</th>
                <th className="text-left py-3 pr-4">Merch</th>
                <th className="text-left py-3 pr-2">Source</th>
                <th className="text-left py-3"></th>
              </tr>
            </thead>
            <tbody>
              {past.map(show => (
                <PastRow key={show.id} show={show} onUpdateGuarantee={updateGuarantee} onDelete={deleteShow} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function UpcomingRow({ show, onStatus, onDelete }: {
  show: Show
  onStatus: (id: string, s: Show['status']) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          {show.role && show.role !== 'unknown' && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${ROLE_COLORS[show.role]}`}>{show.role}</span>
          )}
          <span className="font-semibold text-sm">{show.venue || '(TBD venue)'}</span>
          {show.sold_out && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">SOLD OUT</span>}
        </div>
        <div className="flex items-center gap-3 text-xs text-black/50 flex-wrap">
          <span>{dateStr(show)}</span>
          {locationStr(show) && <span>·</span>}
          {locationStr(show) && <span>{locationStr(show)}</span>}
          {show.tour_name && <><span>·</span><span className="italic">{show.tour_name}</span></>}
          {show.headline_act && <><span>·</span><span>w/ {show.headline_act}</span></>}
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button onClick={() => onStatus(show.id, 'completed')} className="text-xs bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
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

function PastRow({ show, onUpdateGuarantee, onDelete }: {
  show: Show
  onUpdateGuarantee: (id: string, value: string) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [rateVal, setRateVal] = useState(show.guarantee?.toString() ?? '')

  function saveRate() {
    onUpdateGuarantee(show.id, rateVal)
    setEditing(false)
  }

  const firstSource = show.source_urls?.split(';')[0]?.trim()

  return (
    <tr className="border-b border-black/5 hover:bg-black/3 group align-top">
      <td className="py-3 pr-4 text-black/50 text-xs whitespace-nowrap">{dateStr(show)}</td>
      <td className="py-3 pr-4">
        {show.role && show.role !== 'unknown' ? (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${ROLE_COLORS[show.role]}`}>{show.role}</span>
        ) : <span className="text-black/30">—</span>}
      </td>
      <td className="py-3 pr-4">
        <span className="font-medium text-sm">{show.venue || <span className="text-black/30">—</span>}</span>
        {show.headline_act && <p className="text-xs text-black/40">w/ {show.headline_act}</p>}
      </td>
      <td className="py-3 pr-4 text-black/60 text-xs whitespace-nowrap">
        {locationStr(show) || <span className="text-black/30">—</span>}
      </td>
      <td className="py-3 pr-4 text-xs text-black/50 italic">
        {show.tour_name || <span className="not-italic text-black/30">—</span>}
        {show.sold_out && <span className="ml-1 not-italic text-red-500">(sold out)</span>}
      </td>
      <td className="py-3 pr-4 text-sm">{show.attendance?.toLocaleString() ?? <span className="text-black/30">—</span>}</td>
      <td className="py-3 pr-4">
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              autoFocus
              type="number"
              value={rateVal}
              onChange={e => setRateVal(e.target.value)}
              onBlur={saveRate}
              onKeyDown={e => e.key === 'Enter' && saveRate()}
              className="w-20 border border-black/20 rounded px-2 py-0.5 text-xs outline-none"
              placeholder="0"
            />
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="text-sm hover:underline">
            {show.guarantee ? `$${show.guarantee.toLocaleString()}` : <span className="text-black/30 text-xs">+ rate</span>}
          </button>
        )}
      </td>
      <td className="py-3 pr-4 text-sm">{show.merch_sales ? `$${show.merch_sales.toLocaleString()}` : <span className="text-black/30">—</span>}</td>
      <td className="py-3 pr-2">
        {firstSource ? (
          <a href={firstSource} target="_blank" rel="noopener" className="text-xs text-black/40 hover:text-black underline">
            IG →
          </a>
        ) : <span className="text-black/20">—</span>}
      </td>
      <td className="py-3">
        <button onClick={() => onDelete(show.id)} className="text-black/20 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all">
          Delete
        </button>
      </td>
    </tr>
  )
}
