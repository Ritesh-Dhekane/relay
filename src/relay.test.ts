import { describe, expect, it } from 'vitest'
import { buildMessage, emailUrl, whatsappUrl } from './message'
import { checkPhone, validate } from './validate'

describe('phone numbers (E.164)', () => {
  it('accepts Indian mobiles in common formats', () => {
    for (const raw of ['9876543210', '98765 43210', '98765-43210', '+91 98765 43210', '919876543210', '09876543210']) {
      expect(checkPhone(raw, '91')).toEqual({ e164: '+919876543210' })
    }
  })

  it('refuses wrong lengths, letters and invalid starts', () => {
    expect(checkPhone('98765', '91').error).toMatch(/10-digit/)
    expect(checkPhone('5876543210', '91').error).toBeTruthy() // Indian mobiles start 6–9
    expect(checkPhone('98765abcde', '91').error).toMatch(/digits/)
  })

  it('handles other countries', () => {
    expect(checkPhone('2025550123', '1')).toEqual({ e164: '+12025550123' })
    expect(checkPhone('501234567', '971')).toEqual({ e164: '+971501234567' })
    expect(checkPhone('1234', '44').error).toBeTruthy()
  })
})

describe('validate', () => {
  it('allows every field to be empty except that something must be written', () => {
    expect(validate({}).errors.form).toBeTruthy()
    expect(validate({ message: 'Hello' }).errors).toEqual({})
    expect(validate({ email: 'ravi@example.com' }).errors).toEqual({})
  })

  it('checks emails and names when filled', () => {
    expect(validate({ email: 'not-an-email', message: 'x' }).errors.email).toBeTruthy()
    expect(validate({ email: 'Ravi@Example.COM' }).clean.email).toBe('Ravi@example.com')
    expect(validate({ name: 'Ravi 123', message: 'x' }).errors.name).toBeTruthy()
    expect(validate({ name: '  Ravi   Kulkarni ', message: 'x' }).clean.name).toBe('Ravi Kulkarni')
    expect(validate({ name: 'Ä Ñoël-O’Brien', message: 'x' }).errors.name).toBeUndefined()
  })

  it('limits long text', () => {
    expect(validate({ message: 'x'.repeat(1501) }).errors.message).toBeTruthy()
  })
})

describe('message', () => {
  const ctx = { source: 'portfolio', kind: 'contact', page: '/contact?about=3', greeting: 'Hi Ritesh,' }
  const values = validate({
    name: 'Ravi Kulkarni',
    email: 'ravi@punecorp.in',
    phone: '98765 43210',
    topic: 'tracking payments',
    budget: '₹50k–1L',
    message: 'We collect fees by UPI.',
  }).clean

  it('builds a WhatsApp message with bold labels, only filled fields and the flags', () => {
    const text = buildMessage(values, ctx, 'whatsapp')
    expect(text).toBe(
      [
        "Hi Ritesh, I'd like to talk about *tracking payments*.",
        '',
        '*Name:* Ravi Kulkarni',
        '*Email:* ravi@punecorp.in',
        '*Phone:* +919876543210',
        '*Budget:* ₹50k–1L',
        '',
        'We collect fees by UPI.',
        '',
        '— sent via portfolio · contact · /contact?about=3',
      ].join('\n'),
    )
  })

  it('uses plain text for email and encodes the links', () => {
    expect(buildMessage(values, ctx, 'email')).toContain('Name: Ravi Kulkarni')
    expect(whatsappUrl('+91 98765 43210', 'a b&c')).toBe('https://wa.me/919876543210?text=a%20b%26c')
    expect(emailUrl('me@x.in', 'Hi there', 'line1\nline2')).toBe('mailto:me@x.in?subject=Hi%20there&body=line1%0Aline2')
  })
})
