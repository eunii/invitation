import { useCallback, useMemo, useState } from 'react'
import { localImageAttemptSrc, maxLocalImageAttempts } from '../lib/images'

/** 로컬 public/images → 없으면 config fallback URL */
export function useResolvedImageSrc(localBase: string, fallback: string) {
  const [attempt, setAttempt] = useState(0)

  const src = useMemo(() => {
    const local = localImageAttemptSrc(localBase, attempt)
    return local ?? fallback
  }, [localBase, attempt, fallback])

  const onError = useCallback(() => {
    setAttempt((current) => (current < maxLocalImageAttempts() ? current + 1 : current))
  }, [])

  return { src, onError }
}
