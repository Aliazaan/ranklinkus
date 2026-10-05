import type { ImageName } from '../lib/images'
import type { BusinessAreaValue } from './areas'
import type { BusinessSlug } from './businesses'

export interface Solution {
  /** Doubles as the in-page anchor and, later, the slug of a dedicated SEO landing page. */
  slug: string
  index: string
  division: BusinessSlug
  title: string
  summary: string
  overview: string
  includes: string[]
  image: ImageName
  imageAlt: string
  area: BusinessAreaValue
}

export const solutions: Solution[] = [
  {
    slug: 'textile-machinery',
    index: '01',
    division: 'dada-sons',
    title: 'Textile Machinery',
    summary: "Machinery sourcing and procurement support, matched to the client's production requirement.",
    overview:
      'We help textile and manufacturing clients identify, compare and source machinery for a defined requirement, coordinating with suppliers from enquiry through to delivery. Dada Sons acts as a sourcing and procurement partner.',
    includes: [
      'Machinery sourcing against a written requirement',
      'Equipment procurement and supplier coordination',
      'Technical and commercial comparison of options',
      'Continued communication after delivery',
    ],
    image: 'solution-textile-machinery',
    imageAlt: 'Spinning frames carrying rows of white yarn bobbins inside a textile mill',
    area: 'textile-machinery',
  },
  {
    slug: 'cotton-sourcing',
    index: '02',
    division: 'dada-sons',
    title: 'Cotton Sourcing',
    summary: "Cotton sourcing and commercial coordination built around the buyer's specification.",
    overview:
      'For buyers who need cotton, we coordinate the sourcing and the commercial side of the transaction around the quality, quantity and delivery requirements the buyer defines.',
    includes: [
      "Sourcing against the buyer's specification",
      'Commercial coordination and clear communication',
      'Support on quantity, quality and delivery requirements',
      'Advisory on sourcing options',
    ],
    image: 'solution-cotton',
    imageAlt: 'Rows of cotton plants stretching to the horizon',
    area: 'cotton-commodities',
  },
  {
    slug: 'industrial-consulting',
    index: '03',
    division: 'dada-sons',
    title: 'Industrial Consulting',
    summary: 'Practical advisory for clients assessing an industrial or commercial decision.',
    overview:
      'Before committing to equipment, suppliers or a new requirement, clients often want an experienced second view. We provide advisory support on industrial, sourcing and commercial questions.',
    includes: [
      'Requirement review and scoping',
      'Supplier and option assessment',
      'Commercial and procurement guidance',
      'Strategic input on industrial decisions',
    ],
    image: 'solution-consulting',
    imageAlt: 'Technical drawings, a sketchbook and drafting tools on a desk',
    area: 'consulting',
  },
  {
    slug: 'armoured-vehicles',
    index: '04',
    division: 'armour-tech',
    title: 'Armoured Vehicles',
    summary: "Vehicle armouring solutions scoped around the client's requirement and use case.",
    overview:
      'Armour Tech works with clients who need a vehicle protected to a defined requirement. Each engagement begins with consultation and assessment; the specification, scope and delivery plan are agreed with the client before work starts.',
    includes: [
      'Consultation on protection requirements',
      'Vehicle assessment',
      'Engineering and armouring to the agreed scope',
      'Delivery and handover',
    ],
    image: 'solution-armoured-vehicles',
    imageAlt: 'Close detail of a black SUV bonnet and headlamp',
    area: 'armoured-vehicles',
  },
  {
    slug: 'bulletproof-mirrors',
    index: '05',
    division: 'armour-tech',
    title: 'Bulletproof Mirrors',
    summary: 'Bulletproof mirror solutions, specified with the client for the intended application.',
    overview:
      'Armour Tech supplies bulletproof mirror solutions. The application, specification and fitting requirements are discussed and agreed with the client before anything is supplied.',
    includes: [
      'Requirement discussion',
      'Specification agreed with the client',
      'Supply and fitting coordination',
      'Delivery and follow-up communication',
    ],
    image: 'solution-bulletproof-mirrors',
    imageAlt: 'Reflections along the side window and mirror of a dark vehicle',
    area: 'bulletproof-mirrors',
  },
  {
    slug: 'security-retrofitting',
    index: '06',
    division: 'armour-tech',
    title: 'Security Equipment Retrofitting',
    summary: "Security equipment planned and fitted around the client's requirement.",
    overview:
      'Retrofitting security equipment starts with an assessment of what is being protected and how it is used. Armour Tech plans the work, agrees the scope with the client and carries out the installation.',
    includes: [
      'Assessment of the asset and the requirement',
      'Equipment selection and scope agreed in advance',
      'Installation and retrofitting',
      'Handover and continued communication',
    ],
    image: 'solution-security-retrofitting',
    imageAlt: 'A vehicle bonnet lit in a dark workshop',
    area: 'security-retrofitting',
  },
]

export const getSolutionsByDivision = (division: BusinessSlug) => solutions.filter((s) => s.division === division)
