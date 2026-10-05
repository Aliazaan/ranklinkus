import { ButtonLink } from './Button'
import { Picture } from './Picture'

const FACTS = ['Textile Machinery', 'Cotton & Commodities', 'Consulting', 'Armoured Vehicles', 'Security Retrofitting']

export function Hero() {
  return (
    <section className="hero tone-dark" aria-labelledby="hero-title">
      <div className="hero__media">
        <Picture
          name="hero-textile-machinery"
          mobile="hero-textile-machinery-portrait"
          alt=""
          priority
          className="hero__picture"
          imgClassName="hero__img"
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">Dada Sons Group</p>
        <h1 id="hero-title" className="display hero__title">
          <span className="hero__line">
            <span>Industrial Expertise.</span>
          </span>{' '}
          <span className="hero__line">
            <span>
              <em>Strategic</em> Solutions.
            </span>
          </span>
        </h1>
        <p className="hero__lead">
          A diversified business group delivering specialized solutions across textile machinery, cotton, consulting and security technology.
        </p>
        <div className="hero__actions">
          <ButtonLink to="/businesses" variant="light" arrow>
            Explore our businesses
          </ButtonLink>
          <ButtonLink to="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>

      <div className="hero__foot">
        <div className="container hero__foot-inner">
          <ul className="hero__facts" aria-label="Business areas">
            {FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <a href="#group" className="hero__scroll" aria-label="Scroll to the next section">
            <span>Scroll</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
