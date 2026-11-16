import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { JourneyCard } from '@/components/JourneyCard'
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
        crumb="Guides"
        title="Step-by-step guides for common healthcare situations"
        intro="Each guide is written in plain language and can be printed or copied to share. Use them on your own, or with a volunteer or caseworker."
      />

      <section className="py-16">
        <Container>
          <ul className="grid gap-x-10 border-b-2 border-ink md:grid-cols-2">
            {journeys.map((j) => (
              <li key={j.slug}>
                <JourneyCard journey={j} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="glossary" className="bg-signage py-16">
        <Container>
          <SectionHeading
            title="Healthcare words, explained simply"
            intro="Not sure what a word means? Look it up here. It is always OK to ask staff what a word means too."
          />
          <div className="relative mb-8 max-w-md">
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
          </div>
          <p className="sr-only" aria-live="polite">
            {terms.length} words shown
          </p>
          <dl className="grid gap-x-10 md:grid-cols-2">
            {terms.map((t) => (
              <div key={t.id} id={`term-${t.id}`} className={cn('border-t-2 border-ink py-5', t.id === term && 'border-l-8 border-l-signal bg-white pl-4')}>
                <dt className="text-xl font-bold text-ink">{t.term}</dt>
                <dd className="mt-1 text-lg text-foreground/90">{t.definition}</dd>
              </div>
            ))}
          </dl>
          {terms.length === 0 && <p className="text-lg text-muted-foreground">No words match “{query}”.</p>}
        </Container>
      </section>
    </>
  )
}
