import { AlertTriangle, ArrowLeft, ArrowRight, CircleHelp, MessageSquareQuote, NotebookPen, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { CopyButton, PrintButton } from '@/components/ShareButtons'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { site } from '@/config/site'
import { barriers } from '@/data/barriers'
import { glossaryById } from '@/data/glossary'
import { getJourney, journeys } from '@/data/journeys'
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
    ...j.scripts.map((s) => `• ${s.situation}: "${s.say}"`),
    '',
    site.emergency.text,
  ].join('\n')
}

export default function GuideDetail() {
  const { slug = '' } = useParams()
  const journey = getJourney(slug)
  if (!journey) return <NotFound />

  const index = journeys.indexOf(journey)
  const next = journeys[(index + 1) % journeys.length]

  return (
    <>
      <PageHero eyebrow={`Guide · ${barriers[journey.barrier].label}`} title={journey.title} intro={journey.summary}>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <PrintButton label="Print this guide" />
          <CopyButton text={journeyAsText(journey)} label="Copy to share" />
        </div>
      </PageHero>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0">
          <Button asChild variant="ghost" className="-ml-3 mb-6 print:hidden">
            <Link to="/guides">
              <ArrowLeft aria-hidden="true" /> All guides
            </Link>
          </Button>

          <Reveal>
            <section aria-labelledby="what" className="rounded-xl bg-secondary p-6">
              <h2 id="what" className="flex items-center gap-2 text-xl font-bold text-secondary-foreground">
                <CircleHelp aria-hidden="true" className="size-6" /> What this is
              </h2>
              <p className="mt-2 text-lg">{journey.whatThisIs}</p>
            </section>
          </Reveal>

          <section aria-labelledby="steps" className="mt-12">
            <h2 id="steps" className="text-2xl font-extrabold text-brand-navy">
              What usually happens
            </h2>
            <Stagger>
              <ol className="relative mt-6 space-y-6 border-l-2 border-border pl-8">
                {journey.steps.map((step, i) => (
                  <StaggerItem key={step.title}>
                    <li className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3.05rem] grid size-9 place-items-center rounded-full bg-brand-navy font-bold text-brand-mint ring-4 ring-background"
                      >
                        {i + 1}
                      </span>
                      <h3 className="text-xl font-bold text-brand-navy">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      {(step.who || step.timing) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {step.who && <Badge variant="info">Who: {step.who}</Badge>}
                          {step.timing && <Badge variant="outline">{step.timing}</Badge>}
                        </div>
                      )}
                      <p className="mt-2 text-lg">{step.body}</p>
                    </li>
                  </StaggerItem>
                ))}
              </ol>
            </Stagger>
          </section>

          <Reveal>
            <section aria-labelledby="say" className="mt-12">
              <h2 id="say" className="flex items-center gap-2 text-2xl font-extrabold text-brand-navy">
                <MessageSquareQuote aria-hidden="true" className="size-7 text-brand-teal" /> What to say on the phone
              </h2>
              <div className="mt-6 grid gap-4">
                {journey.scripts.map((s) => (
                  <figure key={s.situation} className="rounded-xl border-l-4 border-brand-teal bg-white p-5 shadow-sm">
                    <figcaption className="text-base font-bold uppercase tracking-wide text-brand-teal">{s.situation}</figcaption>
                    <blockquote className="mt-2 text-lg">“{s.say}”</blockquote>
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="stuck" className="mt-12">
              <h2 id="stuck" className="text-2xl font-extrabold text-brand-navy">
                If things get stuck
              </h2>
              <ul className="mt-4 space-y-3">
                {journey.ifStuck.map((s) => (
                  <li key={s} className="flex gap-3 text-lg">
                    <ArrowRight aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-brand-teal" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {journey.localNotes && journey.localNotes.length > 0 && (
            <Reveal>
              <section aria-labelledby="local" className="mt-12 rounded-xl border-2 border-dashed border-[#d9a441] bg-[#fffaf0] p-6">
                <h2 id="local" className="text-xl font-bold text-[#5c3b00]">
                  Houston &amp; Katy notes
                </h2>
                <ul className="mt-3 space-y-3">
                  {journey.localNotes.map((n) => (
                    <li key={n.text}>
                      {!n.verified && (
                        <Badge variant="warning" className="mb-1">
                          <AlertTriangle aria-hidden="true" /> Not yet verified, check before relying on this
                        </Badge>
                      )}
                      <p>{n.text}</p>
                      {n.verified && n.lastChecked && (
                        <p className="text-base text-muted-foreground">
                          Last checked {n.lastChecked}
                          {n.source ? ` · Source: ${n.source}` : ''}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <p className="mt-12 text-base text-muted-foreground">
            This guide is general, nonmedical information, last reviewed {site.contentLastReviewed}. Offices and programs differ,
            so always confirm details with them. {site.emergency.text}
          </p>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck aria-hidden="true" className="size-5 text-brand-teal" /> You have the right to ask
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {journey.rights.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden="true" className="font-bold text-brand-teal">
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <NotebookPen aria-hidden="true" className="size-5 text-brand-teal" /> Write down on every call
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-5">
                <li>Date and time</li>
                <li>Name of the person</li>
                <li>What they said</li>
                <li>The next step, and who does it</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Words in this guide</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 print:hidden">
            {journey.resourceCategory && (
              <Button asChild variant="outline">
                <Link to={`/directory?category=${encodeURIComponent(journey.resourceCategory)}`}>Related resources</Link>
              </Button>
            )}
            <Button asChild variant="secondary" className="h-auto justify-between whitespace-normal py-3 text-left">
              <Link to={`/guides/${next.slug}`}>
                <span>
                  <span className="block text-sm uppercase tracking-wide text-muted-foreground">Next guide</span>
                  {next.title}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </aside>
      </Container>
    </>
  )
}
