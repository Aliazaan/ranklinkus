import { absoluteUrl, site } from '../config/site'
import type { Article } from '../data/insights'
import { imageUrl } from '../lib/images'

const CONTEXT = 'https://schema.org'

const organizationId = `${site.url}/#organization`

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
})

export function organizationSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl('/icons/logo-512.png'),
    description: site.description,
    email: site.email,
    telephone: site.phone.e164,
    address: postalAddress(),
  }
}

export function localBusinessSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: absoluteUrl('/og-default.jpg'),
    description: site.description,
    email: site.email,
    telephone: site.phone.e164,
    address: postalAddress(),
    parentOrganization: { '@id': organizationId },
  }
}

export function websiteSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': organizationId },
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function articleSchema(article: Article, path: string) {
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(imageUrl(article.image, 1280)),
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: site.name, '@id': organizationId },
    publisher: { '@type': 'Organization', name: site.name, '@id': organizationId },
    mainEntityOfPage: absoluteUrl(path),
  }
}
