import { useCallback, useRef, useState } from 'react'
import { localImageAttemptSrc, maxLocalImageAttempts, useLocalImages } from '../lib/images'

const noop = () => {}

/** public/images 파일 있으면 로컬 우선, 없으면 wedding.ts URL만 사용 */
export function useResolvedImageSrc(localBase: string, fallback: string) {
  const localEnabled = useLocalImages()
  const attemptRef = useRef(0)
  const [src, setSrc] = useState(() =>
    localEnabled ? (localImageAttemptSrc(localBase, 0) ?? fallback) : fallback,
  )

  const onError = useCallback(() => {
    if (!localEnabled) return

    const nextAttempt = attemptRef.current + 1
    attemptRef.current = nextAttempt

    if (nextAttempt < maxLocalImageAttempts()) {
      const nextLocal = localImageAttemptSrc(localBase, nextAttempt)
      if (nextLocal) {
        setSrc(nextLocal)
        return
      }
    }

    setSrc(fallback)
  }, [localBase, fallback, localEnabled])

  return { src, onError: localEnabled ? onError : noop }
}
