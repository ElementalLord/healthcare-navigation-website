import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

/** Logo: a route line with two stops, the second one reached. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-sm" aria-label="CarePath home">
      <svg aria-hidden="true" viewBox="0 0 40 24" className="h-6 w-10">
        <rect x="6" y="10" width="28" height="4" fill={dark ? '#ffffff' : '#14213d'} />
        <circle cx="7" cy="12" r="5.5" fill={dark ? '#14213d' : '#ffffff'} stroke={dark ? '#ffffff' : '#14213d'} strokeWidth="3" />
        <circle cx="33" cy="12" r="7" fill="#f2b41b" stroke={dark ? '#ffffff' : '#14213d'} strokeWidth="3" />
      </svg>
      <span className={cn('text-xl font-bold tracking-tight', dark ? 'text-white' : 'text-ink')}>CarePath</span>
    </Link>
  )
}
