import { Link } from 'react-router-dom'
import type { Business } from '../data/businesses'
import { cx } from '../lib/cx'
import { Icon } from './Icon'
import { Picture } from './Picture'

const ALT: Record<Business['slug'], string> = {
  'dada-sons': 'Large rolls of woven cotton fabric on stands inside a textile plant',
  'armour-tech': 'Front view of a black SUV parked on a city street',
}

interface BusinessCardProps {
  business: Business
  /** "feature" is the large, immersive treatment used on the homepage. */
  size?: 'feature' | 'compact'
}

/** Two visually distinct treatments: Dada Sons (ivory, textile) and Armour Tech (black, technical). */
export function BusinessCard({ business, size = 'feature' }: BusinessCardProps) {
  return (
    <article className={cx('biz-card', `biz-card--${business.slug}`, `biz-card--${size}`)}>
      <div className="biz-card__media">
        <Picture name={business.cardImage} alt={ALT[business.slug]} sizes="(min-width: 960px) 46vw, 92vw" className="biz-card__picture" imgClassName="biz-card__img" />
        <span className="biz-card__index" aria-hidden="true">
          {business.index}
        </span>
      </div>

      <div className="biz-card__body">
        <p className="biz-card__kicker">{business.alias ? `Division ${business.index} · ${business.alias}` : `Division ${business.index}`}</p>
        <h3 className="display biz-card__name">{business.name}</h3>
        <ul className="biz-card__tags" aria-label={`${business.name} business areas`}>
          {business.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
        <p className="biz-card__text">{business.summary}</p>
        <Link to={business.path} className="biz-card__cta">
          <span>{business.cta}</span>
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  )
}
