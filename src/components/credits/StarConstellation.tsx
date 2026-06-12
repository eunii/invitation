import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GuestbookEntry } from '../../types/guestbook'

interface StarConstellationProps {
  entries: GuestbookEntry[]
}

interface StarPosition {
  x: number
  y: number
  size: number
  delay: number
}

function seededPosition(id: string, index: number): StarPosition {
  let hash = 0
  const str = id + index
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const abs = Math.abs(hash)
  return {
    x: 5 + (abs % 9000) / 100,
    y: 5 + ((abs >> 8) % 9000) / 100,
    size: 1 + (abs % 30) / 10,
    delay: (abs % 30) / 10,
  }
}

export function StarConstellation({ entries }: StarConstellationProps) {
  const [selected, setSelected] = useState<GuestbookEntry | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const stars = useMemo(
    () =>
      entries.map((entry, i) => ({
        entry,
        pos: seededPosition(entry.id, i),
      })),
    [entries],
  )

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-secondary text-lg">✨</span>
        <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
          {entries.length} Stars
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-primary rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-container/50 to-primary" />

        {stars.map(({ entry, pos }) => (
          <button
            key={entry.id}
            type="button"
            className="absolute rounded-full bg-secondary/60 hover:bg-secondary transition-all cursor-pointer animate-star-pulse"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size * 4}px`,
              height: `${pos.size * 4}px`,
              animationDelay: `${pos.delay}s`,
              boxShadow: hoveredId === entry.id ? '0 0 12px rgba(212,175,55,0.6)' : undefined,
            }}
            onMouseEnter={() => setHoveredId(entry.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelected(entry)}
            aria-label={entry.name}
          />
        ))}

        {hoveredId && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded text-center pointer-events-none">
            <p className="font-label-md text-label-md text-primary">
              {stars.find((s) => s.entry.id === hoveredId)?.entry.name}
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-container-margin">
            <motion.div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="glass-panel w-full max-w-sm p-8 rounded-xl relative z-10 text-center border border-outline-variant/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="font-caption text-caption text-secondary uppercase tracking-widest mb-2">
                ✨ Special Thanks
              </p>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-4">{selected.name}</h3>
              {selected.message && (
                <p className="font-body-lg text-body-lg italic text-on-surface-variant">
                  &ldquo;{selected.message}&rdquo;
                </p>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-6 text-outline hover:text-primary font-label-md text-label-md"
              >
                닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
