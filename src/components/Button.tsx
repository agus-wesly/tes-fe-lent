import { cn } from '../utils/cn'
import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 text-neutral-100 shadow hover:bg-neutral-900/90 h-9 px-4 py-2',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Button
