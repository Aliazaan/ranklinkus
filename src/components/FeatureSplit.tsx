import type { ReactNode } from 'react'
import type { ImageName } from '../lib/images'
import { cx } from '../lib/cx'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'
import { Section, type Tone } from './Section'

interface FeatureSplitProps {
  id: string
  tone: Tone
  eyebrow: string
  title: string
  index?: string
  image: ImageName
  imageAlt: string
  /** Mirror the layout (image on the right). */
  flip?: boolean
  list?: string[]
  listLabel?: string
  actions?: ReactNode
  className?: string
  children: ReactNode
}

/** Image + copy split used across the division, industry and detail sections. */
export function FeatureSplit({ id, tone, eyebrow, title, index, image, imageAlt, flip, list, listLabel, actions, className, children }: FeatureSplitProps) {
  const headingId = `${id}-title`
  return (
    <Section tone={tone} id={id} labelledBy={headingId} className={cx('feature', className)}>
      <div className={cx('feature__grid', flip && 'is-flip')}>
        <ScrollReveal variant="image" className="feature__media">
          <Picture name={image} alt={imageAlt} sizes="(min-width: 960px) 46vw, 92vw" className="feature__picture" imgClassName="feature__img" />
          {index && (
            <span className="feature__index" aria-hidden="true">
              {index}
            </span>
          )}
        </ScrollReveal>

        <ScrollReveal className="feature__body" delay={120}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="display feature__title">
            {title}
          </h2>
          <div className="feature__copy">{children}</div>
          {list && (
            <ul className="feature__list" aria-label={listLabel}>
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {actions && <div className="feature__actions">{actions}</div>}
        </ScrollReveal>
      </div>
    </Section>
  )
}
