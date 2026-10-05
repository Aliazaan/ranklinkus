import { contactPath } from '../data/areas'
import { getBusiness } from '../data/businesses'
import type { Solution } from '../data/solutions'
import { ButtonLink } from './Button'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'

interface SolutionCardProps {
  solution: Solution
  delay?: number
}

/**
 * One solution, with its own anchor (`#<slug>`). Each can later grow into a dedicated
 * SEO landing page at /solutions/<slug> without changing this data shape.
 */
export function SolutionCard({ solution, delay = 0 }: SolutionCardProps) {
  const division = getBusiness(solution.division)
  const headingId = `${solution.slug}-title`

  return (
    <ScrollReveal as="article" id={solution.slug} aria-labelledby={headingId} className="sol-card" delay={delay}>
      <div className="sol-card__media">
        <Picture name={solution.image} alt={solution.imageAlt} sizes="(min-width: 960px) 44vw, 92vw" className="sol-card__picture" imgClassName="sol-card__img" />
      </div>
      <div className="sol-card__body">
        <p className="sol-card__division">
          {solution.index} · {division.name}
        </p>
        <h3 id={headingId} className="display sol-card__title">
          {solution.title}
        </h3>
        <p className="sol-card__text">{solution.overview}</p>
        <ul className="sol-card__list" aria-label={`${solution.title} includes`}>
          {solution.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ButtonLink to={contactPath(solution.area)} variant="outline-dark" arrow>
          Discuss this requirement
        </ButtonLink>
      </div>
    </ScrollReveal>
  )
}
