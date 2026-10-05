import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Fades each newly navigated page in. The first page (server-rendered, hydrated) is not
 * animated, so it never delays the hero. Re-mounts on every path change via `key`.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const committedPath = useRef(pathname)
  const navigated = pathname !== committedPath.current

  useEffect(() => {
    committedPath.current = pathname
  }, [pathname])

  return (
    <div key={pathname} className={navigated ? 'page-enter' : undefined}>
      {children}
    </div>
  )
}
