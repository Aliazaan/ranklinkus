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
import { protectionGallery } from '../data/gallery'
import { getBusiness } from '../data/businesses'
import { armourApproach } from '../data/process'
import { getSolutionsByDivision } from '../data/solutions'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const business = getBusiness('armour-tech')
const crumbs: Crumb[] = [
  { name: 'Businesses', path: '/businesses' },
  { name: 'Armour Tech', path: business.path },
]

export default function ArmourTech() {
  const [vehicles, mirrors, retrofitting] = getSolutionsByDivision('armour-tech')

  return (
    <div className="theme-armour">
      <Seo
        title="Armour Tech (AAT) | Armoured Vehicle Solutions Pakistan"
        description="Armour Tech (AAT) provides armoured vehicle solutions, bulletproof mirrors and security equipment retrofitting in Pakistan, specified around each client's requirement."
        path={business.path}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero
        eyebrow="Armour Tech · AAT"
        title="Protection engineered around your requirements."
        subtitle="Specialized solutions for armoured mobility, ballistic protection and security equipment retrofitting."
        image="hero-slide-vehicle"
        crumbs={crumbs}
        actions={
          <>
            <ButtonLink to={contactPath('armoured-vehicles')} variant="light" arrow>
              Discuss a requirement
            </ButtonLink>
            <ButtonLink to="#approach" variant="outline">
              Our approach
            </ButtonLink>
          </>
        }
      />

      <FeatureSplit id="armoured-vehicles" tone="charcoal" eyebrow="01 · Armoured vehicles" title="Armoured Vehicles" index="01" image="solution-armoured-vehicles" imageAlt={vehicles.imageAlt} list={vehicles.includes} listLabel="Armoured vehicle services" actions={<ButtonLink to={contactPath(vehicles.area)} variant="light" arrow>Enquire about armouring</ButtonLink>}>
        <p>{vehicles.overview}</p>
        <p>We do not start from a product name. We start from the vehicle, how it is used and what the client needs it to withstand.</p>
      </FeatureSplit>

      <FeatureSplit id="bulletproof-mirrors" tone="dark" flip eyebrow="02 · Bulletproof mirrors" title="Bulletproof Mirrors" index="02" image="solution-bulletproof-mirrors" imageAlt={mirrors.imageAlt} list={mirrors.includes} listLabel="Bulletproof mirror services" actions={<ButtonLink to={contactPath(mirrors.area)} variant="light" arrow>Enquire about mirrors</ButtonLink>}>
        <p>{mirrors.overview}</p>
        <p>Details such as application, fitting and specification are written down and agreed before anything is supplied.</p>
      </FeatureSplit>

      <GallerySection id="protection-gallery" tone="charcoal" eyebrow="Ballistic protection" title="Vehicles and protection, in detail." items={protectionGallery} label="Vehicle protection photography" />

      <FeatureSplit id="security-retrofitting" tone="dark" eyebrow="03 · Security equipment retrofitting" title="Security Equipment Retrofitting" index="03" image="solution-security-retrofitting" imageAlt={retrofitting.imageAlt} list={retrofitting.includes} listLabel="Retrofitting services" actions={<ButtonLink to={contactPath(retrofitting.area)} variant="light" arrow>Enquire about retrofitting</ButtonLink>}>
        <p>{retrofitting.overview}</p>
        <p>Careful planning up front keeps the installation consistent with how the asset is actually used.</p>
      </FeatureSplit>

      <Section tone="light" id="approach" labelledBy="approach-title" className="approach">
        <SectionHeading eyebrow="Our approach" id="approach-title" title="Five stages, one agreed scope." intro="Every engagement follows the same sequence, so the client always knows what has been agreed and what comes next." />
        <ProcessSteps steps={armourApproach} className="steps--five" />
      </Section>

      <Section tone="dark" id="scope-note" labelledBy="scope-title" grain className="scope-note">
        <ScrollReveal className="scope-note__panel">
          <p className="eyebrow">Specifications</p>
          <h2 id="scope-title" className="display scope-note__title">
            Agreed project by project.
          </h2>
          <p>
            Protection requirements are discussed and specified with the client for each project. This website makes no claims about protection levels, standards or approvals; those are agreed and documented as part of each engagement.
          </p>
        </ScrollReveal>
      </Section>

      <CTASection
        eyebrow="Armour Tech · AAT"
        title="Discuss your protection requirement."
        text="Tell us about the vehicle or asset and what it needs to achieve. We will start with questions."
        cta={{ label: 'Start a conversation', to: contactPath('armoured-vehicles') }}
        image="hero-slide-vehicle"
      />
    </div>
  )
}
