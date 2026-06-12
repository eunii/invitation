import { AccountCard } from '../accounts/AccountCard'
import { useInviteVariant } from '../../context/InviteVariantContext'
import { weddingConfig } from '../../config'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function GiftSection() {
  const variant = useInviteVariant()
  const { accounts, ui } = weddingConfig

  return (
    <section id="gift" className="px-container-margin mt-section-gap mb-section-gap max-w-4xl mx-auto scroll-mt-24">
      <RevealOnScroll>
        <div className="text-center mb-12">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-4">{ui.gift.title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{ui.gift.description}</p>
        </div>

        {variant === 'couple' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <AccountCard label={ui.gift.groom} account={accounts.couple.groom} />
            <AccountCard label={ui.gift.bride} account={accounts.couple.bride} />
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">{ui.gift.groomSide}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {accounts.parents.groomSide.map((account) => (
                  <AccountCard key={account.role} label={account.role} account={account} />
                ))}
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">{ui.gift.brideSide}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {accounts.parents.brideSide.map((account) => (
                  <AccountCard key={account.role} label={account.role} account={account} />
                ))}
              </div>
            </div>
          </div>
        )}
      </RevealOnScroll>
    </section>
  )
}
