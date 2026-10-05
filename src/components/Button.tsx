import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Icon } from './Icon'

export type ButtonVariant = 'primary' | 'light' | 'outline' | 'outline-dark'

interface BaseProps {
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
  children: ReactNode
}

const classes = (variant: ButtonVariant, className?: string) => cx('btn', `btn--${variant}`, className)

const Label = ({ arrow, children }: { arrow?: boolean; children: ReactNode }) => (
  <>
    <span className="btn__label">{children}</span>
    {arrow && <Icon name="arrow" className="btn__arrow" size={16} />}
  </>
)

type ButtonLinkProps = BaseProps & ({ to: string; href?: never } | { href: string; to?: never })

/** Internal routes use `to`; tel:, mailto: and external URLs use `href`. */
export function ButtonLink({ variant = 'primary', arrow, className, children, to, href }: ButtonLinkProps) {
  if (to !== undefined) {
    return (
      <Link to={to} className={classes(variant, className)}>
        <Label arrow={arrow}>{children}</Label>
      </Link>
    )
  }
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      className={classes(variant, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Label arrow={arrow}>{children}</Label>
    </a>
  )
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function Button({ variant = 'primary', arrow, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      <Label arrow={arrow}>{children}</Label>
    </button>
  )
}

interface TextLinkProps {
  to: string
  children: ReactNode
  className?: string
  /** Stretch the link's hit area across its nearest positioned ancestor (card). */
  stretch?: boolean
}

export function TextLink({ to, children, className, stretch }: TextLinkProps) {
  return (
    <Link to={to} className={cx('text-link', stretch && 'text-link--stretch', className)}>
      <span className="text-link__label">{children}</span>
      <Icon name="arrow" className="text-link__arrow" size={15} />
    </Link>
  )
}
