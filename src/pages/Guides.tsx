import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { JourneyCard } from '@/components/JourneyCard'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Container, PageHero, SectionHeading } from '@/components/section'
import { Input } from '@/components/ui/input'
import { glossary } from '@/data/glossary'
import { journeys } from '@/data/journeys'
import { cn } from '@/lib/utils'

export default function Guides() {
  const [query, setQuery] = useState('')
  // The site search links here as /guides?term=copay to jump straight to a word.
  const [params] = useSearchParams()
  const term = params.get('term')
  useEffect(() => {
    if (!term) return
    // Wait a moment so this runs after the page's own scroll-to-top on navigation.
    const id = setTimeout(() => document.getElementById(`term-${term}`)?.scrollIntoView({ block: 'center' }), 80)
    return () => clearTimeout(id)
  }, [term])
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
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {journeys.map((j, i) => (
              <StaggerItem key={j.slug} className={i === 0 ? 'md:col-span-2' : i === journeys.length - 1 ? 'md:col-span-2 lg:col-span-3' : undefined}>
                <JourneyCard journey={j} featured={i === 0} />
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
              <div key={t.id} id={`term-${t.id}`} className={cn('rounded-2xl border bg-background p-6 transition-shadow', t.id === term && 'border-brand-teal ring-4 ring-brand-mint/50')}>
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
