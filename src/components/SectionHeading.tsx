import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { ScrollReveal } from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  align?: 'left' | 'center'
  className?: string
}

/** Small uppercase label → large editorial heading → supporting paragraph. */
export function SectionHeading({ eyebrow, title, intro, as: Tag = 'h2', id, align = 'left', className }: SectionHeadingProps) {
  return (
    <ScrollReveal className={cx('sh', align === 'center' && 'sh--center', className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="display sh__title">
        {title}
      </Tag>
      {intro && <p className="sh__intro">{intro}</p>}
    </ScrollReveal>
  )
}
