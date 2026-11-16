import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { BookOpen, CornerDownLeft, FileText, Languages, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { glossary } from '@/data/glossary'
import { journeys } from '@/data/journeys'
import { cn } from '@/lib/utils'
import { navItems } from './nav'

interface Item {
  id: string
  label: string
  hint: string
  to: string
  group: 'Guides' | 'Pages' | 'Words'
}

/** Everything the search can find. Add new kinds of content here. */
const items: Item[] = [
  ...journeys.map((j) => ({ id: `g-${j.slug}`, label: j.title, hint: j.summary, to: `/guides/${j.slug}`, group: 'Guides' as const })),
  ...[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact us' }].map((p) => ({
    id: `p-${p.to}`,
    label: p.label,
    hint: 'Page',
    to: p.to,
    group: 'Pages' as const,
  })),
  ...glossary.map((t) => ({ id: `t-${t.id}`, label: t.term, hint: t.definition, to: `/guides?term=${t.id}`, group: 'Words' as const })),
]

const icons = { Guides: BookOpen, Pages: FileText, Words: Languages }

/** Search box that opens with the header button or Ctrl/⌘ + K. Arrow keys move, Enter opens. */
export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.filter((i) => i.group !== 'Words')
    return items.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q)).slice(0, 12)
  }, [query])

  function go(item: Item | undefined) {
    if (!item) return
    onOpenChange(false)
    setQuery('')
    navigate(item.to)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const next = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % Math.max(results.length, 1)
      setActive(next)
      document.getElementById(`cmd-${results[next]?.id}`)?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="cmd-help">
        <DialogTitle className="sr-only">Search CarePath</DialogTitle>
        <div className="flex items-center gap-3 border-b px-5">
          <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-label="Search guides, pages, and healthcare words"
            placeholder="Search guides, pages, or a word like “copay”"
            className="min-h-16 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
          />
        </div>
        <ul id="cmd-list" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto p-2">
          {results.map((item, i) => {
            const Icon = icons[item.group]
            return (
              <li
                key={item.id}
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={i === active}
                onPointerMove={() => setActive(i)}
                onClick={() => go(item)}
                className={cn('flex cursor-pointer items-center gap-4 rounded-md border-l-4 px-4 py-3', i === active ? 'border-signal bg-signage' : 'border-transparent')}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink">{item.label}</span>
                  <span className="block truncate text-base text-muted-foreground">{item.hint}</span>
                </span>
                {i === active && <CornerDownLeft aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
              </li>
            )
          })}
          {results.length === 0 && <li className="px-4 py-8 text-center text-lg text-muted-foreground">Nothing matches “{query}”.</li>}
        </ul>
        <DialogDescription id="cmd-help" className="border-t bg-signage px-5 py-3 text-sm text-muted-foreground">
          Use the arrow keys to move, Enter to open, and Esc to close.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
