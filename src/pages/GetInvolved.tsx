import { Link } from 'react-router-dom'

import { Container, PageHero, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { volunteerLimits, volunteerRoles } from '@/data/content'

const limitCols = [
  { key: 'can', title: 'Volunteers can', color: 'border-route-green', text: 'text-route-green' },
  { key: 'mustHandOff', title: 'Volunteers must hand off', color: 'border-signal', text: 'text-ink' },
  { key: 'never', title: 'Volunteers never', color: 'border-alert', text: 'text-alert' },
] as const

export default function GetInvolved() {
  return (
    <>
      <PageHero
        crumb="Get involved"
        title="Help families get all the way to care"
        intro="We’re a small student team. We add volunteers only when there is real, supervised work for them to do."
        stripe="var(--route-green)"
      />

      <section className="py-16">
        <Container>
          <SectionHeading title="Volunteer roles" />
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((r) => (
              <div key={r.title} className="border-t-2 border-ink pt-4">
                <dt className="text-xl font-bold text-ink">{r.title}</dt>
                <dd className="mt-2 text-lg text-muted-foreground">{r.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-signage py-16">
        <Container>
          <SectionHeading
            title="The rules every volunteer learns first"
            intro="Many of our volunteers are under 18, so an adult supervisor is always involved. These limits protect families."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {limitCols.map(({ key, title, color, text }) => (
              <section key={key} aria-labelledby={`limit-${key}`} className={`rounded-lg border-t-8 bg-white p-6 ${color}`}>
                <h3 id={`limit-${key}`} className={`text-xl font-bold ${text}`}>
                  {title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {volunteerLimits[key].map((item) => (
                    <li key={item} className="border-t border-border pt-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-ink">Interested, or want to be an adult advisor?</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              We especially need a social worker, nurse, community health worker, or teacher with community ties.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/contact">Contact us</Link>
          </Button>
        </Container>
      </section>
    </>
  )
}
