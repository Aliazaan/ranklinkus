export interface Capability {
  index: string
  title: string
  description: string
  division: 'Dada Sons' | 'Armour Tech'
  href: string
}

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Textile Machinery',
    description: "Sourcing and coordination of textile machinery, matched to the client's production requirement.",
    division: 'Dada Sons',
    href: '/solutions#textile-machinery',
  },
  {
    index: '02',
    title: 'Cotton & Commodities',
    description: "Cotton sourcing and commercial support built around the buyer's specification and delivery needs.",
    division: 'Dada Sons',
    href: '/solutions#cotton-sourcing',
  },
  {
    index: '03',
    title: 'Consulting & Advisory',
    description: 'Industrial and commercial advisory for clients who want an experienced view before they commit.',
    division: 'Dada Sons',
    href: '/solutions#industrial-consulting',
  },
  {
    index: '04',
    title: 'Armoured Vehicles',
    description: "Vehicle armouring solutions scoped around the client's protection requirement and use case.",
    division: 'Armour Tech',
    href: '/solutions#armoured-vehicles',
  },
  {
    index: '05',
    title: 'Ballistic Protection',
    description: 'Ballistic-protection components, including bulletproof mirrors, specified with the client.',
    division: 'Armour Tech',
    href: '/solutions#bulletproof-mirrors',
  },
  {
    index: '06',
    title: 'Security Retrofitting',
    description: "Security equipment planned and fitted around the client's requirement.",
    division: 'Armour Tech',
    href: '/solutions#security-retrofitting',
  },
]
