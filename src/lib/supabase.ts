import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { GuestbookEntry, GuestbookInsert } from '../types/guestbook'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let client: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(supabaseUrl!, supabaseAnonKey!)
  }
  return client
}

// Supabase 미설정 시 데모용 로컬 저장
const LOCAL_KEY = 'wedding-credits-guestbook'

function getLocalEntries(): GuestbookEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalEntry(entry: GuestbookInsert): GuestbookEntry {
  const entries = getLocalEntries()
  const newEntry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: entry.name.trim(),
    message: entry.message?.trim() || null,
    created_at: new Date().toISOString(),
  }
  entries.unshift(newEntry)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries))
  return newEntry
}

export async function fetchGuestbook(): Promise<GuestbookEntry[]> {
  const supabase = getClient()
  if (!supabase) return getLocalEntries()

  const { data, error } = await supabase
    .from('guestbook')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function addGuestbookEntry(entry: GuestbookInsert): Promise<GuestbookEntry> {
  const name = entry.name.trim()
  if (!name) throw new Error('이름을 입력해주세요.')

  const message = entry.message?.trim() || null

  const supabase = getClient()
  if (!supabase) return saveLocalEntry({ name, message })

  const { data, error } = await supabase
    .from('guestbook')
    .insert({ name, message })
    .select('id, name, message, created_at')
    .single()

  if (error) throw error
  return data
}
