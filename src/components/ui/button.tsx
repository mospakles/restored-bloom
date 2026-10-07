import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const baseButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60 cursor-pointer active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-plum-800 text-cream-50 hover:bg-plum-900 shadow-sm shadow-plum-900/10",
        rose: "bg-rose-700 text-white hover:bg-rose-800 shadow-sm shadow-rose-900/10",
        outline: "border border-plum-300 text-plum-800 bg-transparent hover:bg-plum-50 hover:border-plum-400",
        soft: "bg-cream-200 text-plum-900 hover:bg-cream-300",
        ghost: "text-plum-800 hover:bg-plum-50",
        light: "bg-cream-50 text-plum-900 hover:bg-white",
        /** Outline button for dark backgrounds. */
        "outline-light": "border border-plum-300 text-cream-50 bg-transparent hover:bg-plum-800 hover:border-plum-200",
        danger: "bg-rose-800 text-white hover:bg-rose-700",
        link: "rounded-none p-0 text-rose-700 underline underline-offset-4 hover:text-rose-800",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
)

/** Class names for a button; conflicting overrides passed via `className` take precedence. */
export function buttonVariants(props?: Parameters<typeof baseButtonVariants>[0]) {
  return cn(baseButtonVariants(props))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
