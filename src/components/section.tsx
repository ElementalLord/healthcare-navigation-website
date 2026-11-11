import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from './motion'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

/** Small label above a heading. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        'mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em]',
        dark ? 'text-brand-mint' : 'text-brand-teal',
      )}
    >
      <span aria-hidden="true" className={cn('size-2 rounded-full', dark ? 'bg-brand-mint' : 'bg-brand-teal')} />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn('mb-10 max-w-3xl', className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={cn('text-3xl font-extrabold sm:text-4xl', dark ? 'text-white' : 'text-brand-navy')}>{title}</h2>
      {intro && <p className={cn('mt-4 text-lg', dark ? 'text-white/85' : 'text-muted-foreground')}>{intro}</p>}
    </Reveal>
  )
}

/** Dark banner at the top of inner pages. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 text-white sm:py-20 print:bg-white print:py-4 print:text-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 size-[36rem] rounded-full border border-white/10 shadow-[0_0_0_70px_rgba(255,255,255,0.02),0_0_0_140px_rgba(255,255,255,0.015)] print:hidden"
      />
      <Container className="relative">
        <Reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-white/85 print:text-black">{intro}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
