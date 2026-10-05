import { solutions } from './solutions'

export interface NavItem {
  label: string
  to: string
}

export const primaryNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Businesses', to: '/businesses' },
  { label: 'Industries', to: '/industries' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Insights', to: '/insights' },
]

const solutionLink = (slug: string, label: string): NavItem => {
  const exists = solutions.some((s) => s.slug === slug)
  if (!exists) throw new Error(`Footer links to unknown solution: ${slug}`)
  return { label, to: `/solutions#${slug}` }
}

export const footerNav = {
  company: [
    { label: 'About', to: '/about' },
    { label: 'Leadership', to: '/about#leadership' },
    { label: 'Contact', to: '/contact' },
  ] satisfies NavItem[],
  businesses: [
    { label: 'Dada Sons', to: '/businesses/dada-sons' },
    { label: 'Armour Tech', to: '/businesses/armour-tech' },
  ] satisfies NavItem[],
  solutions: [
    solutionLink('textile-machinery', 'Textile Machinery'),
    solutionLink('cotton-sourcing', 'Cotton'),
    solutionLink('industrial-consulting', 'Consulting'),
    solutionLink('armoured-vehicles', 'Armoured Vehicles'),
    solutionLink('security-retrofitting', 'Security Retrofitting'),
  ],
  insights: [
    { label: 'Textile', to: '/insights?category=textile' },
    { label: 'Industrial', to: '/insights?category=industrial' },
    { label: 'Security', to: '/insights?category=security' },
    { label: 'Automotive', to: '/insights?category=automotive' },
  ] satisfies NavItem[],
}
