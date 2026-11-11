import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label="CarePath home">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-xl bg-brand-navy font-display text-2xl font-extrabold text-brand-mint ring-1 ring-white/20"
      >
        +
      </span>
      <span className={cn('font-display text-xl font-extrabold tracking-tight', dark ? 'text-white' : 'text-brand-navy')}>
        CarePath
      </span>
    </Link>
  )
}
