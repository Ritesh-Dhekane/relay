// Field rules. Every field is optional, but anything filled in must be in a standard format.

export interface Country {
  code: string // dialling code without "+"
  label: string
  /** Allowed length of the national number (digits after the country code). */
  digits: [number, number]
  /** Extra rule for the national number, e.g. Indian mobiles start with 6–9. */
  pattern?: RegExp
}

// Common countries for clients in India; E.164 caps the full number at 15 digits.
export const COUNTRIES: Country[] = [
  { code: '91', label: 'India', digits: [10, 10], pattern: /^[6-9]/ },
  { code: '1', label: 'US / Canada', digits: [10, 10], pattern: /^[2-9]/ },
  { code: '44', label: 'UK', digits: [10, 10] },
  { code: '971', label: 'UAE', digits: [8, 9] },
  { code: '966', label: 'Saudi Arabia', digits: [9, 9] },
  { code: '974', label: 'Qatar', digits: [8, 8] },
  { code: '61', label: 'Australia', digits: [9, 9] },
  { code: '65', label: 'Singapore', digits: [8, 8] },
  { code: '49', label: 'Germany', digits: [7, 12] },
  { code: '977', label: 'Nepal', digits: [8, 10] },
]

export const LIMITS = { name: 80, company: 100, topic: 120, message: 1500, email: 254 }

// The WHATWG email rule (what browsers use for type="email"), plus a dot in the domain.
const EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
// Letters (any language), spaces and . ' ’ - ; must start with a letter. (Phones type the curly ’.)
const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u

export type Values = Partial<Record<'name' | 'email' | 'company' | 'topic' | 'budget' | 'timeline' | 'message', string>> & {
  phone?: string
  country?: string
}
export type Errors = Partial<Record<keyof Values | 'form', string>>

const clean = (v: string | undefined) => (v ?? '').trim()

/** "+91 98765-43210" -> { e164: "+919876543210" } or an error message. */
export function checkPhone(raw: string, countryCode: string): { e164?: string; error?: string } {
  const digits = raw.replace(/[\s().-]/g, '').replace(/^\+?0*/, '')
  if (!digits) return {}
  if (!/^\d+$/.test(digits)) return { error: 'Use digits only.' }
  const country = COUNTRIES.find((c) => c.code === countryCode)
  if (!country) return { error: 'Pick a country code.' }
  // Someone may type the country code again: "91 98765 43210".
  const national =
    digits.length > country.digits[1] && digits.startsWith(country.code) ? digits.slice(country.code.length) : digits
  const [min, max] = country.digits
  if (national.length < min || national.length > max) {
    return { error: min === max ? `Enter a ${min}-digit number.` : `Enter ${min}–${max} digits.` }
  }
  if (country.pattern && !country.pattern.test(national)) return { error: 'This doesn’t look like a valid number.' }
  if (country.code.length + national.length > 15) return { error: 'This number is too long.' }
  return { e164: `+${country.code}${national}` }
}

/** Checks every filled-in field. Nothing is required, but the form can't be empty. */
export function validate(values: Values): { errors: Errors; clean: Values & { phoneE164?: string } } {
  const errors: Errors = {}
  const out: Values & { phoneE164?: string } = {}
  const name = clean(values.name)
  if (name) {
    if (name.length < 2 || name.length > LIMITS.name || !NAME.test(name)) errors.name = 'Use letters only (2–80).'
    else out.name = name.replace(/\s+/g, ' ')
  }
  const email = clean(values.email)
  if (email) {
    if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = 'Enter an email like name@example.com.'
    else {
      const at = email.lastIndexOf('@')
      out.email = email.slice(0, at) + email.slice(at).toLowerCase()
    }
  }
  if (clean(values.phone)) {
    const phone = checkPhone(clean(values.phone), values.country || '91')
    if (phone.error) errors.phone = phone.error
    else out.phoneE164 = phone.e164
  }
  for (const key of ['company', 'topic'] as const) {
    const v = clean(values[key])
    if (v.length > LIMITS[key]) errors[key] = `Keep it under ${LIMITS[key]} characters.`
    else if (v) out[key] = v
  }
  for (const key of ['budget', 'timeline'] as const) if (clean(values[key])) out[key] = clean(values[key])
  const message = clean(values.message)
  if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`
  else if (message) out.message = message
  if (!out.message && !out.email && !out.phoneE164 && !Object.keys(errors).length) {
    errors.form = 'Write a message, or leave an email or phone number so I can reply.'
  }
  return { errors, clean: out }
}
