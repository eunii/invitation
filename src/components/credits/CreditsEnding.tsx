import { motion } from 'framer-motion'
import { weddingConfig } from '../../config'
import { MaterialIcon } from '../ui/MaterialIcon'

interface CreditsEndingProps {
  animateIn?: boolean
  compact?: boolean
}

export function CreditsEnding({ animateIn = false, compact = false }: CreditsEndingProps) {
  const { ui } = weddingConfig
  const { ending } = ui.credits

  const content = (
    <>
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="h-px w-12 bg-outline-variant/40" />
        <MaterialIcon icon="auto_awesome" className="text-secondary text-[16px]" />
        <span className="h-px w-12 bg-outline-variant/40" />
      </div>

      <p className="font-caption text-caption text-secondary uppercase tracking-[0.35em] mb-5">
        {ending.prelude}
      </p>

      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary italic leading-relaxed mb-6">
        {ending.closing}
      </h3>

      <p className="font-label-md text-label-md text-secondary tracking-[0.2em] uppercase mb-10">
        {ending.theEnd}
      </p>

      <p className="font-body-md text-body-md text-on-surface-variant italic">{ending.cheer}</p>
    </>
  )

  const className = `text-center px-6 ${compact ? 'py-12' : 'py-16'}`

  if (!animateIn) {
    return <div className={className}>{content}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  )
}
