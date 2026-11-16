import { statusBoard, whatWeDontDo } from '@/data/content'

/**
 * Service status, styled like a transit service board.
 * The marker shape carries the meaning (filled = running now, half = being built, outline = planned),
 * and each column also has a text heading, so colour is never the only signal.
 */
const columns = [
  { key: 'now', fill: 'w-full bg-route-green', ring: 'border-route-green' },
  { key: 'developing', fill: 'w-1/2 bg-ink', ring: 'border-ink' },
  { key: 'future', fill: 'w-0', ring: 'border-ink' },
] as const

export function StatusBoard() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border-2 border-ink bg-ink md:grid-cols-3">
      {columns.map(({ key, fill, ring }) => {
        const col = statusBoard[key]
        return (
          <section key={key} aria-labelledby={`status-${key}`} className="bg-white p-6">
            <h3 id={`status-${key}`} className="flex items-center gap-3 text-xl font-bold text-ink">
              <span aria-hidden="true" className={`relative size-5 shrink-0 overflow-hidden rounded-full border-[3px] bg-white ${ring}`}>
                <span className={`absolute inset-y-0 left-0 ${fill}`} />
              </span>
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => (
                <li key={item} className="border-t border-border pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export function WhatWeDontDo() {
  return (
    <section aria-labelledby="dont-do" className="rounded-lg border-2 border-alert p-6">
      <h3 id="dont-do" className="text-xl font-bold text-alert">
        What CarePath does not do
      </h3>
      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {whatWeDontDo.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 bg-alert" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
