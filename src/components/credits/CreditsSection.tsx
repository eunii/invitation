import { weddingConfig } from '../../config'
import { LOCAL_IMAGE_BASES } from '../../lib/images'
import type { GuestbookEntry } from '../../types/guestbook'
import { MaterialIcon } from '../ui/MaterialIcon'
import { WeddingImage } from '../ui/WeddingImage'
import { CreditsScroll } from './CreditsScroll'

interface CreditsSectionProps {
  entries: GuestbookEntry[]
  loading: boolean
  onOpenModal: () => void
}

export function CreditsSection({ entries, loading, onOpenModal }: CreditsSectionProps) {
  const { creditsBgImage, ui } = weddingConfig

  return (
    <section id="guestbook" className="relative min-h-screen flex flex-col pt-24 pb-32 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <WeddingImage
          localBase={LOCAL_IMAGE_BASES.creditsBgImage}
          fallback={creditsBgImage}
          alt=""
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </div>

      <div className="relative z-10 px-container-margin flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <p className="font-caption text-caption text-secondary tracking-widest uppercase mb-2">
            {ui.credits.label}
          </p>
          <h2 className="font-display-md text-display-md text-primary italic">{ui.credits.title}</h2>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md hover:opacity-80 transition-opacity celestial-glow shrink-0"
        >
          <MaterialIcon icon="edit" className="text-[20px]" />
          <span className="hidden sm:inline">{ui.credits.submitButton}</span>
        </button>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center">
        {loading ? (
          <p className="font-body-md text-outline animate-pulse">{ui.credits.loading}</p>
        ) : (
          <>
            <div className="text-center mb-4 pointer-events-none">
              <h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest">{ui.credits.specialThanks}</h3>
            </div>
            <CreditsScroll entries={entries} />
            <div className="text-center mt-8 pointer-events-none">
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                {ui.credits.thankYouLine1}
                <br />
                {ui.credits.thankYouLine2}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
