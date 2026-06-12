import { useMemo } from 'react'
import { weddingConfig } from '../../config'
import { daysUntilWedding } from '../../lib/weddingDate'

const dDayClass = 'font-body-md text-body-md text-outline tabular-nums'

export function WeddingCountdown() {
  const { date } = weddingConfig
  const days = useMemo(() => daysUntilWedding(date.iso), [date.iso])

  if (days > 0) {
    return <p className={dDayClass}>D-{days}</p>
  }

  if (days === 0) {
    return <p className={dDayClass}>D-Day</p>
  }

  return <p className={dDayClass}>D+{Math.abs(days)}</p>
}
