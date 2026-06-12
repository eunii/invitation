import { MaterialIcon } from '../ui/MaterialIcon'
import type { SectionId } from './Header'

interface BottomNavProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenGuestbook: () => void
}

const items: { id: SectionId; icon: string; filled?: boolean }[] = [
  { id: 'home', icon: 'home' },
  { id: 'story', icon: 'auto_stories' },
  { id: 'details', icon: 'event_available' },
  { id: 'credits', icon: 'stars', filled: true },
]

export function BottomNav({ active, onNavigate, onOpenGuestbook }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl flex justify-around items-center px-container-margin h-16 pb-safe">
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => (item.id === 'credits' ? onOpenGuestbook() : onNavigate(item.id))}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? 'text-secondary scale-110'
                : 'text-outline opacity-60 hover:text-secondary'
            }`}
          >
            <MaterialIcon icon={item.icon} filled={item.filled && isActive} />
          </button>
        )
      })}
    </nav>
  )
}
