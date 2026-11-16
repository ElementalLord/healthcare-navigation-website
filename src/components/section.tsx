import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { PathField } from './canvas/PathField'
import { Reveal, TextReveal } from './motion'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

/** Small label above a heading. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-sm font-bold uppercase tracking-[0.14em]',
        dark ? 'border-white/15 bg-white/5 text-brand-mint' : 'border-brand-teal/25 bg-white text-brand-teal',
      )}
    >
      <span aria-hidden="true" className={cn('size-2 rounded-full', dark ? 'bg-brand-mint' : 'bg-brand-teal')} />
      {children}
    </p>
  )
}

/** Serif italic accent for a word or phrase inside a heading. */
export function Accent({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <em className={cn('font-serif font-normal italic tracking-normal', dark ? 'text-shine' : 'text-brand-teal')}>{children}</em>
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
    <Reveal className={cn('mb-12 max-w-3xl', className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={cn('text-4xl font-extrabold leading-[1.08] sm:text-5xl', dark ? 'text-white' : 'text-brand-navy')}>{title}</h2>
      {intro && <p className={cn('mt-5 text-lg sm:text-xl', dark ? 'text-white/85' : 'text-muted-foreground')}>{intro}</p>}
    </Reveal>
  )
}

/** Dark animated banner at the top of inner pages. `title` must be plain text so it can animate word by word. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="aurora grain relative overflow-hidden pb-16 pt-32 text-white sm:pb-24 sm:pt-40 print:bg-white print:py-4 print:text-black">
      <PathField lines={10} pulses={4} className="opacity-80" />
      <Container className="relative">
        <Reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          <TextReveal text={title} />
        </h1>
        <Reveal delay={0.25}>
          {intro && <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl print:text-black">{intro}</p>}
          {children}
        </Reveal>
      </Container>
      {/* Curved edge into the page below. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2rem] bg-background print:hidden" />
    </section>
  )
}
