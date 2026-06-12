import { useCallback, useEffect, useRef, useState } from 'react'
import { localImageAttemptSrc, maxLocalImageAttempts, useLocalImages } from '../lib/images'

const noop = () => {}

/** wedding.ts URL을 기본으로 쓰고, public/images가 있을 때만 로컬 파일로 대체 */
export function useResolvedImageSrc(localBase: string, fallback: string) {
  const localEnabled = useLocalImages()
  const attemptRef = useRef(0)
  const [src, setSrc] = useState(fallback)

  useEffect(() => {
    setSrc(fallback)
    attemptRef.current = 0
  }, [fallback, localBase])

  useEffect(() => {
    if (!localEnabled) return

    const localSrc = localImageAttemptSrc(localBase, 0)
    if (!localSrc) return

    let cancelled = false
    const probe = new Image()
    probe.onload = () => {
      if (!cancelled) setSrc(localSrc)
    }
    probe.onerror = noop
    probe.src = localSrc

    return () => {
      cancelled = true
    }
  }, [localBase, localEnabled])

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
