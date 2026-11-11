/** Smaller pieces of page content, kept here so they can be edited (and later translated) in one place. */

export const followUpProtocol = [
  {
    when: 'Day 0',
    title: 'Introduction through a partner',
    body: 'A partner organization introduces a family who has a referral or a healthcare task, and the family agrees (consents) to follow-up. We write down only a first name or ID and the task, never a diagnosis.',
  },
  {
    when: 'Day 0',
    title: 'Make a plan together',
    body: 'We agree on the next step, who does it, and how the family wants to be contacted. The family gets a one-page guide and call script.',
  },
  {
    when: 'Day 2',
    title: 'First check-in',
    body: 'Did the office call? Was the referral received? If something is stuck, we help the family make the call or bring the issue back to the partner.',
  },
  {
    when: 'Day 7',
    title: 'One-week check',
    body: 'Is there an appointment date? Is an interpreter or ride arranged? Anything we can’t handle goes to the partner’s staff.',
  },
  {
    when: 'After the visit',
    title: 'Confirm the connection',
    body: 'Did the appointment happen? What is the next step? We record the outcome (connected, still in progress, or stuck and why).',
  },
]

export const connectedDefinition = [
  'A confirmed appointment that actually happened',
  'An interpreter that was actually provided',
  'A financial assistance application that was actually submitted',
  'A ride that was actually booked for an appointment',
]

export const statusBoard = {
  now: {
    title: 'Available now',
    items: [
      'Step-by-step guides and call scripts anyone can use or print',
      'A plain-language glossary of healthcare words',
      'A resource directory format (sample entries while we verify real ones)',
    ],
  },
  developing: {
    title: 'In development',
    items: [
      'A small, supervised pilot (3–5 families) through a partner organization',
      'Follow-up check-ins on referrals, with adult oversight',
      'A first batch of 5–10 verified Houston and Katy resources',
    ],
  },
  future: {
    title: 'Future plans',
    items: [
      'Individual navigation support, only once oversight, training, and privacy procedures are in place',
      'Guides translated and reviewed by qualified translators',
      'Sharing what we learn about where referrals break down',
    ],
  },
}

export const whatWeDontDo = [
  'Diagnose, give medical advice, or say whether something is an emergency',
  'Decide whether someone qualifies for insurance, Medicaid, or financial help',
  'Give immigration or legal advice',
  'Log in to patient portals or accounts for families, or ask for passwords',
  'Collect medical details, birth dates, or ID numbers through this website',
  'Replace the staff, case managers, or navigators families already have',
]

export const volunteerRoles = [
  {
    title: 'Community outreach',
    body: 'Help build relationships with partner organizations. Attend events with an adult lead and listen first.',
  },
  {
    title: 'Resource verification',
    body: 'Call organizations to confirm hours, eligibility, costs, and languages, and record the date you checked.',
  },
  {
    title: 'Website and guides',
    body: 'Keep the site accurate and easy to use. Help turn guides into printable and phone-friendly handouts.',
  },
  {
    title: 'Translation (qualified only)',
    body: 'Fluent, qualified translators help translate guides. Every translation is reviewed by a second qualified person before it is published.',
  },
  {
    title: 'Pilot coordination',
    body: 'Help schedule follow-up check-ins and keep the tracker up to date, under adult supervision.',
  },
  {
    title: 'Community research',
    body: 'Help summarize what we learn from partners about where referrals break down, without any personal details.',
  },
]

export const volunteerLimits = {
  can: [
    'Share CarePath guides and call scripts',
    'Help a family prepare questions before a call',
    'Make follow-up check-ins on the schedule agreed with the partner',
    'Help look up and verify general resource information',
  ],
  mustHandOff: [
    'Any health question or symptom → the family’s clinic (or 911 / 988 in an emergency)',
    'Insurance, eligibility, or legal questions → the partner’s staff',
    'Any sign of danger, abuse, or crisis → your adult supervisor right away',
  ],
  never: [
    'Log in to a family’s portal or accounts, or ask for passwords',
    'Write down diagnoses, birth dates, ID or insurance numbers',
    'Keep family information on personal phones or accounts',
    'Promise that someone will qualify for a program',
  ],
}
