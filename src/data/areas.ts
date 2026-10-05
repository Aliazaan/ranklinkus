export const businessAreas = [
  { value: 'textile-machinery', label: 'Textile Machinery' },
  { value: 'cotton-commodities', label: 'Cotton & Commodities' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'armoured-vehicles', label: 'Armoured Vehicles' },
  { value: 'bulletproof-mirrors', label: 'Bulletproof Mirrors' },
  { value: 'security-retrofitting', label: 'Security Retrofitting' },
  { value: 'other', label: 'Other' },
] as const

export type BusinessAreaValue = (typeof businessAreas)[number]['value']

export const isBusinessArea = (value: string | null): value is BusinessAreaValue =>
  businessAreas.some((area) => area.value === value)

export const contactPath = (area?: BusinessAreaValue) => (area ? `/contact?area=${area}` : '/contact')
