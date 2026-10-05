import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { TextLink } from '../components/Button'
import { CTASection } from '../components/CTASection'
import { InsightCard } from '../components/InsightCard'
import { Picture } from '../components/Picture'
import { Section } from '../components/Section'
import { articles, categoryLabel, getArticle, isPublished, readingMinutes } from '../data/insights'
import { contactPath } from '../data/areas'
import { Seo } from '../seo/Seo'
import { imageUrl } from '../lib/images'
import { articleSchema, breadcrumbSchema, type Crumb } from '../seo/schema'
import NotFound from './NotFound'

export default function InsightArticle() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const path = `/insights/${article.slug}`
  const published = isPublished(article)
  const crumbs: Crumb[] = [
    { name: 'Insights', path: '/insights' },
    { name: article.title, path },
  ]
  const related = articles.filter((other) => other.slug !== article.slug).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 3)

  return (
    <>
      <Seo
        title={`${article.title} | Dada Sons Group`}
        description={article.excerpt}
        path={path}
        type="article"
        // Drafts are kept out of search results and the sitemap until `publishedAt` is set.
        noindex={!published}
        image={imageUrl(article.image, 1280, 'webp')}
        imageAlt={article.imageAlt}
        publishedTime={article.publishedAt}
        jsonLd={[breadcrumbSchema(crumbs), ...(published ? [articleSchema(article, path)] : [])]}
      />

      <section className="article-hero tone-dark" aria-labelledby="page-title">
        <div className="container article-hero__inner">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow">
            {categoryLabel(article.category)} · {readingMinutes(article)} min read
          </p>
          <h1 id="page-title" className="display article-hero__title">
            {article.title}
          </h1>
          <p className="article-hero__lead">{article.excerpt}</p>
        </div>
        <div className="container article-hero__media">
          <Picture name={article.image} alt={article.imageAlt} priority sizes="(min-width: 960px) 1100px, 92vw" className="article-hero__picture" imgClassName="article-hero__img" />
        </div>
      </section>

      <Section tone="light" className="article">
        <div className="article__layout">
          {!published && (
            <aside className="article__draft" aria-label="Editorial status">
              <strong>Editorial draft.</strong> This article is a placeholder outlining general considerations. It is awaiting review before publication and does not describe any specific project, product or result.
            </aside>
          )}

          <div className="prose">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            {article.checklist && (
              <section className="prose__checklist">
                <h2 className="display">{article.checklist.title}</h2>
                <ul>
                  {article.checklist.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <p className="article__back">
            <TextLink to="/insights">Back to all insights</TextLink>
          </p>
        </div>
      </Section>

      <Section tone="white" className="article-related" labelledBy="related-title">
        <h2 id="related-title" className="display article-related__title">
          More insights
        </h2>
        <div className="home-insights__grid">
          {related.map((other) => (
            <InsightCard key={other.slug} article={other} />
          ))}
        </div>
      </Section>

      <CTASection title={<>Questions about your <em>requirement?</em></>} text="Speak with our team about your industrial, consulting or security requirements." cta={{ label: 'Start a conversation', to: contactPath() }} />
    </>
  )
}
