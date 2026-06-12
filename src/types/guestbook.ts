export interface GuestbookEntry {
  id: string
  name: string
  message: string | null
  created_at: string
}

export interface GuestbookInsert {
  name: string
  message?: string | null
}
