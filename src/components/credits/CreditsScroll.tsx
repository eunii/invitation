import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { weddingConfig } from '../../config'

import type { GuestbookEntry } from '../../types/guestbook'

import { CreditsEnding } from './CreditsEnding'



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

  return Math.min(36_000, Math.max(12_000, entryCount * 2_500 + 8_000))

}



function easeInOutCubic(t: number): number {

  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

}



export function CreditsScroll({ entries }: CreditsScrollProps) {

  const { ui } = weddingConfig

  const containerRef = useRef<HTMLDivElement>(null)

  const frameRef = useRef<number | null>(null)

  const userControlRef = useRef(false)

  const [autoPlaying, setAutoPlaying] = useState(true)

  const [finished, setFinished] = useState(false)



  const sortedEntries = useMemo(

    () => [...entries].sort((a, b) => a.name.localeCompare(b.name, 'ko')),

    [entries],

  )



  const stopAuto = useCallback(() => {

    if (userControlRef.current) return

    userControlRef.current = true

    if (frameRef.current !== null) {

      cancelAnimationFrame(frameRef.current)

      frameRef.current = null

    }

    setAutoPlaying(false)

  }, [])



  useEffect(() => {

    const el = containerRef.current

    if (!el || sortedEntries.length === 0) return



    userControlRef.current = false

    setAutoPlaying(true)

    setFinished(false)

    el.scrollTop = 0



    let started = false



    const startAuto = () => {

      if (started || userControlRef.current) return



      const maxScroll = el.scrollHeight - el.clientHeight

      if (maxScroll <= 0) {

        setFinished(true)

        setAutoPlaying(false)

        return

      }



      started = true

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

          setFinished(true)

          setAutoPlaying(false)

        }

      }



      frameRef.current = requestAnimationFrame(tick)

    }



    const observer = new ResizeObserver(() => startAuto())

    observer.observe(el)

    requestAnimationFrame(() => startAuto())



    const onUserIntent = () => stopAuto()



    el.addEventListener('wheel', onUserIntent, { passive: true })

    el.addEventListener('touchstart', onUserIntent, { passive: true })

    el.addEventListener('pointerdown', onUserIntent)

    el.addEventListener('keydown', onUserIntent)



    return () => {

      observer.disconnect()

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

      el.removeEventListener('wheel', onUserIntent)

      el.removeEventListener('touchstart', onUserIntent)

      el.removeEventListener('pointerdown', onUserIntent)

      el.removeEventListener('keydown', onUserIntent)

    }

  }, [sortedEntries, stopAuto])



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

      <div className="credits-scroll-shell relative w-full z-10">

        <div

          ref={containerRef}

          className="credits-scroll-panel h-[58vh] min-h-[380px] w-full overflow-y-auto overscroll-contain"

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



      <p

        className={`font-caption text-caption mt-4 tracking-widest uppercase text-center ${

          autoPlaying ? 'text-outline-variant animate-pulse' : 'text-secondary'

        }`}

      >

        {autoPlaying ? ui.credits.scrolling : finished ? ui.credits.finished : ui.credits.scrollHint}

      </p>

    </div>

  )

}


