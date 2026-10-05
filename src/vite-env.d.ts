/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin of the site, used for canonical URLs, sitemap and structured data. */
  readonly VITE_SITE_URL?: string
  /** Optional form endpoint (Formspree / Resend proxy / custom API). See src/lib/enquiry.ts. */
  readonly VITE_ENQUIRY_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
