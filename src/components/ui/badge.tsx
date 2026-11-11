import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-input text-foreground',
        success: 'border-transparent bg-[#dcf3e6] text-[#14532d]',
        warning: 'border-transparent bg-[#fdf0d5] text-[#6b4500]',
        info: 'border-transparent bg-[#e0ecfb] text-[#1e3a8a]',
        dark: 'border-white/25 bg-white/10 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

// oxlint-disable-next-line react/only-export-components -- shadcn convention: variants are shared with other components
export { Badge, badgeVariants }
