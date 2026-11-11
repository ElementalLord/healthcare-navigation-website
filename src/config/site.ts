/**
 * Site-wide settings. Edit this file to change contact details or status.
 *
 * IMPORTANT: Leave `contactEmail` empty until a real inbox exists AND
 * someone has agreed to check it. While it is empty, the contact forms
 * stay in "demo" mode and clearly tell visitors nothing was sent.
 */
export const site = {
  name: 'CarePath',
  tagline: 'Follow-through for healthcare referrals',
  region: 'Houston & Katy, Texas',

  /** e.g. 'hello@carepath.example' — must be a monitored inbox. */
  contactEmail: '',

  /** Shown on every page. Do not remove. */
  emergency: {
    text: 'If this is a medical emergency, call 911. For a mental health crisis, call or text 988.',
  },

  /** Last time a person reviewed the guides for accuracy (YYYY-MM-DD). */
  contentLastReviewed: '2026-11-11',
} as const

export const hasContactEmail = site.contactEmail.trim().length > 0
