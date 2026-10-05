import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

export type Tone = 'dark' | 'charcoal' | 'light' | 'white' | 'ivory'

interface SectionProps {
  tone?: Tone
  id?: string
  className?: string
  /** id of the heading that names this region (for assistive technology). */
  labelledBy?: string
  grain?: boolean
  /** Set false to let children span the full viewport width. */
  contained?: boolean
  children: ReactNode
}

export function Section({ tone = 'light', id, className, labelledBy, grain, contained = true, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx('section', `tone-${tone}`, grain && 'grain', className)}>
      {contained ? <div className="container">{children}</div> : children}
    </section>
  )
}
