'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Fan {
  id: string
  name: string | null
  phone: string | null
  email: string | null
  city: string | null
  source: string | null
  created_at: string
}

export default function FansPage() {
  const supabase = createClient()
  const [fans, setFans] = useState<Fan[]>([])
  const [cityFilter, setCityFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      let query = supabase.from('fans').select('*').order('created_at', { ascending: false })
      if (cityFilter) query = query.ilike('city', `%${cityFilter}%`)
      const { data } = await query
      setFans(data ?? [])
      setLoading(false)
    }
    load()
  }, [cityFilter])

  const cities = [...new Set(fans.map(f => f.city).filter(Boolean))] as string[]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Fans</h1>
          <p className="text-white/40 text-sm">{fans.length} total</p>
        </div>
        <select
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none"
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Laylo Embed — Fan Signup / Presave */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-2">Fan Signup (Laylo)</h2>
        <p className="text-white/40 text-xs mb-4">
          Embed your Laylo drop below. Fans who sign up via Laylo are also synced here via webhook.
        </p>
        {process.env.NEXT_PUBLIC_LAYLO_EMBED_ID ? (
          // Replace with your actual Laylo embed code
          <div id="laylo-embed" className="min-h-[200px]">
            <p className="text-white/30 text-sm">Laylo embed loading…</p>
          </div>
        ) : (
          <div className="border border-dashed border-white/20 rounded-lg p-6 text-center">
            <p className="text-white/30 text-xs">Set NEXT_PUBLIC_LAYLO_EMBED_ID to activate the Laylo embed.</p>
          </div>
        )}
      </div>

      {/* Fan Table */}
      {loading ? (
        <p className="text-white/40 text-sm">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 pr-4">Name</th>
                <th className="text-left py-3 pr-4">Phone</th>
                <th className="text-left py-3 pr-4">Email</th>
                <th className="text-left py-3 pr-4">City</th>
                <th className="text-left py-3 pr-4">Source</th>
                <th className="text-left py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {fans.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-white/30">No fans yet.</td></tr>
              )}
              {fans.map(fan => (
                <tr key={fan.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 pr-4">{fan.name ?? '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{fan.phone ?? '—'}</td>
                  <td className="py-3 pr-4 text-white/60">{fan.email ?? '—'}</td>
                  <td className="py-3 pr-4">
                    {fan.city && (
                      <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">{fan.city}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-white/40 text-xs">{fan.source ?? '—'}</td>
                  <td className="py-3 text-white/40 text-xs">
                    {new Date(fan.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
