import type { GalleryItem } from '../data/gallery'
import { cx } from '../lib/cx'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'

interface GalleryProps {
  items: GalleryItem[]
  label: string
  className?: string
}

/** Bento image grid with a slow hover zoom. Captions describe what is visible. */
export function Gallery({ items, label, className }: GalleryProps) {
  return (
    <ul className={cx('gallery', className)} aria-label={label}>
      {items.map((item, index) => (
        <ScrollReveal as="li" key={item.image} delay={(index % 4) * 80} className={cx('gallery__item', item.size && `gallery__item--${item.size}`)}>
          <figure>
            <Picture
              name={item.image}
              alt={item.alt}
              sizes={item.size === 'big' ? '(min-width: 760px) 50vw, 100vw' : '(min-width: 760px) 26vw, 50vw'}
              className="gallery__picture"
              imgClassName="gallery__img"
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        </ScrollReveal>
      ))}
    </ul>
  )
}
