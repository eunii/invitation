import { useInviteVariant } from '../../context/InviteVariantContext'
import { weddingConfig } from '../../config'
import { LOCAL_IMAGE_BASES } from '../../lib/images'
import { MaterialIcon } from '../ui/MaterialIcon'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { WeddingCountdown } from '../ui/WeddingCountdown'
import { WeddingImage } from '../ui/WeddingImage'

const CONTENT_WIDTH = 'max-w-4xl mx-auto w-full'

export function InvitationSection() {
  const variant = useInviteVariant()
  const { couple, parents, invitation, date, venue, mapImage, ui } = weddingConfig
  const content = variant === 'parents' ? invitation.formal : invitation.casual

  const mapLinks = [
    { label: ui.location.kakaoMap, url: venue.maps.kakao },
    { label: ui.location.naverMap, url: venue.maps.naver },
    { label: ui.location.googleMap, url: venue.maps.google },
  ]

  return (
    <section className="px-container-margin mb-section-gap pt-section-gap">
      <div className={`${CONTENT_WIDTH} space-y-section-gap`}>
        <RevealOnScroll>
          <div className="text-center bg-surface-container-low p-10 rounded-lg archival-border">
            <MaterialIcon icon="menu_book" className="text-secondary mb-4" />
            <h3 className="font-headline-lg text-headline-lg text-primary mb-6">{content.title}</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed italic">
              {content.text}
            </p>
            {content.extra && (
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-6">
                {content.extra}
              </p>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="text-center space-y-4 py-4">
            <p className="font-body-lg text-body-lg text-primary tracking-wide">
              {parents.bride.father}
              <span className="mx-2">|</span>
              {parents.bride.mother}의 딸{' '}
              <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold">
                {couple.bride}
              </span>
            </p>
            <p className="font-body-lg text-body-lg text-primary tracking-wide">
              {parents.groom.father}
              <span className="mx-2">|</span>
              {parents.groom.mother}의 아들{' '}
              <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold">
                {couple.groom}
              </span>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="text-center space-y-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 text-center md:text-left">
              <div className="space-y-4">
                <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
                  {ui.info.whenLabel}
                </p>
                <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                  {date.full}
                  <span className="text-outline"> {date.time}</span>
                </h4>
                <WeddingCountdown />
              </div>
              <div className="space-y-4 md:border-l md:border-outline-variant/30 md:pl-12">
                <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
                  {ui.info.whereLabel}
                </p>
                <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{venue.name}</h4>
                <p className="font-body-md text-body-md text-outline leading-relaxed">{venue.address}</p>
              </div>
            </div>

            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <a
                  id="map"
                  href={venue.maps.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/3] rounded-lg overflow-hidden bg-surface-dim group scroll-mt-24"
                >
                  <WeddingImage
                    localBase={LOCAL_IMAGE_BASES.mapImage}
                    fallback={mapImage}
                    alt="오시는 길 지도"
                    className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 px-5 py-3 rounded shadow-sm border border-outline-variant/30 text-center">
                      <MaterialIcon icon="location_on" className="text-secondary" />
                      <p className="font-label-md text-label-md text-primary mt-1">{ui.location.mapsCta}</p>
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="location_on" className="text-secondary" />
                  <h5 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {ui.location.directionsTitle}
                  </h5>
                </div>
                <div className="flex flex-wrap gap-3">
                  {mapLinks.map((map) => (
                    <a
                      key={map.label}
                      href={map.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-outline-variant font-label-md text-label-md rounded hover:bg-surface-variant transition-colors"
                    >
                      {map.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="directions_car" className="text-secondary" />
                  <h5 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {ui.location.parkingTitle}
                  </h5>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {venue.parking}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="local_taxi" className="text-secondary" />
                  <h5 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {ui.location.shuttleTitle}
                  </h5>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {venue.shuttle}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
