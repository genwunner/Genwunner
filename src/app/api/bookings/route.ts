import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { sendFanEmail } from '@/lib/resend'

const MANAGEMENT_EMAIL = process.env.MANAGEMENT_EMAIL || 'genwunnermgmt@gmail.com'

function bookingNotificationEmail(data: Record<string, string | null | undefined>) {
  const rows = [
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Event City', data.event_city],
    ['Event Date', data.event_date],
    ['Venue', data.venue],
    ['Event Type', data.event_type],
    ['Budget', data.budget],
    ['Expected Attendance', data.expected_attendance],
    ['Performance Length', data.performance_length],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px;border-bottom:1px solid #1a0000;color:#550000;font-size:0.6rem;letter-spacing:0.06em;width:40%;text-transform:uppercase;">${k}</td><td style="padding:8px;border-bottom:1px solid #1a0000;color:#cc0000;font-size:0.65rem;">${v}</td></tr>`)
    .join('')

  return `
    <div style="background:#000;color:#cc0000;padding:40px;font-family:'Courier New',Courier,monospace;max-width:600px;margin:0 auto;">
      <div style="border-bottom:1px solid #1a0000;padding-bottom:20px;margin-bottom:24px;">
        <p style="font-size:0.45rem;color:#e3000f;letter-spacing:0.15em;margin:0 0 8px;">// INCOMING DEPLOYMENT REQUEST</p>
        <h1 style="font-size:1.5rem;font-weight:700;color:#e3000f;letter-spacing:0.06em;text-transform:uppercase;margin:0;">
          NEW REQUEST: ${(data.name || '').toUpperCase()} · ${(data.event_city || '').toUpperCase()}
        </h1>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      ${data.message ? `<div style="margin-top:20px;padding:16px;border:1px solid #1a0000;font-size:0.65rem;color:#880000;line-height:1.8;">${data.message}</div>` : ''}
      <div style="margin-top:24px;border-top:1px solid #1a0000;padding-top:16px;">
        <p style="font-size:0.45rem;color:#330000;letter-spacing:0.08em;margin:0;">ROCKET RECRUITMENT REGIME · KANTO DIVISION · BOOKING SYSTEM</p>
      </div>
    </div>
  `
}

function bookingConfirmationEmail({ name, event_city, event_type }: { name: string; event_city: string; event_type: string }) {
  return `
    <div style="background:#000;color:#cc0000;padding:40px;font-family:'Courier New',Courier,monospace;max-width:600px;margin:0 auto;">
      <div style="border-bottom:1px solid #1a0000;padding-bottom:20px;margin-bottom:24px;">
        <p style="font-size:0.45rem;color:#e3000f;letter-spacing:0.15em;margin:0 0 8px;">// ROCKET RECRUITMENT REGIME · KANTO DIVISION</p>
        <h1 style="font-size:1.8rem;font-weight:700;color:#e3000f;letter-spacing:0.06em;text-transform:uppercase;margin:0;line-height:1.1;">
          REQUEST RECEIVED
        </h1>
      </div>

      <p style="font-size:0.75rem;color:#880000;letter-spacing:0.06em;margin:0 0 20px;">
        OPERATIVE: <span style="color:#cc0000;">${name.toUpperCase()}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        TERRITORY: <span style="color:#cc0000;">${event_city.toUpperCase()}</span>
      </p>

      <p style="font-size:0.75rem;color:#770000;line-height:2;margin:0 0 24px;">
        Your deployment request has been received and forwarded to management.
        Giovanni has been notified. Expect a response within 48 hours.
      </p>

      <div style="border:1px solid #1a0000;padding:20px;margin-bottom:24px;">
        <p style="font-size:0.5rem;color:#e3000f;letter-spacing:0.12em;margin:0 0 12px;">// REQUEST SUMMARY</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.65rem;">
          <tr><td style="padding:6px 0;color:#550000;">Mission Type</td><td style="padding:6px 0;color:#cc0000;">${event_type}</td></tr>
          <tr><td style="padding:6px 0;color:#550000;">Target Territory</td><td style="padding:6px 0;color:#cc0000;">${event_city}</td></tr>
        </table>
      </div>

      <div style="border:1px solid #1a0000;padding:20px;margin-bottom:24px;">
        <p style="font-size:0.5rem;color:#e3000f;letter-spacing:0.12em;margin:0 0 12px;">// WHAT HAPPENS NEXT</p>
        <ul style="list-style:none;padding:0;margin:0;font-size:0.65rem;color:#880000;line-height:2.2;">
          <li>▶ Management reviews your request</li>
          <li>▶ Response within 48 hours</li>
          <li>▶ Final details coordinated directly</li>
          <li>▶ Deployment confirmed in writing</li>
        </ul>
      </div>

      <p style="font-size:0.65rem;color:#550000;line-height:2;margin:0 0 24px;">
        Urgent? Transmit directly to management:<br />
        <a href="mailto:genwunnermgmt@gmail.com" style="color:#e3000f;">genwunnermgmt@gmail.com</a>
      </p>

      <div style="border-top:1px solid #1a0000;padding-top:20px;">
        <p style="font-size:0.45rem;color:#330000;letter-spacing:0.08em;margin:0;line-height:2;">
          ROCKET RECRUITMENT REGIME · KANTO DIVISION · BOOKING SYSTEM<br />
          THIS IS AN AUTOMATED TRANSMISSION — DO NOT REPLY
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

  console.log('[bookings] RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)
  console.log('[bookings] RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL)

  if (process.env.RESEND_API_KEY) {
    const results = await Promise.allSettled([
      sendFanEmail({
        to: MANAGEMENT_EMAIL,
        subject: `⚡ NEW DEPLOYMENT REQUEST — ${name} · ${event_city}`,
        html: bookingNotificationEmail({ name, company, email, phone, event_city, event_date, venue, event_type, budget, expected_attendance, performance_length, message }),
      }),
      sendFanEmail({
        to: email,
        subject: 'DEPLOYMENT REQUEST RECEIVED — ROCKET RECRUITMENT REGIME',
        html: bookingConfirmationEmail({ name, event_city, event_type }),
      }),
    ])
    console.log('[bookings] email results:', JSON.stringify(results))
  }

  return NextResponse.json({ ok: true, redirect: '/book/thank-you' })
}
