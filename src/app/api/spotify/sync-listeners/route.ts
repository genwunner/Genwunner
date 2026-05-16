import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const res = await fetch(
      'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )
    const html = await res.text()

    let listeners: number | null = null

    const jsonMatch = html.match(/"monthlyListeners":(\d+)/)
    if (jsonMatch) {
      listeners = parseInt(jsonMatch[1], 10)
    } else {
      const textMatch = html.match(/([\d,]+)\s+monthly listeners/i)
      if (textMatch) {
        listeners = parseInt(textMatch[1].replace(/,/g, ''), 10)
      }
    }

    if (!listeners || isNaN(listeners)) {
      return NextResponse.json({ error: 'Could not parse listener count' }, { status: 422 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('spotify_stats')
      .insert({ listeners, fetched_at: new Date().toISOString() })

    if (error) throw error

    return NextResponse.json({ ok: true, listeners })
  } catch (err) {
    console.error('[spotify/sync-listeners]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
