import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { barriers } from '@/data/barriers'
import type { Journey } from '@/data/types'

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link
      to={`/guides/${journey.slug}`}
      className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-teal hover:shadow-lg"
    >
      <Badge variant="secondary" className="self-start">
        {barriers[journey.barrier].label}
      </Badge>
      <h3 className="mt-4 text-xl font-bold text-brand-navy">{journey.title}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{journey.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-teal">
        Read the guide
        <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
