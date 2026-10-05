import type { ImageName } from '../lib/images'

export type BusinessSlug = 'dada-sons' | 'armour-tech'

export interface Business {
  slug: BusinessSlug
  path: string
  name: string
  /** Short alternate name, shown next to the main name where useful. */
  alias?: string
  index: string
  summary: string
  overview: string
  capabilities: string[]
  cardImage: ImageName
  heroImage: ImageName
  cta: string
}

export const businesses: Business[] = [
  {
    slug: 'dada-sons',
    path: '/businesses/dada-sons',
    name: 'Dada Sons',
    index: '01',
    summary: 'Industrial sourcing, textile machinery and strategic advisory solutions.',
    overview:
      "Dada Sons supports textile and industrial buyers with machinery sourcing, cotton and commodity coordination, and practical advisory. We work from the client's requirement, not from a catalogue.",
    capabilities: ['Textile Machinery', 'Cotton', 'Consulting'],
    cardImage: 'business-dada-sons',
    heroImage: 'hero-dada-sons',
    cta: 'Explore Dada Sons',
  },
  {
    slug: 'armour-tech',
    path: '/businesses/armour-tech',
    name: 'Armour Tech',
    alias: 'AAT',
    index: '02',
    summary: 'Specialized vehicle protection and security equipment solutions.',
    overview:
      "Armour Tech (AAT) is the group's security-focused division, covering armoured vehicles, bulletproof mirrors and the retrofitting of security equipment, scoped around each client's requirement.",
    capabilities: ['Armoured Vehicles', 'Bulletproof Mirrors', 'Security Retrofitting'],
    cardImage: 'business-armour-tech',
    heroImage: 'hero-armour-tech',
    cta: 'Explore Armour Tech',
  },
]

export const getBusiness = (slug: BusinessSlug): Business => {
  const business = businesses.find((b) => b.slug === slug)
  if (!business) throw new Error(`Unknown business: ${slug}`)
  return business
}
