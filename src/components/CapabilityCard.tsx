import { Link } from 'react-router-dom'
import type { Capability } from '../data/capabilities'
import { Icon } from './Icon'

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <article className="cap">
      <p className="cap__index" aria-hidden="true">
        {capability.index}
      </p>
      <p className="cap__division">{capability.division}</p>
      <h3 className="cap__title display">
        <Link to={capability.href} className="cap__link">
          {capability.title}
        </Link>
      </h3>
      <p className="cap__text">{capability.description}</p>
      <Icon name="arrow" size={18} className="cap__arrow" />
      <span className="cap__rule" aria-hidden="true" />
    </article>
  )
}
