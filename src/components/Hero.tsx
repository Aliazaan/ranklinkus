import { ButtonLink } from './Button'
import { Picture } from './Picture'

const SLIDES = [
  { name: 'hero-slide-machinery', mobile: 'hero-slide-machinery-portrait' },
  { name: 'hero-slide-vehicle', mobile: 'hero-slide-vehicle-portrait' },
  { name: 'hero-slide-looms', mobile: 'hero-slide-looms-portrait' },
] as const

const FACTS = ['Textile Machinery', 'Cotton & Commodities', 'Consulting', 'Armoured Vehicles', 'Security Retrofitting']

export function Hero() {
  return (
    <section className="hero tone-dark" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <div key={slide.name} className={`hero__slide hero__slide--${index + 1}`}>
            <Picture name={slide.name} mobile={slide.mobile} alt="" priority={index === 0} lowPriority={index > 0} className="hero__picture" imgClassName="hero__img" />
          </div>
        ))}
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
          <ol className="hero__dots" aria-hidden="true">
            <li />
            <li />
            <li />
          </ol>
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
