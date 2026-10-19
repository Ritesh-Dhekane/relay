// Turns the form into a ready-to-send message for WhatsApp (with *bold*) or email (plain text).
import type { Values } from './validate'

export interface MessageContext {
  source: string
  kind: string
  page: string // path and query, never the full URL
  greeting?: string // e.g. "Hi Ritesh,"
}

type Clean = Values & { phoneE164?: string }

export function buildMessage(values: Clean, ctx: MessageContext, channel: 'whatsapp' | 'email'): string {
  const b = (text: string) => (channel === 'whatsapp' ? `*${text}*` : text)
  const lines: string[] = []
  const opening = [ctx.greeting || 'Hello,', values.topic ? `I'd like to talk about ${b(values.topic)}.` : '']
  lines.push(opening.filter(Boolean).join(' '))

  const details: [string, string | undefined][] = [
    ['Name', values.name],
    ['Company', values.company],
    ['Email', values.email],
    ['Phone', values.phoneE164],
    ['Budget', values.budget],
    ['Timeline', values.timeline],
  ]
  const filled = details.filter(([, v]) => v)
  if (filled.length) lines.push('', ...filled.map(([label, v]) => `${b(`${label}:`)} ${v}`))
  if (values.message) lines.push('', values.message)
  // Internal flags: where the message came from.
  lines.push('', `— sent via ${ctx.source} · ${ctx.kind} · ${ctx.page}`)
  return lines.join('\n')
}

export function whatsappUrl(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

export function emailUrl(address: string, subject: string, text: string): string {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
