import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { getJourney } from '@/data/journeys'
import { topics, type Topic } from '@/data/topics'
import { CopyButton, PrintButton } from './ShareButtons'

/** Two-step guide: choose a topic → see questions to ask + links to the full guide and matching resources. */
export function QuickGuide() {
  const [topic, setTopic] = useState<Topic | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  function choose(t: Topic | null) {
    setTopic(t)
  }

  // After the old step finishes animating out, move focus to the new step
  // so screen reader and keyboard users know the content changed.
  function focusNewStep() {
    requestAnimationFrame(() => (topic ? headingRef.current?.focus() : listRef.current?.querySelector('button')?.focus()))
  }

  const journey = topic?.journey ? getJourney(topic.journey) : undefined

  return (
    <div className="rounded-2xl bg-white p-5 text-foreground shadow-2xl sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        <span>Quick guide</span>
        <span aria-live="polite">Step {topic ? 2 : 1} of 2</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-brand-teal" animate={{ width: topic ? '100%' : '50%' }} />
      </div>

      <AnimatePresence mode="wait" initial={false} onExitComplete={focusNewStep}>
        {!topic ? (
          <motion.div
            key="step1"
            ref={listRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-2xl font-bold text-brand-navy">What do you need help with?</h3>
            <p className="mt-2 text-muted-foreground">Choose one. Please don’t enter symptoms or private details.</p>
            <ul className="mt-5 grid gap-3">
              {topics.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border-2 border-border p-4 text-left transition-colors hover:border-brand-teal hover:bg-secondary"
                  >
                    <span>
                      <span className="block text-lg font-semibold">{t.label}</span>
                      <span className="block text-base text-muted-foreground">{t.hint}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-brand-teal transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-teal">Questions you can ask</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold text-brand-navy outline-none">
              {topic.label}
            </h3>
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg marker:font-bold marker:text-brand-teal">
              {topic.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            <p className="mt-4 text-base text-muted-foreground">Answers are different at each office. Always confirm with them.</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <CopyButton text={`${topic.label}\n\n${topic.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`} />
              <PrintButton />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {journey && (
                <Button asChild>
                  <Link to={`/guides/${journey.slug}`}>
                    Full step-by-step guide <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {topic.resourceCategory && (
                <Button asChild variant="outline">
                  <Link to={`/directory?category=${encodeURIComponent(topic.resourceCategory)}`}>See related resources</Link>
                </Button>
              )}
            </div>
            <Button variant="ghost" className="mt-4" onClick={() => choose(null)}>
              <ArrowLeft aria-hidden="true" /> Choose another topic
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 flex items-start gap-2 border-t pt-4 text-base text-muted-foreground">
        <Lock aria-hidden="true" className="mt-1 size-4 shrink-0" />
        This guide runs on your device. It does not send or save your choices.
      </p>
    </div>
  )
}
