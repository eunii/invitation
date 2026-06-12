import { MaterialIcon } from '../ui/MaterialIcon'

export type SectionId = 'home' | 'gallery' | 'map' | 'guestbook'

interface HeaderProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenGuestbook: () => void
}

const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: '홈' },
  { id: 'gallery', label: '갤러리' },
  { id: 'map', label: '맵' },
  { id: 'guestbook', label: '방명록' },
]

export function Header({ active, onNavigate, onOpenGuestbook }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-margin py-unit">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2"
      >
        <MaterialIcon icon="auto_awesome" className="text-secondary" />
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Our Story</h1>
      </button>

      <nav className="hidden md:flex gap-gutter">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => (item.id === 'guestbook' ? onOpenGuestbook() : onNavigate(item.id))}
            className={`font-label-md text-label-md transition-opacity hover:opacity-80 ${
              active === item.id ? 'text-secondary font-bold' : 'text-outline'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
