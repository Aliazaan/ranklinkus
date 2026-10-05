import { absoluteUrl, site } from '../config/site'

export interface SeoProps {
  /** Full <title> text. */
  title: string
  description: string
  /** Route path used for the canonical URL, e.g. "/about". */
  path: string
  /** Open Graph / Twitter image (site-relative path or absolute URL). */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object[]
  publishedTime?: string
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  text?: string
}

export const DEFAULT_OG_IMAGE = '/og-default.jpg'
const DEFAULT_OG_ALT = 'Dada Sons Group — Industrial Expertise. Strategic Solutions.'

const toAbsolute = (value: string) => (/^https?:\/\//.test(value) ? value : absoluteUrl(value))

/** Everything the page needs in <head> besides <title>. Shared by the prerenderer and the client. */
export function headTags(seo: SeoProps): HeadTag[] {
  const url = absoluteUrl(seo.path)
  const image = toAbsolute(seo.image ?? DEFAULT_OG_IMAGE)
  const imageAlt = seo.imageAlt ?? DEFAULT_OG_ALT

  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    {
      tag: 'meta',
      attrs: {
        name: 'robots',
        content: seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      },
    },
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: site.locale } },
    { tag: 'meta', attrs: { property: 'og:type', content: seo.type ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: imageAlt } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]

  if (seo.publishedTime) {
    tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: seo.publishedTime } })
  }

  for (const node of seo.jsonLd ?? []) {
    // "<" is escaped so structured data can never close the script element early.
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(node).replace(/</g, '\\u003c') })
  }

  return tags
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Server side: head markup for a prerendered page. */
export function renderHeadHtml(seo: SeoProps): string {
  const tags = headTags(seo).map(({ tag, attrs, text }) => {
    const attributes = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
      .join(' ')
    if (tag === 'script') return `<script ${attributes} data-seo>${text ?? ''}</script>`
    return `<${tag} ${attributes} data-seo>`
  })
  return [`<title>${escapeText(seo.title)}</title>`, ...tags].join('\n    ')
}

/** Client side: keep <head> in step with the current route. */
export function applyHead(seo: SeoProps): void {
  document.title = seo.title
  document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove())

  for (const { tag, attrs, text } of headTags(seo)) {
    const element = document.createElement(tag)
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value)
    if (text) element.textContent = text
    element.setAttribute('data-seo', '')
    document.head.appendChild(element)
  }
}
