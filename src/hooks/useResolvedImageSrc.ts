import { useCallback, useRef, useState } from 'react'
import { localImageAttemptSrc, maxLocalImageAttempts } from '../lib/images'

/** 로컬 public/images → 없으면 config fallback URL */
export function useResolvedImageSrc(localBase: string, fallback: string) {
  const attemptRef = useRef(0)
  const [src, setSrc] = useState(
    () => localImageAttemptSrc(localBase, 0) ?? fallback,
  )

  const onError = useCallback(() => {
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
  }, [localBase, fallback])

  return { src, onError }
}
