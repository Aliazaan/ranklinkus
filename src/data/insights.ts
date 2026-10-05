import type { ImageName } from '../lib/images'

export type InsightCategory = 'textile' | 'cotton' | 'industrial' | 'security' | 'automotive'

export const insightCategories: { value: InsightCategory; label: string }[] = [
  { value: 'textile', label: 'Textile' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'security', label: 'Security' },
  { value: 'automotive', label: 'Automotive' },
]

export const isInsightCategory = (value: string | null): value is InsightCategory =>
  insightCategories.some((c) => c.value === value)

export const categoryLabel = (value: InsightCategory) =>
  insightCategories.find((c) => c.value === value)?.label ?? value

export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  title: string
  category: InsightCategory
  excerpt: string
  image: ImageName
  imageAlt: string
  featured?: boolean
  sections: ArticleSection[]
  checklist?: { title: string; items: string[] }
  /**
   * ISO date. Leave undefined until the article is reviewed and published — the page then
   * stays marked as an editorial draft, is set to noindex, and is left out of the sitemap.
   */
  publishedAt?: string
}

// EDITORIAL PLACEHOLDERS: general buyer guidance only. No statistics, no client results and
// no technical ratings. Have each piece reviewed, then set `publishedAt` to publish it.
export const articles: Article[] = [
  {
    slug: 'understanding-textile-machinery-procurement',
    title: 'Understanding Textile Machinery Procurement',
    category: 'textile',
    excerpt: 'A practical outline of the questions worth settling before you approach suppliers for textile machinery.',
    image: 'insight-textile',
    imageAlt: 'Large white yarn spools on a spinning machine in a textile factory',
    featured: true,
    sections: [
      {
        heading: 'Start with the production requirement',
        paragraphs: [
          'Machinery decisions are easier when the target is written down first: the product, the expected volume, the space and utilities available, and the people who will run the line.',
          'A clear requirement also makes quotations comparable. Without one, suppliers answer different questions and the comparison becomes guesswork.',
        ],
      },
      {
        heading: 'Compare more than the price',
        paragraphs: [
          'Price is one input. Delivery lead time, installation and commissioning support, spare-parts availability and the supplier’s service arrangements all affect what the machine really costs to own.',
          'Ask each supplier to state these points in writing so that you are comparing like with like.',
        ],
      },
      {
        heading: 'Plan the logistics early',
        paragraphs: [
          'Shipping, import formalities, site preparation and installation scheduling can each add time. Confirm who is responsible for what, with the supplier and with your own advisers, before you commit to a delivery date.',
        ],
      },
    ],
    checklist: {
      title: 'Before you request quotations',
      items: [
        'A written production requirement',
        'Site, power and utility constraints',
        'Comparable written quotations',
        'Spare-parts and service arrangements',
        'A delivery, installation and commissioning plan',
      ],
    },
  },
  {
    slug: 'security-retrofitting-key-considerations',
    title: 'Security Retrofitting: Key Considerations',
    category: 'security',
    excerpt: 'What to think through before security equipment is retrofitted to a vehicle or asset.',
    image: 'insight-security',
    imageAlt: 'Security cameras mounted on a white wall',
    sections: [
      {
        heading: 'Define what you are protecting, and from what',
        paragraphs: [
          'Good retrofitting begins with a plain statement of the requirement: the asset, how it is used, and the risks the client is concerned about. Everything else follows from that.',
        ],
      },
      {
        heading: 'Assess before you specify',
        paragraphs: [
          'A retrofit starts with an assessment of the vehicle or asset: its condition, its structural limits and how it is used day to day. Work that ignores these factors can affect reliability and day-to-day use.',
        ],
      },
      {
        heading: 'Agree the scope in writing',
        paragraphs: [
          'Ask for the specification, the standards the supplier is working to and the scope of work in writing, and confirm what documentation you will receive on completion.',
          'Also ask what happens after delivery: servicing, maintenance and who to call if something needs attention.',
        ],
      },
    ],
    checklist: {
      title: 'Questions to put to a supplier',
      items: [
        'What assessment is carried out before work is specified?',
        'What is included in the written scope?',
        'What documentation is provided at handover?',
        'How are servicing and follow-up handled?',
      ],
    },
  },
  {
    slug: 'industrial-sourcing-and-strategic-procurement',
    title: 'Industrial Sourcing and Strategic Procurement',
    category: 'industrial',
    excerpt: 'Why treating sourcing as a structured process tends to produce better procurement decisions.',
    image: 'insight-industrial',
    imageAlt: 'Aerial view of a container ship alongside a quay',
    sections: [
      {
        heading: 'Treat sourcing as a process',
        paragraphs: [
          'Procurement goes better when it follows a sequence: define the requirement, identify suppliers, compare options, negotiate, then confirm delivery arrangements. Skipping a step usually shows up later as cost or delay.',
        ],
      },
      {
        heading: 'Clarify the requirement, then shortlist',
        paragraphs: [
          'Shortlist suppliers only after the requirement is clear. A shortlist built before the requirement is settled tends to be built around what suppliers offer rather than what the business needs.',
        ],
      },
      {
        heading: 'Keep communication open',
        paragraphs: [
          'Agree how and how often progress will be reported. Clear communication between buyer, supplier and any intermediary is often what keeps a procurement on schedule.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-define-before-sourcing-cotton',
    title: 'What to Define Before Sourcing Cotton',
    category: 'cotton',
    excerpt: 'The specification points a buyer should settle before a cotton sourcing conversation begins.',
    image: 'insight-cotton',
    imageAlt: 'A cotton field with plants in the foreground under a cloudy sky',
    sections: [
      {
        heading: 'Be specific about quality',
        paragraphs: [
          'State the quality parameters you need, and how they will be assessed. Agreeing the method of assessment up front avoids disagreement at delivery.',
        ],
      },
      {
        heading: 'Settle quantity and schedule',
        paragraphs: [
          'Quantity, delivery schedule and packing requirements shape both price and logistics. Decide what is fixed and what has flexibility before you open the conversation.',
        ],
      },
      {
        heading: 'Agree the commercial terms clearly',
        paragraphs: [
          'Payment terms, documentation and responsibilities during transport should be written down and acknowledged by both sides.',
        ],
      },
    ],
  },
  {
    slug: 'questions-to-ask-before-armouring-a-vehicle',
    title: 'Questions to Ask Before Armouring a Vehicle',
    category: 'automotive',
    excerpt: 'A short list of questions that help a client frame an armouring requirement.',
    image: 'insight-automotive',
    imageAlt: 'A dark car parked at night with its headlamp lit',
    sections: [
      {
        heading: 'What is the vehicle used for?',
        paragraphs: [
          'Daily use, typical routes and the people travelling in the vehicle all influence what is practical. Start from the use case, not from a product name.',
        ],
      },
      {
        heading: 'What will the assessment cover?',
        paragraphs: [
          'Ask how the vehicle will be assessed, what the supplier needs to know about it, and what the assessment means for the scope that follows.',
        ],
      },
      {
        heading: 'What is confirmed in writing?',
        paragraphs: [
          'Ask for the specification, the standards being worked to and the handover documentation in writing. Do not rely on verbal descriptions of protection.',
        ],
      },
    ],
    checklist: {
      title: 'Bring to the first conversation',
      items: ['The vehicle and how it is used', 'Your protection requirement', 'Your timeline', 'Any constraints on appearance or use'],
    },
  },
  {
    slug: 'when-an-outside-advisory-view-helps',
    title: 'When an Outside Advisory View Helps an Industrial Decision',
    category: 'industrial',
    excerpt: 'Situations where an independent view before committing to equipment or suppliers is worth having.',
    image: 'insight-machinery',
    imageAlt: 'A row of cotton yarn cones on a spinning machine',
    sections: [
      {
        heading: 'Before a significant commitment',
        paragraphs: [
          'When a decision is large, hard to reverse or outside the team’s usual experience, a second view can surface questions that were not yet on the table.',
        ],
      },
      {
        heading: 'When options look similar on paper',
        paragraphs: [
          'Two quotations can look alike and differ in support, lead time or terms. An advisor can help compare them on the points that matter to your business.',
        ],
      },
    ],
  },
]

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)

/** Rough reading time from the article text. */
export function readingMinutes(article: Article): number {
  const text = [
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...(article.checklist ? [article.checklist.title, ...article.checklist.items] : []),
  ].join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}

export const isPublished = (article: Article) => Boolean(article.publishedAt)
