import { weddingConfig } from '../../config/wedding'
import { MaterialIcon } from '../ui/MaterialIcon'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function LocationSection() {
  const { venue, mapImage } = weddingConfig

  return (
    <section id="map" className="px-container-margin mt-section-gap max-w-6xl mx-auto scroll-mt-24">
      <RevealOnScroll>
        <div className="grid lg:grid-cols-2 gap-gutter items-center">
          <a
            href={venue.maps.google}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square rounded-lg overflow-hidden bg-surface-dim group"
          >
            <img
              src={mapImage}
              alt="Venue map"
              className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 px-6 py-4 rounded shadow-sm border border-outline-variant/30 text-center">
                <MaterialIcon icon="location_on" className="text-secondary" />
                <p className="font-label-md text-label-md text-primary mt-1">Open in Maps</p>
              </div>
            </div>
          </a>

          <div className="lg:pl-12 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MaterialIcon icon="location_on" className="text-secondary" />
                <h5 className="font-headline-lg-mobile text-headline-lg-mobile">오시는 길</h5>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: '카카오맵', url: venue.maps.kakao },
                  { label: '네이버맵', url: venue.maps.naver },
                  { label: '구글맵', url: venue.maps.google },
                ].map((map) => (
                  <a
                    key={map.label}
                    href={map.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-outline-variant font-label-md text-label-md rounded hover:bg-surface-variant transition-colors"
                  >
                    {map.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MaterialIcon icon="directions_car" className="text-secondary" />
                <h5 className="font-headline-lg-mobile text-headline-lg-mobile">Arrival & Parking</h5>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {venue.parking}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MaterialIcon icon="local_taxi" className="text-secondary" />
                <h5 className="font-headline-lg-mobile text-headline-lg-mobile">Transportation</h5>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {venue.shuttle}
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
