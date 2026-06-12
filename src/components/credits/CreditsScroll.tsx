import type { GuestbookEntry } from '../../types/guestbook'

interface CreditsScrollProps {
  entries: GuestbookEntry[]
}

function CreditItem({ entry }: { entry: GuestbookEntry }) {
  return (
    <div className="text-center group">
      <p className="font-caption text-[10px] text-outline mb-1 uppercase tracking-tighter">
        Special Thanks
      </p>
      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">{entry.name}</h3>
      {entry.message && (
        <p className="font-body-md text-body-md italic text-on-surface-variant max-w-sm mx-auto">
          &ldquo;{entry.message}&rdquo;
        </p>
      )}
    </div>
  )
}

export function CreditsScroll({ entries }: CreditsScrollProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body-lg text-body-lg text-outline italic">
          아직 크레딧에 이름을 남긴 분이 없습니다.
        </p>
        <p className="font-caption text-caption text-secondary mt-2">
          첫 번째 등장인물이 되어주세요 ✨
        </p>
      </div>
    )
  }

  const doubled = [...entries, ...entries]

  return (
    <div className="credits-container w-full max-w-2xl px-container-margin flex-grow overflow-hidden relative z-10 mask-fade h-[50vh] min-h-[320px]">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20" />
      <div className="credits-animation animate-scroll-up space-y-10 py-20">
        {doubled.map((entry, i) => (
          <CreditItem key={`${entry.id}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  )
}
