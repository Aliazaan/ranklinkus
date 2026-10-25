import { ButtonLink, TextLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { Picture } from '../components/Picture'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { contactPath } from '../data/areas'
import { newMachines, usedMachines, type Machine } from '../data/machines'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Machines', path: '/machines' }]

const CARD_SIZES = '(min-width: 960px) 30vw, (min-width: 600px) 45vw, 92vw'
const THUMB_SIZES = '(min-width: 960px) 15vw, (min-width: 600px) 22vw, 46vw'

/** Keeps hyphenated model codes such as 21C-S on one line. */
const keepModelsTogether = (name: string) =>
  name.split(' ').map((word, index) =>
    word.includes('-') ? (
      <span key={index} style={{ whiteSpace: 'nowrap' }}>
        {word}{' '}
      </span>
    ) : (
      `${word} `
    ),
  )

function MachineList({ machines, label }: { machines: Machine[]; label: string }) {
  if (machines.length === 0) {
    return (
      <p className="machines__pending">
        <span className="machines__pending-tag">Placeholder</span> The {label.toLowerCase()} list will be published here once Dada Sons
        confirms it. To ask about availability now, contact us.
      </p>
    )
  }

  return (
    <ol className="machines__grid">
      {machines.map((machine, index) => (
        <ScrollReveal as="li" key={machine.name} delay={(index % 3) * 90} className="machine">
          <div className="machine__media">
            <Picture name={machine.photos[0].image} alt={machine.photos[0].alt} sizes={CARD_SIZES} className="machine__picture" imgClassName="machine__img" />
            <span className="machine__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          {machine.photos.length > 1 && (
            <ul className="machine__thumbs">
              {machine.photos.slice(1).map((photo) => (
                <li key={photo.image} className="machine__thumb">
                  <Picture name={photo.image} alt={photo.alt} sizes={THUMB_SIZES} className="machine__picture" imgClassName="machine__img" />
                </li>
              ))}
            </ul>
          )}
          <h3 className="display machine__name">{keepModelsTogether(machine.name)}</h3>
          {machine.detail && <p className="machine__detail">{machine.detail}</p>}
          {machine.note && <p className="machine__note">{machine.note}</p>}
          <TextLink to={contactPath('textile-machinery')}>Enquire about this machine</TextLink>
        </ScrollReveal>
      ))}
    </ol>
  )
}

export default function Machines() {
  return (
    <>
      <Seo
        title="New & Used Textile Machines | Dada Sons Group"
        description="New and used textile machinery from Dada Sons, Lahore. Browse the machines on offer and enquire about availability."
        path="/machines"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero
        eyebrow="Textile Machinery"
        title={<>New & used <em>machines</em></>}
        subtitle="Textile machines supplied through Dada Sons. Browse the new and used lists, then contact us about any machine."
        image="hero-textile-machinery"
        crumbs={crumbs}
        actions={
          <>
            <ButtonLink href="#new" variant="light">
              New machines
            </ButtonLink>
            <ButtonLink href="#used" variant="outline">
              Used machines
            </ButtonLink>
          </>
        }
      />

      <Section tone="light" id="new" labelledBy="new-title" className="machines">
        <SectionHeading eyebrow="Section 01" id="new-title" title={<>New <em>machines.</em></>} intro="Machines listed in sequence. Availability is confirmed on enquiry." />
        <MachineList machines={newMachines} label="New machines" />
      </Section>

      <Section tone="dark" id="used" labelledBy="used-title" className="machines">
        <SectionHeading eyebrow="Section 02" id="used-title" title={<>Used <em>machines.</em></>} intro="Pre-owned machines listed in sequence. Condition and availability are confirmed on enquiry." />
        <MachineList machines={usedMachines} label="Used machines" />
      </Section>

      <CTASection title={<>Looking for a <em>specific machine?</em></>} text="Tell us what you need and we will confirm what is available." cta={{ label: 'Contact us', to: contactPath('textile-machinery') }} />
    </>
  )
}
