import { Lightbulb, UsersRound } from 'lucide-react'

import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { site } from '@/config/site'

/**
 * TEAM: add real team members here once they agree to be listed.
 * Use first names or initials only if anyone is under 18.
 */
const team: { name: string; role: string }[] = []

const values = [
  { title: 'Listen before building', body: 'We learn from partner organizations and families before we decide what to make.' },
  { title: 'Count real connections', body: 'Success means an appointment happened, not that an email was sent.' },
  { title: 'Be honest about what’s verified', body: 'If we haven’t confirmed it with the organization, we say so.' },
  { title: 'Stay nonmedical', body: 'We help with the practical steps. Health questions go to health professionals.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About CarePath"
        title="A student-led project in Houston and Katy"
        intro={`CarePath started from a simple observation: families are often given a referral or a phone number, and then nobody checks whether they actually got care. We want to help close that gap in ${site.region}.`}
      />

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Our principles" />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full gap-4 rounded-xl border bg-card p-6 shadow-sm">
                  <span aria-hidden="true" className="font-display text-2xl font-extrabold text-brand-teal">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy">{v.title}</h3>
                    <p className="mt-1 text-muted-foreground">{v.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <UsersRound aria-hidden="true" className="size-6 text-brand-teal" /> Our team
                </CardTitle>
              </CardHeader>
              <CardContent>
                {team.length > 0 ? (
                  <ul className="space-y-2">
                    {team.map((m) => (
                      <li key={m.name}>
                        <strong>{m.name}</strong> · {m.role}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-muted-foreground">
                    We are a small group of high school students. Team profiles and our adult advisor will be added here.
                  </p>
                )}
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb aria-hidden="true" className="size-6 text-brand-teal" /> What we’re learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  After our pilot, we’ll share de-identified patterns about where referrals break down, and what helped. Nothing
                  here yet. We haven’t completed a pilot, and we won’t claim results we don’t have.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
