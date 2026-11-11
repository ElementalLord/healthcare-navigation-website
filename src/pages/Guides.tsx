import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { JourneyCard } from '@/components/JourneyCard'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Input } from '@/components/ui/input'
import { glossary } from '@/data/glossary'
import { journeys } from '@/data/journeys'

export default function Guides() {
  const [query, setQuery] = useState('')
  const terms = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? glossary.filter((t) => `${t.term} ${t.definition}`.toLowerCase().includes(q)) : glossary
  }, [query])

  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Step-by-step guides for common healthcare situations"
        intro="Each guide is written in plain language and can be printed or copied to share. Use them on your own, or with a volunteer or caseworker."
      />

      <section className="py-16">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {journeys.map((j) => (
              <StaggerItem key={j.slug}>
                <JourneyCard journey={j} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="glossary" className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="Words to know"
            title="Healthcare words, explained simply"
            intro="Not sure what a word means? Look it up here. It is always OK to ask staff what a word means too."
          />
          <Reveal className="relative mb-8 max-w-md">
            <label htmlFor="glossary-search" className="sr-only">
              Search words
            </label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="glossary-search"
              type="search"
              placeholder="Search words, e.g. “copay”"
              className="pl-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Reveal>
          <p className="sr-only" aria-live="polite">
            {terms.length} words shown
          </p>
          <dl className="grid gap-4 md:grid-cols-2">
            {terms.map((t) => (
              <div key={t.id} id={`term-${t.id}`} className="rounded-xl border bg-background p-5">
                <dt className="text-lg font-bold text-brand-navy">{t.term}</dt>
                <dd className="mt-1 text-foreground/90">{t.definition}</dd>
              </div>
            ))}
          </dl>
          {terms.length === 0 && <p className="text-lg text-muted-foreground">No words match “{query}”.</p>}
        </Container>
      </section>
    </>
  )
}
