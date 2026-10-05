import type { ImageName } from '../lib/images'

export const PROJECT_PLACEHOLDER = 'Project information coming soon'

export interface Project {
  index: string
  title: string
  industry: string
  scope: string
  result: string
  image: ImageName
  imageAlt: string
}

// PLACEHOLDERS: no client names, scopes or results have been supplied. Replace each entry
// with a real project (and only then remove the "Placeholder" tag in ProjectCard).
export const projects: Project[] = [
  {
    index: '01',
    title: 'Textile machinery sourcing',
    industry: 'Textile & Manufacturing',
    scope: PROJECT_PLACEHOLDER,
    result: PROJECT_PLACEHOLDER,
    image: 'solution-textile-machinery',
    imageAlt: 'Spinning frames carrying rows of white yarn bobbins inside a textile mill',
  },
  {
    index: '02',
    title: 'Cotton sourcing',
    industry: 'Trading & Commodities',
    scope: PROJECT_PLACEHOLDER,
    result: PROJECT_PLACEHOLDER,
    image: 'cotton-field',
    imageAlt: 'Rows of cotton plants stretching to the horizon',
  },
  {
    index: '03',
    title: 'Vehicle armouring',
    industry: 'Security · Automotive',
    scope: PROJECT_PLACEHOLDER,
    result: PROJECT_PLACEHOLDER,
    image: 'business-armour-tech',
    imageAlt: 'Front view of a black SUV parked on a street',
  },
  {
    index: '04',
    title: 'Security equipment retrofitting',
    industry: 'Security',
    scope: PROJECT_PLACEHOLDER,
    result: PROJECT_PLACEHOLDER,
    image: 'solution-security-retrofitting',
    imageAlt: 'A vehicle bonnet lit in a dark workshop',
  },
  {
    index: '05',
    title: 'Industrial advisory',
    industry: 'Industrial',
    scope: PROJECT_PLACEHOLDER,
    result: PROJECT_PLACEHOLDER,
    image: 'solution-consulting',
    imageAlt: 'Technical drawings, a sketchbook and drafting tools on a desk',
  },
]
