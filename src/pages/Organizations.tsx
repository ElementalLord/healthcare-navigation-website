import { Link } from 'react-router-dom'

import { FollowUpTimetable } from '@/components/home/FollowUpTimetable'
import { WhatWeDontDo } from '@/components/StatusBoard'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { connectedDefinition } from '@/data/content'

const offer = [
  { title: 'Follow-up capacity', body: 'Scheduled check-ins with families after a referral, so your staff doesn’t have to chase every one.' },
  { title: 'Plain-language materials', body: 'One-page guides and call scripts your caseworkers can hand out or send by text or WhatsApp.' },
  { title: 'Shared learning', body: 'A summary, with no personal details, of where referrals break down: no call back, wrong office, cost, language.' },
]

const safeguards = [
  'An adult advisor supervises all work with families.',
  'Families are introduced by your staff and agree to follow-up first.',
  'We store only a made-up ID and the task status. No diagnoses, birth dates, or ID numbers.',
  'Volunteers never log in to portals or accounts for families.',
  'Anything medical, legal, or urgent goes back to your staff or emergency services.',
]

const asks = [
  'A 20-minute conversation about where referrals break down for your clients',
  'One staff contact for questions and hand-offs',
  'Introductions to 3 to 5 families who want follow-up help, with their consent',
  'Review of our materials before we use them',
]

function Checklist({ items, mark = 'bg-route-green' }: { items: string[]; mark?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg">
          <span aria-hidden="true" className={`mt-2 size-3 shrink-0 rounded-sm ${mark}`} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Organizations() {
  return (
    <>
      <PageHero
        crumb="For community organizations"
        title="When your clients get a referral, we help make sure it becomes an appointment."
        intro="CarePath adds supervised student follow-up to programs that already help families. We don’t replace your navigators or caseworkers. We help close the loop they don’t have time to close."
        stripe="var(--route-blue)"
      >
        <Button asChild variant="signal" size="lg" className="mt-8">
          <Link to="/contact">Start a conversation</Link>
        </Button>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeading title="What we offer" />
          <dl className="grid gap-8 md:grid-cols-3">
            {offer.map(({ title, body }) => (
              <div key={title} className="border-t-4 border-route-blue pt-4">
                <dt className="text-xl font-bold text-ink">{title}</dt>
                <dd className="mt-2 text-lg text-muted-foreground">{body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-signage py-16">
        <Container>
          <SectionHeading
            title="What happens with each family"
            intro="This is the plan for our first pilot. We will adjust it with our partner and adult advisor."
          />
          <FollowUpTimetable />
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-ink">What counts as “connected”</h2>
            <p className="mb-5 mt-3 text-lg text-muted-foreground">We only count outcomes that actually happened:</p>
            <Checklist items={connectedDefinition} />
            <p className="mt-6 text-lg text-muted-foreground">
              Not counted: emails sent, pages visited, or volunteer hours. Pilot goal: 3 to 5 families, then 12.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-ink">Safeguards</h2>
            <div className="mt-5">
              <Checklist items={safeguards} mark="bg-route-blue" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t-2 border-ink py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-ink">What we’d ask of a partner</h2>
            <div className="mt-5">
              <Checklist items={asks} mark="bg-signal" />
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
          <WhatWeDontDo />
        </Container>
      </section>
    </>
  )
}
