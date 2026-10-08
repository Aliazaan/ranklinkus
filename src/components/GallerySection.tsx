import type { ReactNode } from 'react'
import type { GalleryItem } from '../data/gallery'
import { Gallery } from './Gallery'
import { Section, type Tone } from './Section'
import { SectionHeading } from './SectionHeading'

interface GallerySectionProps {
  id: string
  tone: Tone
  eyebrow: string
  title: ReactNode
  items: GalleryItem[]
  label: string
  className?: string
}

export function GallerySection({ id, tone, eyebrow, title, items, label, className }: GallerySectionProps) {
  const headingId = `${id}-title`
  return (
    <Section tone={tone} id={id} labelledBy={headingId} grain={tone === 'dark' || tone === 'charcoal'} className={className}>
      <SectionHeading eyebrow={eyebrow} id={headingId} title={title} intro="Illustrative photography. Real project images will be added as they are confirmed." />
      <Gallery items={items} label={label} />
    </Section>
  )
}
