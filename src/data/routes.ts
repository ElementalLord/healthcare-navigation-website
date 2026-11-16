import { Hospital, Languages, MonitorSmartphone, PhoneCall, ReceiptText, Route, type LucideIcon } from 'lucide-react'

/**
 * Each guide gets a "route colour" and icon, like a transit line.
 * `text` is the colour to use for the icon on top of `color` (checked for contrast).
 * New guides fall back to `defaultRoute`.
 */
export const routes: Record<string, { color: string; text: string; icon: LucideIcon }> = {
  referral: { color: '#1f5fad', text: '#ffffff', icon: Route },
  'medical-bill': { color: '#1a6e44', text: '#ffffff', icon: ReceiptText },
  interpreter: { color: '#f2b41b', text: '#14213d', icon: Languages },
  'where-to-go': { color: '#5b3a8c', text: '#ffffff', icon: Hospital },
  'talking-with-staff': { color: '#0f6b78', text: '#ffffff', icon: PhoneCall },
  'patient-portal': { color: '#14213d', text: '#ffffff', icon: MonitorSmartphone },
}

export const defaultRoute = { color: '#14213d', text: '#ffffff', icon: Route }
