import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { projects } from '../data/projects'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Projects', path: '/projects' }]

export default function Projects() {
  return (
    <>
      <Seo
        title="Selected Solutions | Dada Sons Group"
        description="Selected solutions from Dada Sons Group. Project case studies are being prepared and will be published here."
        path="/projects"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero eyebrow="Projects" title="Selected Solutions" subtitle="The group's project work, presented as it is confirmed." image="hero-projects" crumbs={crumbs} />

      <Section tone="light" id="notice" labelledBy="notice-title" className="projects-notice">
        <ScrollReveal className="projects-notice__panel">
          <p className="eyebrow">Project information coming soon</p>
          <h2 id="notice-title" className="display projects-notice__title">
            Case studies are being prepared.
          </h2>
          <p>
            The entries below show the structure each case study will follow. They are placeholders: no client names, scopes or results have been published yet, and none should be inferred.
          </p>
        </ScrollReveal>
      </Section>

      <Section tone="white" id="solutions" labelledBy="projects-title" className="projects">
        <h2 id="projects-title" className="sr-only">
          Case study placeholders
        </h2>
        <div className="projects__list">
          {projects.map((project, index) => (
            <ProjectCard key={project.index} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      </Section>

      <CTASection title={<>Have a project in <em>mind?</em></>} text="Speak with our team about your industrial, consulting or security requirements." cta={{ label: 'Start a conversation', to: '/contact' }} />
    </>
  )
}
