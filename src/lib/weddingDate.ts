/** 결혼일(로컬 자정)까지 남은 일수. 당일 0, 지난 날은 음수 */
export function daysUntilWedding(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number)
  const wedding = new Date(y, m - 1, d)
  wedding.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((wedding.getTime() - today.getTime()) / 86_400_000)
}
