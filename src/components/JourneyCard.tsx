import { Link } from 'react-router-dom'

import { barriers } from '@/data/barriers'
import { defaultRoute, routes } from '@/data/routes'
import type { Journey } from '@/data/types'

/**
 * One guide in the guide index, styled like a line on a transit map key:
 * a coloured route marker, then the guide's name and what it covers.
 */
export function JourneyCard({ journey }: { journey: Journey }) {
  const route = routes[journey.slug] ?? defaultRoute
  const Icon = route.icon
  return (
    <Link
      to={`/guides/${journey.slug}`}
      className="group flex h-full gap-5 border-t-2 border-ink py-6 pr-2 hover:bg-signage/60 focus-visible:bg-signage/60"
    >
      <span
        aria-hidden="true"
        className="grid size-14 shrink-0 place-items-center rounded-md"
        style={{ backgroundColor: route.color, color: route.text }}
      >
        <Icon className="size-7" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-bold text-muted-foreground">{barriers[journey.barrier].label}</span>
        <span className="mt-0.5 block text-xl font-bold leading-snug text-ink underline-offset-4 group-hover:underline">
          {journey.title}
        </span>
        <span className="mt-2 block text-muted-foreground">{journey.summary}</span>
      </span>
    </Link>
  )
}
