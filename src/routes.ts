import { articles, isPublished } from './data/insights'

export interface RouteEntry {
  path: string
  /** Included in sitemap.xml. */
  indexable: boolean
  changefreq: 'weekly' | 'monthly'
  priority: number
}

const page = (path: string, priority: number, changefreq: RouteEntry['changefreq'] = 'monthly'): RouteEntry => ({
  path,
  indexable: true,
  changefreq,
  priority,
})

/** Every URL that is prerendered at build time. Draft articles are prerendered but not indexable. */
export const routeEntries: RouteEntry[] = [
  page('/', 1, 'weekly'),
  page('/about', 0.8),
  page('/businesses', 0.9),
  page('/businesses/dada-sons', 0.9),
  page('/businesses/armour-tech', 0.9),
  page('/industries', 0.7),
  page('/solutions', 0.8),
  page('/projects', 0.5),
  page('/insights', 0.6, 'weekly'),
  page('/contact', 0.8),
  page('/cortexley', 0.4),
  ...articles.map((article) => ({
    path: `/insights/${article.slug}`,
    indexable: isPublished(article),
    changefreq: 'monthly' as const,
    priority: 0.5,
  })),
]
