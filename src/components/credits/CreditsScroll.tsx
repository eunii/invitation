import type { GuestbookEntry } from '../../types/guestbook'

interface CreditsScrollProps {
  entries: GuestbookEntry[]
}

function CreditItem({ entry }: { entry: GuestbookEntry }) {
  return (
    <div className="text-center group">
      <p className="font-caption text-caption text-outline mb-2 uppercase tracking-tighter">
        Special Thanks
      </p>
      <h3 className="font-headline-lg text-headline-lg text-primary mb-4">{entry.name}</h3>
      {entry.message && (
        <p className="font-body-lg text-body-lg italic text-on-surface-variant max-w-md mx-auto">
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
    <div className="credits-container w-full max-w-2xl px-container-margin flex-grow overflow-hidden relative z-10 mask-fade">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20" />
      <div className="credits-animation space-y-16 py-32">
        {doubled.map((entry, i) => (
          <CreditItem key={`${entry.id}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  )
}
