import { motion } from 'framer-motion'

/**
 * The home page's one animated moment: a referral drawn as a transit route.
 * The line draws once on load and each stop fills in as the line reaches it.
 * With reduced motion turned on, it appears complete straight away.
 *
 * The content is a real ordered list, so screen readers get the stops in order.
 */
const stops = [
  {
    title: 'Referral given',
    stall: 'The family is told “someone will call you.”',
    we: 'We make a plan together and share a call script.',
  },
  {
    title: 'Referral received',
    stall: 'The referral gets lost between offices.',
    we: 'Day 2 check-in: we help the family ask if it arrived.',
  },
  {
    title: 'Appointment booked',
    stall: 'Nobody calls back, or cost and language get in the way.',
    we: 'Day 7 check-in: interpreter, ride, and cost questions.',
  },
  {
    title: 'Visit happened',
    stall: 'No one checks whether the family got there.',
    we: 'We confirm it happened. Only then does it count.',
  },
]

const LINE_SECONDS = 1.8

export function RouteMap() {
  return (
    <div>
      <ol className="relative grid gap-0 md:grid-cols-4">
        {/* The route line: vertical on phones, horizontal on wider screens. */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[0.9rem] top-4 bottom-4 w-2 origin-top bg-route-blue md:hidden"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: LINE_SECONDS, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-4 right-[calc(25%-1rem)] top-[0.9rem] hidden h-2 origin-left bg-route-blue md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: LINE_SECONDS, ease: 'easeInOut' }}
        />

        {stops.map((stop, i) => {
          const last = i === stops.length - 1
          return (
            <li key={stop.title} className="relative flex gap-5 pb-8 md:block md:pb-0 md:pr-6">
              <motion.span
                aria-hidden="true"
                className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-[5px] border-ink text-base font-bold"
                initial={{ backgroundColor: '#ffffff', color: '#14213d' }}
                animate={{ backgroundColor: last ? '#f2b41b' : '#ffffff' }}
                transition={{ delay: (i / (stops.length - 1)) * LINE_SECONDS, duration: 0.25 }}
              >
                {i + 1}
              </motion.span>
              <div className="md:mt-5">
                <h3 className="text-xl font-bold text-ink">
                  <span className="sr-only">Stop {i + 1}: </span>
                  {stop.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  <span className="font-bold text-alert">Where it stalls: </span>
                  {stop.stall}
                </p>
                <p className="mt-2">
                  <span className="font-bold text-route-blue">What we do: </span>
                  {stop.we}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
