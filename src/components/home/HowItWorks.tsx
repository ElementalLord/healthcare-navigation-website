import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Building2, CalendarCheck, PhoneCall, UserRoundCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container, Eyebrow, Accent } from '../section'

const steps = [
  {
    icon: Building2,
    title: 'A partner introduces a family',
    body: 'Families come to us through a trusted community organization, never cold through this website. The family agrees to follow-up first.',
    tag: 'Day 0',
  },
  {
    icon: PhoneCall,
    title: 'We help with the next call',
    body: 'Plain-language guides and call scripts, so families know what to ask, who to ask, and what to write down.',
    tag: 'Day 0',
  },
  {
    icon: CalendarCheck,
    title: 'We check in',
    body: 'After 2 days, after 1 week, and after the visit. An adult supervisor is always involved, and anything medical goes back to staff.',
    tag: 'Day 2 · Day 7',
  },
  {
    icon: UserRoundCheck,
    title: 'We confirm it happened',
    body: 'We count a family as helped only when the appointment, interpreter, or application actually happened.',
    tag: 'After the visit',
  },
]

/**
 * Scroll story: the left panel stays in place and changes as each step on the right scrolls past.
 * On phones it becomes a simple vertical timeline.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const ActiveIcon = steps[active].icon

  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>How follow-through works</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-[1.08] text-brand-navy sm:text-5xl">
            Real people, checking in, <Accent>until it’s done.</Accent>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground sm:text-xl">
            Families tend to trust a real person more than a website. This site supports that human work. It doesn’t replace it.
          </p>

          {/* Large changing panel (desktop only; decorative, the steps list carries the content). */}
          <div aria-hidden="true" className="aurora grain relative mt-10 hidden h-64 overflow-hidden rounded-[2rem] p-8 text-white lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.4 }}
                className="flex h-full flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-16 place-items-center rounded-2xl bg-brand-mint text-brand-navy">
                    <ActiveIcon className="size-8" />
                  </span>
                  <span className="font-display text-7xl font-extrabold leading-none text-white/15">0{active + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-mint">{steps[active].tag}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{steps[active].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol ref={listRef} className="relative space-y-6 pl-10 lg:space-y-10 lg:py-10">
          <span aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-0.5 rounded-full bg-border" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-3 top-0 w-0.5 origin-top rounded-full bg-gradient-to-b from-brand-teal to-brand-mint"
          />
          {steps.map(({ icon: Icon, title, body, tag }, i) => (
            // The step that crosses the middle of the screen becomes the active one.
            <motion.li key={title} onViewportEnter={() => setActive(i)} viewport={{ margin: '-45% 0px -45% 0px' }} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -left-10 top-7 grid size-6 place-items-center rounded-full border-2 bg-background transition-colors duration-300',
                  i <= active ? 'border-brand-teal' : 'border-border',
                )}
              >
                <span className={cn('size-2.5 rounded-full transition-colors duration-300', i <= active ? 'bg-brand-teal' : 'bg-transparent')} />
              </span>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'rounded-3xl border bg-card p-7 transition-[box-shadow,border-color] duration-500',
                  i === active ? 'border-brand-teal/50 shadow-[0_24px_60px_-24px_rgba(16,44,58,0.35)]' : 'shadow-sm',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-navy text-brand-mint lg:hidden">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">{tag}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-brand-navy">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 text-lg text-muted-foreground">{body}</p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
