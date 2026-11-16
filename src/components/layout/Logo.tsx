import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5 rounded-full" aria-label="CarePath home">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-full bg-brand-mint text-brand-navy transition-transform duration-500 group-hover:rotate-180"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <span className={cn('font-display text-xl font-extrabold tracking-tight', dark ? 'text-white' : 'text-brand-navy')}>CarePath</span>
    </Link>
  )
}
