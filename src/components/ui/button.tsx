"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-teal-600 text-cream-50 hover:bg-teal-700 active:scale-[0.98] focus-visible:ring-teal-600",
        destructive:
          "bg-blush-600 text-cream-50 hover:bg-blush-700 focus-visible:ring-blush-600",
        outline:
          "border-2 border-teal-600 text-teal-700 bg-transparent hover:bg-teal-600 hover:text-cream-50 focus-visible:ring-teal-600",
        secondary:
          "bg-cream-200 text-navy-800 hover:bg-cream-300 focus-visible:ring-cream-400",
        ghost:
          "text-teal-700 hover:bg-teal-50 focus-visible:ring-teal-600",
        link:
          "text-teal-700 underline-offset-4 hover:underline p-0 h-auto focus-visible:ring-teal-600",
        emergency:
          "bg-blush-700 text-cream-50 hover:bg-blush-600 active:scale-[0.98] focus-visible:ring-blush-700",
        light:
          "bg-cream-50 text-teal-700 hover:bg-cream-100 active:scale-[0.98] focus-visible:ring-cream-200",
        "outline-white":
          "border-2 border-white/40 text-white bg-transparent hover:bg-white/10 focus-visible:ring-white/40",
        navy:
          "bg-navy-800 text-cream-50 hover:bg-navy-700 active:scale-[0.98] focus-visible:ring-navy-800",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-13 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
