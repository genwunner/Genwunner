import { createClient } from '@/lib/supabase/server'

export async function getSpotifyListeners(): Promise<string> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('spotify_stats')
      .select('listeners')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single()
    if (error || !data) return '70K'
    const n = data.listeners
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`
    return n.toLocaleString()
  } catch {
    return '70K'
  }
}
