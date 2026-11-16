import { ArrowUpRight, Hospital, Languages, MonitorSmartphone, PhoneCall, ReceiptText, Route, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { barriers } from '@/data/barriers'
import type { Journey } from '@/data/types'
import { trackSpotlight } from '@/lib/spotlight'
import { cn } from '@/lib/utils'

/** Icon for each guide, matched by its slug. New guides fall back to the route icon. */
const icons: Record<string, LucideIcon> = {
  referral: Route,
  'medical-bill': ReceiptText,
  interpreter: Languages,
  'where-to-go': Hospital,
  'talking-with-staff': PhoneCall,
  'patient-portal': MonitorSmartphone,
}

export function JourneyCard({ journey, featured = false }: { journey: Journey; featured?: boolean }) {
  const Icon = icons[journey.slug] ?? Route
  return (
    <Link
      to={`/guides/${journey.slug}`}
      onPointerMove={trackSpotlight}
      style={featured ? ({ '--spot': 'rgba(127, 216, 198, 0.22)' } as React.CSSProperties) : undefined}
      className={cn(
        'spotlight group flex h-full flex-col rounded-3xl border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1',
        featured
          ? 'aurora border-white/10 text-white shadow-[0_30px_60px_-30px_rgba(6,23,30,0.7)]'
          : 'bg-card shadow-[0_1px_2px_rgba(16,44,58,0.04),0_12px_32px_-16px_rgba(16,44,58,0.18)] hover:border-brand-teal/50 hover:shadow-[0_24px_48px_-20px_rgba(16,44,58,0.28)]',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110',
            featured ? 'bg-brand-mint text-brand-navy' : 'bg-brand-navy text-brand-mint',
          )}
        >
          <Icon aria-hidden="true" className="size-7" />
        </span>
        <span
          className={cn(
            'grid size-11 place-items-center rounded-full border transition-colors duration-300',
            featured
              ? 'border-white/25 text-white group-hover:bg-brand-mint group-hover:text-brand-navy'
              : 'border-border text-brand-navy group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white',
          )}
        >
          <ArrowUpRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <p className={cn('mt-8 text-sm font-bold uppercase tracking-[0.12em]', featured ? 'text-brand-mint' : 'text-brand-teal')}>
        {barriers[journey.barrier].label}
      </p>
      <h3 className={cn('mt-2 font-bold', featured ? 'text-3xl text-white sm:text-4xl' : 'text-2xl text-brand-navy')}>{journey.title}</h3>
      <p className={cn('mt-3 flex-1 text-lg', featured ? 'max-w-xl text-white/85' : 'text-muted-foreground')}>{journey.summary}</p>
      {featured && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="What’s inside">
          {[`${journey.steps.length} steps`, `${journey.scripts.length} call scripts`, 'Printable'].map((chip) => (
            <li key={chip} className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-base font-medium text-white/90">
              {chip}
            </li>
          ))}
        </ul>
      )}
      <span className="sr-only">Read the guide</span>
    </Link>
  )
}
