"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { initialFormState, type FormState } from "@/lib/form-state"
import { cn } from "@/lib/utils"

type Action = (state: FormState, formData: FormData) => Promise<FormState>

function Submit({ children, confirm, ...props }: ButtonProps & { confirm?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault()
      }}
      {...props}
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
      {children}
    </Button>
  )
}

/** A one-click server action (publish, archive, delete…) with inline, announced feedback. */
export function InlineAction({
  action,
  fields,
  label,
  confirm,
  variant = "outline",
  size = "sm",
  className,
}: {
  action: Action
  fields: Record<string, string>
  label: string
  confirm?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
}) {
  const [state, formAction] = useActionState(action, initialFormState)
  return (
    <form action={formAction} className={cn("inline-flex flex-col items-start gap-1", className)}>
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <Submit variant={variant} size={size} confirm={confirm}>
        {label}
      </Submit>
      <span role="status" className={cn("text-xs", state.status === "error" ? "text-rose-700" : "text-sage-700")}>
        {state.status === "error" ? state.message : state.status === "success" ? state.message : ""}
      </span>
    </form>
  )
}

/** A select that submits its value to a server action (e.g. status or assignee). */
export function SelectAction({
  action,
  fields,
  name,
  label,
  options,
  value,
}: {
  action: Action
  fields: Record<string, string>
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
}) {
  const [state, formAction] = useActionState(action, initialFormState)
  const id = `${name}-${Object.values(fields).join("-")}`
  return (
    <form action={formAction} className="space-y-2">
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <label htmlFor={id} className="block text-sm font-semibold text-plum-900">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          id={id}
          name={name}
          defaultValue={value}
          className="h-10 min-w-0 flex-1 rounded-xl border border-cream-400 bg-white px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Submit size="sm" className="h-10">
          Update
        </Submit>
      </div>
      <p role="status" className={cn("text-xs", state.status === "error" ? "text-rose-700" : "text-sage-700")}>
        {state.status === "error" ? state.message : state.status === "success" ? state.message : ""}
      </p>
    </form>
  )
}
