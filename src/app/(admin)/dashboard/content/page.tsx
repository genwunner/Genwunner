'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ScheduledPost {
  id: string
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'discord'
  content_type: 'video' | 'short' | 'photo' | 'text' | 'community'
  caption: string | null
  hashtags: string | null
  scheduled_at: string | null
  status: 'draft' | 'scheduled' | 'posted' | 'failed'
  external_url: string | null
  notes: string | null
  created_at: string
}

const PLATFORM_COLORS: Record<string, string> = {
  youtube: 'bg-red-100 text-red-700',
  tiktok: 'bg-black/10 text-black/70',
  instagram: 'bg-purple-100 text-purple-700',
  twitter: 'bg-sky-100 text-sky-700',
  discord: 'bg-indigo-100 text-indigo-700',
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-black/8 text-black/50',
  scheduled: 'bg-blue-100 text-blue-700',
  posted: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-600',
}

const HASHTAG_PRESETS: Record<string, string> = {
  pokemon: '#pokemon #pokémon #pokémonmusic #pokérap #genone #gen1pokemon #pokémonfan #kanto #anime #gamer',
  nostalgia: '#nostalgia #90skid #pokémon #gameboy #nintendoswitch #pokémontuber #retrogaming',
  rage: '#pokérage #angrypokémon #pokéreaction #pokérap #hiphop #rapper #indierap',
  show: '#concert #livemusic #animecon #animeconcert #pokémonconcert #rapper #show',
}

const EMPTY_FORM = {
  platform: 'tiktok' as ScheduledPost['platform'],
  content_type: 'video' as ScheduledPost['content_type'],
  caption: '',
  hashtags: '',
  scheduled_at: '',
  status: 'draft' as ScheduledPost['status'],
  external_url: '',
  notes: '',
}

export default function ContentPage() {
  const supabase = createClient()
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filter, setFilter] = useState<ScheduledPost['status'] | 'all'>('all')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('scheduled_posts').select('*').order('scheduled_at', { ascending: true, nullsFirst: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await supabase.from('scheduled_posts').insert({
      platform: form.platform,
      content_type: form.content_type,
      caption: form.caption || null,
      hashtags: form.hashtags || null,
      scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
      status: form.status,
      external_url: form.external_url || null,
      notes: form.notes || null,
    }).select().single()
    if (data) setPosts(prev => [...prev, data].sort((a, b) => {
      if (!a.scheduled_at) return 1
      if (!b.scheduled_at) return -1
      return new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
    }))
    setForm(EMPTY_FORM)
    setShowForm(false)
    setSaving(false)
  }

  async function updatePostStatus(id: string, status: ScheduledPost['status']) {
    await supabase.from('scheduled_posts').update({ status }).eq('id', id)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  async function deletePost(id: string) {
    await supabase.from('scheduled_posts').delete().eq('id', id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  const filtered = posts.filter(p => filter === 'all' || p.status === filter)
  const upcoming = posts.filter(p => p.status === 'scheduled' && p.scheduled_at && new Date(p.scheduled_at) > new Date())
  const drafts = posts.filter(p => p.status === 'draft')
  const posted = posts.filter(p => p.status === 'posted')

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Social Media</h1>
          <p className="text-black/40 text-sm mt-1">Agent 4 — schedule content across YouTube, TikTok, Instagram & more</p>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-black/80 transition-colors">
          {showForm ? 'Cancel' : '+ Schedule Post'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Upcoming', value: upcoming.length, color: 'text-blue-600' },
          { label: 'Drafts', value: drafts.length, color: 'text-black/60' },
          { label: 'Posted', value: posted.length, color: 'text-green-600' },
          { label: 'Total', value: posts.length, color: 'text-black' },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={savePost} className="bg-black/5 border border-black/10 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Schedule Post</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value as ScheduledPost['platform'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">X / Twitter</option>
              <option value="discord">Discord</option>
            </select>
            <select value={form.content_type} onChange={e => setForm(f => ({ ...f, content_type: e.target.value as ScheduledPost['content_type'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="video">Video</option>
              <option value="short">Short / Reel</option>
              <option value="photo">Photo</option>
              <option value="text">Text Post</option>
              <option value="community">Community Post</option>
            </select>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ScheduledPost['status'] }))} className="bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none">
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="posted">Already Posted</option>
            </select>
          </div>
          <textarea
            value={form.caption}
            onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
            placeholder="Caption / post text…"
            rows={4}
            className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none resize-none mb-3"
          />

          {/* Hashtag presets */}
          <div className="mb-3">
            <p className="text-xs text-black/40 mb-2">Hashtag presets:</p>
            <div className="flex gap-2 flex-wrap mb-2">
              {Object.entries(HASHTAG_PRESETS).map(([key, tags]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, hashtags: f.hashtags ? `${f.hashtags} ${tags}` : tags }))}
                  className="text-xs bg-black/8 border border-black/15 px-2 py-1 rounded-lg hover:bg-black/15 transition-colors"
                >
                  #{key}
                </button>
              ))}
              <button type="button" onClick={() => setForm(f => ({ ...f, hashtags: '' }))} className="text-xs text-black/30 hover:text-black/60">clear</button>
            </div>
            <textarea
              value={form.hashtags}
              onChange={e => setForm(f => ({ ...f, hashtags: e.target.value }))}
              placeholder="Hashtags…"
              rows={2}
              className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-xs outline-none resize-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-black/40 block mb-1">Schedule date/time</label>
              <input
                type="datetime-local"
                value={form.scheduled_at}
                onChange={e => setForm(f => ({ ...f, scheduled_at: e.target.value }))}
                className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-black/40 block mb-1">Link (YouTube, TikTok, etc.)</label>
              <input value={form.external_url} onChange={e => setForm(f => ({ ...f, external_url: e.target.value }))} placeholder="URL" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
            <div className="col-span-2">
              <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Internal notes (not published)" className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="mt-4 bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Post'}
          </button>
        </form>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {([
          { key: 'all', label: `All (${posts.length})` },
          { key: 'scheduled', label: `Scheduled (${upcoming.length})` },
          { key: 'draft', label: `Drafts (${drafts.length})` },
          { key: 'posted', label: `Posted (${posted.length})` },
        ] as { key: ScheduledPost['status'] | 'all'; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === key ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Post List */}
      {loading ? (
        <p className="text-black/40 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-black/30 text-sm text-center py-12">No posts yet — schedule your first above.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(post => (
            <div key={post.id} className="border border-black/10 rounded-xl px-5 py-4 hover:border-black/20 transition-colors group">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLATFORM_COLORS[post.platform]}`}>{post.platform}</span>
                    <span className="text-xs text-black/30 capitalize">{post.content_type.replace('_', ' ')}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[post.status]}`}>{post.status}</span>
                    {post.scheduled_at && (
                      <span className="text-xs text-black/40">
                        {new Date(post.scheduled_at).toLocaleDateString()} {new Date(post.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  {post.caption && (
                    <p className="text-sm text-black/70 line-clamp-2 mb-1">{post.caption}</p>
                  )}
                  {post.hashtags && (
                    <p className="text-xs text-black/30 line-clamp-1">{post.hashtags}</p>
                  )}
                  {post.external_url && (
                    <a href={post.external_url} target="_blank" rel="noopener" className="text-xs text-black/40 hover:text-black underline mt-1 inline-block">
                      View post →
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 items-end opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  {post.status !== 'posted' && (
                    <button onClick={() => updatePostStatus(post.id, 'posted')} className="text-xs bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                      Mark Posted
                    </button>
                  )}
                  {post.status === 'draft' && (
                    <button onClick={() => updatePostStatus(post.id, 'scheduled')} className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                      Mark Scheduled
                    </button>
                  )}
                  <button onClick={() => deletePost(post.id)} className="text-xs text-black/20 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
