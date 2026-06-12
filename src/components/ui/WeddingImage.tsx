import type { ImgHTMLAttributes } from 'react'
import { useResolvedImageSrc } from '../../hooks/useResolvedImageSrc'

const NO_ZOOM_CLASS =
  'no-zoom-image pointer-events-none select-none touch-manipulation max-w-full'

interface WeddingImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  localBase: string
  fallback: string
}

export function WeddingImage({
  localBase,
  fallback,
  className = '',
  alt = '',
  draggable = false,
  ...props
}: WeddingImageProps) {
  const { src, onError } = useResolvedImageSrc(localBase, fallback)

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      draggable={draggable}
      onError={onError}
      className={`${NO_ZOOM_CLASS} ${className}`.trim()}
    />
  )
}
