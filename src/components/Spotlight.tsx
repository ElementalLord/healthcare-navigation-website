import type { ComponentProps } from 'react'

import { trackSpotlight } from '@/lib/spotlight'
import { cn } from '@/lib/utils'

/** A card with a soft highlight that follows the pointer. */
export function SpotlightCard({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      onPointerMove={trackSpotlight}
      className={cn(
        'spotlight rounded-3xl border bg-card p-7 shadow-[0_1px_2px_rgba(16,44,58,0.04),0_12px_32px_-16px_rgba(16,44,58,0.18)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-[0_24px_48px_-20px_rgba(16,44,58,0.28)]',
        className,
      )}
      {...props}
    />
  )
}
