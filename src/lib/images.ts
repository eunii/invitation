/** public/images/ 아래 파일명 (확장자 제외). 없으면 wedding.ts URL 사용 */
export const LOCAL_IMAGE_BASES = {
  heroImage: 'hero',
  cinematicImage: 'invitation',
  mapImage: 'map',
  creditsBgImage: 'credits-bg',
} as const

const EXTENSIONS = ['jpg', 'jpeg', 'webp', 'png'] as const

export function publicImagePath(filename: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
  return `${base}images/${filename}`
}

export function galleryLocalBase(index: number): string {
  return `gallery-${String(index + 1).padStart(2, '0')}`
}

export function localImageAttemptSrc(localBase: string, attempt: number): string | null {
  if (attempt >= EXTENSIONS.length) return null
  return publicImagePath(`${localBase}.${EXTENSIONS[attempt]}`)
}

export function maxLocalImageAttempts(): number {
  return EXTENSIONS.length
}
