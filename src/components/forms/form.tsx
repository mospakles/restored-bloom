"use client"

import * as React from "react"
import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { initialFormState, type FormState, type FormValues } from "@/lib/form-state"

type Ctx = { errors: Record<string, string>; values: FormValues; idPrefix: string }
const FormCtx = React.createContext<Ctx>({ errors: {}, values: {}, idPrefix: "f" })
export const useFormCtx = () => React.useContext(FormCtx)

type Action = (state: FormState, formData: FormData) => Promise<FormState>

/**
 * Progressive-enhancement form wrapper: server action submission, preserved
 * values on error, a focusable error summary, and an announced success panel.
 */
export function ActionForm({
  action,
  children,
  token,
  className,
  successExtra,
  resetOnSuccess = false,
  id = "form",
}: {
  action: Action
  children: React.ReactNode
  /** Signed timing token for public forms. */
  token?: string
  className?: string
  successExtra?: React.ReactNode
  /** Show the form again (cleared) after success instead of replacing it. Useful in the dashboard. */
  resetOnSuccess?: boolean
  id?: string
}) {
  const [state, formAction] = useActionState(action, initialFormState)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus()
    if (state.status === "success" && !resetOnSuccess) successRef.current?.focus()
  }, [state, resetOnSuccess])

  if (state.status === "success" && !resetOnSuccess) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl border border-sage-300 bg-sage-50 p-6 sm:p-8 outline-none"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-sage-700" aria-hidden="true" />
          <div>
            <h3 className="text-2xl text-plum-900">{state.title}</h3>
            <p className="mt-2 leading-relaxed text-plum-800">{state.message}</p>
            {state.reference && (
              <p className="mt-3 text-sm text-plum-700">
                Your reference: <strong className="font-mono text-plum-900">{state.reference}</strong>
              </p>
            )}
            {successExtra}
          </div>
        </div>
      </div>
    )
  }

  const errors = state.status === "error" ? state.errors : {}
  const values = state.status === "error" ? state.values : {}
  const errorEntries = Object.entries(errors).filter(([k]) => k !== "_form")

  return (
    <FormCtx.Provider value={{ errors, values, idPrefix: id }}>
      <form
        key={state.status === "idle" ? 0 : state.submission}
        action={formAction}
        noValidate
        className={cn("space-y-6", className)}
        aria-describedby={state.status === "error" ? `${id}-summary` : undefined}
      >
        {state.status === "success" && resetOnSuccess && (
          <p role="status" className="rounded-xl bg-sage-50 px-4 py-3 text-sm font-medium text-sage-800">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <div
            ref={summaryRef}
            id={`${id}-summary`}
            tabIndex={-1}
            role="alert"
            className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800 outline-none"
          >
            <p className="font-semibold">{state.message}</p>
            {errorEntries.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errorEntries.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#${id}-${field}`} className="underline underline-offset-2">
                      {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {token && <input type="hidden" name="_token" value={token} />}
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave this field empty
            <input type="text" name="_website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        {children}
      </form>
    </FormCtx.Provider>
  )
}

export function SubmitButton({ children, pendingLabel = "Sending…", ...props }: ButtonProps & { pendingLabel?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} {...props}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingLabel : children}
    </Button>
  )
}
