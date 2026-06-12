import { useMemo } from 'react'
import { weddingConfig } from '../../config'
import { daysUntilWedding } from '../../lib/weddingDate'

export function WeddingCountdown() {
  const { date } = weddingConfig
  const days = useMemo(() => daysUntilWedding(date.iso), [date.iso])

  if (days > 0) {
    return (
      <p className="font-body-md text-body-md tabular-nums">
        <span className="text-primary">D-</span>
        <span className="font-label-md text-label-md text-secondary tracking-wide">{days}</span>
      </p>
    )
  }

  if (days === 0) {
    return (
      <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">D-Day</p>
    )
  }

  return (
    <p className="font-body-md text-body-md tabular-nums">
      <span className="text-primary">D+</span>
      <span className="font-label-md text-label-md text-secondary tracking-wide">{Math.abs(days)}</span>
    </p>
  )
}
