import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { site } from './config/site'
import { routeEntries } from './routes'
import { HeadContext, type HeadCollector } from './seo/Seo'
import { renderHeadHtml } from './seo/head'

export { routeEntries, site }

/** Renders one URL to static HTML plus the <head> markup its <Seo> produced. */
export function render(url: string) {
  const collector: HeadCollector = {}
  const html = renderToString(
    <HeadContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  if (!collector.current) throw new Error(`No <Seo> was rendered for ${url}`)
  return { html, head: renderHeadHtml(collector.current), seo: collector.current }
}
