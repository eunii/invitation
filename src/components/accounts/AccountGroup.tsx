import { useState } from 'react'
import { weddingConfig } from '../../config'
import { MaterialIcon } from '../ui/MaterialIcon'
import type { BankAccount } from './AccountCard'

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

function AccountRow({ label, account }: { label: string; account: BankAccount }) {
  const { ui } = weddingConfig
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(account.number)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-1.5">
      <p className="font-caption text-caption text-secondary uppercase tracking-widest">{label}</p>
      <p className="font-body-md text-body-md text-primary">
        {account.bank} · {account.holder}
      </p>
      <div className="flex items-center justify-between gap-3">
        <p className="font-body-md text-body-md text-outline break-all">{account.number}</p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={ui.gift.copy}
          className="shrink-0 p-2 border border-outline-variant rounded hover:bg-surface-variant transition-colors"
        >
          <MaterialIcon icon="content_copy" className="text-[18px] text-secondary" />
        </button>
      </div>
      {copied && (
        <p className="font-caption text-caption text-secondary">{ui.gift.copied}</p>
      )}
    </div>
  )
}

interface AccountGroupProps {
  sideLabel: string
  accounts: { label: string; account: BankAccount }[]
}

export function AccountGroup({ sideLabel, accounts }: AccountGroupProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg archival-border overflow-hidden bg-surface-container-low">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-6 py-4 font-label-md text-label-md text-primary hover:bg-surface-variant/40 transition-colors"
      >
        <span className="uppercase tracking-widest">{sideLabel}</span>
        <MaterialIcon icon={open ? 'expand_less' : 'expand_more'} className="text-secondary" />
      </button>

      {open && (
        <div className="px-6 pb-6 pt-4 space-y-6 border-t border-outline-variant/20">
          {accounts.map((item) => (
            <AccountRow key={item.label} label={item.label} account={item.account} />
          ))}
        </div>
      )}
    </div>
  )
}
