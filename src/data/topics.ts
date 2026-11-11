import type { ResourceCategory } from './types'

/** Topics for the 2-step Quick Guide on the home page. */
export interface Topic {
  id: string
  label: string
  hint: string
  questions: string[]
  /** Slug of the step-by-step guide to suggest next. */
  journey?: string
  resourceCategory?: ResourceCategory
}

export const topics: Topic[] = [
  {
    id: 'start',
    label: 'I’m not sure where to start',
    hint: 'A simple first step',
    questions: [
      'Do I have a regular clinic or doctor? If not, how do I become a new patient somewhere?',
      'Do I have insurance, Medicaid, CHIP, or none? (A clinic or enrollment helper can help you check.)',
      'What is the one thing I need help with first: an appointment, a bill, a referral, or language help?',
      'Is there a patient navigator or social worker at my clinic I can ask for?',
    ],
    journey: 'where-to-go',
    resourceCategory: 'Clinics & health centers',
  },
  {
    id: 'referral',
    label: 'Referrals and specialists',
    hint: 'Turn a referral into an appointment',
    questions: [
      'Where was my referral sent, and on what date?',
      'Who is supposed to call whom to schedule?',
      'Is insurance approval (prior authorization) needed? Has it been sent?',
      'Who do I contact if I don’t hear anything in a week?',
    ],
    journey: 'referral',
    resourceCategory: 'Clinics & health centers',
  },
  {
    id: 'costs',
    label: 'Bills and costs',
    hint: 'Financial help and payment plans',
    questions: [
      'Do you offer a sliding-scale fee or financial assistance? How do I apply?',
      'Can I get an itemized bill?',
      'Can you put my bill on hold while I apply for help?',
      'Can I set up a payment plan I can afford?',
    ],
    journey: 'medical-bill',
    resourceCategory: 'Bills & financial help',
  },
  {
    id: 'language',
    label: 'Language help',
    hint: 'Free interpreters and translated forms',
    questions: [
      'Can I get a professional interpreter at no cost?',
      'Can you note my language in my file so it’s ready every time?',
      'Can forms and instructions be given in my language?',
      'Who do I talk to if language help isn’t provided?',
    ],
    journey: 'interpreter',
    resourceCategory: 'Language help',
  },
  {
    id: 'staff',
    label: 'Talking with clinic staff',
    hint: 'Phone calls and asking for help',
    questions: [
      'Can I have your name and a direct phone number?',
      'Can you slow down so I can write this down?',
      'What is the next step, and who is doing it?',
      'Is there a patient navigator or manager I can talk to?',
    ],
    journey: 'talking-with-staff',
  },
  {
    id: 'transport',
    label: 'Getting to appointments',
    hint: 'Rides and travel',
    questions: [
      'Does my insurance or Medicaid plan offer free rides to appointments? How far ahead do I book?',
      'Is the clinic near a bus or train stop?',
      'Is there free or low-cost parking?',
      'Can this appointment be done by phone or video instead?',
    ],
    resourceCategory: 'Transportation',
  },
  {
    id: 'portal',
    label: 'Paperwork and patient portals',
    hint: 'Forms, records, and online accounts',
    questions: [
      'What papers or ID should I bring?',
      'Can I fill out forms before the visit, or get help with them?',
      'How do I set up the patient portal? Can I get an activation code?',
      'How can a family member get their own official access (proxy access)?',
    ],
    journey: 'patient-portal',
  },
]
