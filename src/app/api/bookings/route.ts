import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { sendFanEmail } from '@/lib/resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, email, phone, event_city, event_date, venue, event_type, budget, expected_attendance, performance_length, message } = body

  if (!name || !email || !event_city || !event_type || !budget) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await supabase.from('bookings').insert({
    name, company: company || null, email, phone: phone || null,
    event_city, event_date: event_date || null, venue: venue || null,
    event_type, budget, expected_attendance: expected_attendance || null,
    performance_length: performance_length || null, message: message || null,
    status: 'new',
  })

  if (error) {
    console.error('Booking insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  // Notify management
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    await sendFanEmail({
      to: 'genwunnermgmt@gmail.com',
      subject: `New Booking Inquiry from ${name} (${event_city})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="margin-bottom:16px;">New Booking Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${Object.entries({ name, company, email, phone, event_city, event_date, venue, event_type, budget, expected_attendance, performance_length }).map(([k, v]) =>
              v ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;width:40%">${k.replace(/_/g, ' ')}</td><td style="padding:8px;border-bottom:1px solid #eee;">${v}</td></tr>` : ''
            ).join('')}
          </table>
          ${message ? `<div style="margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px;font-size:14px;">${message}</div>` : ''}
        </div>
      `,
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
