// Single source of truth for company facts. Anything marked CONFIRM needs client sign-off.

const envUrl = import.meta.env.VITE_SITE_URL as string | undefined

export const site = {
  name: 'Dada Sons Group',
  shortName: 'Dada Sons',
  // CONFIRM: production domain. dadasons.org is the web address printed on the business card.
  url: (envUrl ?? 'https://dadasons.org').replace(/\/$/, ''),
  tagline: 'Industrial Expertise. Strategic Solutions.',
  altTagline: 'Connecting Industry, Technology and Strategic Expertise.',
  description:
    'Dada Sons Group provides specialized solutions across textile machinery, cotton, consulting, armoured vehicles and security equipment.',
  locale: 'en_GB',
  copyright: '© 2026 Dada Sons Group. All Rights Reserved.',
  phone: { display: '+92 321 4522555', href: 'tel:+923214522555', e164: '+923214522555' },
  email: 'dadasons555@gmail.com',
  // CONFIRM: the business card artwork prints a Lahore address (205/D Block Nespak Society,
  // Phase 1). This is the Islamabad address supplied in the project brief.
  address: {
    lines: ['Plot #151, Industrial Area', 'Kahuta Road', 'Humak Model Town', 'Islamabad, Pakistan'],
    street: 'Plot #151, Industrial Area, Kahuta Road',
    area: 'Humak Model Town',
    city: 'Islamabad',
    region: 'Islamabad Capital Territory',
    country: 'PK',
    countryName: 'Pakistan',
  },
  ceo: {
    name: 'Muhammad Asif Bhati',
    title: 'Chief Executive Officer',
    shortTitle: 'CEO',
  },
} as const

export const addressOneLine = site.address.lines.join(', ')

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`

export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '/' : path}`
