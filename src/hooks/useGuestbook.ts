import { useCallback, useEffect, useRef, useState } from 'react'
import { addGuestbookEntry, fetchGuestbook } from '../lib/supabase'
import type { GuestbookEntry, GuestbookInsert } from '../types/guestbook'

function sortByWrittenOrder(entries: GuestbookEntry[]): GuestbookEntry[] {
  return [...entries].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )
}

function dedupeById(entries: GuestbookEntry[]): GuestbookEntry[] {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.id)) return false
    seen.add(entry.id)
    return true
  })
}

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const submitLockRef = useRef(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchGuestbook()
      setEntries(sortByWrittenOrder(dedupeById(data)))
    } catch (e) {
      setError(e instanceof Error ? e.message : '방명록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const submit = useCallback(async (entry: GuestbookInsert) => {
    if (submitLockRef.current) return
    submitLockRef.current = true
    setSubmitting(true)
    setError(null)
    try {
      const newEntry = await addGuestbookEntry(entry)
      setEntries((prev) => sortByWrittenOrder(dedupeById([...prev, newEntry])))
      return newEntry
    } catch (e) {
      const msg = e instanceof Error ? e.message : '메시지 전송에 실패했습니다.'
      setError(msg)
      throw e
    } finally {
      submitLockRef.current = false
      setSubmitting(false)
    }
  }, [])

  return { entries, loading, submitting, error, submit, reload: load }
}
