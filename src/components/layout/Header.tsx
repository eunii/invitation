import { MaterialIcon } from '../ui/MaterialIcon'

export type SectionId = 'home' | 'story' | 'details' | 'credits'

interface HeaderProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  onOpenGuestbook: () => void
}

const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Gallery' },
  { id: 'details', label: 'Schedule' },
  { id: 'credits', label: 'Credits' },
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
            onClick={() => (item.id === 'credits' ? onOpenGuestbook() : onNavigate(item.id))}
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
