import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'transmissions@genwunner.com'

export async function sendFanEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return resend.emails.send({ from: FROM, to, subject, html })
}
