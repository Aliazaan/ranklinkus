import type { ImageName } from '../lib/images'

export interface GalleryItem {
  image: ImageName
  alt: string
  caption: string
  /** Bento tile size; omit for a standard square-ish tile. */
  size?: 'big' | 'tall' | 'wide'
}

// Illustrative stock photography — see IMAGE-CREDITS.md. Replace with real project
// photography as it becomes available. Order matters: the grid packs these tiles
// (big, std, tall, std, std, wide, std) into a clean 4×3 block.
export const machineryGallery: GalleryItem[] = [
  { image: 'gal-looms', size: 'big', caption: 'Weaving looms', alt: 'Rows of weaving looms with cloth beams and gear drives' },
  { image: 'gal-white-threads', caption: 'Warp threads', alt: 'Close view of white warp threads on a loom' },
  { image: 'gal-mill-interior', size: 'tall', caption: 'Spinning mill', alt: 'Threads running through a spinning mill hall' },
  { image: 'gal-knitting', caption: 'Knitting machine', alt: 'Close view of an industrial knitting machine with yarn feeds' },
  { image: 'gal-gears', caption: 'Machine drives', alt: 'Interlocking gears on a textile machine' },
  { image: 'gal-weaving-hall', size: 'wide', caption: 'Weaving hall', alt: 'A hall of green weaving machines with operators at work' },
  { image: 'gal-bobbins', caption: 'Spinning frame', alt: 'Spinning frame with rows of yarn bobbins' },
]

export const protectionGallery: GalleryItem[] = [
  { image: 'gal-suv-studio', size: 'big', caption: 'Black SUV', alt: 'Black SUV with its headlamps lit against a dark studio backdrop' },
  { image: 'gal-headlamp', caption: 'Headlamp detail', alt: 'Close detail of a matte black SUV headlamp and bonnet' },
  { image: 'gal-door-detail', size: 'tall', caption: 'Door and arch', alt: 'Side of a matte black SUV showing the doors and wheel arch' },
  { image: 'gal-matte-black', caption: 'Matte finish', alt: 'Rear quarter of a matte black SUV' },
  { image: 'gal-armoured-front', caption: 'Armoured vehicle', alt: 'Front of a heavy armoured utility vehicle' },
  { image: 'gal-armoured-workshop', size: 'wide', caption: 'Armoured vehicle, garage', alt: 'Dark armoured vehicle parked at a steel garage door' },
  { image: 'gal-night-lamps', caption: 'Night headlamps', alt: 'Bright round headlamp of a black off-road vehicle at night' },
]
