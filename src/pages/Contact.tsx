import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { Icon } from '../components/Icon'
import { Picture } from '../components/Picture'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { mapsSearchUrl, site } from '../config/site'
import { isBusinessArea } from '../data/areas'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, localBusinessSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Contact', path: '/contact' }]

export default function Contact() {
  const [params] = useSearchParams()
  const requested = params.get('area')
  const initialArea = isBusinessArea(requested) ? requested : undefined

  return (
    <>
      <Seo
        title="Contact Dada Sons Group | Lahore, Pakistan"
        description="Contact Dada Sons Group in Lahore, Pakistan about textile machinery, cotton, consulting, armoured vehicles, bulletproof mirrors or security retrofitting."
        path="/contact"
        jsonLd={[breadcrumbSchema(crumbs), localBusinessSchema()]}
      />

      <section className="contact-top tone-dark grain" aria-labelledby="page-title">
        <div className="contact-top__media" aria-hidden="true">
          <Picture name="hero-contact" alt="" priority className="contact-top__picture" imgClassName="contact-top__img" />
        </div>
        <div className="contact-top__veil" aria-hidden="true" />

        <div className="container contact-top__grid">
          <div className="contact-top__intro">
            <Breadcrumbs crumbs={crumbs} />
            <p className="eyebrow">Contact</p>
            <h1 id="page-title" className="display contact-top__title">
              Let&rsquo;s discuss your <em>requirement.</em>
            </h1>
            <p className="contact-top__lead">Tell us what you are trying to achieve. We will come back with the right questions first.</p>

            <address className="contact-card">
              <p className="contact-card__name">
                {site.ceo.name}
                <span>{site.ceo.shortTitle}</span>
              </p>
              <ul>
                <li>
                  <Icon name="phone" size={18} />
                  <a href={site.phone.href}>{site.phone.display}</a>
                </li>
                <li>
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <Icon name="pin" size={18} />
                  <span>
                    {site.address.lines.map((line, index) => (
                      <span key={line}>
                        {line}
                        {index < site.address.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          <div className="contact-top__form tone-light">
            <h2 className="display contact-top__form-title">Send an enquiry</h2>
            <ContactForm initialArea={initialArea} />
          </div>
        </div>
      </section>

      <Section tone="light" id="location" labelledBy="location-title" className="location">
        <div className="location__grid">
          <ScrollReveal className="location__copy">
            <p className="eyebrow">Location</p>
            <h2 id="location-title" className="display location__title">
              {site.address.city}, {site.address.countryName}
            </h2>
            <p>
              {site.address.lines.slice(0, 2).join(', ')}.
            </p>
            <a className="text-link" href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
              <span className="text-link__label">Search this address on Google Maps</span>
              <Icon name="external" size={15} className="text-link__arrow" />
            </a>
          </ScrollReveal>

          <ScrollReveal className="map-placeholder" delay={120} variant="fade">
            <div role="img" aria-label="Map placeholder. A map will be added once the location is confirmed.">
              <span className="map-placeholder__pin">
                <Icon name="pin" size={26} />
              </span>
              <p className="map-placeholder__label">Map placeholder</p>
              <p className="map-placeholder__note">An interactive map will be added once the final location is confirmed.</p>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  )
}
