import { ButtonLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { FeatureSplit } from '../components/FeatureSplit'
import { GallerySection } from '../components/GallerySection'
import { PageHero } from '../components/PageHero'
import { ProcessSteps } from '../components/ProcessSteps'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { contactPath } from '../data/areas'
import { machineryGallery } from '../data/gallery'
import { processSteps } from '../data/process'
import { getBusiness } from '../data/businesses'
import { getSolutionsByDivision } from '../data/solutions'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const business = getBusiness('dada-sons')
const crumbs: Crumb[] = [
  { name: 'Businesses', path: '/businesses' },
  { name: 'Dada Sons', path: business.path },
]

const services = [
  { title: 'Machinery sourcing', text: "Identifying machinery that fits the client's production requirement." },
  { title: 'Equipment procurement', text: 'Managing the procurement from enquiry through to delivery.' },
  { title: 'Supplier coordination', text: 'Keeping communication between client and supplier clear and on schedule.' },
  { title: 'Industrial advisory', text: 'An experienced second view before a significant decision.' },
  { title: 'Cotton sourcing', text: "Sourcing cotton against the buyer's specification." },
  { title: 'Commercial consultation', text: 'Practical guidance on the commercial side of an enquiry.' },
]

export default function DadaSons() {
  const [machinery, cotton, consulting] = getSolutionsByDivision('dada-sons')

  return (
    <div className="theme-dada">
      <Seo
        title="Dada Sons | Textile Machinery, Cotton & Consulting, Lahore"
        description="Dada Sons supports buyers with textile machinery sourcing, cotton and commodity coordination, and industrial consulting. Based in Lahore, Pakistan."
        path={business.path}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero
        eyebrow="Dada Sons"
        title={
          <>
            <span className="sr-only">Dada Sons: </span>
            Textile Machinery. Cotton. <em>Industrial Expertise.</em>
          </>
        }
        subtitle={business.summary}
        image="hero-dada-sons"
        crumbs={crumbs}
        actions={
          <ButtonLink to={contactPath()} variant="light" arrow>
            Discuss a requirement
          </ButtonLink>
        }
      />

      <FeatureSplit id="textile-machinery" tone="light" eyebrow="01 · Textile machinery" title="Textile Machinery" index="01" image={machinery.image} imageAlt={machinery.imageAlt} list={machinery.includes} listLabel="Textile machinery services" actions={<ButtonLink to={contactPath(machinery.area)} variant="primary" arrow>Enquire about machinery</ButtonLink>}>
        <p>{machinery.overview}</p>
        <p>Whether the requirement is a single machine or a wider equipment programme, we start by understanding what the client needs it to do.</p>
      </FeatureSplit>

      <GallerySection id="machinery-gallery" tone="dark" eyebrow="Machinery" title={<>Textile machinery, <em>up close.</em></>} items={machineryGallery} label="Textile machinery photography" />

      <FeatureSplit id="cotton-commodities" tone="light" flip eyebrow="02 · Cotton & commodities" title="Cotton & Commodities" index="02" image="cotton-field" imageAlt={cotton.imageAlt} list={cotton.includes} listLabel="Cotton sourcing services" actions={<ButtonLink to={contactPath(cotton.area)} variant="light" arrow>Enquire about cotton</ButtonLink>}>
        <p>{cotton.overview}</p>
        <p>Clear specifications and steady communication matter as much as price, so we put both in writing early.</p>
      </FeatureSplit>

      <FeatureSplit id="consulting-advisory" tone="ivory" eyebrow="03 · Consulting & advisory" title="Consulting & Advisory" index="03" image={consulting.image} imageAlt={consulting.imageAlt} list={consulting.includes} listLabel="Consulting services" actions={<ButtonLink to={contactPath(consulting.area)} variant="primary" arrow>Speak with an advisor</ButtonLink>}>
        <p>{consulting.overview}</p>
        <p>The advice is practical: what to ask, what to compare and what to confirm before a commitment is made.</p>
      </FeatureSplit>

      <Section tone="charcoal" id="how-we-help" labelledBy="help-title" grain className="help">
        <SectionHeading eyebrow="How we help" id="help-title" title={<>Six ways we <em>support</em> a requirement.</>} />
        <ul className="help__grid">
          {services.map((service, index) => (
            <ScrollReveal as="li" key={service.title} delay={(index % 3) * 90} className="help__item">
              <span className="help__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="display help__title">{service.title}</h3>
              <p>{service.text}</p>
            </ScrollReveal>
          ))}
        </ul>
      </Section>

      <Section tone="light" id="how-it-works" labelledBy="works-title" className="process">
        <SectionHeading eyebrow="How it works" id="works-title" title={<>From requirement <em>to solution.</em></>} />
        <ProcessSteps steps={processSteps} />
      </Section>

      <CTASection
        title={<>Have a machinery, cotton or <em>advisory</em> requirement?</>}
        text="Tell us what you need. We will come back with questions first, and options after."
        cta={{ label: 'Start a conversation', to: contactPath() }}
        image="hero-dada-sons"
      />
    </div>
  )
}
