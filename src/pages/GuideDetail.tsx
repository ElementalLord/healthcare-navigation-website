import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { CopyButton, PrintButton } from '@/components/ShareButtons'
import { Container, PageHero } from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { glossaryById } from '@/data/glossary'
import { getJourney, journeys } from '@/data/journeys'
import { defaultRoute, routes } from '@/data/routes'
import type { Journey } from '@/data/types'
import NotFound from './NotFound'

/** Turns a guide into plain text for copying into a text message or WhatsApp. */
function journeyAsText(j: Journey) {
  return [
    j.title,
    '',
    ...j.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
    '',
    'What to say:',
    ...j.scripts.map((s) => `- ${s.situation}: "${s.say}"`),
    '',
    site.emergency.text,
  ].join('\n')
}

function SideBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-4 border-ink pt-4">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default function GuideDetail() {
  const { slug = '' } = useParams()
  const journey = getJourney(slug)
  if (!journey) return <NotFound />

  const route = routes[journey.slug] ?? defaultRoute
  const index = journeys.indexOf(journey)
  const next = journeys[(index + 1) % journeys.length]

  return (
    <>
      <PageHero
        crumb={
          <Link to="/guides" className="underline underline-offset-4 hover:no-underline">
            Guides
          </Link>
        }
        title={journey.title}
        intro={journey.summary}
        stripe={route.color}
      >
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <PrintButton label="Print this guide" />
          <CopyButton text={journeyAsText(journey)} label="Copy to share" />
        </div>
      </PageHero>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_19rem]">
        <article className="min-w-0">
          <section aria-labelledby="what" className="border-l-8 pl-5" style={{ borderColor: route.color }}>
            <h2 id="what" className="text-xl font-bold text-ink">
              What this is
            </h2>
            <p className="mt-2 max-w-2xl text-lg">{journey.whatThisIs}</p>
          </section>

          <section aria-labelledby="steps" className="mt-14">
            <h2 id="steps" className="text-3xl font-bold text-ink">
              What usually happens
            </h2>
            {/* The steps are drawn as stops on this guide's route line. */}
            <ol className="relative mt-8">
              <span aria-hidden="true" className="absolute bottom-6 left-[1.05rem] top-6 w-2" style={{ backgroundColor: route.color }} />
              {journey.steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-6 pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-[5px] border-ink bg-white text-base font-bold text-ink"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-xl font-bold text-ink">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    {(step.who || step.timing) && (
                      <p className="mt-1 text-base text-muted-foreground">
                        {step.who && (
                          <>
                            <span className="font-bold text-ink">Who:</span> {step.who}
                          </>
                        )}
                        {step.who && step.timing && <span aria-hidden="true">. </span>}
                        {step.timing && (
                          <>
                            <span className="font-bold text-ink">{step.who ? ' When:' : 'When:'}</span> {step.timing}
                          </>
                        )}
                      </p>
                    )}
                    <p className="mt-2 max-w-2xl text-lg">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="say" className="mt-14">
            <h2 id="say" className="text-3xl font-bold text-ink">
              What to say on the phone
            </h2>
            <div className="mt-6 space-y-4">
              {journey.scripts.map((s) => (
                <figure key={s.situation} className="rounded-lg bg-signage p-5">
                  <figcaption className="text-base font-bold text-muted-foreground">{s.situation}</figcaption>
                  <blockquote className="mt-1 max-w-2xl text-xl leading-relaxed text-ink">“{s.say}”</blockquote>
                </figure>
              ))}
            </div>
          </section>

          <section aria-labelledby="stuck" className="mt-14">
            <h2 id="stuck" className="text-3xl font-bold text-ink">
              If things get stuck
            </h2>
            <ul className="mt-5 max-w-2xl">
              {journey.ifStuck.map((s) => (
                <li key={s} className="border-t border-border py-3 text-lg">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {journey.localNotes && journey.localNotes.length > 0 && (
            <section aria-labelledby="local" className="mt-14 rounded-lg border-2 border-dashed border-ink p-6">
              <h2 id="local" className="text-xl font-bold text-ink">
                Houston and Katy notes
              </h2>
              <ul className="mt-3 space-y-4">
                {journey.localNotes.map((n) => (
                  <li key={n.text}>
                    {!n.verified && (
                      <p className="mb-1 inline-flex items-center gap-1.5 rounded-sm bg-signal px-2 py-0.5 text-base font-bold text-ink">
                        <AlertTriangle aria-hidden="true" className="size-4" /> Not verified yet. Check before relying on this.
                      </p>
                    )}
                    <p>{n.text}</p>
                    {n.verified && n.lastChecked && (
                      <p className="text-base text-muted-foreground">
                        Last checked {n.lastChecked}
                        {n.source ? `. Source: ${n.source}` : ''}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-14 max-w-2xl text-base text-muted-foreground">
            This guide is general, nonmedical information, last reviewed {site.contentLastReviewed}. Offices and programs differ,
            so always confirm details with them. {site.emergency.text}
          </p>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start" aria-label="Quick reference">
          <SideBox title="You have the right to ask">
            <ul className="space-y-2.5">
              {journey.rights.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-3 shrink-0 rounded-sm" style={{ backgroundColor: route.color }} />
                  {r}
                </li>
              ))}
            </ul>
          </SideBox>

          <SideBox title="Write down on every call">
            <ul className="list-disc space-y-1 pl-5">
              <li>Date and time</li>
              <li>Name of the person</li>
              <li>What they said</li>
              <li>The next step, and who does it</li>
            </ul>
          </SideBox>

          <SideBox title="Words in this guide">
            <dl className="space-y-3">
              {journey.terms.map((id) => {
                const t = glossaryById[id]
                if (!t) return null
                return (
                  <div key={id}>
                    <dt className="font-bold">{t.term}</dt>
                    <dd className="text-base text-muted-foreground">{t.definition}</dd>
                  </div>
                )
              })}
            </dl>
          </SideBox>

          <div className="flex flex-col gap-3 print:hidden">
            {journey.resourceCategory && (
              <Button asChild variant="outline">
                <Link to={`/directory?category=${encodeURIComponent(journey.resourceCategory)}`}>Find related resources</Link>
              </Button>
            )}
            <Link to={`/guides/${next.slug}`} className="border-t-2 border-ink pt-3 text-lg font-bold text-ink underline-offset-4 hover:underline">
              <span className="block text-base font-normal text-muted-foreground">Next guide</span>
              {next.title}
            </Link>
            <Link to="/guides" className="inline-flex items-center gap-2 text-base font-bold text-route-blue underline-offset-4 hover:underline">
              <ArrowLeft aria-hidden="true" className="size-4" /> All guides
            </Link>
          </div>
        </aside>
      </Container>
    </>
  )
}
