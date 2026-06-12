import { useCallback, useState } from 'react'
import { CreditsSection } from '../components/credits/CreditsSection'
import { GuestbookModal } from '../components/credits/GuestbookModal'
import { BottomNav } from '../components/layout/BottomNav'
import type { SectionId } from '../components/layout/Header'
import { Header } from '../components/layout/Header'
import { ScrollProgress } from '../components/layout/ScrollProgress'
import { GallerySection } from '../components/sections/GallerySection'
import { GiftSection } from '../components/sections/GiftSection'
import { HeroSection } from '../components/sections/HeroSection'
import { InvitationSection } from '../components/sections/InvitationSection'
import { LocationSection } from '../components/sections/LocationSection'
import { WeddingInfoSection } from '../components/sections/WeddingInfoSection'
import { InviteVariantProvider, type InviteVariant } from '../context/InviteVariantContext'
import { useGuestbook } from '../hooks/useGuestbook'
import { usePageMeta } from '../hooks/usePageMeta'
import { weddingConfig } from '../config'

interface InvitePageProps {
  variant: InviteVariant
}

function InviteContent() {
  usePageMeta()
  const { subtitle, ui } = weddingConfig
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [modalOpen, setModalOpen] = useState(false)
  const { entries, loading, submitting, submit } = useGuestbook()

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleNavigate = useCallback(
    (section: SectionId) => {
      setActiveSection(section)
      scrollTo(section)
    },
    [scrollTo],
  )

  const handleEnter = useCallback(() => {
    setActiveSection('gallery')
    scrollTo('gallery')
  }, [scrollTo])

  const handleOpenGuestbook = useCallback(() => {
    setActiveSection('guestbook')
    scrollTo('guestbook')
    setModalOpen(true)
  }, [scrollTo])

  return (
    <>
      <ScrollProgress />
      <Header
        active={activeSection}
        onNavigate={handleNavigate}
        onOpenGuestbook={handleOpenGuestbook}
      />

      <HeroSection onEnter={handleEnter} />

      <main className="pb-16 md:pb-0">
        <InvitationSection />
        <GallerySection />
        <WeddingInfoSection />
        <LocationSection />
        <GiftSection />
        <CreditsSection
          entries={entries}
          loading={loading}
          onOpenModal={() => setModalOpen(true)}
        />
      </main>

      <footer className="w-full py-section-gap bg-background border-t border-outline-variant/20 flex flex-col items-center space-y-unit mb-16 md:mb-0">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{ui.footer.title}</h2>
        <p className="font-caption text-caption text-secondary uppercase tracking-widest">
          {ui.footer.copyrightPrefix} {subtitle}
        </p>
        <button
          type="button"
          onClick={() => handleNavigate('guestbook')}
          className="font-caption text-caption text-outline hover:text-secondary-fixed transition-colors uppercase tracking-widest"
        >
          {ui.footer.link}
        </button>
      </footer>

      <BottomNav
        active={activeSection}
        onNavigate={handleNavigate}
        onOpenGuestbook={handleOpenGuestbook}
      />

      <GuestbookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={submit}
        submitting={submitting}
      />
    </>
  )
}

export function InvitePage({ variant }: InvitePageProps) {
  return (
    <InviteVariantProvider variant={variant}>
      <InviteContent />
    </InviteVariantProvider>
  )
}
