import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, BadgeCheck, Globe, MapPin, Phone, Search, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

import { Reveal } from '@/components/motion'
import { Container, PageHero } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/select'
import { resourceCategories, resources } from '@/data/resources'
import type { Resource, ResourceCategory } from '@/data/types'
import { cn } from '@/lib/utils'

const allLanguages = [...new Set(resources.flatMap((r) => r.languages))].sort()

function StatusBadge({ r }: { r: Resource }) {
  if (r.verification_status === 'verified')
    return (
      <Badge variant="success">
        <BadgeCheck aria-hidden="true" /> Verified {r.last_verified}
      </Badge>
    )
  if (r.verification_status === 'needs-review')
    return (
      <Badge variant="warning">
        <AlertTriangle aria-hidden="true" /> Needs re-checking
      </Badge>
    )
  return <Badge variant="outline">Sample entry: not a real organization</Badge>
}

function ResourceCard({ r }: { r: Resource }) {
  const isSample = r.verification_status === 'sample'
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn('flex flex-col rounded-xl border bg-card p-6 shadow-sm', isSample && 'border-dashed bg-white/70')}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{r.category}</Badge>
        <StatusBadge r={r} />
      </div>
      <h3 className="mt-4 text-xl font-bold text-brand-navy">{r.name}</h3>
      <p className="mt-2 text-muted-foreground">{r.description}</p>
      <dl className="mt-4 grid gap-2 text-base">
        {(
          [
            ['Area', r.service_area],
            ['Who can use it', r.eligibility],
            ['Cost', r.cost],
            ['Languages', r.languages.join(', ')],
          ] as const
        ).map(([k, v]) =>
          v ? (
            <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-2">
              <dt className="font-semibold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ) : null,
        )}
      </dl>
      {!isSample && (r.phone || r.website || r.address) && (
        <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
          {r.phone && (
            <Button asChild size="sm" variant="secondary">
              <a href={`tel:${r.phone.replace(/[^\d+]/g, '')}`}>
                <Phone aria-hidden="true" /> {r.phone}
              </a>
            </Button>
          )}
          {r.website && (
            <Button asChild size="sm" variant="secondary">
              <a href={r.website} target="_blank" rel="noreferrer">
                <Globe aria-hidden="true" /> Website<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          )}
          {r.address && (
            <span className="flex items-center gap-1 text-base text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4" /> {r.address}
            </span>
          )}
        </div>
      )}
    </motion.li>
  )
}

export default function Directory() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('')
  const category = (params.get('category') ?? '') as ResourceCategory | ''

  function setCategory(c: string) {
    const next = new URLSearchParams(params)
    if (c) next.set('category', c)
    else next.delete('category')
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(
      (r) =>
        (!category || r.category === category) &&
        (!language || r.languages.includes(language)) &&
        (!q || [r.name, r.description, r.service_area, r.eligibility, r.category].join(' ').toLowerCase().includes(q)),
    )
  }, [query, category, language])

  const verifiedCount = resources.filter((r) => r.verification_status === 'verified').length
  const filtersOn = Boolean(query || category || language)

  return (
    <>
      <PageHero
        eyebrow="Resource directory"
        title="Community resources, checked by a real person"
        intro="Every listing will show who can use it, what it costs, which languages are offered, and the date we last confirmed it directly with the organization."
      />

      <Container className="py-12">
        {verifiedCount === 0 && (
          <Reveal className="mb-8 flex gap-3 rounded-xl border-2 border-[#d9a441] bg-[#fffaf0] p-5 text-[#5c3b00]">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-6 shrink-0" />
            <div>
              <p className="text-lg font-bold">These are sample entries, not real organizations.</p>
              <p>
                We are verifying our first 5–10 Houston and Katy resources by contacting each organization directly. Until then,
                the entries below only show how the directory will work.{' '}
                <Link to="/contact" className="font-semibold underline underline-offset-2">
                  Suggest a resource to check
                </Link>
                .
              </p>
            </div>
          </Reveal>
        )}

        <div className="grid gap-4 rounded-2xl border bg-white p-5 shadow-sm md:grid-cols-[1.5fr_1fr_1fr] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="dir-search">Search</Label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="dir-search"
                type="search"
                placeholder="Try “clinic” or “Katy”"
                className="pl-12"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dir-category">Type of help</Label>
            <NativeSelect id="dir-category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All types</option>
              {resourceCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dir-language">Language</Label>
            <NativeSelect id="dir-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="">Any language</option>
              {allLanguages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </NativeSelect>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Quick filter by type">
          {resourceCategories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(category === c ? '' : c)}
              className={cn(
                'min-h-11 cursor-pointer rounded-full border-2 px-4 text-base font-semibold transition-colors',
                category === c ? 'border-brand-navy bg-brand-navy text-white' : 'border-border bg-white hover:border-brand-teal',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-lg font-semibold">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
          {filtersOn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('')
                setLanguage('')
                setCategory('')
              }}
            >
              <X aria-hidden="true" /> Clear filters
            </Button>
          )}
        </div>

        <ul className="mt-4 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {results.map((r) => (
              <ResourceCard key={r.id} r={r} />
            ))}
          </AnimatePresence>
        </ul>
        {results.length === 0 && (
          <p className="mt-6 rounded-xl bg-muted p-6 text-lg">
            Nothing matches yet. Try another word or clear the filters. You can also ask a clinic’s front desk or a caseworker who
            they recommend.
          </p>
        )}
      </Container>
    </>
  )
}
