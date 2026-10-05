import { ButtonLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { Picture } from '../components/Picture'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { businesses } from '../data/businesses'
import { getSolutionsByDivision } from '../data/solutions'
import { cx } from '../lib/cx'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Businesses', path: '/businesses' }]

const IMAGE_ALT = {
  'dada-sons': 'Large rolls of woven cotton fabric on stands inside a textile plant',
  'armour-tech': 'Front view of a black SUV parked on a city street',
} as const

export default function Businesses() {
  return (
    <>
      <Seo
        title="Our Businesses | Dada Sons Group"
        description="Dada Sons Group operates two divisions: Dada Sons for textile machinery, cotton and consulting, and Armour Tech for armoured vehicles and security retrofitting."
        path="/businesses"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero eyebrow="Dada Sons Group" title="Our Businesses" subtitle="Specialized business divisions built around industrial expertise and strategic solutions." image="hero-textile-machinery" crumbs={crumbs} />

      {businesses.map((business, index) => {
        const armour = business.slug === 'armour-tech'
        const items = getSolutionsByDivision(business.slug)
        const headingId = `${business.slug}-title`
        return (
          <Section key={business.slug} tone={armour ? 'dark' : 'light'} id={business.slug} labelledBy={headingId} grain={armour} className={cx('division', `division--${business.slug}`)}>
            <div className={cx('division__grid', index % 2 === 1 && 'is-flip')}>
              <ScrollReveal variant="image" className="division__media">
                <Picture name={business.cardImage} alt={IMAGE_ALT[business.slug]} sizes="(min-width: 960px) 44vw, 92vw" className="division__picture" imgClassName="division__img" />
                <span className="division__index" aria-hidden="true">
                  {business.index}
                </span>
              </ScrollReveal>

              <ScrollReveal className="division__body" delay={120}>
                <p className="eyebrow">{business.alias ? `Division ${business.index} · ${business.alias}` : `Division ${business.index}`}</p>
                <h2 id={headingId} className="display division__title">
                  {business.name}
                </h2>
                <p className="division__text">{business.overview}</p>
                <ul className="division__list" aria-label={`${business.name} capabilities`}>
                  {items.map((item) => (
                    <li key={item.slug}>
                      <span className="division__list-index" aria-hidden="true">
                        {item.index}
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <span>{item.summary}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="division__actions">
                  <ButtonLink to={business.path} variant={armour ? 'light' : 'primary'} arrow>
                    {business.cta}
                  </ButtonLink>
                </div>
              </ScrollReveal>
            </div>
          </Section>
        )
      })}

      <CTASection title={<>Not sure which <em>division?</em></>} text="Tell us what you are trying to achieve and we will point you to the right team." cta={{ label: 'Start a conversation', to: '/contact' }} />
    </>
  )
}
