import { Link } from 'react-router-dom'

import { FollowUpTimetable } from '@/components/home/FollowUpTimetable'
import { RouteMap } from '@/components/home/RouteMap'
import { JourneyCard } from '@/components/JourneyCard'
import { QuickGuide } from '@/components/QuickGuide'
import { StatusBoard, WhatWeDontDo } from '@/components/StatusBoard'
import { Container, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { journeys } from '@/data/journeys'

export default function Home() {
  return (
    <>
      {/* HERO: headline, then the route map. */}
      <section className="border-b-2 border-ink">
        <Container className="pb-16 pt-12 sm:pb-20 sm:pt-16">
          <p className="mb-6 inline-block rounded-sm bg-signal px-2.5 py-1 text-base font-bold text-ink">
            Pilot with community organizations. Not open to the public yet.
          </p>
          <h1 className="max-w-4xl text-[2.6rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-7xl">
            A referral is the start of the trip, not the end.
          </h1>
          <p className="mt-7 max-w-2xl text-xl text-muted-foreground">
            CarePath is a student-led project in Houston and Katy. Working with community organizations, we check in with
            families after a referral until the appointment really happens.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/organizations">For community organizations</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/guides">Read the guides</Link>
            </Button>
          </div>

          <div className="mt-14 sm:mt-20">
            <h2 className="mb-8 text-lg font-bold text-ink">How one referral travels, and where we step in</h2>
            <RouteMap />
          </div>
        </Container>
      </section>

      {/* FOLLOW-UP SCHEDULE */}
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            title="The follow-up schedule"
            intro="Every family follows the same schedule, agreed with the partner organization and an adult advisor. We count a family as helped only when the visit actually happens."
            className="mb-0"
          />
          <FollowUpTimetable />
        </Container>
      </section>

      {/* QUICK GUIDE */}
      <section className="bg-signage py-20">
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title="Know what to ask before you call"
              intro="Pick a topic to see simple questions for a clinic, hospital, or insurance office. Copy them into a text message, or print them for an appointment."
              className="mb-4"
            />
            <p className="text-muted-foreground">You don’t need to tell us anything about yourself. Nothing you choose is saved.</p>
          </div>
          <QuickGuide />
        </Container>
      </section>

      {/* GUIDE INDEX */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Step-by-step guides"
            intro="Each guide covers what usually happens, who does each step, what to say on the phone, and what to do if things stall."
          />
          <ul className="grid gap-x-10 border-b-2 border-ink md:grid-cols-2">
            {journeys.map((j) => (
              <li key={j.slug}>
                <JourneyCard journey={j} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* STATUS */}
      <section className="border-t-2 border-ink py-20">
        <Container>
          <SectionHeading title="What exists today" intro="We are early. This is what you can use now, what we are building, and what comes later." />
          <StatusBoard />
          <div className="mt-10">
            <WhatWeDontDo />
          </div>
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section className="border-t-8 border-signal bg-ink py-20 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
              When your clients get a referral, we help make sure it becomes an appointment.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-white/90">
              We are looking for one partner organization for a small, supervised pilot with 3 to 5 families. We add follow-up
              capacity. Your staff stays in charge.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild variant="signal" size="lg">
              <Link to="/organizations">See how a partnership works</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
