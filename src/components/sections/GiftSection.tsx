import { AccountGroup } from '../accounts/AccountGroup'
import { useInviteVariant } from '../../context/InviteVariantContext'
import { weddingConfig } from '../../config'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function GiftSection() {
  const variant = useInviteVariant()
  const { accounts, couple, ui } = weddingConfig
  const [groomFather, groomMother] = accounts.parents.groomSide
  const [brideFather, brideMother] = accounts.parents.brideSide

  const groomAccounts =
    variant === 'couple'
      ? [{ label: ui.gift.groom, account: { ...accounts.couple.groom, holder: couple.groom } }]
      : [
          { label: ui.gift.father, account: groomFather },
          { label: ui.gift.mother, account: groomMother },
          { label: ui.gift.groom, account: { ...accounts.couple.groom, holder: couple.groom } },
        ]

  const brideAccounts =
    variant === 'couple'
      ? [{ label: ui.gift.bride, account: { ...accounts.couple.bride, holder: couple.bride } }]
      : [
          { label: ui.gift.father, account: brideFather },
          { label: ui.gift.mother, account: brideMother },
          { label: ui.gift.bride, account: { ...accounts.couple.bride, holder: couple.bride } },
        ]

  return (
    <section id="gift" className="px-container-margin mt-section-gap mb-section-gap max-w-4xl mx-auto scroll-mt-24">
      <RevealOnScroll>
        <div className="text-center mb-12">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-4">{ui.gift.title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{ui.gift.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AccountGroup sideLabel={ui.gift.groomSide} accounts={groomAccounts} />
          <AccountGroup sideLabel={ui.gift.brideSide} accounts={brideAccounts} />
        </div>
      </RevealOnScroll>
    </section>
  )
}
