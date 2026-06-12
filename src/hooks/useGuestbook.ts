import { useCallback, useEffect, useState } from 'react'
import { addGuestbookEntry, fetchGuestbook } from '../lib/supabase'
import type { GuestbookEntry, GuestbookInsert } from '../types/guestbook'

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchGuestbook()
      setEntries(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '방명록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const submit = useCallback(
    async (entry: GuestbookInsert) => {
      setSubmitting(true)
      setError(null)
      try {
        const newEntry = await addGuestbookEntry(entry)
        setEntries((prev) => [newEntry, ...prev])
        return newEntry
      } catch (e) {
        const msg = e instanceof Error ? e.message : '메시지 전송에 실패했습니다.'
        setError(msg)
        throw e
      } finally {
        setSubmitting(false)
      }
    },
    [],
  )

  return { entries, loading, submitting, error, submit, reload: load }
}
