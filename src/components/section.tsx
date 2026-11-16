import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

export function SectionHeading({
  title,
  intro,
  dark = false,
  className,
}: {
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div className={cn('mb-10 max-w-2xl', className)}>
      <h2 className={cn('text-3xl font-bold leading-tight sm:text-4xl', dark ? 'text-white' : 'text-ink')}>{title}</h2>
      {intro && <p className={cn('mt-4 text-lg', dark ? 'text-white/90' : 'text-muted-foreground')}>{intro}</p>}
    </div>
  )
}

/**
 * Banner at the top of inner pages, styled like a transit sign: ink panel, white title,
 * and a coloured stripe along the bottom (the page's "route colour").
 * `crumb` is a short line above the title saying where you are, e.g. "Guides".
 */
export function PageHero({
  crumb,
  title,
  intro,
  stripe = 'var(--signal)',
  children,
}: {
  crumb?: ReactNode
  title: string
  intro?: ReactNode
  stripe?: string
  children?: ReactNode
}) {
  return (
    <section className="bg-ink text-white print:bg-white print:text-black">
      <Container className="py-14 sm:py-20">
        {crumb && <p className="mb-4 text-base font-bold text-white/90 print:text-black">{crumb}</p>}
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl print:text-black">{intro}</p>}
        {children}
      </Container>
      <div aria-hidden="true" className="h-2 print:hidden" style={{ backgroundColor: stripe }} />
    </section>
  )
}
