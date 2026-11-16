import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck, FileText, HandHeart, PhoneMissed } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * An illustration (not real data) of one referral's journey.
 * It plays through four moments on a loop to show where CarePath steps in.
 */
const stages = [
  { icon: FileText, title: 'Referral given', body: 'The doctor says “someone will call you.”', tone: 'mint' },
  { icon: PhoneMissed, title: 'Nobody calls', body: 'A week passes. The referral may be lost.', tone: 'coral' },
  { icon: HandHeart, title: 'CarePath checks in', body: 'Day 2 and day 7. We help with the next call.', tone: 'sun' },
  { icon: CalendarCheck, title: 'Appointment confirmed', body: 'Counted only once the visit really happens.', tone: 'mint' },
] as const

const tones = {
  mint: 'bg-brand-mint text-brand-navy',
  coral: 'bg-[#f3b4ab] text-[#5c140d]',
  sun: 'bg-brand-sun text-[#4a3300]',
}

export function JourneyDemo() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const current = reduce ? stages.length - 1 : step

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setStep((s) => (s + 1) % stages.length), 2600)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="glass relative rounded-[2rem] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-mint">One referral’s journey</p>
        <span className="rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-white/85">Example</span>
      </div>

      <ol className="relative mt-7 space-y-2">
        {/* Track and animated fill behind the icons. */}
        <span aria-hidden="true" className="absolute bottom-8 left-[1.4rem] top-8 w-0.5 rounded-full bg-white/15" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[1.4rem] top-8 w-0.5 origin-top rounded-full bg-gradient-to-b from-brand-mint to-brand-sun"
          style={{ height: 'calc(100% - 4rem)' }}
          animate={{ scaleY: current / (stages.length - 1) }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {stages.map(({ icon: Icon, title, body, tone }, i) => {
          const reached = i <= current
          return (
            <li key={title} className="relative flex items-center gap-4 rounded-2xl p-3">
              {i === current && (
                <motion.span
                  layoutId="journey-active"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-white/8 ring-1 ring-white/15"
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  'relative grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500',
                  reached ? tones[tone] : 'bg-[#1c4252] text-white/80',
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="relative">
                <span className="block text-lg font-semibold text-white">{title}</span>
                <span className="block text-white/80">{body}</span>
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5" aria-hidden="true">
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-mint opacity-60" />
          <span className="relative inline-flex size-3 rounded-full bg-brand-mint" />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-medium text-white/85"
          >
            Step {current + 1} of {stages.length}: {stages[current].title}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
