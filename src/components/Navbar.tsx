import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../data/nav'
import { cx } from '../lib/cx'
import { ButtonLink } from './Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const SCROLL_THRESHOLD = 40
const MOBILE_MENU_ID = 'mobile-menu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  // Transparent over the hero, solid once the page has scrolled.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Navigating always closes the menu.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const closeMenu = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <>
      <header className={cx('nav', (scrolled || open) && 'is-solid', open && 'is-open')}>
        <div className="container nav__inner">
          <Logo className="nav__logo" />

          <nav className="nav__links" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cx('nav__link', isActive && 'is-active')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <ButtonLink to="/contact" variant="outline" className="nav__cta">
            Contact us
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>
      </header>

      <MobileMenu id={MOBILE_MENU_ID} open={open} onClose={closeMenu} toggleRef={toggleRef} />
    </>
  )
}
