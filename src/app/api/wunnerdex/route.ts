import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { sendFanEmail } from '@/lib/resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, phone, city, favorite_pokemon, favorite_song, social_handle, want_in_city } = body

  if (!email || !city) {
    return NextResponse.json({ error: 'Email and city are required' }, { status: 400 })
  }

  // Save to wunnerdex_signups
  const { error } = await supabase.from('wunnerdex_signups').insert({
    email,
    phone: phone || null,
    city,
    favorite_pokemon: favorite_pokemon || null,
    favorite_song: favorite_song || null,
    social_handle: social_handle || null,
    want_in_city: want_in_city === 'true' || want_in_city === true,
  })

  if (error && !error.message.includes('duplicate')) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  // Also save to fans table for unified fan tracking
  await supabase.from('fans').insert({
    email,
    phone: phone || null,
    city,
    source: 'wunnerdex',
  }).then(() => {})

  // Send welcome email
  if (process.env.RESEND_API_KEY) {
    await sendFanEmail({
      to: email,
      subject: 'YOU\'RE IN THE WUNNERDEX 🎮',
      html: `
        <div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="font-size:32px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">WELCOME TO THE WUNNERDEX</h1>
          <p style="color:#999;font-size:14px;margin-bottom:24px;">PokéRage Universe · Genwunner</p>
          <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">
            Your trainer has been registered. You now have early access to drops, shows, secret links,
            and Big Man Blastoise sightings before the civilians.
          </p>
          <p style="color:#facc15;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
            City registered: ${city}
          </p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #222;">
            <p style="color:#666;font-size:12px;">Stay ready. The next raid could be in your city.</p>
            <p style="color:#666;font-size:12px;margin-top:4px;">— Genwunner</p>
          </div>
        </div>
      `,
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

// Handle legacy form POST (from homepage form with method="POST")
export async function GET() {
  return NextResponse.redirect(new URL('/wunnerdex', process.env.NEXT_PUBLIC_SITE_URL!))
}
