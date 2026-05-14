'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface EPKHighlight {
  id: string
  title: string
  body: string
  category: 'bio' | 'press' | 'stats' | 'music' | 'contact'
  sort_order: number
}

interface EPKSettings {
  is_public: boolean
}

export default function EPKAdminPage() {
  const supabase = createClient()
  const [settings, setSettings] = useState<EPKSettings>({ is_public: false })
  const [highlights, setHighlights] = useState<EPKHighlight[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newCategory, setNewCategory] = useState<EPKHighlight['category']>('bio')

  useEffect(() => {
    async function load() {
      const [{ data: s }, { data: h }] = await Promise.all([
        supabase.from('epk_settings').select('*').single(),
        supabase.from('epk_highlights').select('*').order('sort_order'),
      ])
      if (s) setSettings(s)
      if (h) setHighlights(h)
      setLoading(false)
    }
    load()
  }, [])

  async function togglePublic() {
    const next = !settings.is_public
    setSaving(true)
    await supabase.from('epk_settings').upsert({ id: 1, is_public: next })
    setSettings({ is_public: next })
    setSaving(false)
  }

  async function addHighlight(e: React.FormEvent) {
    e.preventDefault()
    const { data } = await supabase
      .from('epk_highlights')
      .insert({ title: newTitle, body: newBody, category: newCategory, sort_order: highlights.length })
      .select()
      .single()
    if (data) setHighlights([...highlights, data])
    setNewTitle('')
    setNewBody('')
  }

  async function deleteHighlight(id: string) {
    await supabase.from('epk_highlights').delete().eq('id', id)
    setHighlights(highlights.filter(h => h.id !== id))
  }

  if (loading) return <div className="p-8 text-white/40">Loading…</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">EPK</h1>
          <p className="text-white/40 text-sm">Electronic Press Kit</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60">
            {settings.is_public ? 'Public' : 'Private'}
          </span>
          <button
            onClick={togglePublic}
            disabled={saving}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings.is_public ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              settings.is_public ? 'left-7' : 'left-1'
            }`} />
          </button>
          {settings.is_public && (
            <a href="/epk" target="_blank" className="text-xs text-white/40 hover:text-white underline">
              View public EPK →
            </a>
          )}
        </div>
      </div>

      {/* Add Highlight */}
      <form onSubmit={addHighlight} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Add Highlight</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Title (e.g. Bio, Streaming Stats)"
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            />
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as EPKHighlight['category'])}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            >
              <option value="bio">Bio</option>
              <option value="press">Press</option>
              <option value="stats">Stats</option>
              <option value="music">Music</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <textarea
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
            placeholder="Content…"
            rows={3}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/40 resize-none"
          />
          <button
            type="submit"
            className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Highlights List */}
      <div className="space-y-3">
        {highlights.length === 0 && (
          <p className="text-white/30 text-sm text-center py-8">No highlights yet.</p>
        )}
        {highlights.map(h => (
          <div key={h.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/60">{h.category}</span>
                <span className="font-semibold text-sm">{h.title}</span>
              </div>
              <p className="text-white/60 text-sm">{h.body}</p>
            </div>
            <button
              onClick={() => deleteHighlight(h.id)}
              className="text-white/20 hover:text-red-400 text-xs self-start transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
