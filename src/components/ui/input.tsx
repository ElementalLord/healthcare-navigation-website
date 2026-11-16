import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex min-h-12 w-full rounded-xl border-2 border-input bg-white px-4 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-brand-teal disabled:opacity-60',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
