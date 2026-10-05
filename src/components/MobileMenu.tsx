import { useEffect, useRef, type RefObject } from 'react'
import { NavLink } from 'react-router-dom'
import { primaryNav } from '../data/nav'
import { site } from '../config/site'
import { cx } from '../lib/cx'
import { cssVars } from '../lib/style'
import { ButtonLink } from './Button'

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  /** The header's toggle button — kept inside the keyboard loop so it is never lost. */
  toggleRef: RefObject<HTMLButtonElement | null>
}

export function MobileMenu({ id, open, onClose, toggleRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [toggleRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])].filter(
        (node): node is HTMLElement => node !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, toggleRef])

  return (
    <div id={id} ref={panelRef} className={cx('mobile-menu tone-dark grain', open && 'is-open')} inert={!open} role="dialog" aria-modal="true" aria-label="Site menu">
      <nav className="mobile-menu__nav" aria-label="Mobile">
        <ul>
          {primaryNav.map((item, index) => (
            <li key={item.to} style={cssVars({ '--i': index })}>
              <NavLink to={item.to} className={({ isActive }) => cx('mobile-menu__link', isActive && 'is-active')}>
                <span className="mobile-menu__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu__foot" style={cssVars({ '--i': primaryNav.length })}>
        <ButtonLink to="/contact" variant="light" arrow className="mobile-menu__cta">
          Contact us
        </ButtonLink>
        <p className="mobile-menu__contact">
          <a href={site.phone.href}>{site.phone.display}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </div>
  )
}
