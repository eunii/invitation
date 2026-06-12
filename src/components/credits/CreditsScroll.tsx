import { useCallback, useEffect, useMemo, useRef } from 'react'

import { weddingConfig } from '../../config'

import type { GuestbookEntry } from '../../types/guestbook'

import { CreditsEnding } from './CreditsEnding'

const RESTART_DELAY_MS = 3_000

interface CreditsScrollProps {
  entries: GuestbookEntry[]
}

function CreditItem({ entry }: { entry: GuestbookEntry }) {
  return (
    <div className="text-center px-2 shrink-0 py-2">
      <p className="font-label-md text-[17px] leading-tight text-primary">{entry.name}</p>
      {entry.message && (
        <p className="font-caption text-[13px] leading-snug text-on-surface-variant/80 mt-1 line-clamp-3 max-w-xs mx-auto">
          {entry.message}
        </p>
      )}
    </div>
  )
}

function scrollDurationMs(entryCount: number): number {
  return Math.min(22_000, Math.max(7_500, entryCount * 1_600 + 5_000))
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

export function CreditsScroll({ entries }: CreditsScrollProps) {
  const { ui } = weddingConfig

  const containerRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const userControlRef = useRef(false)
  const visibleRef = useRef(false)
  const startedRef = useRef(false)

  const sortedEntries = useMemo(
    () =>
      [...entries].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    [entries],
  )

  const clearRestartTimeout = useCallback(() => {
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current)
      restartTimeoutRef.current = null
    }
  }, [])

  const stopAuto = useCallback(() => {
    if (userControlRef.current) return

    userControlRef.current = true

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    clearRestartTimeout()
  }, [clearRestartTimeout])

  useEffect(() => {
    const el = containerRef.current
    if (!el || sortedEntries.length === 0) return

    userControlRef.current = false
    visibleRef.current = false
    startedRef.current = false
    el.scrollTop = 0

    const scheduleRestart = () => {
      clearRestartTimeout()
      restartTimeoutRef.current = setTimeout(() => {
        if (userControlRef.current || !visibleRef.current) return
        el.scrollTop = 0
        startedRef.current = false
        startAuto()
      }, RESTART_DELAY_MS)
    }

    const startAuto = () => {
      if (startedRef.current || userControlRef.current || !visibleRef.current) return

      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return

      startedRef.current = true
      const duration = scrollDurationMs(sortedEntries.length)
      const startTime = performance.now()

      const tick = (now: number) => {
        if (userControlRef.current) return

        const progress = Math.min(1, (now - startTime) / duration)
        el.scrollTop = maxScroll * easeInOutCubic(progress)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick)
        } else {
          frameRef.current = null
          startedRef.current = false
          scheduleRestart()
        }
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    const shell = shellRef.current
    if (!shell) return

    const intersectionObserver = new IntersectionObserver(
      (observerEntries) => {
        visibleRef.current = observerEntries.some((entry) => entry.isIntersecting)
        if (visibleRef.current) {
          startAuto()
        } else {
          clearRestartTimeout()
          if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current)
            frameRef.current = null
          }
          startedRef.current = false
        }
      },
      { threshold: 0.35 },
    )
    intersectionObserver.observe(shell)

    const resizeObserver = new ResizeObserver(() => {
      if (visibleRef.current) startAuto()
    })
    resizeObserver.observe(el)

    const onUserIntent = () => stopAuto()

    const onWheel = (e: WheelEvent) => {
      onUserIntent()

      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return

      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop >= maxScroll - 1

      if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
        window.scrollBy({ top: e.deltaY, left: 0 })
        e.preventDefault()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onUserIntent, { passive: true })
    el.addEventListener('pointerdown', onUserIntent)
    el.addEventListener('keydown', onUserIntent)

    return () => {
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      clearRestartTimeout()
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onUserIntent)
      el.removeEventListener('pointerdown', onUserIntent)
      el.removeEventListener('keydown', onUserIntent)
    }
  }, [sortedEntries, stopAuto, clearRestartTimeout])

  if (sortedEntries.length === 0) {
    return (
      <div className="w-full max-w-xl px-container-margin">
        <div className="text-center py-8">
          <p className="font-body-lg text-body-lg text-outline italic mb-2">{ui.credits.emptyTitle}</p>
          <p className="font-caption text-caption text-secondary">{ui.credits.emptySubtitle}</p>
        </div>
        <CreditsEnding animateIn compact />
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl px-container-margin flex flex-col items-center">
      <div ref={shellRef} className="credits-scroll-shell relative w-full z-10">
        <div
          ref={containerRef}
          className="credits-scroll-panel h-[58vh] min-h-[380px] w-full overflow-y-auto"
          tabIndex={0}
          aria-label={ui.credits.panelLabel}
        >
          <div className="credits-scroll-set credits-scroll-set--names px-2 pt-14">
            {sortedEntries.map((entry) => (
              <CreditItem key={entry.id} entry={entry} />
            ))}
          </div>
          <CreditsEnding compact />
        </div>
      </div>
    </div>
  )
}
