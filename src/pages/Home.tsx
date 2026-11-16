import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { DotGrid } from '@/components/canvas/DotGrid'
import { PathField } from '@/components/canvas/PathField'
import { HowItWorks } from '@/components/home/HowItWorks'
import { JourneyDemo } from '@/components/home/JourneyDemo'
import { JourneyCard } from '@/components/JourneyCard'
import { QuickGuide } from '@/components/QuickGuide'
import { StatusBoard, WhatWeDontDo } from '@/components/StatusBoard'
import { Counter, Magnetic, Marquee, Reveal, ScrollWords, Stagger, StaggerItem, TextReveal } from '@/components/motion'
import { Accent, Container, Eyebrow, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { glossary } from '@/data/glossary'
import { journeys } from '@/data/journeys'

/** Where referrals commonly break down. Shown in the scrolling strip under the hero. */
const breakdowns = ['No call back', 'Lost referral', 'Wrong office', 'No interpreter', 'Cost confusion', 'Missed voicemail', 'Long hold times', 'Insurance approval']

/** Only real, countable facts about this site. Never invented statistics. */
const facts = [
  { value: journeys.length, label: 'step-by-step guides' },
  { value: journeys.reduce((n, j) => n + j.scripts.length, 0), label: 'ready-to-use call scripts' },
  { value: glossary.length, label: 'healthcare words explained' },
  { value: 0, label: 'cookies, trackers, or ads' },
]

export default function Home() {
  const [featured, ...otherGuides] = journeys

  return (
    <>
      {/* HERO */}
      <section className="aurora grain relative overflow-hidden text-white">
        <PathField />
        <Container className="relative grid grid-cols-1 items-center gap-14 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-4 text-base font-medium text-white/90 backdrop-blur-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-mint px-2.5 py-0.5 text-sm font-bold text-brand-navy">
                  <Sparkles aria-hidden="true" className="size-3.5" /> Pilot
                </span>
                <span>
                  <span className="hidden sm:inline">With community organizations · </span>Not yet open to the public
                </span>
              </p>
            </Reveal>
            <h1 className="text-5xl font-extrabold leading-[1.02] sm:text-7xl">
              <TextReveal text="A referral is not the finish line." />{' '}
              <span className="font-serif font-normal italic tracking-normal">
                <TextReveal text="We help it turn into care." className="text-shine" delay={0.45} />
              </span>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-7 max-w-xl text-lg text-white/85 sm:text-xl">
                CarePath is a student-led project in Houston and Katy. We work alongside community organizations to follow up
                with families after a referral, so “we sent the email” becomes “the family got the appointment.”
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button asChild variant="mint" size="lg">
                    <Link to="/organizations">
                      For community organizations <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild variant="outline-light" size="lg">
                  <Link to="/guides">Read the free guides</Link>
                </Button>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-base text-white/80">
                {['Free', 'Plain language', 'Nonmedical help only'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-mint" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <JourneyDemo />
          </Reveal>
        </Container>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2rem] bg-background" />
      </section>

      {/* SCROLLING STRIP */}
      <section aria-label="Common places referrals break down" className="border-b py-7">
        <Marquee>
          <ul className="flex items-center">
            {breakdowns.map((b) => (
              <li key={b} className="flex items-center font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                <span className="px-6 sm:px-9">{b}</span>
                <span aria-hidden="true" className="font-serif text-3xl italic text-brand-teal">
                  ✳
                </span>
              </li>
            ))}
          </ul>
        </Marquee>
      </section>

      {/* STATEMENT */}
      <section className="py-24 sm:py-32">
        <Container>
          <Eyebrow>Why we exist</Eyebrow>
          <ScrollWords
            text="“Email sent” is not the same as “family helped.” Many families are handed a phone number and then left alone. We measure success by completed connections, not page visits or volunteer hours."
            className="max-w-5xl font-display text-3xl font-bold leading-[1.2] tracking-tight text-brand-navy sm:text-5xl sm:leading-[1.15]"
          />
        </Container>
      </section>

      <HowItWorks />

      {/* QUICK GUIDE */}
      <section className="px-3">
        <div className="aurora grain relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] py-20 text-white sm:py-28">
          <DotGrid />
          <Container className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="lg:sticky lg:top-32">
              <Eyebrow dark>Start here</Eyebrow>
              <h2 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">
                Know what to ask <Accent dark>before you call.</Accent>
              </h2>
              <p className="mt-5 text-lg text-white/85 sm:text-xl">
                Pick a topic to see simple questions you can ask a clinic, hospital, or insurance office. Copy them into a text
                message or print them to bring to an appointment.
              </p>
              <p className="mt-6 text-white/85">You don’t need to tell us anything about yourself. Nothing you choose is saved.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <QuickGuide />
            </Reveal>
          </Container>
        </div>
      </section>

      {/* GUIDES BENTO */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Step-by-step guides"
            title={
              <>
                Learn the system <Accent>one situation at a time.</Accent>
              </>
            }
            intro="Each guide explains what normally happens, who is responsible for each step, what to say on the phone, and what to do if things stall."
          />
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem className="md:col-span-2">
              <JourneyCard journey={featured} featured />
            </StaggerItem>
            {otherGuides.map((j, i) => (
              // The last card stretches across the row so the grid has no gap.
              <StaggerItem key={j.slug} className={i === otherGuides.length - 1 ? 'md:col-span-2 lg:col-span-3' : undefined}>
                <JourneyCard journey={j} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FACTS */}
      <section aria-label="This website in numbers" className="border-y bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
            {facts.map((f) => (
              <Reveal key={f.label} className="px-2 py-10 sm:px-8 sm:py-14">
                <div className="flex flex-col-reverse">
                  <dt className="mt-2 text-lg text-muted-foreground">{f.label}</dt>
                  <dd className="font-display text-6xl font-extrabold tracking-tighter text-brand-navy sm:text-7xl">
                    <Counter to={f.value} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* STATUS */}
      <section className="bg-brand-sand py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title={
              <>
                Honest about <Accent>what exists today.</Accent>
              </>
            }
            intro="We are early. Here is exactly what is available, what we are building, and what comes later."
          />
          <StatusBoard />
          <Reveal className="mt-8">
            <WhatWeDontDo />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-3 py-24 sm:py-32">
        <Reveal className="aurora grain relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-white sm:py-28">
          <PathField lines={12} pulses={5} />
          <div className="relative mx-auto max-w-3xl">
            <Eyebrow dark>For community organizations</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-[1.06] sm:text-6xl">
              When your clients get a referral, we help make sure it <Accent dark>becomes an appointment.</Accent>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              We are looking for one partner organization to run a small, supervised pilot with 3–5 families. We add follow-up
              capacity; your staff stays in charge.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Button asChild variant="mint" size="lg">
                  <Link to="/organizations">
                    How a partnership works <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline-light" size="lg">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
