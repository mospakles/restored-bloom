import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | any
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, ...props }, ref) => {
  const errorMessage = typeof error === "string" ? error : error?.message
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-colors duration-200 resize-y",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:ring-red-400",
          className
        )}
        ref={ref}
        {...props}
      />
      {errorMessage && <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>}
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
