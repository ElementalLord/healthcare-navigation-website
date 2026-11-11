import { useId, useState, type FormEvent } from 'react'
import { AlertTriangle, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { hasContactEmail, site } from '@/config/site'

/**
 * This form never sends data to a server.
 * - If `site.contactEmail` is set, it opens the visitor's own email app with the message filled in.
 * - If not, it stays in demo mode and says so clearly.
 */
export function ContactForm({ kind }: { kind: 'contact' | 'feedback' }) {
  const id = useId()
  const [status, setStatus] = useState('')
  const options =
    kind === 'contact'
      ? ['Community organization: partnering', 'Student volunteering', 'Adult advisor / mentor', 'General question']
      : ['Something was hard to understand', 'Something looks wrong or out of date', 'A resource we should check', 'Accessibility problem', 'Other']

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const topic = String(data.get('topic') || '')
    const message = String(data.get('message') || '')
    if (!topic) {
      setStatus('Please choose a topic first.')
      return
    }
    if (!hasContactEmail) {
      setStatus('Demo only: nothing was sent or saved. A monitored contact email has not been set up yet.')
      return
    }
    const subject = `[CarePath ${kind === 'contact' ? 'contact' : 'website feedback'}] ${topic}`
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    setStatus('Your email app should open with this message. Nothing is sent until you press send there.')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="flex gap-3 rounded-xl bg-[#fdf0d5] p-4 text-[#5c3b00]">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <p>
          Please do <strong>not</strong> include symptoms, diagnoses, medical records, insurance or ID numbers, immigration
          details, or other private information.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${id}-topic`}>{kind === 'contact' ? 'I’m reaching out about' : 'What is your feedback about?'}</Label>
        <NativeSelect id={`${id}-topic`} name="topic" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>
          Message <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          maxLength={1000}
          placeholder={kind === 'contact' ? 'Tell us who you are and how we can help.' : 'Which page, and what was the problem?'}
        />
      </div>
      <Button type="submit" size="lg">
        <Send aria-hidden="true" /> {hasContactEmail ? 'Write email' : 'Preview (demo)'}
      </Button>
      <p role="status" className="min-h-7 font-medium text-brand-teal">
        {status}
      </p>
    </form>
  )
}
