import { createContext, useContext, useEffect } from 'react'
import { applyHead, type SeoProps } from './head'

/** Server-side collector: the prerenderer reads whatever <Seo> was rendered for a route. */
export interface HeadCollector {
  current?: SeoProps
}

export const HeadContext = createContext<HeadCollector | null>(null)

export function Seo(props: SeoProps) {
  const collector = useContext(HeadContext)
  if (collector) collector.current = props

  const serialised = JSON.stringify(props)
  useEffect(() => {
    applyHead(JSON.parse(serialised) as SeoProps)
  }, [serialised])

  return null
}
