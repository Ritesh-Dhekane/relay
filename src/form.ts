// <relay-form>: the form itself. Attributes:
//   source, kind          internal flags added to the message (e.g. "portfolio", "contact")
//   fields                which fields to show, in order: name,email,phone,company,topic,budget,timeline,message
//   whatsapp, email       where messages go; each shows its own send button
//   topic                 pre-fills the topic ("Talk about this")
//   greeting              first words of the message (default "Hello,")
//   subject               email subject (topic is appended)
//   heading, intro        optional title and line above the form
// Events (bubble out of the shadow DOM): relay:send { channel, source, kind } — never the form's contents.
import { buildMessage, emailUrl, whatsappUrl } from './message'
import { css } from './styles'
import { COUNTRIES, LIMITS, validate, type Errors, type Values } from './validate'

const BUDGETS = ['Under ₹25k', '₹25k–50k', '₹50k–1L', '₹1L–3L', '₹3L+', 'Not sure yet']
const TIMELINES = ['As soon as possible', 'Within a month', '1–3 months', 'Just exploring']
const DEFAULT_FIELDS = 'name,email,phone,message'

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`)
// The label's text sits in one span, so "(optional)" stays on the same line as the label.
const lbl = (text: string) => `<span part="label-text">${text} <span class="opt" part="optional">(optional)</span></span>`

function fieldHtml(key: string, topic: string): string {
  switch (key) {
    case 'name':
      return `<label part="label">${lbl('Name')}<input part="input" name="name" autocomplete="name" maxlength="${LIMITS.name}"><span class="err" part="error" id="e-name"></span></label>`
    case 'email':
      return `<label part="label">${lbl('Email')}<input part="input" name="email" type="email" autocomplete="email" inputmode="email" maxlength="${LIMITS.email}" placeholder="name@example.com"><span class="err" part="error" id="e-email"></span></label>`
    case 'phone':
      return `<label part="label">${lbl('Phone / WhatsApp')}<span class="phone">
        <select part="input select" name="country" aria-label="Country code">${COUNTRIES.map((c) => `<option value="${c.code}">+${c.code} ${c.label}</option>`).join('')}</select>
        <input part="input" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" maxlength="20" placeholder="98765 43210">
      </span><span class="err" part="error" id="e-phone"></span></label>`
    case 'company':
      return `<label part="label">${lbl('Company')}<input part="input" name="company" autocomplete="organization" maxlength="${LIMITS.company}"><span class="err" part="error" id="e-company"></span></label>`
    case 'topic':
      return `<label part="label">${lbl('What’s it about?')}<input part="input" name="topic" maxlength="${LIMITS.topic}" value="${esc(topic)}" placeholder="e.g. a booking website"><span class="err" part="error" id="e-topic"></span></label>`
    case 'budget':
      return `<label part="label">${lbl('Budget')}<select part="input select" name="budget"><option value="">Choose…</option>${BUDGETS.map((b) => `<option>${b}</option>`).join('')}</select></label>`
    case 'timeline':
      return `<label part="label">${lbl('Timeline')}<select part="input select" name="timeline"><option value="">Choose…</option>${TIMELINES.map((t) => `<option>${t}</option>`).join('')}</select></label>`
    case 'message':
      return `<label part="label">${lbl('Message')}<textarea part="input textarea" name="message" maxlength="${LIMITS.message}" placeholder="A few lines about what you need"></textarea><span class="count" part="counter" aria-live="polite"></span><span class="err" part="error" id="e-message"></span></label>`
    default:
      return ''
  }
}

// Pairs that sit side by side on wider screens.
const PAIRS = new Set(['name+email', 'budget+timeline', 'company+topic'])

export class RelayForm extends HTMLElement {
  static observedAttributes = ['fields', 'whatsapp', 'email', 'topic', 'heading', 'intro']
  private root = this.attachShadow({ mode: 'open' })

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render()
  }

  // Not called `fields`: React 19 sets custom-element props as properties when a property of that name exists.
  private get fieldList() {
    return (this.getAttribute('fields') || DEFAULT_FIELDS).split(',').map((f) => f.trim()).filter(Boolean)
  }

  render() {
    const fields = this.fieldList
    const topic = this.getAttribute('topic') || ''
    const parts: string[] = []
    for (let i = 0; i < fields.length; i++) {
      const pair = `${fields[i]}+${fields[i + 1]}`
      if (PAIRS.has(pair)) {
        parts.push(`<div class="row">${fieldHtml(fields[i], topic)}${fieldHtml(fields[i + 1], topic)}</div>`)
        i++
      } else parts.push(fieldHtml(fields[i], topic))
    }
    const wa = this.getAttribute('whatsapp')
    const em = this.getAttribute('email')
    const heading = this.getAttribute('heading')
    const intro = this.getAttribute('intro')
    this.root.innerHTML = `<style>${css}</style>
      <form novalidate part="form">
        ${heading ? `<h2 part="heading">${esc(heading)}</h2>` : ''}
        ${intro ? `<p class="intro" part="intro">${esc(intro)}</p>` : ''}
        ${parts.join('')}
        <input class="sr" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="err" part="error form-error" id="e-form" role="alert"></p>
        <div class="actions" part="actions">
          ${wa ? '<button type="submit" class="primary" part="button primary" value="whatsapp">Send on WhatsApp</button>' : ''}
          ${em ? `<button type="submit" class="${wa ? 'secondary' : 'primary'}" part="button ${wa ? 'secondary' : 'primary'}" value="email">Send by email</button>` : ''}
        </div>
        <p class="note" part="note">Opens ${wa && em ? 'WhatsApp or your email app' : wa ? 'WhatsApp' : 'your email app'} with your message ready — just press Send.</p>
      </form>`
    const form = this.root.querySelector('form')!
    form.addEventListener('submit', (event) => this.send(event as SubmitEvent))
    form.addEventListener('input', (event) => this.clearError(event.target as HTMLElement))
    this.updateCount()
  }

  /** Focus the first field (used by the pop-up). */
  focusFirst() {
    this.root.querySelector<HTMLElement>('input:not(.sr), select, textarea')?.focus()
  }

  private values(): Values {
    const data = new FormData(this.root.querySelector('form')!)
    const get = (k: string) => (data.get(k) as string | null) ?? undefined
    return {
      name: get('name'), email: get('email'), phone: get('phone'), country: get('country'), company: get('company'),
      topic: get('topic'), budget: get('budget'), timeline: get('timeline'), message: get('message'),
    }
  }

  private showErrors(errors: Errors) {
    for (const el of this.root.querySelectorAll<HTMLElement>('.err')) el.textContent = ''
    for (const el of this.root.querySelectorAll('[aria-invalid]')) el.removeAttribute('aria-invalid')
    for (const [key, text] of Object.entries(errors)) {
      const out = this.root.getElementById(`e-${key}`)
      if (out) out.textContent = text ?? ''
      const input = this.root.querySelector(`[name="${key}"]`)
      if (input) {
        input.setAttribute('aria-invalid', 'true')
        input.setAttribute('aria-describedby', `e-${key}`)
      }
    }
    const first = this.root.querySelector<HTMLElement>('[aria-invalid="true"]')
    first?.focus()
  }

  private clearError(target: HTMLElement) {
    const name = target.getAttribute('name')
    if (name === 'message') this.updateCount()
    if (!name) return
    target.removeAttribute('aria-invalid')
    const out = this.root.getElementById(`e-${name}`)
    if (out) out.textContent = ''
    const formError = this.root.getElementById('e-form')
    if (formError) formError.textContent = ''
  }

  private updateCount() {
    const area = this.root.querySelector<HTMLTextAreaElement>('textarea[name="message"]')
    const counter = this.root.querySelector('.count')
    if (area && counter) counter.textContent = area.value.length > LIMITS.message * 0.7 ? `${area.value.length}/${LIMITS.message}` : ''
  }

  private send(event: SubmitEvent) {
    event.preventDefault()
    const form = this.root.querySelector('form')!
    if ((new FormData(form).get('website') as string)?.trim()) return // bots fill the hidden field
    const { errors, clean } = validate(this.values())
    if (Object.keys(errors).length) return this.showErrors(errors)

    const channel = (event.submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp'
    const source = this.getAttribute('source') || location.hostname
    const kind = this.getAttribute('kind') || 'contact'
    const ctx = { source, kind, page: location.pathname + location.search, greeting: this.getAttribute('greeting') || undefined }
    const text = buildMessage(clean, ctx, channel)
    if (channel === 'whatsapp') {
      window.open(whatsappUrl(this.getAttribute('whatsapp') || '', text), '_blank', 'noopener')
    } else {
      const subject = (this.getAttribute('subject') || 'Message') + (clean.topic ? `: ${clean.topic}` : '')
      location.href = emailUrl(this.getAttribute('email') || '', subject, text)
    }
    this.dispatchEvent(new CustomEvent('relay:send', { bubbles: true, composed: true, detail: { channel, source, kind } }))
    this.showDone(channel, text)
  }

  private showDone(channel: string, text: string) {
    const app = channel === 'whatsapp' ? 'WhatsApp' : 'your email app'
    this.root.innerHTML = `<style>${css}</style>
      <div class="done" part="done" role="status">
        <h2 part="heading">Almost there ✓</h2>
        <p>${app} should have opened with your message. Press <strong>Send</strong> there and I'll reply soon.</p>
        <p>Didn't open? <button class="link" part="link" data-copy>Copy the message</button> <button class="link" part="link" data-back>Edit and try again</button></p>
      </div>`
    this.root.querySelector('[data-copy]')?.addEventListener('click', async (e) => {
      try {
        await navigator.clipboard.writeText(text)
        ;(e.target as HTMLElement).textContent = 'Copied ✓'
      } catch {
        ;(e.target as HTMLElement).textContent = 'Copy failed'
      }
    })
    this.root.querySelector('[data-back]')?.addEventListener('click', () => this.render())
  }
}
