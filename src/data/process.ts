export interface Step {
  index: string
  title: string
  description: string
}

/** Homepage: from requirement to solution. */
export const processSteps: Step[] = [
  { index: '01', title: 'Understand', description: "Understand the client's requirement." },
  { index: '02', title: 'Assess', description: 'Evaluate the technical and commercial requirements.' },
  { index: '03', title: 'Deliver', description: 'Coordinate the appropriate solution.' },
  { index: '04', title: 'Support', description: 'Provide continued communication and support.' },
]

export interface Principle {
  index: string
  title: string
  description: string
}

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Industry Knowledge',
    description: 'Familiarity with textile, industrial and security requirements, so conversations start from the real problem.',
  },
  {
    index: '02',
    title: 'Strategic Sourcing',
    description: 'Options are compared on technical and commercial grounds before a recommendation is made.',
  },
  {
    index: '03',
    title: 'Specialized Solutions',
    description: 'Each requirement is scoped individually rather than forced into a standard package.',
  },
  {
    index: '04',
    title: 'Client-Focused Delivery',
    description: 'Clear communication from the first enquiry through to delivery and the support that follows.',
  },
]

/** Armour Tech page: how an engagement runs. */
export const armourApproach: Step[] = [
  {
    index: '01',
    title: 'Consultation',
    description: 'We discuss the requirement, the intended use and the constraints before anything is proposed.',
  },
  {
    index: '02',
    title: 'Assessment',
    description: 'The vehicle or asset is assessed against the requirement to establish what is feasible.',
  },
  {
    index: '03',
    title: 'Engineering',
    description: 'The solution is specified and engineered to the scope agreed with the client.',
  },
  {
    index: '04',
    title: 'Retrofitting',
    description: 'Protection and security equipment are fitted in line with the agreed specification.',
  },
  {
    index: '05',
    title: 'Delivery',
    description: 'The completed work is handed over, with communication continuing afterwards.',
  },
]
