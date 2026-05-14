import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Uses service role key to bypass RLS for server-side inserts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.LAYLO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  // Laylo sends subscriber data — map to our fans schema
  const fan = {
    name: body.name ?? null,
    phone: body.phone ?? null,
    email: body.email ?? null,
    city: body.city ?? null,
    zip: body.zip ?? null,
    source: 'laylo',
  }

  const { error } = await supabase.from('fans').insert(fan)

  if (error) {
    console.error('Laylo webhook insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
