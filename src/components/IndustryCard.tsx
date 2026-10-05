import { Link } from 'react-router-dom'
import type { Industry } from '../data/industries'
import { Icon } from './Icon'
import { Picture } from './Picture'

/** A panel in the homepage industries strip: expands on hover/focus, stacks on small screens. */
export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link to={`/industries#${industry.slug}`} className="ind-panel">
      <Picture name={industry.image} alt="" sizes="(min-width: 960px) 40vw, 92vw" className="ind-panel__picture" imgClassName="ind-panel__img" />
      <span className="ind-panel__veil" aria-hidden="true" />
      <span className="ind-panel__index" aria-hidden="true">
        {industry.index}
      </span>
      <span className="ind-panel__rail" aria-hidden="true">
        {industry.title}
      </span>
      <span className="ind-panel__body">
        <h3 className="ind-panel__title display">{industry.title}</h3>
        <span className="ind-panel__text">{industry.summary}</span>
        <span className="ind-panel__more">
          Learn more <Icon name="arrow" size={14} />
        </span>
      </span>
    </Link>
  )
}
