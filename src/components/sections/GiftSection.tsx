import { weddingConfig } from '../../config/wedding'
import { RevealOnScroll } from '../ui/RevealOnScroll'

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

export function GiftSection() {
  const { accounts } = weddingConfig

  return (
    <section className="px-container-margin mt-section-gap mb-section-gap max-w-4xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-12">
          <h3 className="font-headline-lg text-headline-lg text-primary mb-4">마음 전하실 곳</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            새로운 시작을 축복하며 보내주시는 따뜻한 마음 소중히 간직하겠습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { label: '신랑측', account: accounts.groom },
            { label: '신부측', account: accounts.bride },
          ].map(({ label, account }) => (
            <div
              key={label}
              className="bg-surface-container-low p-8 rounded-lg archival-border space-y-4"
            >
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
                {label}
              </p>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-body-lg text-body-lg text-primary">{account.bank}</p>
                  <p className="font-body-md text-body-md text-outline">{account.number}</p>
                  <p className="font-body-md text-body-md text-primary font-bold">{account.holder}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(account.number)}
                  className="px-4 py-2 border border-outline-variant text-label-md rounded hover:bg-surface-variant transition-colors"
                >
                  복사하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
