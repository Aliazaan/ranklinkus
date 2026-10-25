import { BusinessCard } from '../components/BusinessCard'
import { CapabilityCard } from '../components/CapabilityCard'
import { CTASection } from '../components/CTASection'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { IndustryCard } from '../components/IndustryCard'
import { InsightCard } from '../components/InsightCard'
import { Leadership } from '../components/Leadership'
import { ProcessSteps } from '../components/ProcessSteps'
import { ScrollReveal } from '../components/ScrollReveal'
import { Ticker } from '../components/Ticker'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { TextLink } from '../components/Button'
import { site } from '../config/site'
import { businesses } from '../data/businesses'
import { capabilities } from '../data/capabilities'
import { machineryGallery } from '../data/gallery'
import { industries } from '../data/industries'
import { articles } from '../data/insights'
import { principles, processSteps } from '../data/process'
import { Seo } from '../seo/Seo'
import { localBusinessSchema, organizationSchema, websiteSchema } from '../seo/schema'
import { cssVars } from '../lib/style'

// Armour Tech's topics (security, vehicles) live on its own pages; the home page covers the Dada Sons side.
const dadaSons = businesses.filter((business) => business.slug === 'dada-sons')
const dadaCapabilities = capabilities.filter((capability) => capability.division === 'Dada Sons')
const homeIndustries = industries.filter((industry) => industry.slug !== 'security' && industry.slug !== 'automotive')
const featuredArticles = [...articles]
  .filter((article) => article.category !== 'security' && article.category !== 'automotive')
  .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)).slice(0, 3)

export default function Home() {
  return (
    <>
      <Seo
        title="Dada Sons Group | Industrial & Strategic Solutions"
        description="Dada Sons Group provides specialized solutions across textile machinery, cotton and consulting."
        path="/"
        jsonLd={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
      />

      <Hero />

      <Section tone="light" id="group" labelledBy="group-title" className="intro">
        <div className="intro__grid">
          <ScrollReveal className="intro__lead">
            <p className="eyebrow">The Group</p>
            <h2 id="group-title" className="display intro__title">
              Built around <em>expertise.</em> Driven by <em>opportunity.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="intro__copy" delay={140}>
            <p>
              Dada Sons Group operates across specialized industrial business areas, bringing together commercial expertise, sourcing capabilities and strategic advisory.
            </p>
            <p>
              Through Dada Sons, the group serves clients with specific requirements, whether that is a machinery purchase, a cotton enquiry or an advisory engagement.
            </p>
            <TextLink to="/about">Discover our story</TextLink>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="dark" id="businesses" labelledBy="businesses-title" grain className="businesses">
        <SectionHeading eyebrow="Our Business" as="h2" id="businesses-title" title={<>Machinery, cotton <em>and consulting.</em></>} intro="Dada Sons brings sourcing, machinery and advisory expertise to clients across industry." />
        <div className="businesses__grid businesses__grid--single">
          {dadaSons.map((business, index) => (
            <ScrollReveal key={business.slug} delay={index * 140}>
              <BusinessCard business={business} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Ticker />

      <Section tone="white" id="capabilities" labelledBy="capabilities-title" className="capabilities">
        <SectionHeading eyebrow="Our Capabilities" id="capabilities-title" title={<>What the group <em>does.</em></>} intro="Three capabilities in industrial sourcing and advisory." />
        <div className="capabilities__grid">
          {dadaCapabilities.map((capability, index) => (
            <ScrollReveal key={capability.index} delay={(index % 3) * 100}>
              <CapabilityCard capability={capability} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoal" id="gallery" labelledBy="gallery-title" grain className="home-gallery">
        <SectionHeading eyebrow="Inside the industry" id="gallery-title" title={<>The machinery behind <em>the cloth.</em></>} intro="Illustrative photography of textile machinery. Real project images will be added as they are confirmed." />
        <Gallery items={machineryGallery} label="Textile machinery photography" />
      </Section>

      <Section tone="light" id="industries" labelledBy="industries-title" className="industries">
        <SectionHeading eyebrow="Industries We Serve" id="industries-title" title={<>Where our expertise <em>applies.</em></>} />
        <ScrollReveal className="industries__panels" variant="fade">
          {homeIndustries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </ScrollReveal>
        <ScrollReveal className="industries__more">
          <TextLink to="/industries">All industries</TextLink>
        </ScrollReveal>
      </Section>

      <Section tone="dark" id="why" labelledBy="why-title" grain className="why">
        <div className="why__grid">
          <SectionHeading eyebrow="Why Dada Sons" id="why-title" title={<>Expertise that <em>connects</em> industries.</>} intro="We keep the claims modest and the conversations specific. This is how the group approaches every requirement." className="why__heading" />
          <ol className="why__list">
            {principles.map((principle, index) => (
              <ScrollReveal as="li" key={principle.index} delay={index * 90} className="why__item">
                <span className="why__index" aria-hidden="true">
                  {principle.index}
                </span>
                <h3 className="display why__title">{principle.title}</h3>
                <p>{principle.description}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="light" id="process" labelledBy="process-title" className="process">
        <SectionHeading eyebrow="Our Process" id="process-title" title={<>From requirement <em>to solution.</em></>} />
        <ProcessSteps steps={processSteps} />
      </Section>

      <Leadership id="leadership" text="Leading Dada Sons Group across its industrial and advisory business activities." action={<TextLink to="/about">About the group</TextLink>} />

      <Section tone="white" id="insights" labelledBy="insights-title" className="home-insights">
        <div className="home-insights__head">
          <SectionHeading eyebrow="Insights" id="insights-title" title={<>Perspectives on <em>industry</em> and sourcing.</>} intro="Sample editorial topics. Full articles are in preparation and will be published after review." />
          <ScrollReveal className="home-insights__all">
            <TextLink to="/insights">View all insights</TextLink>
          </ScrollReveal>
        </div>
        <div className="home-insights__grid" style={cssVars({ '--cols': featuredArticles.length })}>
          {featuredArticles.map((article, index) => (
            <ScrollReveal key={article.slug} delay={index * 110}>
              <InsightCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection
        title={<>Have a <em>requirement?</em></>}
        text="Speak with our team about your industrial or consulting requirements."
        cta={{ label: 'Start a conversation', to: '/contact' }}
        secondary={{ label: site.phone.display, href: site.phone.href }}
      />
    </>
  )
}
