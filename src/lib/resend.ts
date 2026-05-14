import { Resend } from 'resend'

export async function sendFanEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}) {
  if (!process.env.RESEND_API_KEY) return
  const resend = new Resend(process.env.RESEND_API_KEY)
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'noreply@genwunner.com',
    to,
    subject,
    html,
  })
}
