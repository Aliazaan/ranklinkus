import type { ReactNode } from 'react'
import type { ImageName } from '../lib/images'
import type { Crumb } from '../seo/schema'
import { Breadcrumbs } from './Breadcrumbs'
import { Picture } from './Picture'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  image: ImageName
  crumbs: Crumb[]
  actions?: ReactNode
  /** Extra lines under the lead, e.g. a division's capability list. */
  meta?: ReactNode
}

export function PageHero({ eyebrow, title, subtitle, image, crumbs, actions, meta }: PageHeroProps) {
  return (
    <section className="page-hero tone-dark" aria-labelledby="page-title">
      <div className="page-hero__media">
        <Picture name={image} alt="" priority className="page-hero__picture" imgClassName="page-hero__img" />
      </div>
      <div className="page-hero__veil" aria-hidden="true" />
      <div className="container page-hero__content">
        <Breadcrumbs crumbs={crumbs} />
        <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
        <h1 id="page-title" className="display page-hero__title">
          {title}
        </h1>
        {subtitle && <p className="page-hero__lead">{subtitle}</p>}
        {actions && <div className="page-hero__actions">{actions}</div>}
        {meta}
      </div>
    </section>
  )
}
