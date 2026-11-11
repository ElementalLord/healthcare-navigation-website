import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * A styled native <select>. Native selects are the most reliable option on
 * older phones and with screen readers, so we use them instead of a custom popup.
 */
function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'flex min-h-12 w-full rounded-lg border-2 border-input bg-white px-4 py-2 text-base text-foreground focus-visible:border-brand-teal',
        className,
      )}
      {...props}
    />
  )
}

export { NativeSelect }
