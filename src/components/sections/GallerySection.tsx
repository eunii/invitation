import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { MaterialIcon } from '../ui/MaterialIcon'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function GallerySection() {
  const { gallery } = weddingConfig
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => {
    setSelected((i) => (i === null ? null : i === 0 ? gallery.length - 1 : i - 1))
  }, [gallery.length])
  const next = useCallback(() => {
    setSelected((i) => (i === null ? null : i === gallery.length - 1 ? 0 : i + 1))
  }, [gallery.length])

  useEffect(() => {
    if (selected === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [selected, close, prev, next])

  const preventPinch = (e: React.TouchEvent) => {
    if (e.touches.length > 1) e.preventDefault()
  }

  return (
    <section id="gallery" className="px-container-margin mb-section-gap scroll-mt-24">
      <RevealOnScroll>
        <div className="text-center mb-8">
          <p className="font-caption text-caption text-secondary uppercase tracking-widest mb-2">Gallery</p>
          <h3 className="font-headline-lg text-headline-lg text-primary">Our Moments</h3>
        </div>

        <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto">
          {gallery.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="relative aspect-square overflow-hidden bg-surface-dim group"
              aria-label={`사진 ${i + 1} 보기`}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 backdrop-blur-sm touch-manipulation select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchMove={preventPinch}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white p-2"
              aria-label="닫기"
            >
              <MaterialIcon icon="close" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="이전"
            >
              <MaterialIcon icon="chevron_left" />
            </button>

            <motion.img
              key={selected}
              src={gallery[selected]}
              alt={`Gallery ${selected + 1}`}
              className="max-w-[92vw] max-h-[85vh] w-auto h-auto object-contain pointer-events-none"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="다음"
            >
              <MaterialIcon icon="chevron_right" />
            </button>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-caption text-caption text-white/60">
              {selected + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
