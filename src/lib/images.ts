import manifest from '../data/image-manifest.json'

export interface ImageMeta {
  width: number
  height: number
  widths: number[]
  color: string
}

export type ImageName = keyof typeof manifest

export const imageManifest = manifest as Record<ImageName, ImageMeta>

export type ImageFormat = 'avif' | 'webp'

export function imageSrcSet(name: ImageName, format: ImageFormat): string {
  return imageManifest[name].widths.map((w) => `/images/${name}-${w}.${format} ${w}w`).join(', ')
}

/** URL of the closest generated width at or above `target` (falls back to the largest). */
export function imageUrl(name: ImageName, target: number, format: ImageFormat = 'webp'): string {
  const { widths } = imageManifest[name]
  const width = widths.find((w) => w >= target) ?? widths[widths.length - 1]
  return `/images/${name}-${width}.${format}`
}
