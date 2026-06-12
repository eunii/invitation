import { useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import type { GuestbookEntry } from '../../types/guestbook'
import { MaterialIcon } from '../ui/MaterialIcon'
import { CreditsScroll } from './CreditsScroll'
import { StarConstellation } from './StarConstellation'

interface CreditsSectionProps {
  entries: GuestbookEntry[]
  loading: boolean
  onOpenModal: () => void
}

type ViewMode = 'scroll' | 'stars'

export function CreditsSection({ entries, loading, onOpenModal }: CreditsSectionProps) {
  const [mode, setMode] = useState<ViewMode>('scroll')
  const { creditsBgImage } = weddingConfig

  return (
    <section id="credits" className="relative min-h-screen flex flex-col pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <img
          src={creditsBgImage}
          alt=""
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </div>

      <div className="relative z-10 px-container-margin flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <p className="font-caption text-caption text-secondary tracking-widest uppercase mb-2">
            The Supporting Cast
          </p>
          <h2 className="font-display-md text-display-md text-primary italic">Guest Credits</h2>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md hover:opacity-80 transition-opacity celestial-glow shrink-0"
        >
          <MaterialIcon icon="edit" className="text-[20px]" />
          <span className="hidden sm:inline">크레딧에 이름 남기기</span>
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setMode('scroll')}
          className={`px-4 py-2 font-label-md text-label-md rounded transition-colors ${
            mode === 'scroll' ? 'bg-primary text-on-primary' : 'text-outline border border-outline-variant'
          }`}
        >
          End Credits
        </button>
        <button
          type="button"
          onClick={() => setMode('stars')}
          className={`px-4 py-2 font-label-md text-label-md rounded transition-colors ${
            mode === 'stars' ? 'bg-primary text-on-primary' : 'text-outline border border-outline-variant'
          }`}
        >
          ✨ 별자리
        </button>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center">
        {loading ? (
          <p className="font-body-md text-outline animate-pulse">불러오는 중...</p>
        ) : mode === 'scroll' ? (
          <>
            <div className="text-center mb-8 pointer-events-none">
              <h3 className="font-display-md text-display-md text-primary italic mb-2">Special Thanks</h3>
            </div>
            <CreditsScroll entries={entries} />
            <div className="text-center mt-8 pointer-events-none">
              <p className="font-body-lg text-body-lg text-on-surface-variant italic">
                Thank you for being
                <br />
                part of our story.
              </p>
            </div>
          </>
        ) : (
          <div className="w-full max-w-4xl px-container-margin">
            <StarConstellation entries={entries} />
          </div>
        )}
      </div>
    </section>
  )
}
