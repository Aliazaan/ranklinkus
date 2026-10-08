import { useId, useState, type KeyboardEvent } from 'react'
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

interface GalleryGroup {
  id: string
  label: string
  items: GalleryItem[]
}

/** Two galleries behind an accessible tab control (arrow keys move between tabs). */
export function GalleryTabs({ groups }: { groups: GalleryGroup[] }) {
  const base = useId()
  const [active, setActive] = useState(0)

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + groups.length) % groups.length
    setActive(next)
    document.getElementById(`${base}-tab-${next}`)?.focus()
  }

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Gallery category">
        {groups.map((group, index) => (
          <button
            key={group.id}
            id={`${base}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${base}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            className={cx('tabs__tab', active === index && 'is-active')}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            {group.label}
          </button>
        ))}
      </div>
      {groups.map((group, index) => (
        <div key={group.id} id={`${base}-panel-${index}`} role="tabpanel" aria-labelledby={`${base}-tab-${index}`} hidden={active !== index} className={cx('tabs__panel', group.id === 'protection' && 'theme-armour')}>
          <Gallery items={group.items} label={group.label} />
        </div>
      ))}
    </div>
  )
}
