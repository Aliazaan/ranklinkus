import { Link } from 'react-router-dom'
import { categoryLabel, isPublished, readingMinutes, type Article } from '../data/insights'
import { cx } from '../lib/cx'
import { Picture } from './Picture'

interface InsightCardProps {
  article: Article
  featured?: boolean
}

export function InsightCard({ article, featured }: InsightCardProps) {
  const meta = [categoryLabel(article.category), `${readingMinutes(article)} min read`, isPublished(article) ? undefined : 'Editorial draft']
    .filter(Boolean)
    .join(' · ')

  return (
    <article className={cx('insight', featured && 'insight--featured')}>
      <div className="insight__media">
        <Picture
          name={article.image}
          alt={article.imageAlt}
          sizes={featured ? '(min-width: 960px) 56vw, 92vw' : '(min-width: 960px) 30vw, 92vw'}
          className="insight__picture"
          imgClassName="insight__img"
        />
      </div>
      <div className="insight__body">
        <p className="insight__meta">{meta}</p>
        <h3 className="display insight__title">
          <Link to={`/insights/${article.slug}`} className="insight__link">
            {article.title}
          </Link>
        </h3>
        <p className="insight__excerpt">{article.excerpt}</p>
        <span className="insight__more" aria-hidden="true">
          Read article →
        </span>
      </div>
    </article>
  )
}
