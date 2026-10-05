import { imageManifest, imageSrcSet, imageUrl, type ImageName } from '../lib/images'

interface PictureProps {
  name: ImageName
  /** Use "" for purely decorative imagery that sits behind text. */
  alt: string
  sizes?: string
  /** Above-the-fold imagery: loads eagerly with high fetch priority. */
  priority?: boolean
  /** Optional alternative crop shown at narrow widths (e.g. a portrait hero). */
  mobile?: ImageName
  mobileMedia?: string
  className?: string
  imgClassName?: string
}

/**
 * Responsive AVIF → WebP image. Intrinsic width/height come from the generated manifest
 * so the browser reserves the right space before the file arrives (no layout shift).
 */
export function Picture({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  mobile,
  mobileMedia = '(max-width: 767px)',
  className,
  imgClassName,
}: PictureProps) {
  const meta = imageManifest[name]

  return (
    <picture className={className}>
      {mobile && <source media={mobileMedia} type="image/avif" srcSet={imageSrcSet(mobile, 'avif')} sizes={sizes} />}
      {mobile && <source media={mobileMedia} type="image/webp" srcSet={imageSrcSet(mobile, 'webp')} sizes={sizes} />}
      <source type="image/avif" srcSet={imageSrcSet(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={imageSrcSet(name, 'webp')} sizes={sizes} />
      <img
        className={imgClassName}
        src={imageUrl(name, 1024)}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ backgroundColor: meta.color }}
      />
    </picture>
  )
}
