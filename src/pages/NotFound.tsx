import { ButtonLink } from '../components/Button'
import { Seo } from '../seo/Seo'

export default function NotFound() {
  return (
    <section className="not-found tone-dark grain" aria-labelledby="page-title">
      <Seo title="Page not found | Dada Sons Group" description="The page you were looking for could not be found." path="/404" noindex />
      <div className="container not-found__inner">
        <p className="eyebrow">Error 404</p>
        <h1 id="page-title" className="display not-found__title">
          This page could not be <em>found.</em>
        </h1>
        <p className="not-found__text">The link may be out of date, or the page may have moved. Try one of these instead.</p>
        <div className="not-found__actions">
          <ButtonLink to="/" variant="light" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink to="/businesses" variant="outline">
            Our businesses
          </ButtonLink>
          <ButtonLink to="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
