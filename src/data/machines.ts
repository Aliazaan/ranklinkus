import type { ImageName } from '../lib/images'

export interface MachinePhoto {
  image: ImageName
  /** Describes only what is visible in the photograph. */
  alt: string
}

export interface Machine {
  /** Name exactly as supplied by Dada Sons. */
  name: string
  /** Model line supplied alongside the name. */
  detail?: string
  /** Free text supplied by Dada Sons about the machine. */
  note?: string
  /** Decides which section of the Machines page lists it. */
  condition: 'new' | 'used'
  /** First photo is the main image; the rest appear as thumbnails. */
  photos: MachinePhoto[]
}

/*
 * Listed in the order the machines were supplied; the page numbers them 01, 02, 03 … in this order.
 * Names, model lines and notes are taken from Dada Sons' own message captions. Do not add prices,
 * years or specifications that have not been confirmed.
 *
 * To add a machine: put its photos in assets-src/machines/, add an entry per photo in
 * scripts/images.config.mjs, run `npm run images -- <names>`, then add it here.
 */
export const machines: Machine[] = [
  {
    name: 'Trützschler DK 803 Carding Machine',
    condition: 'used',
    photos: [
      { image: 'machine-dk803-1', alt: 'Green Trützschler DK 803 carding machine in a mill hall, with ducting overhead' },
      { image: 'machine-dk803-2', alt: 'Green carding machine with a round can table at its delivery end' },
    ],
  },
  {
    name: 'Trützschler TC 03',
    note: 'A later model generation; documented machines include units manufactured in 2004 and 2007.',
    condition: 'used',
    photos: [{ image: 'machine-tc03-1', alt: 'Row of grey Trützschler TC 03 machines with blue feed covers and a touch-screen panel' }],
  },
  {
    name: 'Trützschler DK 903',
    condition: 'used',
    photos: [{ image: 'machine-dk903-1', alt: 'Green carding machine with a round can table on a bright green floor, with a blue duct above' }],
  },
  {
    name: 'Trützschler Draw Frame',
    detail: 'TD 02 and TD 03',
    condition: 'used',
    photos: [
      { image: 'machine-td-1', alt: 'Row of white Trützschler draw frames with perforated cabinet doors and a white bin in front' },
      { image: 'machine-td-2', alt: 'Draw frame with a raised sliver table and a curved guide rail on a wooden floor' },
      { image: 'machine-td-3', alt: 'White draw frame with a stepped platform and handrails, with a duct rising from its top' },
    ],
  },
  {
    name: 'Toyoda FL-16',
    condition: 'used',
    photos: [{ image: 'machine-fl16-1', alt: 'Blue and grey Toyoda machine head at the end of a long frame, on a red floor beside a barrel' }],
  },
  {
    name: 'Toyoda FL-100',
    condition: 'used',
    photos: [{ image: 'machine-fl100-1', alt: 'Blue Toyoda machine head with a control panel at the end of a long frame' }],
  },
  {
    name: 'Toyoda RX-240 G',
    condition: 'used',
    photos: [{ image: 'machine-rx240g-1', alt: 'Blue Toyoda cabinets in a bright hall, with a long frame on the right and an overhead track with hanging fittings' }],
  },
  {
    name: 'Toyoda RX-240 SF',
    condition: 'used',
    photos: [{ image: 'machine-rx240sf-1', alt: 'Close view along a long spinning frame showing coloured rollers and rows of spindles' }],
  },
  {
    name: 'Murata Muratec 21C-S / 21C Process Coner',
    condition: 'used',
    photos: [
      { image: 'machine-c21-1', alt: 'Muratec No. 21C-S machine with a row of winding units and a control cabinet with screens' },
      { image: 'machine-c21-2', alt: 'Three blue winding units numbered 58, 59 and 60' },
      { image: 'machine-c21-3', alt: 'Muratec process coner machines in a hall, with green crates on the floor' },
    ],
  },
  {
    name: 'Rieter Blow Room 2010',
    condition: 'used',
    photos: [{ image: 'machine-rieter-1', alt: 'Pale green Rieter blow room unit with a curved cabinet and a warning label, beside a window' }],
  },
]

export const newMachines = machines.filter((machine) => machine.condition === 'new')
export const usedMachines = machines.filter((machine) => machine.condition === 'used')
