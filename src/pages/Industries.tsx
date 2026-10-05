import { ButtonLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { FeatureSplit } from '../components/FeatureSplit'
import { PageHero } from '../components/PageHero'
import { contactPath } from '../data/areas'
import { industries } from '../data/industries'
import type { Tone } from '../components/Section'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Industries', path: '/industries' }]

const ALT: Record<string, string> = {
  'textile-manufacturing': 'Rows of yarn bobbins on a textile spinning frame',
  security: 'A security camera mounted under a strip light in a dark corridor',
  automotive: 'The tail-light of a dark SUV glowing in a dark setting',
  industrial: 'Sparks flying from industrial cutting equipment',
  'trading-commodities': 'Aerial view of a container ship moving through a port',
}

// Alternating rhythm: light, dark, light, dark, light.
const TONES: Tone[] = ['light', 'dark', 'ivory', 'charcoal', 'light']

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve | Dada Sons Group"
        description="Industries served by Dada Sons Group: textile and manufacturing, security, automotive, industrial, and trading and commodities."
        path="/industries"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero eyebrow="Industries" title="Industries We Serve" subtitle="Five sectors where the group's sourcing, advisory and protection expertise applies." image="hero-industries" crumbs={crumbs} />

      {industries.map((industry, index) => (
        <FeatureSplit
          key={industry.slug}
          id={industry.slug}
          tone={TONES[index % TONES.length]}
          flip={index % 2 === 1}
          eyebrow={`${industry.index} · Industry`}
          title={industry.title}
          index={industry.index}
          image={industry.image}
          imageAlt={ALT[industry.slug]}
          list={industry.capabilities}
          listLabel={`${industry.title} capabilities`}
          actions={
            <ButtonLink to={contactPath(industry.area)} variant={TONES[index % TONES.length] === 'dark' || TONES[index % TONES.length] === 'charcoal' ? 'light' : 'primary'} arrow>
              Discuss your requirement
            </ButtonLink>
          }
        >
          <p>{industry.overview}</p>
        </FeatureSplit>
      ))}

      <CTASection title={<>Working in another <em>sector?</em></>} text="Tell us about your requirement. If it falls within our expertise we will say so, and if it does not, we will say that too." cta={{ label: 'Start a conversation', to: '/contact' }} />
    </>
  )
}
