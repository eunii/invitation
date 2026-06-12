import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { MaterialIcon } from '../ui/MaterialIcon'

interface HeroSectionProps {
  onEnter: () => void
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  const { couple, subtitle, date, venue, heroImage } = weddingConfig

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${couple.display} wedding`}
          className="w-full h-full object-cover grayscale-[20%] brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/80" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-screen-xl px-container-margin pb-32 md:pb-40 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <p className="font-label-md text-label-md text-on-tertiary tracking-[0.3em] uppercase mb-unit opacity-90">
          {subtitle}
        </p>

        <h2 className="font-display-lg text-display-lg text-white text-glow mb-2 italic">
          {couple.bride}{' '}
          <span className="font-display-md text-display-md mx-2 not-italic">&amp;</span>{' '}
          {couple.groom}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mt-unit">
          <div className="flex flex-col">
            <span className="font-caption text-caption text-secondary-fixed uppercase tracking-widest mb-1">
              When
            </span>
            <span className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-white">
              {date.display}
            </span>
          </div>
          <div className="hidden md:block w-px h-12 bg-outline-variant/30" />
          <div className="flex flex-col">
            <span className="font-caption text-caption text-secondary-fixed uppercase tracking-widest mb-1">
              Where
            </span>
            <span className="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-white">
              {venue.location}
            </span>
          </div>
        </div>

        <div className="mt-section-gap">
          <button
            type="button"
            onClick={onEnter}
            className="bg-white text-primary px-12 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-secondary-fixed transition-all duration-500 shadow-xl group relative overflow-hidden"
          >
            Enter the Story
            <MaterialIcon
              icon="arrow_forward"
              className="align-middle ml-2 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-secondary-fixed/50" />
        <div className="w-1 h-1 bg-secondary-fixed rounded-full animate-ping" />
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-repeat"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
    </section>
  )
}
