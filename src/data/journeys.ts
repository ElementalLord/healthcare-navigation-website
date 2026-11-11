import type { Journey } from './types'

/**
 * Step-by-step guides ("journeys") for common healthcare situations.
 *
 * Writing rules:
 *  - Plain language, short sentences (aim for a 5th–6th grade reading level).
 *  - Nonmedical only: never suggest a diagnosis, treatment, or whether someone qualifies for something.
 *  - Say "usually" for timing. Offices differ.
 *  - Anything specific to Houston, Harris County or Fort Bend County goes in `localNotes`
 *    and stays `verified: false` until someone confirms it directly with the organization.
 *  - Have a qualified adult advisor review changes before publishing.
 */
export const journeys: Journey[] = [
  {
    slug: 'referral',
    title: 'I was given a referral to a specialist',
    summary: 'What happens after a doctor says “I’m referring you,” and how to make sure it turns into an appointment.',
    barrier: 'referrals',
    whatThisIs:
      'A referral is a request from your doctor’s office asking another office (a specialist, a lab, or a program) to see you. Many referrals get lost between offices. Nobody may call you. Checking on it is normal and expected.',
    steps: [
      {
        title: 'Before you leave the appointment, ask three things',
        body: 'Ask: “Where is the referral going? Who sends it? When should I hear something?” Write down the specialist’s name and phone number if they can give it to you.',
        who: 'You',
        timing: 'Same day',
      },
      {
        title: 'Your doctor’s office sends the referral',
        body: 'The office sends your information to the specialist. Some insurance plans also need to approve it first. This is called prior authorization.',
        who: 'Your doctor’s office',
        timing: 'Usually 1–5 business days',
      },
      {
        title: 'The specialist’s office should contact you',
        body: 'They usually call to schedule. Answer calls from unknown numbers during this time, or check your voicemail. Some offices expect you to call them instead.',
        who: 'The specialist’s office',
        timing: 'Usually within 1–2 weeks',
      },
      {
        title: 'If nobody calls, you call',
        body: 'Call the specialist first: “Did you receive a referral for me?” If they say no, call your doctor’s office and ask them to send it again and tell you the date it was sent.',
        who: 'You',
        timing: 'After about 1 week with no call',
      },
      {
        title: 'Get the appointment and confirm it',
        body: 'Write down the date, time, address, and what to bring (ID, insurance card, list of medicines, the referral number if there is one). Ask about an interpreter and parking or transportation now, not on the day.',
        who: 'You',
      },
      {
        title: 'After the visit, close the loop',
        body: 'Ask the specialist’s office to send a report back to your regular doctor. Ask both offices: “What is the next step, and who is doing it?”',
        who: 'The specialist’s office',
      },
    ],
    ifStuck: [
      'The specialist says they never got it: ask your doctor’s office for the fax or send date, and ask them to send it again while you are on the phone.',
      'Insurance has not approved it: ask your doctor’s office, “Has the prior authorization been submitted? What is the reference number?”',
      'The wait is very long: ask to be put on a cancellation list, and ask your doctor’s office if there is another specialist who accepts your insurance.',
      'The specialist does not take your insurance, or you have none: ask about a sliding-scale fee or the hospital’s financial assistance program before you book.',
    ],
    scripts: [
      {
        situation: 'Calling the specialist',
        say: 'Hi, my name is ___. My doctor, Dr. ___, sent a referral for me. Can you check if you received it? What is the next step to schedule?',
      },
      {
        situation: 'Calling your doctor’s office when the referral seems lost',
        say: 'The specialist says they don’t have my referral yet. Can you tell me the date it was sent and send it again? Can I get the referral or authorization number?',
      },
      {
        situation: 'Asking for more help',
        say: 'I’m having trouble getting this referral scheduled. Is there a referral coordinator or patient navigator I can talk to?',
      },
    ],
    rights: [
      'You can ask where your referral was sent and when.',
      'You can ask for the specialist’s name and phone number.',
      'You can ask for a referral or authorization number.',
      'You can ask to speak with a referral coordinator, patient navigator, or office manager.',
    ],
    terms: ['referral', 'specialist', 'prior-authorization', 'primary-care', 'in-network'],
    resourceCategory: 'Clinics & health centers',
  },

  {
    slug: 'medical-bill',
    title: 'I got a medical bill I can’t pay',
    summary: 'How to check a bill, ask for financial assistance, and set up a payment plan before it goes to collections.',
    barrier: 'financial',
    whatThisIs:
      'Medical bills often have mistakes, and many hospitals and clinics have programs that lower or erase bills for people with low income. You usually have to ask. Do not ignore the bill, but do not rush to pay it either.',
    steps: [
      {
        title: 'Check what kind of paper it is',
        body: 'A paper from your insurance that says “This is not a bill” is an Explanation of Benefits (EOB). It shows what insurance paid. The real bill comes from the hospital or clinic.',
        who: 'You',
      },
      {
        title: 'Ask for an itemized bill',
        body: 'Call the billing number on the bill and ask for an itemized bill. It lists every charge. Look for things you did not receive or charges listed twice.',
        who: 'The clinic or hospital',
        timing: 'Usually arrives in 1–3 weeks',
      },
      {
        title: 'Ask about financial assistance before you pay',
        body: 'Ask: “Do you have a financial assistance or charity care policy? Can you send me the application?” Nonprofit hospitals are required to have one. Ask what papers they need.',
        who: 'You',
      },
      {
        title: 'Ask them to pause the bill while you apply',
        body: 'Ask: “Can you put my account on hold while my application is reviewed?” Write down the name of the person and the date.',
        who: 'The clinic or hospital',
      },
      {
        title: 'If you still owe money, ask for a payment plan',
        body: 'Ask for a monthly amount you can actually afford. Many offices offer plans with no interest. Get the plan in writing.',
        who: 'You',
      },
    ],
    ifStuck: [
      'They say there is no financial assistance: ask to speak with a financial counselor or patient advocate, and ask for the policy in writing.',
      'The bill was sent to collections: you can still ask the hospital about financial assistance. Ask the hospital, not only the collection agency.',
      'You were not insured and got a surprise bill much higher than the estimate: ask about your right to a Good Faith Estimate and the dispute process.',
    ],
    scripts: [
      {
        situation: 'Calling billing',
        say: 'Hi, I received a bill for account number ___. Can you send me an itemized bill? I’d also like to apply for financial assistance. Can you send me the application?',
      },
      {
        situation: 'Asking to pause the bill',
        say: 'I am applying for financial assistance. Can you put my account on hold until it is reviewed? Can you note that on my account?',
      },
      {
        situation: 'Setting up a payment plan',
        say: 'I can’t pay the full amount. Can I set up a monthly payment plan? I can afford about $___ a month.',
      },
    ],
    rights: [
      'You can ask for an itemized bill.',
      'You can ask a nonprofit hospital for its financial assistance policy and application.',
      'If you are uninsured or paying yourself, you can ask for a Good Faith Estimate before a scheduled service.',
      'You can ask for a payment plan.',
    ],
    terms: ['itemized-bill', 'eob', 'financial-assistance', 'sliding-scale', 'copay', 'deductible', 'good-faith-estimate'],
    localNotes: [
      {
        text: 'Harris Health (the public health system for Harris County) has its own financial assistance program for county residents. Check current eligibility rules and how to apply before sharing.',
        verified: false,
      },
      {
        text: 'Fort Bend County residents (including parts of Katy) may have different county programs. Confirm which county a family lives in first.',
        verified: false,
      },
    ],
    resourceCategory: 'Bills & financial help',
  },

  {
    slug: 'interpreter',
    title: 'I need an interpreter',
    summary: 'How to ask for free language help for appointments, calls, and forms, and what to do if staff say no.',
    barrier: 'language',
    whatThisIs:
      'Many clinics and hospitals that receive federal funding (including Medicare or Medicaid) are required to offer language help at no cost to you. This can be an in-person, phone, or video interpreter. You should not have to rely on your child or a family member to interpret.',
    steps: [
      {
        title: 'Ask when you schedule',
        body: 'Say: “I need a ___ interpreter for my appointment.” Ask them to write it in your file so you do not have to ask every time.',
        who: 'You',
      },
      {
        title: 'Confirm the day before',
        body: 'Call and ask: “Is an interpreter scheduled for my appointment tomorrow?”',
        who: 'You',
        timing: '1 day before',
      },
      {
        title: 'At check-in, ask again',
        body: 'Show a card or say the name of your language. Many offices can connect a phone or video interpreter in a few minutes.',
        who: 'The clinic or hospital',
      },
      {
        title: 'Ask for papers in your language',
        body: 'Ask if forms, instructions, and test results can be given in your language, or read to you by an interpreter.',
        who: 'You',
      },
    ],
    ifStuck: [
      'Staff say they have no interpreter: ask them to use a phone or video interpreter service.',
      'Staff ask your child to interpret: you can say no and ask for a professional interpreter.',
      'You are still refused: ask for the office manager or patient relations. Write down the date, time, and the name of the person.',
    ],
    scripts: [
      {
        situation: 'Scheduling',
        say: 'I need a Spanish interpreter (or: ___ interpreter) for this appointment. Can you put that in my file?',
      },
      {
        situation: 'If staff say no',
        say: 'I need a professional interpreter to understand my care. Can you use a phone or video interpreter? May I speak with the office manager?',
      },
      {
        situation: 'A card you can show (in English)',
        say: 'I speak ___. I need an interpreter, please. I do not want my child or family member to interpret.',
      },
    ],
    rights: [
      'You can ask for a professional interpreter.',
      'You can say no to having a child or family member interpret.',
      'You can ask for forms and instructions in your language.',
      'You can ask to speak with patient relations if language help is refused.',
    ],
    terms: ['interpreter', 'patient-relations'],
    resourceCategory: 'Language help',
  },

  {
    slug: 'where-to-go',
    title: 'Where do I go for care?',
    summary: 'The difference between the emergency room, urgent care, a regular clinic, and a community health center.',
    barrier: 'awareness',
    whatThisIs:
      'There are different kinds of places to get care. They cost different amounts and do different things. This guide explains the types of places. It cannot tell you what is right for a health problem. If you think it may be an emergency, call 911.',
    steps: [
      {
        title: 'Emergency room (ER)',
        body: 'For emergencies, open 24 hours. Hospital ERs must check and stabilize anyone who comes in, even without insurance or money. It is usually the most expensive place for non-emergency care.',
      },
      {
        title: 'Urgent care',
        body: 'For problems that need attention soon but are not emergencies, often with evening and weekend hours. Many do not see patients without insurance unless they pay up front. Call first to ask about cost.',
      },
      {
        title: 'A regular clinic (primary care)',
        body: 'A doctor or clinic you see for checkups and ongoing care. Having one makes referrals, records, and follow-up much easier. New patients may wait weeks for a first visit.',
      },
      {
        title: 'Community health center',
        body: 'Clinics that serve people with or without insurance and usually charge on a sliding scale based on income. Many offer interpreters, and some help with dental, behavioral health, and insurance enrollment.',
      },
    ],
    ifStuck: [
      'You have no regular clinic: ask a community health center how to become a new patient, and ask about the sliding scale.',
      'You can’t get a new-patient appointment soon: ask to be on a cancellation list and ask if they have walk-in or same-day hours.',
    ],
    scripts: [
      {
        situation: 'Becoming a new patient',
        say: 'Hi, I’d like to become a new patient. Are you accepting new patients? Do you offer a sliding-scale fee? What do I need to bring?',
      },
    ],
    rights: [
      'You can ask about cost before a non-emergency visit.',
      'You can ask a community health center about its sliding-scale fee.',
    ],
    terms: ['primary-care', 'community-health-center', 'sliding-scale', 'urgent-care'],
    resourceCategory: 'Clinics & health centers',
  },

  {
    slug: 'talking-with-staff',
    title: 'Talking with clinic staff on the phone',
    summary: 'What to write down on every call, how to ask clearly, and how to politely ask for someone who can help.',
    barrier: 'staff',
    whatThisIs:
      'A lot of healthcare happens on the phone with front desk, scheduling, and billing staff. They are busy and may talk fast. Being prepared, writing things down, and knowing who to ask for makes calls work better.',
    steps: [
      {
        title: 'Before you call',
        body: 'Have ready: your full name, date of birth, insurance card (if any), and the reason for your call in one sentence. Have paper and a pen.',
        who: 'You',
      },
      {
        title: 'Write down every call',
        body: 'Date and time, the person’s name, what they said, and the next step. If they promise something, ask “When should I expect that?”',
        who: 'You',
      },
      {
        title: 'Repeat back what you heard',
        body: 'Say: “So the next step is ___, and you will ___ by ___. Is that right?” This catches mistakes.',
        who: 'You',
      },
      {
        title: 'If it is not working, ask for the right person',
        body: 'Ask politely for a patient navigator, referral coordinator, financial counselor, or office manager. These people solve problems the front desk cannot.',
        who: 'You',
      },
    ],
    ifStuck: [
      'They talk too fast: “Can you please slow down? I want to write this down.”',
      'You don’t understand a word: “What does ___ mean?” It is always OK to ask.',
      'You get transferred and lose the call: ask for a direct number at the start of the call.',
    ],
    scripts: [
      {
        situation: 'Starting the call',
        say: 'Hi, my name is ___. I’m calling about ___. Before we start, can I get your name and a direct number in case we get disconnected?',
      },
      {
        situation: 'Asking for more help',
        say: 'Thank you for trying. Is there a patient navigator, financial counselor, or manager I could talk with about this?',
      },
      {
        situation: 'Ending the call',
        say: 'Just to check: the next step is ___, and I should hear back by ___. Is that right?',
      },
    ],
    rights: [
      'You can ask anyone for their name.',
      'You can ask them to slow down or explain a word.',
      'You can ask for an interpreter on the phone.',
      'You can ask to speak with a supervisor or patient navigator.',
    ],
    terms: ['patient-navigator', 'patient-relations', 'financial-counselor'],
  },

  {
    slug: 'patient-portal',
    title: 'Setting up and using a patient portal',
    summary: 'How to get into your clinic’s website or app to see results, messages, and appointments, and how to keep it safe.',
    barrier: 'access',
    whatThisIs:
      'A patient portal is a website or app from your clinic or hospital. You can see appointments, test results, and bills, and send messages. Each clinic usually has its own portal, so you may have more than one.',
    steps: [
      {
        title: 'Get an activation code',
        body: 'Ask at check-in or on the phone: “Can I get a code to set up my patient portal?” It may be on your visit papers.',
        who: 'The clinic or hospital',
      },
      {
        title: 'Create your account',
        body: 'Use your own email if you can. Pick a password only you know. Write it somewhere safe at home.',
        who: 'You',
      },
      {
        title: 'Learn the main buttons',
        body: 'Look for: Appointments, Messages, Test results, Billing. Many portals can be switched to Spanish and other languages in settings.',
        who: 'You',
      },
      {
        title: 'For a family member',
        body: 'Ask the clinic about “proxy access.” This lets a parent or caregiver see a family member’s portal with their own login, the safe and official way.',
        who: 'The clinic or hospital',
      },
    ],
    ifStuck: [
      'Locked out: use “Forgot password,” or call the portal help number (often on the login page).',
      'You can’t find a result: results may take a few days to appear. Call the clinic if you are worried.',
      'No email or smartphone: ask the clinic to mail or print your records, or to explain results on the phone.',
    ],
    scripts: [
      {
        situation: 'Asking for access',
        say: 'Can you help me set up my patient portal? Can I get an activation code?',
      },
      {
        situation: 'Asking for records',
        say: 'I’d like a copy of my records from my visit on ___. How can I request them?',
      },
    ],
    rights: [
      'You can ask for a copy of your own health records.',
      'You can ask how to set up proxy access for a family member.',
      'Never share your portal password, including with volunteers or navigators. CarePath volunteers will never ask for it.',
    ],
    terms: ['patient-portal', 'proxy-access'],
  },
]

export function getJourney(slug: string) {
  return journeys.find((j) => j.slug === slug)
}
