import { followUpProtocol } from '@/data/content'

/**
 * The follow-up schedule laid out like a timetable.
 * A real <table> on wider screens; stacked rows on phones.
 */
export function FollowUpTimetable() {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-ink">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">CarePath follow-up schedule for each family</caption>
        <thead className="hidden bg-ink text-white sm:table-header-group">
          <tr>
            <th scope="col" className="w-40 px-5 py-3 text-base font-bold">
              When
            </th>
            <th scope="col" className="px-5 py-3 text-base font-bold">
              What happens
            </th>
          </tr>
        </thead>
        <tbody>
          {followUpProtocol.map((step, i) => (
            <tr key={step.title} className="block border-t border-border first:border-t-0 sm:table-row sm:first:border-t">
              <th
                scope="row"
                className="block bg-signage px-5 pb-1 pt-4 align-top text-lg font-bold text-ink sm:table-cell sm:bg-transparent sm:py-5"
              >
                {step.when}
              </th>
              <td className="block px-5 pb-5 pt-1 sm:table-cell sm:py-5">
                <p className="text-lg font-bold text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </p>
                <p className="mt-1 max-w-2xl text-muted-foreground">{step.body}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
