import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { MaterialIcon } from '../ui/MaterialIcon'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function GallerySection() {
  const { gallery } = weddingConfig
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))

  return (
    <section className="px-container-margin mb-section-gap">
      <RevealOnScroll>
        <div className="text-center mb-8">
          <p className="font-caption text-caption text-secondary uppercase tracking-widest mb-2">Gallery</p>
          <h3 className="font-headline-lg text-headline-lg text-primary">Our Moments</h3>
        </div>

        <div className="relative max-w-3xl mx-auto aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-lg bg-surface-dim">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={gallery[index]}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Previous"
          >
            <MaterialIcon icon="chevron_left" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Next"
          >
            <MaterialIcon icon="chevron_right" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-secondary w-6' : 'bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
