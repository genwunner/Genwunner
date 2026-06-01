import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { sendFanEmail } from '@/lib/resend'

const MANAGEMENT_EMAIL = process.env.MANAGEMENT_EMAIL || 'genwunnermgmt@gmail.com'

function wunnerdexWelcomeEmail({ city }: { name: string; city: string }) {
  return `
    <div style="background:#000;color:#cc0000;padding:40px;font-family:'Courier New',Courier,monospace;max-width:600px;margin:0 auto;">
      <div style="border-bottom:1px solid #1a0000;padding-bottom:20px;margin-bottom:24px;">
        <p style="font-size:0.5rem;color:#e3000f;letter-spacing:0.15em;margin:0 0 8px;">// ROCKET RECRUITMENT REGIME · KANTO DIVISION</p>
        <h1 style="font-size:2rem;font-weight:700;color:#e3000f;letter-spacing:0.06em;text-transform:uppercase;margin:0;line-height:1.1;">
          OPERATIVE REGISTERED
        </h1>
      </div>

      <p style="font-size:0.75rem;color:#880000;letter-spacing:0.06em;margin:0 0 20px;">
        OPERATIVE LEVEL: <span style="color:#cc0000;">GRUNT</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        TERRITORY: <span style="color:#cc0000;">${city.toUpperCase()}</span>
      </p>

      <p style="font-size:0.75rem;color:#770000;line-height:2;margin:0 0 24px;">
        Your trainer data has been logged in the Wunnerdex. Giovanni has your file.
        You are now an active operative of the Rocket Recruitment Regime.
      </p>

      <div style="border:1px solid #1a0000;padding:20px;margin-bottom:24px;">
        <p style="font-size:0.5rem;color:#e3000f;letter-spacing:0.12em;margin:0 0 12px;">// YOUR PERKS</p>
        <ul style="list-style:none;padding:0;margin:0;font-size:0.7rem;color:#880000;line-height:2.2;">
          <li>▶ City raid alerts — you hear first</li>
          <li>▶ Early merch access before civilians</li>
          <li>▶ Secret drops & unreleased intel</li>
          <li>▶ Giovanni's journal — classified updates</li>
          <li>▶ Fan challenges & field missions</li>
        </ul>
      </div>

      <p style="font-size:0.65rem;color:#550000;line-height:2;margin:0 0 24px;">
        Stay ready. The next raid could be in your city.
      </p>

      <div style="border-top:1px solid #1a0000;padding-top:20px;">
        <p style="font-size:0.45rem;color:#330000;letter-spacing:0.08em;margin:0;line-height:2;">
          WUNNERDEX v1.0 · PROPERTY OF TEAM ROCKET · KANTO DIVISION<br />
          GIOVANNI IS WATCHING · NO SPAM · JUST DROPS AND RAIDS
        </p>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const body = await req.json()
  const { name, email, phone, city, favorite_pokemon, favorite_song, social_handle, want_in_city } = body

  if (!email || !city) {
    return NextResponse.json({ error: 'Email and city are required' }, { status: 400 })
  }

  const { error } = await supabase.from('wunnerdex_signups').insert({
    email,
    phone: phone || null,
    city,
    favorite_pokemon: favorite_pokemon || null,
    favorite_song: favorite_song || null,
    social_handle: social_handle || null,
    want_in_city: want_in_city === 'true' || want_in_city === true,
  })

  if (error) {
    console.error('[wunnerdex] supabase insert error:', JSON.stringify(error))
    if (!error.message.includes('duplicate')) {
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }
  }

  await supabase.from('fans').insert({
    email,
    phone: phone || null,
    city,
    source: 'wunnerdex',
  }).then(() => {})

  console.log('[wunnerdex] RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)
  console.log('[wunnerdex] RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL)

  if (process.env.RESEND_API_KEY) {
    const mgmtHtml = `
      <div style="background:#000;color:#cc0000;padding:40px;font-family:'Courier New',Courier,monospace;max-width:600px;margin:0 auto;">
        <p style="font-size:0.5rem;color:#e3000f;letter-spacing:0.15em;margin:0 0 8px;">// NEW WUNNERDEX ENLISTMENT</p>
        <h1 style="font-size:1.5rem;font-weight:700;color:#e3000f;margin:0 0 24px;">NEW OPERATIVE: ${(name || 'UNKNOWN').toUpperCase()}</h1>
        <table style="width:100%;border-collapse:collapse;font-size:0.65rem;">
          <tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;width:35%;">NAME</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${name || '—'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">EMAIL</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">CITY</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${city}</td></tr>
          ${phone ? `<tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">PHONE</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${phone}</td></tr>` : ''}
          ${favorite_pokemon ? `<tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">POKÉMON</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${favorite_pokemon}</td></tr>` : ''}
          ${social_handle ? `<tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">HANDLE</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;">${social_handle}</td></tr>` : ''}
          ${want_in_city ? `<tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;">WANTS SHOW</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#e3000f;">YES</td></tr>` : ''}
        </table>
      </div>
    `
    const results = await Promise.allSettled([
      sendFanEmail({
        to: MANAGEMENT_EMAIL,
        subject: `🚀 NEW ENLISTMENT — ${name || 'Unknown'} · ${city}`,
        html: mgmtHtml,
      }),
      sendFanEmail({
        to: email,
        subject: 'OPERATIVE REGISTERED — WELCOME TO THE ROCKET RECRUITMENT REGIME',
        html: wunnerdexWelcomeEmail({ name: name || 'OPERATIVE', city }),
      }),
    ])
    console.log('[wunnerdex] email results:', JSON.stringify(results))
  }

  return NextResponse.json({ ok: true, redirect: '/wunnerdex/welcome' })
}

export async function GET() {
  return NextResponse.redirect(new URL('/wunnerdex', process.env.NEXT_PUBLIC_SITE_URL!))
}
