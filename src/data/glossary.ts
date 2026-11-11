/** Plain-language definitions. Keep each one to one or two short sentences. */
export interface GlossaryTerm {
  id: string
  term: string
  definition: string
}

export const glossary: GlossaryTerm[] = [
  { id: 'referral', term: 'Referral', definition: 'A request from one doctor’s office asking another office or specialist to see you.' },
  { id: 'specialist', term: 'Specialist', definition: 'A doctor who focuses on one area, like the heart, skin, or bones. You often need a referral to see one.' },
  { id: 'primary-care', term: 'Primary care', definition: 'Your regular doctor or clinic for checkups and everyday care. They usually send referrals.' },
  { id: 'prior-authorization', term: 'Prior authorization', definition: 'When your insurance must approve a service before you get it. Your doctor’s office usually asks for it.' },
  { id: 'in-network', term: 'In-network', definition: 'Doctors and clinics that have a contract with your insurance. Going in-network usually costs you less.' },
  { id: 'copay', term: 'Copay', definition: 'A set amount you pay for a visit or medicine, like $20, if you have insurance.' },
  { id: 'deductible', term: 'Deductible', definition: 'The amount you pay each year before your insurance starts paying for most services.' },
  { id: 'sliding-scale', term: 'Sliding scale', definition: 'A fee that is lower if your income is lower. Community health centers often use one.' },
  { id: 'financial-assistance', term: 'Financial assistance (charity care)', definition: 'A hospital or clinic program that lowers or removes bills for people who qualify. You usually have to apply.' },
  { id: 'itemized-bill', term: 'Itemized bill', definition: 'A bill that lists every single charge, so you can check for mistakes.' },
  { id: 'eob', term: 'Explanation of Benefits (EOB)', definition: 'A paper from your insurance showing what it paid. It usually says “This is not a bill.”' },
  { id: 'good-faith-estimate', term: 'Good Faith Estimate', definition: 'A written estimate of costs you can ask for before a scheduled service if you are uninsured or paying yourself.' },
  { id: 'community-health-center', term: 'Community health center', definition: 'A clinic that serves people with or without insurance, usually with fees based on income.' },
  { id: 'urgent-care', term: 'Urgent care', definition: 'A walk-in clinic for problems that need care soon but are not emergencies.' },
  { id: 'interpreter', term: 'Interpreter', definition: 'A trained person who repeats what is said in another language, in person, by phone, or by video.' },
  { id: 'patient-navigator', term: 'Patient navigator', definition: 'A staff member whose job is to help patients get through appointments, referrals, and paperwork.' },
  { id: 'financial-counselor', term: 'Financial counselor', definition: 'A hospital or clinic staff member who helps with bills, insurance, and financial assistance.' },
  { id: 'patient-relations', term: 'Patient relations', definition: 'The office at a hospital or clinic that handles complaints and problems with care or service.' },
  { id: 'patient-portal', term: 'Patient portal', definition: 'A clinic’s website or app where you can see appointments, results, and messages.' },
  { id: 'proxy-access', term: 'Proxy access', definition: 'Official permission for a parent or caregiver to use a family member’s patient portal with their own login.' },
]

export const glossaryById = Object.fromEntries(glossary.map((t) => [t.id, t]))
