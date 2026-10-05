import { BusinessCard } from '../components/BusinessCard'
import { CTASection } from '../components/CTASection'
import { Leadership } from '../components/Leadership'
import { PageHero } from '../components/PageHero'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../config/site'
import { businesses } from '../data/businesses'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, organizationSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'About', path: '/about' }]

export default function About() {
  return (
    <>
      <Seo
        title="About Dada Sons Group | Lahore, Pakistan"
        description="Dada Sons Group is a diversified business group in Lahore, Pakistan, with divisions in textile machinery, cotton, consulting and security solutions."
        path="/about"
        jsonLd={[breadcrumbSchema(crumbs), organizationSchema()]}
      />

      <PageHero eyebrow="About the group" title="About Dada Sons Group" subtitle="Industrial expertise with a diversified outlook." image="hero-about" crumbs={crumbs} />

      <Section tone="light" id="who-we-are" labelledBy="who-title" className="about-who">
        <div className="intro__grid">
          <ScrollReveal className="intro__lead">
            <p className="eyebrow">Who we are</p>
            <h2 id="who-title" className="display intro__title">
              A diversified group, <em>focused</em> on requirements.
            </h2>
          </ScrollReveal>
          <ScrollReveal className="intro__copy" delay={140}>
            <p>
              Dada Sons Group is a diversified business group based in Lahore, Pakistan. It operates through two business areas: Dada Sons, covering textile machinery, cotton and consulting; and Armour Tech (AAT), covering armoured vehicles, bulletproof mirrors and security equipment retrofitting.
            </p>
            <p>
              The group brings together commercial expertise, sourcing capabilities and strategic advisory. Its work is shaped by the requirement in front of it rather than a fixed catalogue: each engagement starts with understanding what the client actually needs.
            </p>
            <dl className="about-who__facts">
              <div>
                <dt>Based in</dt>
                <dd>{site.address.city}, {site.address.countryName}</dd>
              </div>
              <div>
                <dt>Business areas</dt>
                <dd>Textile · Cotton · Consulting · Security</dd>
              </div>
              <div>
                <dt>Leadership</dt>
                <dd>{site.ceo.name}, {site.ceo.shortTitle}</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="dark" id="vision-mission" labelledBy="vm-title" grain className="vm">
        <h2 id="vm-title" className="sr-only">
          Vision and mission
        </h2>
        <div className="vm__grid">
          <ScrollReveal className="vm__block">
            <p className="eyebrow">Vision</p>
            <p className="display vm__statement">To be a dependable partner for clients who need specialized industrial, advisory and security solutions.</p>
          </ScrollReveal>
          <ScrollReveal className="vm__block" delay={140}>
            <p className="eyebrow">Mission</p>
            <p className="display vm__statement">To understand each requirement properly, coordinate the right solution, and stay in communication from the first conversation through delivery and after.</p>
          </ScrollReveal>
        </div>
      </Section>

      <Leadership id="leadership" />

      <Section tone="light" id="business-areas" labelledBy="areas-title" className="about-areas">
        <SectionHeading eyebrow="Business areas" id="areas-title" title={<>Two divisions, <em>one group.</em></>} intro="Each division has its own focus and its own way of working. Both start from the client's requirement." />
        <div className="businesses__grid">
          {businesses.map((business, index) => (
            <ScrollReveal key={business.slug} delay={index * 140}>
              <BusinessCard business={business} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection title={<>Discuss a <em>requirement.</em></>} text="Speak with our team about your industrial, consulting or security requirements." cta={{ label: 'Contact us', to: '/contact' }} />
    </>
  )
}
