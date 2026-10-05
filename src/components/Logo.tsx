import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'

interface LogoProps {
  className?: string
  /** Larger lock-up for the footer. */
  large?: boolean
}

/**
 * TEMPORARY text-based mark: "DS" / DADA SONS GROUP.
 * TODO: replace the contents of this component with the supplied vector logo
 * (SVG) — nothing else in the codebase depends on how the mark is drawn.
 */
export function Logo({ className, large }: LogoProps) {
  return (
    <Link to="/" className={cx('logo', large && 'logo--large', className)}>
      <span className="logo__mark" aria-hidden="true">
        DS
      </span>
      <span className="logo__text">
        <span className="logo__name">Dada Sons</span> <span className="logo__group">Group</span>
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  )
}
