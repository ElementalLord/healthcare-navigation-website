import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-center rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-brand-navy-2',
        mint: 'bg-brand-mint text-brand-navy hover:bg-[#a3e6d8]',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
        'outline-light': 'border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-brand-navy',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
        ghost: 'text-foreground hover:bg-muted',
        link: 'text-brand-teal underline underline-offset-4 hover:decoration-2',
      },
      size: {
        default: 'min-h-12 px-5 py-2.5 text-base',
        sm: 'min-h-10 px-4 text-[0.95rem]',
        lg: 'min-h-14 px-7 text-lg',
        icon: 'size-12',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a <Link>) with button styles instead of a <button>. */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

// oxlint-disable-next-line react/only-export-components -- shadcn convention: variants are shared with other components
export { Button, buttonVariants }
