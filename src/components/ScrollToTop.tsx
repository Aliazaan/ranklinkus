import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On navigation: jump to the #hash target if there is one, otherwise to the top of the page,
 * and move keyboard focus to <main> so screen-reader and keyboard users land on the new content.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    const isFirst = firstRender.current
    firstRender.current = false

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: isFirst ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }

    if (isFirst) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
