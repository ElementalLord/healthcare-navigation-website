import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 text-center rounded-md font-bold transition-colors disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-ink text-white hover:bg-[#22325a]',
        /** Yellow "signal" button. Use on ink backgrounds or for the single main action on a page. */
        signal: 'bg-signal text-ink hover:bg-[#f7c64a]',
        outline: 'border-2 border-ink bg-white text-ink hover:bg-signage',
        'outline-light': 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-ink',
        secondary: 'bg-signage text-ink hover:bg-[#dde1e5]',
        ghost: 'text-ink hover:bg-signage',
        link: 'text-route-blue underline underline-offset-4 decoration-2 hover:decoration-[3px]',
      },
      size: {
        default: 'min-h-12 px-5 py-2.5 text-base',
        sm: 'min-h-10 px-4 text-[0.95rem]',
        lg: 'min-h-14 px-6 py-3 text-lg',
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
