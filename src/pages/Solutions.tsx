import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { SolutionCard } from '../components/SolutionCard'
import { TextLink } from '../components/Button'
import { solutions } from '../data/solutions'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Solutions', path: '/solutions' }]

export default function Solutions() {
  return (
    <>
      <Seo
        title="Industrial & Security Solutions | Dada Sons Group"
        description="Textile machinery sourcing, cotton sourcing, industrial consulting, armoured vehicles, bulletproof mirrors and security equipment retrofitting from Dada Sons Group."
        path="/solutions"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero eyebrow="Solutions" title="Solutions" subtitle="Six specialized solutions across industrial sourcing, advisory and security." image="hero-solutions" crumbs={crumbs} />

      <Section tone="light" id="solutions-list" labelledBy="solutions-nav-title" className="solutions">
        <nav className="solutions__jump" aria-labelledby="solutions-nav-title">
          <h2 id="solutions-nav-title" className="eyebrow">
            Jump to
          </h2>
          <ul>
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <TextLink to={`/solutions#${solution.slug}`}>{solution.title}</TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="solutions__grid">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} delay={(index % 2) * 120} />
          ))}
        </div>
      </Section>

      <CTASection title={<>Not sure what you <em>need?</em></>} text="Describe the requirement as you understand it. We will help you work out the right next step." cta={{ label: 'Start a conversation', to: '/contact' }} />
    </>
  )
}
