import { ArrowRight, CircleCheck, CircleX, Forward } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { volunteerLimits, volunteerRoles } from '@/data/content'

const limitCols = [
  { key: 'can', title: 'Volunteers can', icon: CircleCheck, tone: 'text-[#166534]' },
  { key: 'mustHandOff', title: 'Volunteers must hand off', icon: Forward, tone: 'text-[#8a5a00]' },
  { key: 'never', title: 'Volunteers never', icon: CircleX, tone: 'text-[#b42318]' },
] as const

export default function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Help families get all the way to care"
        intro="We’re a small student team. We add volunteers only when there is real, supervised work for them to do."
      />

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Volunteer roles" title="Six ways to help" />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((r, i) => (
              <StaggerItem key={r.title}>
                <Card className="h-full">
                  <CardHeader>
                    <span aria-hidden="true" className="font-display text-3xl font-extrabold text-brand-teal">
                      0{i + 1}
                    </span>
                    <CardTitle>{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{r.body}</CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="Volunteer training"
            title="Clear limits protect families"
            intro="Every volunteer learns these rules before working near families. Many of our volunteers are under 18, so an adult supervisor is always involved."
          />
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {limitCols.map(({ key, title, icon: Icon, tone }) => (
              <StaggerItem key={key}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${tone}`}>
                      <Icon aria-hidden="true" className="size-6" /> {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {volunteerLimits[key].map((item) => (
                        <li key={item} className="border-b pb-3 last:border-0">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold">Interested, or want to be an adult advisor?</h2>
              <p className="mt-3 text-lg text-white/85">
                We especially need a social worker, nurse, community health worker, or teacher with community ties.
              </p>
            </div>
            <Button asChild variant="mint" size="lg">
              <Link to="/contact">
                Contact us <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
