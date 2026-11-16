import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

/** A centered pop-up window. Built on Radix Dialog: focus is trapped inside and Esc closes it. */
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] animate-[fade-in_200ms_ease-out] bg-ink/60" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-[12vh] z-[70] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 animate-[fade-in_150ms_ease-out] overflow-hidden rounded-lg border-2 border-ink bg-white',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription }
