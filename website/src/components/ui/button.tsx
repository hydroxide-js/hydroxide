import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-fd-ring focus-visible:ring-fd-ring/50 focus-visible:ring-[3px] aria-invalid:ring-fd-destructive/20 dark:aria-invalid:ring-fd-destructive/40 aria-invalid:border-fd-destructive",
  {
    variants: {
      variant: {
        default: 'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90',
        destructive:
          'bg-fd-destructive text-white hover:bg-fd-destructive/90 focus-visible:ring-fd-destructive/20 dark:focus-visible:ring-fd-destructive/40 dark:bg-fd-destructive/60',
        outline:
          'border border-fd-border bg-fd-background shadow-xs hover:bg-fd-accent hover:text-fd-accent-foreground',
        secondary:
          'bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80',
        ghost: 'hover:bg-fd-accent hover:text-fd-accent-foreground',
        link: 'text-fd-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
