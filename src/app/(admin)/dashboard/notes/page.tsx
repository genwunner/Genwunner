'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface IdeaAction {
  id: string
  dump_id: string
  idea_title: string
  summary: string | null
  goal: string | null
  steps: string[]
  feasibility: number
  priority_score: number
  impact: number
  status: 'not_started' | 'in_progress' | 'done' | 'blocked'
  created_at: string
}

interface BrainDump {
  id: string
  raw_input: string
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  not_started: 'bg-black/8 text-black/50',
  in_progress: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
  blocked: 'bg-red-100 text-red-600',
}

const STATUS_LABELS: Record<string, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  done: 'Done',
  blocked: 'Blocked',
}

// Rule-based brain dump parser — no API key needed
function parseBrainDump(text: string): Omit<IdeaAction, 'id' | 'dump_id' | 'created_at'>[] {
  // Split on blank lines, numbered items, or bullet points to find idea boundaries
  const rawIdeas = text
    .split(/\n{2,}|(?=\n\d+\.|(?=\n[-•*]\s))/)
    .map(s => s.trim())
    .filter(s => s.length > 10)

  // If only one big block, try to split by sentences or key phrases
  const ideas = rawIdeas.length > 1 ? rawIdeas : splitIntoIdeas(text)

  return ideas.map(raw => parseIdea(raw)).filter(i => i.idea_title.length > 2)
}

function splitIntoIdeas(text: string): string[] {
  // Try splitting by numbered items, bullet points, or topic sentences
  const byNumbers = text.split(/(?<=\n|^)(?:\d+[\.\)]\s+)/).filter(s => s.trim().length > 10)
  if (byNumbers.length > 1) return byNumbers

  const byBullets = text.split(/(?<=\n|^)[-•*]\s+/).filter(s => s.trim().length > 10)
  if (byBullets.length > 1) return byBullets

  // Fall back: split by capitalized sentences or lines
  const lines = text.split('\n').filter(l => l.trim().length > 5)
  if (lines.length > 1) return lines.map(l => l.trim())
  return [text]
}

function parseIdea(raw: string): Omit<IdeaAction, 'id' | 'dump_id' | 'created_at'> {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
  const ideaTitle = lines[0]
    .replace(/^[\d\.•\-*]+\s*/, '')
    .replace(/[:.]$/, '')
    .slice(0, 80)

  const body = lines.slice(1).join(' ')
  const fullText = raw.toLowerCase()

  // Extract action steps — lines starting with verbs or dashes
  const steps: string[] = []
  lines.slice(1).forEach(line => {
    if (/^[-•*]\s+|^\d+[.)\s]/i.test(line) || /^(get|make|build|create|record|release|post|reach|contact|film|design|book|set|launch|write|plan|drop|add|do|start|finish|schedule|send)/i.test(line.trim())) {
      const step = line.replace(/^[-•*\d.\s]+/, '').trim()
      if (step.length > 5) steps.push(step)
    }
  })
  if (steps.length === 0 && body.length > 5) {
    steps.push(body.slice(0, 120))
  }

  // Infer goal from content
  const goal = inferGoal(fullText)

  // Score: feasibility (how ready it is)
  let feasibility = 5
  if (/easy|quick|simple|already|just need|ready|done|have|got/i.test(fullText)) feasibility += 2
  if (/hard|expensive|complex|difficult|need to find|don't have|waiting|no budget|no time/i.test(fullText)) feasibility -= 2
  if (/today|this week|tomorrow|right now|asap/i.test(fullText)) feasibility += 1
  feasibility = Math.max(1, Math.min(10, feasibility))

  // Score: priority
  let priority_score = 5
  if (/urgent|asap|critical|important|need to|must|deadline|now|this week/i.test(fullText)) priority_score += 3
  if (/eventually|someday|maybe|later|one day|when i have time/i.test(fullText)) priority_score -= 2
  if (/release|drop|show|tour|collab|deal|press|feature/i.test(fullText)) priority_score += 1
  priority_score = Math.max(1, Math.min(10, priority_score))

  // Score: impact
  let impact = 5
  if (/viral|huge|big|massive|career|thousands|million|change|major|define/i.test(fullText)) impact += 3
  if (/small|minor|quick|little|test|experiment/i.test(fullText)) impact -= 1
  if (/tour|concert|label|deal|feature|collab|press|media|brand/i.test(fullText)) impact += 2
  impact = Math.max(1, Math.min(10, impact))

  return {
    idea_title: ideaTitle || 'Idea',
    summary: body.slice(0, 200) || null,
    goal,
    steps,
    feasibility,
    priority_score,
    impact,
    status: 'not_started',
  }
}

function inferGoal(text: string): string | null {
  if (/release|drop.*song|put out|upload|distribute/i.test(text)) return 'Release music'
  if (/show|perform|tour|concert|stage|venue|book/i.test(text)) return 'Book a performance'
  if (/collab|feature|work with|reach out to/i.test(text)) return 'Collaboration'
  if (/merch|hoodie|shirt|drop.*merch/i.test(text)) return 'Merch drop'
  if (/video|film|shoot|youtube|tiktok|reel/i.test(text)) return 'Content creation'
  if (/press|interview|feature|media|blog/i.test(text)) return 'Press / media'
  if (/brand|deal|sponsor|partner/i.test(text)) return 'Brand partnership'
  if (/fan|community|discord|follow/i.test(text)) return 'Fan engagement'
  return null
}

const scoreBar = (val: number) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className={`w-3 h-2 rounded-sm ${i < val ? 'bg-black/70' : 'bg-black/10'}`} />
    ))}
  </div>
)

export default function NotesPage() {
  const supabase = createClient()
  const [dumps, setDumps] = useState<BrainDump[]>([])
  const [actions, setActions] = useState<IdeaAction[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [parsing, setParsing] = useState(false)
  const [view, setView] = useState<'dump' | 'actions'>('dump')
  const [statusFilter, setStatusFilter] = useState<IdeaAction['status'] | 'all'>('all')
  const [expandedIdea, setExpandedIdea] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const [{ data: d }, { data: a }] = await Promise.all([
      supabase.from('brain_dumps').select('*').order('created_at', { ascending: false }),
      supabase.from('idea_actions').select('*').order('priority_score', { ascending: false }),
    ])
    setDumps(d ?? [])
    setActions(a ?? [])
    setLoading(false)
  }

  async function submitDump(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setParsing(true)

    // Parse locally
    const parsed = parseBrainDump(text)

    // Save dump
    const { data: dump } = await supabase.from('brain_dumps').insert({ raw_input: text }).select().single()
    if (!dump) { setParsing(false); return }

    // Save ideas
    const toInsert = parsed.map(p => ({ ...p, dump_id: dump.id }))
    const { data: newActions } = await supabase.from('idea_actions').insert(toInsert).select()

    setDumps(prev => [dump, ...prev])
    setActions(prev => [...(newActions ?? []), ...prev])
    setText('')
    setView('actions')
    setParsing(false)
  }

  async function updateStatus(id: string, status: IdeaAction['status']) {
    await supabase.from('idea_actions').update({ status }).eq('id', id)
    setActions(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  async function deleteIdea(id: string) {
    await supabase.from('idea_actions').delete().eq('id', id)
    setActions(prev => prev.filter(a => a.id !== id))
  }

  function generateEmail(idea: IdeaAction, professional: boolean): string {
    if (professional) {
      return `Subject: ${idea.idea_title}

Hi [Name],

I wanted to reach out regarding ${idea.idea_title.toLowerCase()}.

${idea.goal ? `The goal here is to ${idea.goal.toLowerCase()}.` : ''}

Here's what I'm thinking:
${idea.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${idea.summary ? `Context: ${idea.summary}` : ''}

Let me know if you'd like to connect and talk through this further.

Best,
[Your Name]
Management — Genwunner
genwunnermgmt@gmail.com`
    }
    return `yo,

had an idea — ${idea.idea_title.toLowerCase()}.

${idea.summary ?? ''}

the moves:
${idea.steps.map(s => `→ ${s}`).join('\n')}

let's build

— Genwunner`
  }

  const filtered = actions.filter(a => statusFilter === 'all' || a.status === statusFilter)
  const openActions = actions.filter(a => a.status !== 'done').length
  const highImpact = actions.filter(a => a.impact >= 8 && a.status !== 'done').length

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Notes → Actions</h1>
        <p className="text-black/40 text-sm mt-1">Agent 5 — brain dump → ranked, structured, actionable ideas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Ideas', value: actions.length },
          { label: 'Open Actions', value: openActions },
          { label: 'High Impact', value: highImpact, sub: 'impact 8+' },
          { label: 'Dumps', value: dumps.length },
        ].map(s => (
          <div key={s.label} className="bg-black/5 border border-black/10 rounded-xl p-4">
            <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
            {s.sub && <p className="text-xs text-black/30 mt-1">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'dump', label: 'Brain Dump' }, { key: 'actions', label: `Action Items (${actions.length})` }].map(({ key, label }) => (
          <button key={key} onClick={() => setView(key as 'dump' | 'actions')} className={`text-sm px-4 py-2 rounded-lg border transition-colors ${view === key ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40'}`}>
            {label}
          </button>
        ))}
      </div>

      {view === 'dump' && (
        <div>
          <form onSubmit={submitDump} className="mb-8">
            <label className="block text-sm font-semibold mb-2">Brain Dump</label>
            <p className="text-xs text-black/40 mb-3">
              Paste anything — Apple Notes, voice transcript, scattered thoughts. The agent will extract ideas, assign action steps, and score each one.
            </p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={`Example:\nI've been thinking about doing a merch drop tied to the Blue Version EP. Maybe a Gameboy USB cartridge. Need to find a manufacturer. Could be really big if we time it with the release.\n\nAlso want to reach out to Shofu for another collab. We worked well on Pokeflute. He's got a big audience that overlaps.\n\nNeed to book a show in LA before summer. The fan density there is crazy high.`}
              rows={12}
              className="w-full bg-black/5 border border-black/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-black/40 resize-y font-mono"
            />
            <div className="flex items-center gap-3 mt-3">
              <button type="submit" disabled={parsing || !text.trim()} className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
                {parsing ? 'Parsing…' : 'Parse into Actions →'}
              </button>
              <p className="text-xs text-black/30">Extracts ideas, scores feasibility/priority/impact, generates next steps</p>
            </div>
          </form>

          {/* Past Dumps */}
          {dumps.length > 0 && (
            <div>
              <h2 className="font-semibold text-sm uppercase tracking-wide text-black/40 mb-3">Past Dumps ({dumps.length})</h2>
              <div className="space-y-2">
                {dumps.map(d => (
                  <div key={d.id} className="bg-black/5 border border-black/10 rounded-xl p-4">
                    <p className="text-xs text-black/40 mb-2">{new Date(d.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-black/60 line-clamp-3">{d.raw_input}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'actions' && (
        <div>
          {/* Status filter */}
          <div className="flex gap-2 mb-4">
            {([
              { key: 'all', label: `All (${actions.length})` },
              { key: 'not_started', label: 'Not started' },
              { key: 'in_progress', label: 'In progress' },
              { key: 'blocked', label: 'Blocked' },
              { key: 'done', label: 'Done' },
            ] as { key: IdeaAction['status'] | 'all'; label: string }[]).map(({ key, label }) => (
              <button key={key} onClick={() => setStatusFilter(key)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${statusFilter === key ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40'}`}>
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-black/40 text-sm">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-black/30 text-sm text-center py-12">No ideas yet — do a brain dump first.</p>
          ) : (
            <div className="space-y-3">
              {filtered.sort((a, b) => (b.priority_score + b.impact) - (a.priority_score + a.impact)).map(idea => {
                const isExpanded = expandedIdea === idea.id
                const composite = Math.round((idea.feasibility + idea.priority_score + idea.impact) / 3 * 10) / 10
                return (
                  <div key={idea.id} className={`border rounded-xl overflow-hidden ${idea.status === 'done' ? 'border-black/8 opacity-60' : 'border-black/12'}`}>
                    <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-black/3" onClick={() => setExpandedIdea(isExpanded ? null : idea.id)}>
                      {/* Composite score */}
                      <div className="w-10 text-center shrink-0">
                        <p className="text-xl font-bold leading-none">{composite}</p>
                        <p className="text-xs text-black/30 mt-0.5">/10</p>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`font-semibold text-sm ${idea.status === 'done' ? 'line-through text-black/40' : ''}`}>{idea.idea_title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[idea.status]}`}>{STATUS_LABELS[idea.status]}</span>
                          {idea.goal && <span className="text-xs text-black/30">{idea.goal}</span>}
                        </div>
                        {idea.summary && <p className="text-xs text-black/50 line-clamp-1">{idea.summary}</p>}
                      </div>

                      <div className="text-black/30 text-sm shrink-0">{isExpanded ? '▲' : '▼'}</div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-black/8 bg-black/2 px-5 py-4 space-y-4">
                        {/* Scores */}
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: 'Feasibility', val: idea.feasibility },
                            { label: 'Priority', val: idea.priority_score },
                            { label: 'Impact', val: idea.impact },
                          ].map(({ label, val }) => (
                            <div key={label}>
                              <p className="text-xs text-black/40 mb-1">{label}: {val}/10</p>
                              {scoreBar(val)}
                            </div>
                          ))}
                        </div>

                        {/* Steps */}
                        {idea.steps.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-black/40 mb-2">Action Steps</p>
                            <ol className="space-y-1">
                              {idea.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <span className="text-xs text-black/30 mt-0.5 shrink-0">{i + 1}.</span>
                                  <span className="text-black/70">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {idea.summary && (
                          <p className="text-sm text-black/60">{idea.summary}</p>
                        )}

                        {/* Email Generator */}
                        <EmailGenerator idea={idea} generateEmail={generateEmail} />

                        {/* Controls */}
                        <div className="flex items-center gap-2 pt-2 border-t border-black/8 flex-wrap">
                          <span className="text-xs text-black/40 mr-1">Status:</span>
                          {(['not_started', 'in_progress', 'done', 'blocked'] as IdeaAction['status'][]).map(s => (
                            <button key={s} onClick={() => updateStatus(idea.id, s)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${idea.status === s ? 'bg-black text-white border-black' : 'border-black/20 hover:bg-black/5'}`}>
                              {STATUS_LABELS[s]}
                            </button>
                          ))}
                          <button onClick={() => deleteIdea(idea.id)} className="ml-auto text-xs text-black/20 hover:text-red-400 transition-colors">Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function EmailGenerator({ idea, generateEmail }: {
  idea: IdeaAction
  generateEmail: (idea: IdeaAction, professional: boolean) => string
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'pro' | 'brand'>('pro')
  const draft = generateEmail(idea, mode === 'pro')

  return (
    <div>
      <button onClick={() => setOpen(o => !o)} className="text-xs bg-black/5 border border-black/15 px-3 py-1.5 rounded-lg hover:bg-black/10 transition-colors">
        {open ? 'Hide Email Draft' : '✉ Generate Email Draft'}
      </button>
      {open && (
        <div className="mt-3">
          <div className="flex gap-2 mb-2">
            <button onClick={() => setMode('pro')} className={`text-xs px-2 py-1 rounded-lg border ${mode === 'pro' ? 'bg-black text-white border-black' : 'border-black/20'}`}>Professional</button>
            <button onClick={() => setMode('brand')} className={`text-xs px-2 py-1 rounded-lg border ${mode === 'brand' ? 'bg-black text-white border-black' : 'border-black/20'}`}>Brand Voice</button>
          </div>
          <pre className="bg-white border border-black/10 rounded-xl p-4 text-xs text-black/70 whitespace-pre-wrap font-mono leading-relaxed max-h-64 overflow-y-auto">{draft}</pre>
          <button onClick={() => navigator.clipboard.writeText(draft)} className="mt-2 text-xs border border-black/20 px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors">Copy</button>
        </div>
      )}
    </div>
  )
}
