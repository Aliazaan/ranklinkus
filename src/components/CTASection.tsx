import type { ReactNode } from 'react'
import type { ImageName } from '../lib/images'
import { ButtonLink } from './Button'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'

interface CTASectionProps {
  title: ReactNode
  text: string
  cta: { label: string; to: string }
  image?: ImageName
  eyebrow?: string
  secondary?: { label: string; href: string }
}

export function CTASection({ title, text, cta, image = 'cta-background', eyebrow = 'Get in touch', secondary }: CTASectionProps) {
  return (
    <section className="cta tone-dark grain" aria-labelledby="cta-title">
      <div className="cta__media" aria-hidden="true">
        <Picture name={image} alt="" className="cta__picture" imgClassName="cta__img" />
      </div>
      <div className="cta__veil" aria-hidden="true" />
      <div className="container cta__inner">
        <ScrollReveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cta-title" className="display cta__title">
            {title}
          </h2>
          <p className="cta__text">{text}</p>
          <div className="cta__actions">
            <ButtonLink to={cta.to} variant="light" arrow>
              {cta.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
