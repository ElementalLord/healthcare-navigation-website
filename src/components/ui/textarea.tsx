import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex min-h-28 w-full rounded-lg border-2 border-input bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-brand-teal disabled:opacity-60',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
