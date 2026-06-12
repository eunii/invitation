import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { GuestbookEntry, GuestbookInsert } from '../types/guestbook'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

const PLACEHOLDER_MARKERS = ['your-project', 'your-anon-key', 'replace_me', 'changeme']

function looksLikePlaceholder(value: string): boolean {
  const lower = value.toLowerCase()
  return PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker))
}

function isValidSupabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co')
  } catch {
    return false
  }
}

function isValidAnonKey(key: string): boolean {
  // Supabase anon key는 JWT 형태로 보통 100자 이상
  return key.length >= 40 && !looksLikePlaceholder(key)
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    isValidSupabaseUrl(supabaseUrl) &&
    isValidAnonKey(supabaseAnonKey),
)

export type GuestbookStorageMode = 'supabase' | 'local'

export const guestbookStorageMode: GuestbookStorageMode = isSupabaseConfigured ? 'supabase' : 'local'

let client: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}

if (import.meta.env.DEV && supabaseUrl && !isSupabaseConfigured) {
  console.warn(
    '[guestbook] Supabase 설정이 비어 있거나 예시 값입니다. 브라우저 localStorage를 사용합니다.',
  )
}

// Supabase 미설정 시 데모용 로컬 저장
const LOCAL_KEY = 'wedding-credits-guestbook'

function getLocalEntries(): GuestbookEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const entries: GuestbookEntry[] = JSON.parse(raw)
    return entries.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
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
