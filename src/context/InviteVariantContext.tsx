import { createContext, useContext, type ReactNode } from 'react'

export type InviteVariant = 'couple' | 'parents'

const InviteVariantContext = createContext<InviteVariant>('couple')

export function InviteVariantProvider({
  variant,
  children,
}: {
  variant: InviteVariant
  children: ReactNode
}) {
  return <InviteVariantContext.Provider value={variant}>{children}</InviteVariantContext.Provider>
}

export function useInviteVariant() {
  return useContext(InviteVariantContext)
}
