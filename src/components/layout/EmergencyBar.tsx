import { Phone } from 'lucide-react'

/** Always-visible emergency notice. Required on every page. */
export function EmergencyBar() {
  return (
    <div className="bg-alert text-white print:border print:border-black print:bg-white print:text-black">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[0.95rem] font-medium sm:px-6">
        <Phone aria-hidden="true" className="size-4 shrink-0" />
        <span>
          Medical emergency? Call{' '}
          <a href="tel:911" className="font-bold underline underline-offset-2">
            911
          </a>
          .
        </span>
        <span>
          Mental health crisis? Call or text{' '}
          <a href="tel:988" className="font-bold underline underline-offset-2">
            988
          </a>
          .
        </span>
      </p>
    </div>
  )
}
