import { PROJECT_PLACEHOLDER, type Project } from '../data/projects'
import { cx } from '../lib/cx'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'

export function ProjectCard({ project, flip }: { project: Project; flip?: boolean }) {
  const rows: [string, string][] = [
    ['Project / Solution', project.title],
    ['Industry', project.industry],
    ['Scope', project.scope],
    ['Result', project.result],
  ]

  return (
    <ScrollReveal as="article" className={cx('project', flip && 'project--flip')}>
      <div className="project__media">
        <Picture name={project.image} alt={project.imageAlt} sizes="(min-width: 960px) 46vw, 92vw" className="project__picture" imgClassName="project__img" />
        <span className="project__tag">Placeholder</span>
      </div>
      <div className="project__body">
        <p className="project__index" aria-hidden="true">
          {project.index}
        </p>
        <h3 className="display project__title">{project.title}</h3>
        <dl className="project__facts">
          {rows.map(([label, value]) => (
            <div key={label} className="project__fact">
              <dt>{label}</dt>
              <dd className={value === PROJECT_PLACEHOLDER ? 'is-pending' : undefined}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ScrollReveal>
  )
}
