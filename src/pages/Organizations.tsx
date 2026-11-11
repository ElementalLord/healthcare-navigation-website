import { ArrowRight, ClipboardList, Eye, Lock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import { WhatWeDontDo } from '@/components/StatusBoard'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { connectedDefinition, followUpProtocol } from '@/data/content'

const offer = [
  { icon: ClipboardList, title: 'Follow-up capacity', body: 'Scheduled check-ins with families after a referral, so your staff doesn’t have to chase every one.' },
  { icon: Users, title: 'Plain-language materials', body: 'One-page guides and call scripts your caseworkers can hand out or send by text or WhatsApp.' },
  { icon: Eye, title: 'Shared learning', body: 'A de-identified summary of where referrals break down (no call back, wrong office, cost, language).' },
]

const safeguards = [
  'An adult advisor supervises all work with families.',
  'Families are introduced by your staff and agree to follow-up first.',
  'We store only a pseudonymous ID and task status. No diagnoses, birth dates, or ID numbers.',
  'Volunteers never log in to portals or accounts for families.',
  'Anything medical, legal, or urgent goes back to your staff or emergency services.',
]

const asks = [
  'A 20-minute conversation about where referrals break down for your clients',
  'One staff contact for questions and hand-offs',
  'Introductions to 3–5 families who want follow-up help, with their consent',
  'Review of our materials before we use them',
]

export default function Organizations() {
  return (
    <>
      <PageHero
        eyebrow="For community organizations"
        title="When your clients get a referral, we help make sure it becomes an appointment."
        intro="CarePath adds supervised student follow-up to programs that already help families. We don’t replace your navigators or caseworkers. We help close the loop they don’t have time to close."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="mint" size="lg">
            <Link to="/contact">
              Start a conversation <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="What we offer" title="Small, specific, and supervised" />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {offer.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <Card className="h-full">
                  <CardHeader>
                    <span className="grid size-12 place-items-center rounded-xl bg-secondary text-brand-teal">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <CardTitle className="mt-2">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{body}</CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="The follow-up protocol"
            title="What happens with each family"
            intro="This is the plan for our first pilot. We will adjust it with our partner and adult advisor."
          />
          <Stagger>
            <ol className="relative grid gap-4">
              {followUpProtocol.map((step, i) => (
                <StaggerItem key={step.title}>
                  <li className="grid gap-4 rounded-xl border bg-background p-5 sm:grid-cols-[8rem_1fr] sm:items-start">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                      <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-brand-navy font-bold text-brand-mint">
                        {i + 1}
                      </span>
                      <span className="font-display text-lg font-extrabold text-brand-teal">{step.when}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy">{step.title}</h3>
                      <p className="mt-1 text-lg">{step.body}</p>
                    </div>
                  </li>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full bg-brand-navy text-white">
              <CardHeader>
                <CardTitle className="text-2xl">What counts as “connected”</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/85">We only count outcomes that actually happened:</p>
                <ul className="mt-4 space-y-3">
                  {connectedDefinition.map((d) => (
                    <li key={d} className="flex gap-3 text-lg">
                      <span aria-hidden="true" className="font-bold text-brand-mint">
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-white/85">
                  Not counted: emails sent, pages visited, or volunteer hours. Pilot goal: 3–5 families, then 12.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lock aria-hidden="true" className="size-6 text-brand-teal" /> Safeguards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {safeguards.map((s) => (
                    <li key={s} className="flex gap-3 text-lg">
                      <span aria-hidden="true" className="font-bold text-brand-teal">
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      <section className="bg-brand-sand py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What we’d ask of a partner" title="A light lift for your team" className="mb-6" />
            <ul className="space-y-3">
              {asks.map((a) => (
                <li key={a} className="flex gap-3 text-lg">
                  <ArrowRight aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-brand-teal" />
                  {a}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">
                Contact us <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <Reveal>
            <WhatWeDontDo />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
