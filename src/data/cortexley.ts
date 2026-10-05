// Source: https://cortexley.com (services page). Cortexley is an independent company,
// not part of Dada Sons Group. Wording below is Cortexley's own tagline for each service.
export const CORTEXLEY_URL = 'https://cortexley.com'

export interface CortexleyService {
  title: string
  tagline: string
  url: string
}

export const cortexleyServices: CortexleyService[] = [
  { title: 'Custom Web Development', tagline: "Marketing sites and web apps that don't feel templated", url: `${CORTEXLEY_URL}/services/custom-web-development/` },
  { title: 'Ecommerce Development', tagline: 'Storefronts built to convert, not just load', url: `${CORTEXLEY_URL}/services/ecommerce-development/` },
  { title: 'Custom Software', tagline: 'Internal tools that fit how your team actually works', url: `${CORTEXLEY_URL}/services/custom-software-development/` },
  { title: 'AI & Automation', tagline: 'Automation that removes work, not just relocates it', url: `${CORTEXLEY_URL}/services/ai-automation/` },
  { title: 'UI/UX Design', tagline: 'Design systems that hold up past the mockup', url: `${CORTEXLEY_URL}/services/ui-ux-design/` },
]
