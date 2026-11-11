import { motion } from 'framer-motion'
import { ArrowRight, Building2, CalendarCheck, HandHeart, MailX, PhoneCall, UserRoundCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { JourneyCard } from '@/components/JourneyCard'
import { QuickGuide } from '@/components/QuickGuide'
import { StatusBoard, WhatWeDontDo } from '@/components/StatusBoard'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, Eyebrow, SectionHeading } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { journeys } from '@/data/journeys'

const followSteps = [
  { icon: Building2, title: 'A partner introduces a family', body: 'Families come to us through a trusted community organization, never cold through this website.' },
  { icon: PhoneCall, title: 'We help with the next call', body: 'Plain-language guides and call scripts so families know what to ask and who to ask.' },
  { icon: CalendarCheck, title: 'We check in', body: 'After 2 days, after 1 week, and after the visit, with adult supervision.' },
  { icon: UserRoundCheck, title: 'We confirm it happened', body: 'We count a family as helped only when the appointment, interpreter, or application actually happened.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-64 size-[42rem] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: '0 0 0 80px rgba(255,255,255,0.02), 0 0 0 160px rgba(255,255,255,0.015)' }}
        />
        <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Badge variant="dark" className="mb-6">
              <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-brand-mint" />
              Being piloted with community organizations · Not yet open to the public
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-6xl">
              A referral is not the finish line.{' '}
              <span className="font-serif font-medium italic text-brand-mint">We help it turn into care.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              CarePath is a student-led project in Houston and Katy. We work alongside community organizations to follow up with
              families after a referral, so “we sent the email” becomes “the family got the appointment.”
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="mint" size="lg">
                <Link to="/organizations">
                  For community organizations <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="lg">
                <Link to="/guides">Free step-by-step guides</Link>
              </Button>
            </div>
            <p className="mt-6 text-base text-white/80">Free · Plain language · Nonmedical help only</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/15 bg-brand-navy-2 p-6 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-mint">Where referrals break down</p>
              <ol className="mt-4 space-y-3">
                {[
                  ['Referral given', 'Doctor says “someone will call you.”', true],
                  ['Nobody calls', 'The referral is lost, or the family misses the call.', false],
                  ['Family gives up', 'Cost, language, or confusion gets in the way.', false],
                ].map(([title, body, ok], i) => (
                  <motion.li
                    key={String(title)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="flex gap-4 rounded-xl bg-white/5 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-9 shrink-0 place-items-center rounded-full font-bold ${ok ? 'bg-brand-mint text-brand-navy' : 'bg-[#f3b4ab] text-[#5c140d]'}`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="block text-white/80">{body}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 flex items-center gap-3 rounded-xl bg-brand-mint p-4 font-semibold text-brand-navy"
              >
                <HandHeart aria-hidden="true" className="size-6 shrink-0" />
                CarePath steps in at step 2: we check in until the connection actually happens.
              </motion.p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* STATEMENT */}
      <section className="border-b bg-white">
        <Container className="py-14">
          <Reveal className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-brand-teal">
              <MailX aria-hidden="true" className="size-8" />
            </span>
            <p className="font-display text-2xl font-bold leading-snug text-brand-navy sm:text-3xl">
              “Email sent” is not the same as “family helped.” We measure success by{' '}
              <span className="text-brand-teal">completed connections</span>, not page visits or volunteer hours.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="How follow-through works"
            title="Real people, checking in, until it’s done."
            intro="Families tend to trust a real person more than a website. This site supports that human work. It doesn’t replace it."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {followSteps.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title}>
                <div className="relative h-full rounded-xl border bg-card p-6 shadow-sm">
                  <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-border" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-navy text-brand-mint">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-brand-navy">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Button asChild variant="link" className="px-0 text-lg">
              <Link to="/organizations">
                See our full follow-up protocol <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* QUICK GUIDE */}
      <section className="bg-brand-navy py-20 text-white">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow dark>Start here</Eyebrow>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Know what to ask before you call.</h2>
            <p className="mt-4 text-lg text-white/85">
              Pick a topic to see simple questions you can ask a clinic, hospital, or insurance office. Copy them into a text
              message or print them to bring to an appointment.
            </p>
            <p className="mt-6 text-white/85">
              You don’t need to tell us anything about yourself. Nothing you choose is saved.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <QuickGuide />
          </Reveal>
        </Container>
      </section>

      {/* GUIDES */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Step-by-step guides"
            title="Learn the system one situation at a time."
            intro="Each guide explains what normally happens, who is responsible for each step, what to say on the phone, and what to do if things stall."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {journeys.map((j) => (
              <StaggerItem key={j.slug}>
                <JourneyCard journey={j} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* STATUS */}
      <section className="bg-brand-sand py-20">
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title="Honest about what exists today."
            intro="We are early. Here is exactly what is available, what we are building, and what comes later."
          />
          <StatusBoard />
          <Reveal className="mt-8">
            <WhatWeDontDo />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <Reveal className="grid gap-8 rounded-2xl bg-brand-navy p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Eyebrow dark>For community organizations</Eyebrow>
              <h2 className="text-3xl font-extrabold">When your clients get a referral, we help make sure it becomes an appointment.</h2>
              <p className="mt-4 text-lg text-white/85">
                We are looking for one partner organization to run a small, supervised pilot with 3–5 families. We add follow-up
                capacity; your staff stays in charge.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="mint" size="lg">
                <Link to="/organizations">
                  How a partnership works <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="lg">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
