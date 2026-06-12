import { useEffect, useMemo, useState } from 'react'
import { weddingConfig } from '../../config'
import type { GuestbookEntry } from '../../types/guestbook'

interface CreditsScrollProps {
  entries: GuestbookEntry[]
}

type LoopedEntry = GuestbookEntry & { loopKey: string }

function CreditItem({ entry }: { entry: GuestbookEntry }) {
  return (
    <div className="text-center group px-2 shrink-0">
      <p className="font-label-md text-[17px] leading-tight text-primary">{entry.name}</p>
      {entry.message && (
        <p className="font-caption text-[13px] leading-snug text-on-surface-variant/80 mt-0.5 line-clamp-2 max-w-xs mx-auto">
          {entry.message}
        </p>
      )}
    </div>
  )
}

function CreditsSet({ items }: { items: LoopedEntry[] }) {
  return (
    <div className="credits-scroll-set">
      {items.map((entry) => (
        <CreditItem key={entry.loopKey} entry={entry} />
      ))}
    </div>
  )
}

/** 한 세트가 충분히 길어지도록 반복 — 짧은 목록에서도 끊김 없이 롤링 */
function buildLoopSet(entries: GuestbookEntry[], minItems = 18): LoopedEntry[] {
  if (entries.length === 0) return []

  const repeat = Math.max(1, Math.ceil(minItems / entries.length))
  return Array.from({ length: repeat }, (_, repeatIndex) =>
    entries.map((entry, entryIndex) => ({
      ...entry,
      loopKey: `${entry.id}-${repeatIndex}-${entryIndex}`,
    })),
  ).flat()
}

export function CreditsScroll({ entries }: CreditsScrollProps) {
  const { ui } = weddingConfig
  const loopSet = useMemo(
    () => (entries.length === 0 ? [] : buildLoopSet(entries)),
    [entries],
  )
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!paused) return

    const resume = () => setPaused(false)

    window.addEventListener('scroll', resume, { passive: true })
    window.addEventListener('wheel', resume, { passive: true })
    window.addEventListener('touchmove', resume, { passive: true })

    return () => {
      window.removeEventListener('scroll', resume)
      window.removeEventListener('wheel', resume)
      window.removeEventListener('touchmove', resume)
    }
  }, [paused])

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body-lg text-body-lg text-outline italic">{ui.credits.emptyTitle}</p>
        <p className="font-caption text-caption text-secondary mt-2">{ui.credits.emptySubtitle}</p>
      </div>
    )
  }

  return (
    <div
      className="credits-container w-full max-w-xl px-container-margin flex-grow overflow-hidden relative z-10 mask-fade h-[65vh] min-h-[420px] cursor-pointer select-none"
      onClick={() => setPaused((p) => !p)}
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={paused ? ui.credits.resumeLabel : ui.credits.pauseLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setPaused((p) => !p)
        }
      }}
    >
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      <div className={`credits-scroll-track${paused ? ' credits-scroll-track--paused' : ''}`}>
        <CreditsSet items={loopSet} />
        <CreditsSet items={loopSet} />
      </div>
    </div>
  )
}
