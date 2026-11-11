import type { Resource, ResourceCategory } from './types'
import raw from './resources.json'

/**
 * Directory listings live in `resources.json` so anyone can add one without touching layout code.
 *
 * To publish a real listing:
 *  1. Call or email the organization directly and confirm every field.
 *  2. Set "verification_status": "verified", fill in "last_verified" (YYYY-MM-DD) and "verified_by".
 *  3. Re-check every listing at least every 3 months.
 */
export const resources = raw as Resource[]

export const resourceCategories: ResourceCategory[] = [
  'Clinics & health centers',
  'Bills & financial help',
  'Language help',
  'Transportation',
  'Insurance & enrollment help',
  'Food & basic needs',
]
