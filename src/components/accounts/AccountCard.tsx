import { useState } from 'react'

export type BankAccount = {
  bank: string
  number: string
  holder: string
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

export function AccountCard({ label, account }: { label: string; account: BankAccount }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleReveal = async () => {
    setRevealed(true)
    try {
      await copyToClipboard(account.number)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="bg-surface-container-low p-6 rounded-lg archival-border space-y-4">
      <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">{label}</p>
      <div className="space-y-3">
        <p className="font-body-lg text-body-lg text-primary">{account.bank}</p>
        <div className="flex items-center justify-between gap-4">
          <p className="font-body-md text-body-md text-primary font-bold">{account.holder}</p>
          {!revealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="shrink-0 px-4 py-2 border border-outline-variant text-label-md rounded hover:bg-surface-variant transition-colors"
            >
              보기
            </button>
          ) : (
            <span className="font-caption text-caption text-secondary shrink-0">
              {copied ? '복사됨' : '표시됨'}
            </span>
          )}
        </div>
        {revealed && (
          <p className="font-body-md text-body-md text-outline break-all">{account.number}</p>
        )}
      </div>
    </div>
  )
}
