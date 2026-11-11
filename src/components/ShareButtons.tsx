import { useState } from 'react'
import { Check, Copy, Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CopyButton({ text, label = 'Copy questions' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard can be blocked on some older browsers; printing still works.
    }
  }
  return (
    <Button type="button" variant="secondary" size="sm" onClick={copy} className="print:hidden">
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied — paste into a text or WhatsApp' : label}</span>
    </Button>
  )
}

export function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <Button type="button" variant="secondary" size="sm" onClick={() => window.print()} className="print:hidden">
      <Printer aria-hidden="true" /> {label}
    </Button>
  )
}
