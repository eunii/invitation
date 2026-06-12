import { useInviteVariant } from '../../context/InviteVariantContext'
import { weddingConfig } from '../../config/wedding'
import { LOCAL_IMAGE_BASES } from '../../lib/images'
import { MaterialIcon } from '../ui/MaterialIcon'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { WeddingImage } from '../ui/WeddingImage'

export function InvitationSection() {
  const variant = useInviteVariant()
  const { invitation, cinematicImage } = weddingConfig
  const content = variant === 'parents' ? invitation.formal : invitation.casual

  return (
    <section className="px-container-margin mb-section-gap pt-section-gap">
      <RevealOnScroll>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-section-gap">
          <WeddingImage
            localBase={LOCAL_IMAGE_BASES.cinematicImage}
            fallback={cinematicImage}
            alt="Wedding invitation"
            className="w-full h-full object-cover grayscale-[20%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-8">
            <p className="font-label-md text-label-md text-secondary-fixed uppercase tracking-[0.2em] mb-2">
              The Invitation
            </p>
            <h2 className="font-display-md text-display-md text-white">Join our narrative.</h2>
          </div>
        </div>
      </RevealOnScroll>

      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="text-center bg-surface-container-low p-10 rounded-lg archival-border">
            <MaterialIcon icon="menu_book" className="text-secondary mb-4" />
            <h3 className="font-headline-lg text-headline-lg text-primary mb-6">{content.title}</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed italic">
              {content.text}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
