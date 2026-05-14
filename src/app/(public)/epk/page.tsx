import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Highlight {
  id: string
  title: string
  body: string
  category: string
  sort_order: number
}

export default async function EPKPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('epk_settings')
    .select('is_public')
    .single()

  if (!settings?.is_public) notFound()

  // Log view
  await supabase.from('epk_views').insert({ viewed_at: new Date().toISOString() })

  const { data: highlights } = await supabase
    .from('epk_highlights')
    .select('*')
    .order('sort_order')

  const grouped = (highlights ?? []).reduce<Record<string, Highlight[]>>((acc, h) => {
    if (!acc[h.category]) acc[h.category] = []
    acc[h.category].push(h as Highlight)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-black/40 mb-2">Electronic Press Kit</p>
          <h1 className="text-5xl font-black tracking-tight">GENWUNNER</h1>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-black/40 mb-4 border-b border-black/10 pb-2">
              {category}
            </h2>
            <div className="space-y-4">
              {(items ?? []).map(item => (
                <div key={item.id}>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="border-t border-black/10 pt-8 mt-12 text-center">
          <p className="text-black/30 text-xs">For booking and press inquiries, contact via the form above.</p>
        </div>
      </div>
    </div>
  )
}
