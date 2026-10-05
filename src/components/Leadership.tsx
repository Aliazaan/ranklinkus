import type { ReactNode } from 'react'
import { site } from '../config/site'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'
import { Section } from './Section'

interface LeadershipProps {
  id?: string
  /** Optional call to action rendered under the biography. */
  action?: ReactNode
}

export function Leadership({ id = 'leadership', action }: LeadershipProps) {
  return (
    <Section tone="charcoal" id={id} labelledBy={`${id}-title`} grain className="leadership">
      <div className="leadership__grid">
        <ScrollReveal variant="image" className="leadership__portrait">
          <Picture
            name="ceo-portrait"
            alt={`${site.ceo.name}, ${site.ceo.title} of ${site.name}`}
            sizes="(min-width: 960px) 34vw, 80vw"
            className="leadership__picture"
            imgClassName="leadership__img"
          />
          <span className="leadership__frame" aria-hidden="true" />
        </ScrollReveal>

        <ScrollReveal className="leadership__body" delay={120}>
          <p className="eyebrow">Leadership</p>
          <h2 id={`${id}-title`} className="display leadership__name">
            {site.ceo.name}
          </h2>
          <p className="leadership__role">{site.ceo.title}</p>
          <p className="leadership__text">Leading Dada Sons Group across its industrial, advisory and security-focused business activities.</p>
          {action}
        </ScrollReveal>
      </div>
    </Section>
  )
}
