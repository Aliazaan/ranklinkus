import { createElement, useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

type Variant = 'up' | 'fade' | 'line' | 'image'

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  /** Delay in ms, for staggering siblings. */
  delay?: number
  variant?: Variant
}

/**
 * Reveals its content once it scrolls into view. Server markup is fully visible; the hidden
 * start state only applies once JavaScript has marked <html class="js"> (see index.html),
 * and prefers-reduced-motion disables it entirely in CSS.
 */
export function ScrollReveal({ as = 'div', delay = 0, variant = 'up', className, children, style, ...rest }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return createElement(
    as,
    {
      ref,
      className: cx('reveal', `reveal--${variant}`, visible && 'is-visible', className),
      style: { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties,
      ...rest,
    },
    children,
  )
}
