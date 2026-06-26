'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Convention {
  id: string
  name: string
  organization: string | null
  city: string
  state: string | null
  venue: string | null
  start_date: string | null
  end_date: string | null
  submission_deadline: string | null
  expected_attendance: number | null
  submission_url: string | null
  booking_email: string | null
  secondary_contacts: string | null
  past_performers: string | null
  tier: 'S' | 'A' | 'B' | 'C'
  pokemon_friendly: boolean
  performed_here: boolean
  score: number
  status: 'researching' | 'applied' | 'confirmed' | 'skip'
  city_fan_density: number
  travel_cost_estimate: number | null
  notes: string | null
  created_at: string
}

const TIER_COLORS: Record<string, string> = {
  S: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  A: 'bg-purple-100 text-purple-700 border border-purple-300',
  B: 'bg-blue-100 text-blue-700 border border-blue-300',
  C: 'bg-black/8 text-black/50',
}

const STATUS_COLORS: Record<string, string> = {
  researching: 'bg-black/8 text-black/60',
  applied: 'bg-orange-100 text-orange-700',
  confirmed: 'bg-green-100 text-green-700',
  skip: 'bg-red-50 text-red-400',
}

const SCORE_TIER: (score: number) => { label: string; color: string } = (score) => {
  if (score >= 80) return { label: 'APPLY NOW', color: 'text-green-600 font-bold' }
  if (score >= 60) return { label: 'STRONG CONSIDER', color: 'text-blue-600 font-semibold' }
  if (score >= 40) return { label: 'RESEARCH FURTHER', color: 'text-yellow-600' }
  return { label: 'SKIP', color: 'text-black/40' }
}

function computeScore(con: Partial<Convention>): number {
  let score = 0
  // Fan density in city (0-30 pts)
  const density = con.city_fan_density ?? 0
  score += Math.min(density, 30)
  // Convention size (0-25 pts)
  const att = con.expected_attendance ?? 0
  if (att >= 100000) score += 25
  else if (att >= 50000) score += 20
  else if (att >= 20000) score += 15
  else if (att >= 10000) score += 10
  else if (att >= 5000) score += 6
  else if (att > 0) score += 3
  // Tier bonus (0-20 pts)
  const tierBonus: Record<string, number> = { S: 20, A: 15, B: 8, C: 3 }
  score += tierBonus[con.tier ?? 'B'] ?? 8
  // Pokémon friendly (0-10 pts)
  if (con.pokemon_friendly) score += 10
  // Performed here bonus (0-10 pts)
  if (con.performed_here) score += 10
  // Submission deadline not passed (0-10 pts)
  if (con.submission_deadline) {
    const deadline = new Date(con.submission_deadline)
    const today = new Date()
    if (deadline > today) score += 10
    else score -= 5
  }
  // Travel cost penalty (up to -10)
  if (con.travel_cost_estimate) {
    const cost = con.travel_cost_estimate
    if (cost > 2000) score -= 10
    else if (cost > 1000) score -= 5
    else if (cost > 500) score -= 2
  }
  return Math.max(0, Math.min(100, Math.round(score)))
}

const EMPTY_FORM = {
  name: '',
  organization: '',
  city: '',
  state: '',
  venue: '',
  start_date: '',
  end_date: '',
  submission_deadline: '',
  expected_attendance: '',
  submission_url: '',
  booking_email: '',
  secondary_contacts: '',
  past_performers: '',
  tier: 'B' as Convention['tier'],
  pokemon_friendly: false,
  status: 'researching' as Convention['status'],
  city_fan_density: '',
  travel_cost_estimate: '',
  notes: '',
}

export default function ConventionsPage() {
  const supabase = createClient()
  const [conventions, setConventions] = useState<Convention[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filter, setFilter] = useState<'all' | 'apply' | 'consider' | 'skip'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pitchDraft, setPitchDraft] = useState<{ id: string; text: string } | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('conventions').select('*').order('score', { ascending: false })
    setConventions(data ?? [])
    setLoading(false)
  }

  async function addConvention(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)
    const score = computeScore({
      tier: form.tier,
      pokemon_friendly: form.pokemon_friendly,
      expected_attendance: form.expected_attendance ? parseInt(form.expected_attendance) : null,
      submission_deadline: form.submission_deadline || null,
      city_fan_density: form.city_fan_density ? parseInt(form.city_fan_density) : 0,
      travel_cost_estimate: form.travel_cost_estimate ? parseFloat(form.travel_cost_estimate) : null,
    })
    const { data } = await supabase.from('conventions').insert({
      name: form.name,
      organization: form.organization || null,
      city: form.city,
      state: form.state || null,
      venue: form.venue || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      submission_deadline: form.submission_deadline || null,
      expected_attendance: form.expected_attendance ? parseInt(form.expected_attendance) : null,
      submission_url: form.submission_url || null,
      booking_email: form.booking_email || null,
      secondary_contacts: form.secondary_contacts || null,
      past_performers: form.past_performers || null,
      tier: form.tier,
      pokemon_friendly: form.pokemon_friendly,
      status: form.status,
      city_fan_density: form.city_fan_density ? parseInt(form.city_fan_density) : 0,
      travel_cost_estimate: form.travel_cost_estimate ? parseFloat(form.travel_cost_estimate) : null,
      notes: form.notes || null,
      score,
    }).select().single()
    if (data) setConventions(prev => [data, ...prev].sort((a, b) => b.score - a.score))
    setForm(EMPTY_FORM)
    setShowForm(false)
    setAdding(false)
  }

  async function updateStatus(id: string, status: Convention['status']) {
    await supabase.from('conventions').update({ status }).eq('id', id)
    setConventions(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  async function deleteConvention(id: string) {
    if (!confirm('Delete this convention?')) return
    await supabase.from('conventions').delete().eq('id', id)
    setConventions(prev => prev.filter(c => c.id !== id))
  }

  function generatePitch(con: Convention): string {
    const scoreTier = SCORE_TIER(con.score)
    const cityStats = con.city_fan_density > 0 ? `with an estimated fan density score of ${con.city_fan_density}/30 in ${con.city}` : `in ${con.city}`
    return `Subject: Genwunner — Pokémon Rap Performance Inquiry for ${con.name}

Hi ${con.organization ?? con.name} Team,

I'm reaching out on behalf of Genwunner — a Pokémon rage rapper who has built a dedicated following around Gen 1 Pokémon-themed music and is actively producing live experiences for convention audiences.

Genwunner has developed a strong presence ${cityStats}, and ${con.name} represents exactly the kind of audience that connects with this content — Pokémon fans who grew up in the Game Boy era and want music that hits that nostalgia hard.

Why this works for ${con.name}:
• Unique content: Pokémon rap is an underserved niche that convention attendees actively seek out
• Engaged fanbase: dedicated community that travels for live music experiences
• High-energy live show designed specifically for convention settings

I'd love to discuss how Genwunner can add value to your ${con.start_date ? new Date(con.start_date + 'T00:00:00').getFullYear() : 'upcoming'} programming. I've attached our current EPK for your review.

Available for a quick call whenever works for you.

Best,
[Your Name]
Management — Genwunner
genwunnermgmt@gmail.com`
  }

  const filtered = conventions.filter(c => {
    if (filter === 'apply') return c.score >= 80
    if (filter === 'consider') return c.score >= 60 && c.score < 80
    if (filter === 'skip') return c.score < 40
    return true
  })

  const applyNow = conventions.filter(c => c.score >= 80).length
  const consider = conventions.filter(c => c.score >= 60 && c.score < 80).length
  const deadlinesThisMonth = conventions.filter(c => {
    if (!c.submission_deadline) return false
    const d = new Date(c.submission_deadline)
    const now = new Date()
    return d > now && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  }).length

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Convention Scout</h1>
          <p className="text-black/40 text-sm mt-1">Agent 1 — find, score, and pitch anime & gaming conventions</p>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors">
          {showForm ? 'Cancel' : '+ Add Convention'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Apply Now', value: applyNow, sub: 'score 80+', color: 'text-green-600' },
          { label: 'Strong Consider', value: consider, sub: 'score 60–79', color: 'text-blue-600' },
          { label: 'Total Tracked', value: conventions.length, sub: 'in database', color: 'text-black' },
          { label: 'Deadlines This Month', value: deadlinesThisMonth, sub: 'act fast', color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-black/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={addConvention} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Add Convention</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Convention name*" required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} placeholder="Parent organization" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Venue" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City*" required className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="State" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.expected_attendance} onChange={e => setForm(f => ({ ...f, expected_attendance: e.target.value }))} placeholder="Expected attendance" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <div className="relative">
              <input type="date" value={form.submission_deadline} onChange={e => setForm(f => ({ ...f, submission_deadline: e.target.value }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none w-full" />
              <span className="absolute -top-5 left-0 text-xs text-black/40">Submission deadline</span>
            </div>
            <input value={form.booking_email} onChange={e => setForm(f => ({ ...f, booking_email: e.target.value }))} placeholder="Booking email" type="email" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.submission_url} onChange={e => setForm(f => ({ ...f, submission_url: e.target.value }))} placeholder="Submission URL" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <input value={form.secondary_contacts} onChange={e => setForm(f => ({ ...f, secondary_contacts: e.target.value }))} placeholder="Secondary contacts" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
          </div>

          {/* Scoring inputs */}
          <div className="bg-white border border-black/10 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/40 mb-3">Scoring Inputs</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-black/40 block mb-1">Tier</label>
                <select value={form.tier} onChange={e => setForm(f => ({ ...f, tier: e.target.value as Convention['tier'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none w-full">
                  <option value="S">S — Mega (100k+)</option>
                  <option value="A">A — Large (20k–99k)</option>
                  <option value="B">B — Mid (5k–19k)</option>
                  <option value="C">C — Small (&lt;5k)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-black/40 block mb-1">City fan density (0–30)</label>
                <input value={form.city_fan_density} onChange={e => setForm(f => ({ ...f, city_fan_density: e.target.value }))} placeholder="0" type="number" min="0" max="30" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none w-full" />
              </div>
              <div>
                <label className="text-xs text-black/40 block mb-1">Est. travel cost ($)</label>
                <input value={form.travel_cost_estimate} onChange={e => setForm(f => ({ ...f, travel_cost_estimate: e.target.value }))} placeholder="0" type="number" min="0" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none w-full" />
              </div>
              <div className="flex items-center gap-2 col-span-3">
                <input type="checkbox" id="pf" checked={form.pokemon_friendly} onChange={e => setForm(f => ({ ...f, pokemon_friendly: e.target.checked }))} className="accent-black" />
                <label htmlFor="pf" className="text-sm cursor-pointer">Pokémon-friendly convention (+10 pts)</label>
              </div>
            </div>
            <div className="mt-3 p-3 bg-black/5 rounded-lg">
              <p className="text-xs text-black/40">Live score preview: <span className="font-bold text-black">{computeScore({
                tier: form.tier,
                pokemon_friendly: form.pokemon_friendly,
                expected_attendance: form.expected_attendance ? parseInt(form.expected_attendance) : null,
                submission_deadline: form.submission_deadline || null,
                city_fan_density: form.city_fan_density ? parseInt(form.city_fan_density) : 0,
                travel_cost_estimate: form.travel_cost_estimate ? parseFloat(form.travel_cost_estimate) : null,
              })}/100</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input value={form.past_performers} onChange={e => setForm(f => ({ ...f, past_performers: e.target.value }))} placeholder="Past performers" className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Convention['status'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="researching">Researching</option>
              <option value="applied">Applied</option>
              <option value="confirmed">Confirmed</option>
              <option value="skip">Skip</option>
            </select>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Notes" rows={2} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none col-span-2 resize-none" />
          </div>
          <button type="submit" disabled={adding} className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
            {adding ? 'Saving…' : 'Add Convention'}
          </button>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: `All (${conventions.length})` },
          { key: 'apply', label: `Apply Now (${applyNow})` },
          { key: 'consider', label: `Consider (${consider})` },
          { key: 'skip', label: 'Low Priority' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === key ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Convention List */}
      {loading ? (
        <p className="text-black/40 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-black/30 text-sm text-center py-12">No conventions found — add your first above.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(con => {
            const scoreTier = SCORE_TIER(con.score)
            const isExpanded = expanded === con.id
            const deadlinePast = con.submission_deadline && new Date(con.submission_deadline) < new Date()
            const deadlineSoon = con.submission_deadline && !deadlinePast && (() => {
              const d = new Date(con.submission_deadline!)
              const now = new Date()
              return (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 30
            })()

            return (
              <div key={con.id} className="border border-black/10 rounded-xl overflow-hidden">
                {/* Row */}
                <div className="flex items-center gap-3 px-5 py-4 hover:bg-black/3 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : con.id)}>
                  {/* Score */}
                  <div className="w-14 text-center shrink-0">
                    <p className="text-2xl font-bold leading-none">{con.score}</p>
                    <p className={`text-xs mt-0.5 ${scoreTier.color}`}>{scoreTier.label}</p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm">{con.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIER_COLORS[con.tier]}`}>Tier {con.tier}</span>
                      {con.pokemon_friendly && <span className="text-xs bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full">Pokémon ✓</span>}
                      {con.performed_here && <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Performed here</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[con.status]}`}>{con.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-black/40 flex-wrap">
                      <span>{con.city}{con.state ? `, ${con.state}` : ''}</span>
                      {con.expected_attendance && <span>{con.expected_attendance.toLocaleString()} expected</span>}
                      {con.start_date && <span>{new Date(con.start_date + 'T00:00:00').toLocaleDateString()}</span>}
                      {con.submission_deadline && (
                        <span className={deadlinePast ? 'text-black/30 line-through' : deadlineSoon ? 'text-red-500 font-semibold' : ''}>
                          Deadline: {new Date(con.submission_deadline + 'T00:00:00').toLocaleDateString()}
                          {deadlineSoon && ' ⚠'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-black/30 text-sm">{isExpanded ? '▲' : '▼'}</div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-black/8 bg-black/2 px-5 py-4 space-y-4">

                    {/* Apply + Contact — prominent action row */}
                    <div className="flex flex-wrap gap-3">
                      {con.submission_url ? (
                        <a
                          href={con.submission_url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors"
                          style={{ color: '#fff' }}
                        >
                          Apply / Submit →
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-sm text-black/30 px-4 py-2 border border-dashed border-black/20 rounded-lg">No apply link yet</span>
                      )}
                      {con.booking_email ? (
                        <a
                          href={`mailto:${con.booking_email}`}
                          className="inline-flex items-center gap-2 border border-black/20 text-sm font-medium px-4 py-2 rounded-lg hover:bg-black/5 transition-colors"
                        >
                          ✉ {con.booking_email}
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-sm text-black/30 px-4 py-2 border border-dashed border-black/20 rounded-lg">No booking email yet</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        {con.venue && <p className="text-black/60 mb-1"><span className="font-medium">Venue:</span> {con.venue}</p>}
                        {con.organization && <p className="text-black/60 mb-1"><span className="font-medium">Org:</span> {con.organization}</p>}
                        {con.secondary_contacts && <p className="text-black/60 mb-1"><span className="font-medium">Other contacts:</span> {con.secondary_contacts}</p>}
                        {con.past_performers && <p className="text-black/60 mb-1"><span className="font-medium">Past performers:</span> {con.past_performers}</p>}
                        {con.notes && <p className="text-black/50 text-xs mt-2">{con.notes}</p>}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-black/30 mb-2">Score Breakdown</p>
                        <div className="space-y-1 text-xs text-black/50">
                          <p>Fan density: {Math.min(con.city_fan_density ?? 0, 30)}/30 pts</p>
                          <p>Tier {con.tier}: {({ S: 20, A: 15, B: 8, C: 3 }[con.tier])} pts</p>
                          <p>Pokémon friendly: {con.pokemon_friendly ? '+10' : '0'} pts</p>
                          <p>Performed here: {con.performed_here ? '+10' : '0'} pts</p>
                          {con.travel_cost_estimate && <p>Travel cost: -{con.travel_cost_estimate > 2000 ? 10 : con.travel_cost_estimate > 1000 ? 5 : 2} pts</p>}
                        </div>
                      </div>
                    </div>

                    {/* Pitch Generator */}
                    {con.score >= 60 && (
                      <div>
                        <button
                          onClick={() => setPitchDraft(pitchDraft?.id === con.id ? null : { id: con.id, text: generatePitch(con) })}
                          className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-black/80 transition-colors"
                        >
                          {pitchDraft?.id === con.id ? 'Hide Pitch Draft' : '✉ Generate Pitch Draft'}
                        </button>
                        {pitchDraft?.id === con.id && (
                          <div className="mt-3">
                            <pre className="bg-white border border-black/10 rounded-xl p-4 text-xs text-black/70 whitespace-pre-wrap font-mono leading-relaxed">{pitchDraft.text}</pre>
                            <div className="flex gap-2 mt-2">
                              {con.booking_email && (
                                <a
                                  href={`mailto:${con.booking_email}?subject=${encodeURIComponent(`Genwunner — Pokémon Rap Performance Inquiry for ${con.name}`)}&body=${encodeURIComponent(pitchDraft.text)}`}
                                  className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-black/80 transition-colors"
                                >
                                  Open in Email →
                                </a>
                              )}
                              <button
                                onClick={() => navigator.clipboard.writeText(pitchDraft.text)}
                                className="text-xs border border-black/20 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Status + Delete */}
                    <div className="flex items-center gap-2 pt-2 border-t border-black/8">
                      <span className="text-xs text-black/40 mr-1">Update status:</span>
                      {(['researching', 'applied', 'confirmed', 'skip'] as Convention['status'][]).map(s => (
                        <button key={s} onClick={() => updateStatus(con.id, s)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${con.status === s ? 'bg-black text-white border-black' : 'border-black/20 hover:bg-black/5'}`}>
                          {s}
                        </button>
                      ))}
                      <button onClick={() => deleteConvention(con.id)} className="ml-auto text-xs text-black/20 hover:text-red-400 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
