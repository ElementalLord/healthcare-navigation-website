/** Shared content types. If you add a field here, TypeScript will show you every place that needs it. */

export type BarrierId = 'awareness' | 'financial' | 'staff' | 'language' | 'referrals' | 'access'

export interface JourneyStep {
  title: string
  body: string
  /** Who is usually responsible for this step. */
  who?: 'You' | 'Your doctor’s office' | 'The specialist’s office' | 'The clinic or hospital' | 'Your insurance' | 'A navigator or caseworker'
  /** Rough timing, e.g. "Within 1 week". Always phrased as "usually". */
  timing?: string
}

export interface Journey {
  slug: string
  title: string
  /** One plain sentence. Aim for a 5th–6th grade reading level. */
  summary: string
  barrier: BarrierId
  /** What this situation is, in plain words. */
  whatThisIs: string
  steps: JourneyStep[]
  /** What to do if things stall. */
  ifStuck: string[]
  /** Things you can say on the phone. Keep them short. */
  scripts: { situation: string; say: string }[]
  /** "You have the right to ask…" statements. Only include things that are true everywhere. */
  rights: string[]
  /** Glossary term ids used in this guide. */
  terms: string[]
  /**
   * Local (Houston / Harris County / Fort Bend) facts. Each MUST be verified with
   * the organization before `verified` is set to true. Unverified notes are shown with a warning.
   */
  localNotes?: { text: string; verified: boolean; source?: string; lastChecked?: string }[]
  /** Directory category that pairs with this guide. */
  resourceCategory?: ResourceCategory
}

export type ResourceCategory =
  | 'Clinics & health centers'
  | 'Bills & financial help'
  | 'Language help'
  | 'Transportation'
  | 'Insurance & enrollment help'
  | 'Food & basic needs'

export type VerificationStatus = 'verified' | 'needs-review' | 'sample'

export interface Resource {
  id: string
  name: string
  category: ResourceCategory
  description: string
  service_area: string
  eligibility: string
  cost: string
  languages: string[]
  phone?: string
  website?: string
  address?: string
  /** YYYY-MM-DD, or empty if never verified. */
  last_verified: string
  verification_status: VerificationStatus
  /** Who verified it and how (e.g. "Phone call with front desk"). */
  verified_by?: string
}
