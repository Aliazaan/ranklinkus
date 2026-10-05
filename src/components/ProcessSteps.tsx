import type { Step } from '../data/process'
import { cx } from '../lib/cx'
import { cssVars } from '../lib/style'
import { ScrollReveal } from './ScrollReveal'

interface ProcessStepsProps {
  steps: Step[]
  className?: string
}

/** Numbered steps joined by a line that draws itself as the list scrolls into view. */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ScrollReveal as="ol" variant="line" className={cx('steps', className)} style={cssVars({ '--steps': steps.length })}>
      {steps.map((step, index) => (
        <li key={step.index} className="steps__item" style={cssVars({ '--i': index })}>
          <span className="steps__dot" aria-hidden="true" />
          <p className="steps__index">{step.index}</p>
          <h3 className="steps__title display">{step.title}</h3>
          <p className="steps__text">{step.description}</p>
        </li>
      ))}
    </ScrollReveal>
  )
}
