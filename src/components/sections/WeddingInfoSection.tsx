import { weddingConfig } from '../../config'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function WeddingInfoSection() {
  const { date, venue, ui } = weddingConfig

  return (
    <section className="px-container-margin mt-section-gap py-section-gap bg-surface">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <p className="font-label-md text-label-md text-secondary uppercase">{ui.info.whenLabel}</p>
            <h4 className="font-headline-lg text-headline-lg">{date.full}</h4>
            <p className="font-body-md text-body-md text-outline">{date.time}</p>
          </div>
          <div className="space-y-4">
            <p className="font-label-md text-label-md text-secondary uppercase">{ui.info.whereLabel}</p>
            <h4 className="font-headline-lg text-headline-lg">{venue.name}</h4>
            <p className="font-body-md text-body-md text-outline">{venue.address}</p>
          </div>
          <div className="space-y-4">
            <p className="font-label-md text-label-md text-secondary uppercase">{ui.info.journeyLabel}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 h-full pt-2">
              <div className="relative w-full h-px bg-outline-variant">
                <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse celestial-glow" />
              </div>
            </div>
            <p className="font-caption text-caption text-outline-variant uppercase tracking-widest pt-2">
              {ui.info.journeyChapter}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
