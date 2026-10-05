import { businessAreas } from '../data/areas'
import { site } from '../config/site'
import type { EnquiryValues } from './validation'

export type EnquiryResult =
  | { ok: true; mode: 'sent' | 'mailto'; mailto?: string }
  | { ok: false; error: string }

// TODO: Connect form to Resend / Formspree / custom API.
// Set VITE_ENQUIRY_ENDPOINT (e.g. https://formspree.io/f/xxxxxxx) and enquiries are POSTed
// there as JSON. Until an endpoint exists nothing is sent by this site: the form falls back
// to composing an email in the visitor's own mail app, and the UI says so plainly.
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT

const areaLabel = (value: string) => businessAreas.find((a) => a.value === value)?.label ?? value

export function buildMailto(values: EnquiryValues): string {
  const subject = `Website enquiry — ${areaLabel(values.area)}`
  const lines = [`Name: ${values.name.trim()}`]
  if (values.company.trim()) lines.push(`Company: ${values.company.trim()}`)
  lines.push(`Email: ${values.email.trim()}`)
  if (values.phone.trim()) lines.push(`Phone: ${values.phone.trim()}`)
  lines.push(`Business area: ${areaLabel(values.area)}`, '', values.message.trim())

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export async function submitEnquiry(values: EnquiryValues): Promise<EnquiryResult> {
  // Honeypot: bots fill hidden fields. Report success and discard.
  if (values.website.trim()) return { ok: true, mode: 'sent' }

  if (!endpoint) {
    const mailto = buildMailto(values)
    window.location.href = mailto
    return { ok: true, mode: 'mailto', mailto }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...values, area: areaLabel(values.area), website: undefined }),
    })
    if (!response.ok) throw new Error(`Enquiry endpoint responded with ${response.status}`)
    return { ok: true, mode: 'sent' }
  } catch {
    return {
      ok: false,
      error: `We could not send your enquiry just now. Please try again, or email ${site.email} directly.`,
    }
  }
}
