import { AccountCard } from '../accounts/AccountCard'
import { useInviteVariant } from '../../context/InviteVariantContext'
import { weddingConfig } from '../../config/wedding'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function GiftSection() {
  const variant = useInviteVariant()
  const { accounts } = weddingConfig

  return (
    <section id="gift" className="px-container-margin mt-section-gap mb-section-gap max-w-4xl mx-auto scroll-mt-24">
      <RevealOnScroll>
        <div className="text-center mb-12">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-4">마음 전하실 곳</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            새로운 시작을 축복하며 보내주시는 따뜻한 마음 소중히 간직하겠습니다.
          </p>
        </div>

        {variant === 'couple' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <AccountCard label="신랑" account={accounts.couple.groom} />
            <AccountCard label="신부" account={accounts.couple.bride} />
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">신랑측</p>
              <div className="grid md:grid-cols-2 gap-6">
                {accounts.parents.groomSide.map((account) => (
                  <AccountCard key={account.role} label={account.role} account={account} />
                ))}
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">신부측</p>
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
