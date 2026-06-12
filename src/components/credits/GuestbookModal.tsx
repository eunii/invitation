import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingConfig } from '../../config'
import { MaterialIcon } from '../ui/MaterialIcon'

interface GuestbookModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; message: string }) => Promise<unknown>
  submitting: boolean
}

export function GuestbookModal({ open, onClose, onSubmit, submitting }: GuestbookModalProps) {
  const { ui } = weddingConfig
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    await onSubmit({ name, message })
    setName('')
    setMessage('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-container-margin">
          <motion.div
            className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="glass-panel w-full max-w-md p-8 rounded-xl relative z-10 shadow-2xl border border-outline-variant/30"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                  🎬 {ui.guestbook.title}
                </h3>
                <p className="font-caption text-caption text-secondary uppercase tracking-widest mt-1">
                  {ui.guestbook.subtitle}
                </p>
              </div>
              <button type="button" onClick={onClose} className="text-outline hover:text-primary">
                <MaterialIcon icon="close" />
              </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="block font-caption text-caption text-secondary uppercase tracking-widest mb-1">
                  {ui.guestbook.nameLabel}
                </label>
                <input
                  className="input-underline font-body-lg text-primary placeholder:text-outline-variant/60"
                  placeholder={ui.guestbook.namePlaceholder}
                  type="text"
                  required
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-caption text-caption text-secondary uppercase tracking-widest mb-1">
                  {ui.guestbook.messageLabel}
                </label>
                <textarea
                  className="input-underline font-body-lg text-primary placeholder:text-outline-variant/60 resize-none"
                  placeholder={ui.guestbook.messagePlaceholder}
                  rows={4}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all celestial-glow disabled:opacity-50"
              >
                {submitting ? ui.guestbook.submitting : ui.guestbook.submit}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
