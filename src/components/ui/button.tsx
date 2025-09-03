import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transform',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg':
              variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg':
              variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md':
              variant === 'outline',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md':
              variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground hover:shadow-sm': 
              variant === 'ghost',
            'text-primary underline-offset-4 hover:underline':
              variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
