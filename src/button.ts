// <relay-button>: a floating button (bottom right) that opens <relay-form> in a pop-up (a bottom sheet on
// phones). Takes the same attributes as <relay-form>, plus `label` (default "Let's talk").
// Relay.open({ topic, kind }) opens the pop-up from anywhere, e.g. a "Talk about this" link.
import type { RelayForm } from './form'
import { buttonCss } from './styles'

const FORWARD = ['source', 'kind', 'fields', 'whatsapp', 'email', 'topic', 'greeting', 'subject', 'heading', 'intro']
const ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z"/></svg>'

export class RelayButton extends HTMLElement {
  private root = this.attachShadow({ mode: 'open' })

  connectedCallback() {
    const label = this.getAttribute('label') || "Let's talk"
    this.root.innerHTML = `<style>${buttonCss}</style>
      <button class="fab" type="button" aria-haspopup="dialog" aria-label="${label}">${ICON}<span class="text">${label}</span></button>
      <dialog aria-label="${this.getAttribute('heading') || label}">
        <button class="close" type="button" aria-label="Close">×</button>
      </dialog>`
    this.root.querySelector('.fab')!.addEventListener('click', () => this.open())
    const dialog = this.root.querySelector('dialog')!
    this.root.querySelector('.close')!.addEventListener('click', () => dialog.close())
    // Click on the backdrop closes it.
    dialog.addEventListener('click', (e) => e.target === dialog && dialog.close())
  }

  /** Opens the pop-up with a fresh form; overrides (e.g. topic) win over the element's attributes. */
  open(overrides: Record<string, string | undefined> = {}) {
    const dialog = this.root.querySelector('dialog')
    if (!dialog) return
    dialog.querySelector('relay-form')?.remove()
    const form = document.createElement('relay-form') as RelayForm
    for (const name of FORWARD) {
      const value = overrides[name] ?? this.getAttribute(name)
      if (value) form.setAttribute(name, value)
    }
    dialog.append(form)
    dialog.showModal()
    form.focusFirst()
    this.dispatchEvent(
      new CustomEvent('relay:open', {
        bubbles: true,
        composed: true,
        detail: { source: form.getAttribute('source'), kind: form.getAttribute('kind') },
      }),
    )
  }
}
