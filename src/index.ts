// Relay: a drop-in contact / feedback form. Include the script once, then use <relay-form> or
// <relay-button> anywhere. See README.md.
import { RelayButton } from './button'
import { RelayForm } from './form'

if (!customElements.get('relay-form')) customElements.define('relay-form', RelayForm)
if (!customElements.get('relay-button')) customElements.define('relay-button', RelayButton)

/** Opens the first <relay-button>'s pop-up, e.g. Relay.open({ topic: 'tracking payments' }). */
export function open(overrides: Record<string, string | undefined> = {}) {
  const button = document.querySelector<RelayButton>('relay-button')
  if (!button) return false
  button.open(overrides)
  return true
}

export const version = '1.1.0'
export { RelayButton, RelayForm }
