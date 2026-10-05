import { Link } from 'react-router-dom'
import { mapsSearchUrl, site } from '../config/site'
import { footerNav, type NavItem } from '../data/nav'
import { ButtonLink } from './Button'
import { Icon } from './Icon'
import { Logo } from './Logo'

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav className="footer__col" aria-label={title}>
      <h2 className="footer__col-title">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="footer__link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="footer tone-dark grain">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo large />
            <p className="footer__tagline display">{site.tagline}</p>
            <ButtonLink to="/contact" variant="outline" arrow>
              Start a conversation
            </ButtonLink>
          </div>

          <div className="footer__cols">
            <FooterColumn title="Company" items={footerNav.company} />
            <FooterColumn title="Businesses" items={footerNav.businesses} />
            <FooterColumn title="Solutions" items={footerNav.solutions} />
            <FooterColumn title="Insights" items={footerNav.insights} />
          </div>
        </div>

        <address className="footer__contact">
          <div className="footer__contact-item">
            <Icon name="phone" size={18} />
            <div>
              <span className="footer__contact-label">{site.ceo.name} · {site.ceo.shortTitle}</span>
              <a href={site.phone.href} className="footer__link">
                {site.phone.display}
              </a>
            </div>
          </div>
          <div className="footer__contact-item">
            <Icon name="mail" size={18} />
            <div>
              <span className="footer__contact-label">Email</span>
              <a href={`mailto:${site.email}`} className="footer__link">
                {site.email}
              </a>
            </div>
          </div>
          <div className="footer__contact-item">
            <Icon name="pin" size={18} />
            <div>
              <span className="footer__contact-label">Address</span>
              <a href={mapsSearchUrl} className="footer__link" target="_blank" rel="noopener noreferrer">
                {site.address.lines.map((line, index) => (
                  <span key={line}>
                    {line}{' '}
                    {index < site.address.lines.length - 1 && <br />}
                  </span>
                ))}
                <span className="sr-only">(opens map search in a new tab)</span>
              </a>
            </div>
          </div>
        </address>

        <div className="footer__bottom">
          <p>{site.copyright}</p>
          <p>{site.altTagline}</p>
        </div>
      </div>

      <p className="footer__wordmark" aria-hidden="true">
        Dada Sons
      </p>
    </footer>
  )
}
