import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CTASection } from '../components/CTASection'
import { InsightCard } from '../components/InsightCard'
import { PageHero } from '../components/PageHero'
import { ScrollReveal } from '../components/ScrollReveal'
import { Section } from '../components/Section'
import { articles, categoryLabel, insightCategories, isInsightCategory, type InsightCategory } from '../data/insights'
import { cx } from '../lib/cx'
import { Seo } from '../seo/Seo'
import { breadcrumbSchema, type Crumb } from '../seo/schema'

const crumbs: Crumb[] = [{ name: 'Insights', path: '/insights' }]

type Filter = InsightCategory | 'all'

export default function Insights() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')

  // The URL is only read after mount so server markup and first client render agree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const raw = params.get('category')
  const category: Filter = mounted && isInsightCategory(raw) ? raw : 'all'

  const setCategory = (next: Filter) => {
    const updated = new URLSearchParams(params)
    if (next === 'all') updated.delete('category')
    else updated.set('category', next)
    setParams(updated, { replace: true, preventScrollReset: true })
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return articles.filter((article) => {
      if (category !== 'all' && article.category !== category) return false
      if (!needle) return true
      return [article.title, article.excerpt, categoryLabel(article.category)].some((text) => text.toLowerCase().includes(needle))
    })
  }, [category, query])

  const showFeatured = category === 'all' && !query.trim()
  const featured = showFeatured ? results.find((article) => article.featured) : undefined
  const rest = featured ? results.filter((article) => article !== featured) : results

  return (
    <>
      <Seo
        title="Insights | Dada Sons Group"
        description="Editorial insights from Dada Sons Group on textile machinery, cotton, industrial sourcing, security and automotive protection."
        path="/insights"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <PageHero eyebrow="Insights" title="Insights" subtitle="Practical perspectives on textile machinery, cotton, industrial sourcing and security." image="hero-insights" crumbs={crumbs} />

      <Section tone="white" id="articles" labelledBy="articles-title" className="insights">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>

        <div className="insights__bar">
          <div className="insights__search">
            <label htmlFor="insight-search" className="sr-only">
              Search insights
            </label>
            <input id="insight-search" type="search" placeholder="Search insights" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
          </div>
          <div className="insights__filters" role="group" aria-label="Filter by category">
            {[{ value: 'all' as const, label: 'All' }, ...insightCategories].map((item) => (
              <button key={item.value} type="button" className={cx('chip', category === item.value && 'is-active')} aria-pressed={category === item.value} onClick={() => setCategory(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="insights__note">These are editorial placeholders outlining general considerations. Each will be reviewed before it is published.</p>

        <p className="sr-only" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? 'article' : 'articles'} shown
        </p>

        {featured && (
          <ScrollReveal className="insights__featured">
            <InsightCard article={featured} featured />
          </ScrollReveal>
        )}

        {rest.length > 0 && (
          <div className="insights__grid">
            {rest.map((article, index) => (
              <ScrollReveal key={article.slug} delay={(index % 3) * 90}>
                <InsightCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {results.length === 0 && (
          <div className="insights__empty">
            <p className="display">No articles match your search.</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
            >
              <span className="text-link__label">Clear filters</span>
            </button>
          </div>
        )}
      </Section>

      <CTASection title={<>Looking for a specific <em>answer?</em></>} text="If your question is not covered here, speak with our team directly." cta={{ label: 'Start a conversation', to: '/contact' }} />
    </>
  )
}
