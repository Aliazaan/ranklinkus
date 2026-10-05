# Dada Sons Group — website

Official corporate website for **Dada Sons Group** and its two divisions, **Dada Sons** (textile machinery, cotton,
consulting) and **Armour Tech / AAT** (armoured vehicles, bulletproof mirrors, security retrofitting).

React 19 · Vite · TypeScript · React Router · hand-written modular CSS. Every route is prerendered to static HTML at
build time (SEO, fast first paint) and then hydrated.

## Run it

```bash
npm install
npm run dev        # development server  → http://localhost:5173
npm run build      # typecheck + production build + prerender → dist/
npm run preview    # serve the production build locally
npm run images     # re-generate optimised images from scripts/images.config.mjs
```

Requires Node 20+.

## Routes

`/` · `/about` · `/businesses` · `/businesses/dada-sons` · `/businesses/armour-tech` · `/industries` · `/solutions` ·
`/projects` · `/insights` · `/insights/:slug` · `/contact` · `404`

`npm run build` writes one `index.html` per route (e.g. `dist/about/index.html`), plus `404.html`, `sitemap.xml` and
`robots.txt`. Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel, S3 +
CDN…). The host should compress text assets (gzip/brotli) and serve `404.html` for unknown URLs; both are standard.

## Where things live

| To change… | Edit |
| --- | --- |
| Phone, email, address, CEO, tagline, site URL | `src/config/site.ts` |
| Business divisions | `src/data/businesses.ts` |
| Capabilities, industries, solutions | `src/data/capabilities.ts`, `industries.ts`, `solutions.ts` |
| Process steps, "why Dada Sons" principles | `src/data/process.ts` |
| Insights / articles | `src/data/insights.ts` |
| Projects / case studies | `src/data/projects.ts` |
| Navigation and footer links | `src/data/nav.ts` |
| Colours, spacing, fonts | `src/styles/tokens.css` |
| Armour Tech / Dada Sons page identities | `src/styles/themes.css` |
| Page `<title>`, description, structured data | the `<Seo>` block at the top of each file in `src/pages/` |

Pages and components are driven by these data objects, so most copy changes never touch markup.

### Replacing the logo
The mark is a temporary text lock-up (`DS` / DADA SONS GROUP) in `src/components/Logo.tsx`. Swap that component's
contents for the supplied SVG — nothing else depends on how it is drawn. Also replace `public/favicon.svg`,
`public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icons/*` and `public/og-default.jpg`.
Armour Tech's AAT logo can be added to `src/pages/ArmourTech.tsx` once supplied.

### Replacing images
1. Put the real photo in `assets-src/` (e.g. `assets-src/textile-floor.jpg`).
2. In `scripts/images.config.mjs`, change that entry's `source` from `pexels:<id>` to `client:textile-floor.jpg`
   (adjust `ratio`/`focus` to taste).
3. Run `npm run images`. It crops, colour-grades to one consistent look, and writes AVIF + WebP at several widths into
   `public/images` and refreshes `src/data/image-manifest.json` (which gives every image its intrinsic size, so
   there is no layout shift). `npm run images -- name-a name-b` regenerates only the named entries.
4. Update the `alt` text where the image is used.

See `IMAGE-CREDITS.md` for the current placeholder sources.

### Contact form
The form validates on the client (name, email, business area and message are required; email and phone are checked).
**No backend is connected.** Until one is, submitting opens the visitor's own email app with the enquiry prepared, and
the on-screen message says so. To go live set `VITE_ENQUIRY_ENDPOINT` (e.g. a Formspree URL or your own API) — see
`src/lib/enquiry.ts` (`TODO: Connect form to Resend / Formspree / custom API`).

### Insights and indexing
Articles are **editorial placeholders** (general guidance, no statistics or claims). While an article has no
`publishedAt` date it is labelled "Editorial draft", marked `noindex` and left out of `sitemap.xml`. Set `publishedAt`
(ISO date) after review to publish it: it then becomes indexable, enters the sitemap and gets `Article` structured data.

### Environment
Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the production origin (canonical URLs, Open Graph, sitemap and
structured data all use it).

## Quality checks run on this build
Typecheck and production build pass. Every route was exercised in a real browser at 1440 / 768 / 390 px: no console or
hydration errors, no broken images, no horizontal overflow, one `<h1>` per page, metadata present. axe-core reports no
violations on any route. Lighthouse with compressed assets: desktop 100 / 100 / 100 / 100; mobile (simulated 4G)
Performance 95–98, Accessibility 100, Best Practices 100, SEO 100, CLS 0. (Draft insight articles score lower on SEO
by design — they are `noindex` until published.) Keyboard navigation, the mobile-menu focus trap,
`prefers-reduced-motion` and JavaScript-disabled rendering were tested too.
