import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-teal-100 text-teal-800",
        teal: "bg-teal-100 text-teal-800",
        lavender: "bg-purple-100 text-purple-800",
        blush: "bg-rose-100 text-rose-800",
        sage: "bg-emerald-100 text-emerald-800",
        amber: "bg-amber-100 text-amber-800",
        red: "bg-red-100 text-red-800",
        secondary: "bg-stone-100 text-stone-800",
        outline: "border border-stone-300 text-stone-700 bg-transparent",
        warning: "bg-amber-100 text-amber-800",
        success: "bg-green-100 text-green-800",
        destructive: "bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
