import { Link } from 'react-router-dom'
import type { Crumb } from '../seo/schema'

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const items = [{ name: 'Home', path: '/' }, ...crumbs]
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((crumb, index) => {
          const last = index === items.length - 1
          return (
            <li key={crumb.path}>
              {last ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link to={crumb.path}>{crumb.name}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
