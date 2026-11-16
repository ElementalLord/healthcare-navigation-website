import { Container, PageHero, SectionHeading } from '@/components/section'
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
        crumb="About"
        title="A student-led project in Houston and Katy"
        intro={`CarePath started from a simple observation: families are often given a referral or a phone number, and then nobody checks whether they actually got care. We want to help close that gap in ${site.region}.`}
      />

      <section className="py-16">
        <Container>
          <SectionHeading title="What we believe" />
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-ink pt-4">
                <dt className="text-xl font-bold text-ink">{v.title}</dt>
                <dd className="mt-2 text-lg text-muted-foreground">{v.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-signage py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-ink">Our team</h2>
            {team.length > 0 ? (
              <ul className="mt-4 space-y-2 text-lg">
                {team.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}</strong>, {m.role}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-lg text-muted-foreground">
                We are a small group of high school students. Team profiles and our adult advisor will be added here.
              </p>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-ink">What we’re learning</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              After our pilot, we’ll share patterns, with no personal details, about where referrals break down and what helped.
              There is nothing here yet. We haven’t completed a pilot, and we won’t claim results we don’t have.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
