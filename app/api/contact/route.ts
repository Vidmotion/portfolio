import nodemailer from 'nodemailer'
import { createHash } from 'node:crypto'
import { identity } from '@/core/registries/identity'
import { opportunities, contactText, type ContactKind } from '@/core/registries/contact'

export const runtime = 'nodejs'
const attempts = new Map<string, { count: number; until: number }>()
const MAX_BYTES = 16000
const reply = (status: number) =>
  Response.json({ ok: status === 200 }, { status, headers: { 'Cache-Control': 'no-store' } })
const singleLine = (value: unknown, max: number) =>
  typeof value === 'string' && value.length <= max && !/[\r\n\u0000]/.test(value)
    ? value.trim()
    : ''

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const expected = process.env.CONTACT_ORIGIN ?? 'https://portfolio.carlodesantis.com'
  if (
    !origin ||
    (origin !== expected &&
      !(
        process.env.NODE_ENV !== 'production' &&
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ))
  )
    return reply(403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415)
  if (Number(request.headers.get('content-length')) > MAX_BYTES) return reply(413)
  // Bounded streaming read also rejects requests without a truthful Content-Length.
  let body: Record<string, unknown>
  try {
    const reader = request.body?.getReader()
    if (!reader) return reply(400)
    const parts: Uint8Array[] = []
    let size = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) {
        await reader.cancel()
        return reply(413)
      }
      parts.push(value)
    }
    const parsed = JSON.parse(Buffer.concat(parts).toString('utf8'))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reply(400)
    body = parsed
  } catch {
    return reply(400)
  }
  // Honeypot: never send or claim successful delivery for bot submissions.
  if (body.website) return reply(400)
  const kind = body.kind as ContactKind
  if (kind !== 'company' && kind !== 'professional') return reply(400)
  const locale = body.locale === 'it' ? 'it' : 'en'
  const name = singleLine(body.name, 100),
    email = singleLine(body.email, 254)
  const organization = singleLine(body.organization, 160),
    profession = singleLine(body.profession, 160)
  const opportunity = opportunities[kind]?.find((option) => option.id === body.opportunity)
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const portfolio = singleLine(body.portfolio, 500),
    budget = singleLine(body.budget, 120)
  const timing = singleLine(body.timing, 1)
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !opportunity ||
    message.length < 20 ||
    message.length > 5000 ||
    message.includes('\u0000') ||
    (kind === 'company' && !organization)
  )
    return reply(400)
  if ((portfolio && !/^https?:\/\//i.test(portfolio)) || (timing && !/^[0-3]$/.test(timing)))
    return reply(400)
  const now = Date.now()
  for (const [key, item] of attempts) if (item.until < now) attempts.delete(key)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const key = createHash('sha256').update(ip).digest('hex')
  const attempt = attempts.get(key)
  if (attempt && attempt.count >= 4)
    return new Response(null, {
      status: 429,
      headers: { 'Retry-After': String(Math.max(1, Math.ceil((attempt.until - now) / 1000))) },
    })
  if (!attempt && attempts.size >= 2000) return reply(429)
  const user = process.env.SMTP_USER ?? identity.email,
    pass = process.env.SMTP_PASSWORD
  if (!pass) return reply(503)
  attempts.set(key, {
    count: (attempt?.count ?? 0) + 1,
    until: attempt?.until ?? now + 15 * 60 * 1000,
  })
  const port = Number(process.env.SMTP_PORT ?? '465')
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtps.aruba.it',
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
    tls: { minVersion: 'TLSv1.2' },
  })
  const labels = contactText[locale]
  const text = [
    `Portfolio OS — ${labels[kind]}`,
    `${labels.name}: ${name}`,
    `${labels.email}: ${email}`,
    kind === 'company'
      ? `${labels.organization}: ${organization}`
      : `${labels.profession}: ${profession || '—'}`,
    `${labels.opportunity}: ${opportunity[locale]}`,
    `${labels.timing}: ${timing ? labels.timingOptions[Number(timing)] : '—'}`,
    kind === 'company'
      ? `${labels.budget}: ${budget || '—'}`
      : `${labels.portfolio}: ${portfolio || '—'}`,
    '',
    labels.message,
    message,
  ].join('\n')
  try {
    const result = await transport.sendMail({
      from: { name: 'Portfolio OS', address: user },
      to: identity.email,
      replyTo: { name, address: email },
      subject: `[Portfolio · ${kind === 'company' ? 'Azienda' : 'Professionista'}] ${opportunity.it} — ${name}`,
      text,
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    return reply(result.accepted.length > 0 ? 200 : 502)
  } catch {
    // Never log SMTP credentials, message contents or visitors' contact details.
    console.error('Contact delivery failed')
    return reply(502)
  } finally {
    transport.close()
  }
}
