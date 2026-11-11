import type { BarrierId } from './types'

/**
 * Barrier categories used to tag guides.
 * `share` is the percent from the CarePath research summary.
 * TODO before publishing these numbers: add the source (study, survey, or our own outreach) in `source`.
 */
export const barriers: Record<BarrierId, { label: string; share?: number }> = {
  awareness: { label: 'Knowing how the system works', share: 30 },
  financial: { label: 'Cost and bills', share: 25 },
  staff: { label: 'Talking with staff', share: 13 },
  language: { label: 'Language' },
  referrals: { label: 'Referrals and follow-up' },
  access: { label: 'Portals and paperwork' },
}

export const barrierDataSource = '' // e.g. 'CarePath interviews with 40 families, 2026' — leave empty to hide the percentages.
