// Static prerender: renders every route to HTML, injects each page's <head>, and writes
// sitemap.xml, robots.txt and 404.html. Runs after the client and SSR builds (see `npm run build`).
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, routeEntries, site } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
for (const marker of ['<!--seo-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`index.html template is missing ${marker}`)
}

// Preload the Latin font subsets used above the fold so the headline doesn't swap late.
const assetFiles = await readdir(path.join(distDir, 'assets'))
const fontPreloads = assetFiles
  .filter((file) => /^(cormorant-garamond|manrope)-latin-wght-normal-.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

function compose({ html, head }, routePath) {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*<!--seo-head-->/, `${head}\n    ${fontPreloads}`)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${routePath}">${html}</div>`)
}

async function writePage(routePath, output) {
  const target = routePath === '/' ? path.join(distDir, 'index.html') : path.join(distDir, routePath, 'index.html')
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, output)
}

for (const entry of routeEntries) {
  const result = render(entry.path)
  await writePage(entry.path, compose(result, entry.path))
  console.log(`  ✓ ${entry.path}${entry.indexable ? '' : '  (noindex)'}`)
}

// GitHub Pages and most static hosts serve /404.html for unknown URLs.
await writeFile(path.join(distDir, '404.html'), compose(render('/page-not-found'), '/page-not-found'))
console.log('  ✓ /404.html')

const urls = routeEntries
  .filter((entry) => entry.indexable)
  .map(
    (entry) =>
      `  <url>\n    <loc>${site.url}${entry.path}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')

await writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
console.log('  ✓ sitemap.xml, robots.txt')

await rm(serverDir, { recursive: true, force: true })
console.log(`\nPrerendered ${routeEntries.length + 1} pages for ${site.url}`)
