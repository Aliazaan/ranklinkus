import type { ImageName } from '../lib/images'
import type { BusinessAreaValue } from './areas'

export interface Industry {
  slug: string
  index: string
  title: string
  /** One-line description used on cards. */
  summary: string
  overview: string
  capabilities: string[]
  image: ImageName
  area: BusinessAreaValue
}

export const industries: Industry[] = [
  {
    slug: 'textile-manufacturing',
    index: '01',
    title: 'Textile & Manufacturing',
    summary: 'Machinery sourcing and advisory for textile and manufacturing operations.',
    overview:
      "Textile and manufacturing businesses depend on the right machinery, reliably sourced. Dada Sons supports buyers with machinery sourcing, supplier coordination and advisory, working from the production requirement the client defines.",
    capabilities: ['Textile machinery sourcing', 'Equipment procurement', 'Supplier coordination', 'Industrial advisory'],
    image: 'industry-textile',
    area: 'textile-machinery',
  },
  {
    slug: 'security',
    index: '02',
    title: 'Security',
    summary: 'Vehicle protection and security equipment for clients with defined security requirements.',
    overview:
      'Clients with defined security requirements need solutions that are specified carefully and communicated clearly. Armour Tech handles armoured vehicles, bulletproof mirrors and security equipment retrofitting, scoped around the requirement.',
    capabilities: ['Armoured vehicles', 'Bulletproof mirrors', 'Security equipment retrofitting'],
    image: 'industry-security',
    area: 'armoured-vehicles',
  },
  {
    slug: 'automotive',
    index: '03',
    title: 'Automotive',
    summary: 'Vehicle-focused solutions, from armouring and ballistic components to retrofitting.',
    overview:
      'Armour Tech works at the point where vehicles and protection meet: assessing a vehicle, agreeing a scope, and carrying out the armouring and retrofitting that the requirement calls for.',
    capabilities: ['Vehicle armouring', 'Ballistic components', 'Retrofitting', 'Assessment and engineering support'],
    image: 'industry-automotive',
    area: 'armoured-vehicles',
  },
  {
    slug: 'industrial',
    index: '04',
    title: 'Industrial',
    summary: 'Equipment procurement, supplier coordination and advisory for industrial buyers.',
    overview:
      'Industrial buyers often need more than a supplier list. We help structure the requirement, compare options on technical and commercial grounds, and coordinate procurement.',
    capabilities: ['Equipment procurement', 'Supplier coordination', 'Industrial advisory', 'Commercial consultation'],
    image: 'industry-industrial',
    area: 'consulting',
  },
  {
    slug: 'trading-commodities',
    index: '05',
    title: 'Trading & Commodities',
    summary: 'Cotton sourcing and commercial coordination for trade-oriented requirements.',
    overview:
      'Buyers sourcing cotton need clear specifications and dependable communication. Dada Sons coordinates the sourcing and the commercial side of the enquiry.',
    capabilities: ['Cotton sourcing', 'Commercial consultation', 'Sourcing coordination'],
    image: 'industry-trading',
    area: 'cotton-commodities',
  },
]
