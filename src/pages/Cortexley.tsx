import { ButtonLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { CORTEXLEY_URL, cortexleyServices } from '../data/cortexley'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Cortexley', path: '/cortexley' }]

export default function Cortexley() {
  return (
    <>
      <Seo
        title="Cortexley Web & Software Services | Dada Sons Group"
        description="Web development, ecommerce, custom software, AI automation and UI/UX design services from Cortexley, an independent company. Each service links to cortexley.com."
        path="/cortexley"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero
        eyebrow="Cortexley"
        title="Websites & software by Cortexley"
        subtitle="Cortexley is an independent company and is not part of Dada Sons Group. Its services are listed here, and each one links to cortexley.com."
        image="hero-solutions"
        crumbs={crumbs}
        actions={
          <ButtonLink href={CORTEXLEY_URL} variant="light" arrow>
            Visit cortexley.com
          </ButtonLink>
        }
      />

      <Section tone="light" id="services" labelledBy="cx-title" className="help">
        <SectionHeading eyebrow="Services" id="cx-title" title={<>Five services from <em>Cortexley.</em></>} intro="Descriptions are Cortexley's own. Links open cortexley.com in a new tab." />
        <ul className="help__grid">
          {cortexleyServices.map((service, index) => (
            <ScrollReveal as="li" key={service.title} delay={(index % 3) * 90} className="help__item">
              <span className="help__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="display help__title">{service.title}</h3>
              <p>{service.tagline}</p>
              <a className="text-link" href={service.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1.25rem' }}>
                <span className="text-link__label">View on Cortexley</span>
                <Icon name="external" size={15} className="text-link__arrow" />
              </a>
            </ScrollReveal>
          ))}
        </ul>
      </Section>

      <CTASection title={<>Need our own <em>services?</em></>} text="For textile machinery, cotton, consulting, armoured vehicles or security retrofitting, speak with Dada Sons Group." cta={{ label: 'Contact us', to: '/contact' }} />
    </>
  )
}
