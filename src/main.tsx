import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/manrope/wght.css'
import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const normalise = (path: string) => path.replace(/\/+$/, '') || '/'

// Prerendered pages record the route they were rendered for. Hydrate only when it is the
// route being viewed; a host that rewrites every URL to index.html (or the 404 page) falls
// back to a clean client render instead of a hydration mismatch.
const prerenderedPath = container.dataset.path
const canHydrate = container.firstElementChild !== null && prerenderedPath !== undefined && normalise(prerenderedPath) === normalise(window.location.pathname)

if (canHydrate) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
