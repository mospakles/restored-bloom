"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormCtx } from "@/components/forms/form"

const control =
  "block w-full rounded-xl border bg-white px-4 py-2.5 text-[0.98rem] text-plum-950 shadow-xs placeholder:text-plum-400 transition-colors focus:outline-none focus-visible:border-plum-500 focus-visible:ring-2 focus-visible:ring-lagoon-200 disabled:opacity-60"

function useField(name: string) {
  const { errors, values, idPrefix } = useFormCtx()
  const id = `${idPrefix}-${name}`
  const error = errors[name]
  const value = values[name]
  return { id, error, value, errorId: `${id}-error`, hintId: `${id}-hint` }
}

function describedBy(...ids: (string | false | undefined)[]) {
  const v = ids.filter(Boolean).join(" ")
  return v || undefined
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-plum-900">
      {children}
      {required ? (
        <span className="ml-1 text-rose-700" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-xs font-normal text-plum-500">(optional)</span>
      )}
    </label>
  )
}

/** Field hint. Text inputs show it below the box so side-by-side fields stay aligned. */
function Hint({ id, children, below = false }: { id: string; children?: React.ReactNode; below?: boolean }) {
  if (!children) return null
  return (
    <p id={id} className={cn("text-sm leading-snug text-plum-600", below ? "mt-1.5" : "mb-2")}>
      {children}
    </p>
  )
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-rose-700">
      {error}
    </p>
  )
}

type BaseProps = { name: string; label: React.ReactNode; hint?: React.ReactNode; required?: boolean; className?: string }

export function TextField({
  name,
  label,
  hint,
  required,
  className,
  type = "text",
  defaultValue,
  ...rest
}: BaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  const f = useField(name)
  return (
    <div className={className}>
      <Label htmlFor={f.id} required={required}>
        {label}
      </Label>
      <input
        id={f.id}
        name={name}
        type={type}
        required={required}
        defaultValue={(f.value as string | undefined) ?? defaultValue}
        aria-invalid={f.error ? true : undefined}
        aria-describedby={describedBy(hint ? f.hintId : undefined, f.error ? f.errorId : undefined)}
        className={cn(control, "h-11", f.error ? "border-rose-500" : "border-cream-400")}
        {...rest}
      />
      <Hint id={f.hintId} below>{hint}</Hint>
      <ErrorText id={f.errorId} error={f.error} />
    </div>
  )
}

export function TextArea({
  name,
  label,
  hint,
  required,
  className,
  rows = 5,
  maxLength,
  defaultValue,
  ...rest
}: BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const f = useField(name)
  return (
    <div className={className}>
      <Label htmlFor={f.id} required={required}>
        {label}
      </Label>
      <textarea
        id={f.id}
        name={name}
        rows={rows}
        required={required}
        maxLength={maxLength}
        defaultValue={(f.value as string | undefined) ?? defaultValue}
        aria-invalid={f.error ? true : undefined}
        aria-describedby={describedBy(hint ? f.hintId : undefined, f.error ? f.errorId : undefined)}
        className={cn(control, "min-h-28 resize-y", f.error ? "border-rose-500" : "border-cream-400")}
        {...rest}
      />
      <Hint id={f.hintId} below>{hint}</Hint>
      <ErrorText id={f.errorId} error={f.error} />
    </div>
  )
}

export function SelectField({
  name,
  label,
  hint,
  required,
  className,
  options,
  placeholder = "Please choose…",
  defaultValue,
}: BaseProps & { options: Record<string, string> | readonly string[]; placeholder?: string; defaultValue?: string }) {
  const f = useField(name)
  const entries = Array.isArray(options)
    ? (options as readonly string[]).map((o) => [o, o] as const)
    : Object.entries(options as Record<string, string>)
  return (
    <div className={className}>
      <Label htmlFor={f.id} required={required}>
        {label}
      </Label>
      <select
        id={f.id}
        name={name}
        required={required}
        defaultValue={(f.value as string | undefined) ?? defaultValue ?? ""}
        aria-invalid={f.error ? true : undefined}
        aria-describedby={describedBy(hint ? f.hintId : undefined, f.error ? f.errorId : undefined)}
        className={cn(control, "h-11 appearance-auto pr-8", f.error ? "border-rose-500" : "border-cream-400")}
      >
        <option value="">{placeholder}</option>
        {entries.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <Hint id={f.hintId} below>{hint}</Hint>
      <ErrorText id={f.errorId} error={f.error} />
    </div>
  )
}

/** A group of checkboxes (multi) or radios (single) inside a fieldset with a legend. */
export function ChoiceGroup({
  name,
  label,
  hint,
  required,
  className,
  options,
  type = "checkbox",
  columns = 1,
  defaultValue,
}: BaseProps & {
  options: Record<string, string>
  type?: "checkbox" | "radio"
  columns?: 1 | 2
  defaultValue?: string | string[]
}) {
  const f = useField(name)
  const selected = new Set(
    ([] as string[]).concat((f.value as string | string[] | undefined) ?? defaultValue ?? []),
  )
  return (
    <fieldset
      className={className}
      aria-invalid={f.error ? true : undefined}
      aria-describedby={describedBy(hint ? f.hintId : undefined, f.error ? f.errorId : undefined)}
    >
      <legend id={f.id} tabIndex={-1} className="mb-1.5 text-sm font-semibold text-plum-900">
        {label}
        {required ? (
          <span className="ml-1 text-rose-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-plum-500">(optional)</span>
        )}
      </legend>
      <Hint id={f.hintId}>{hint}</Hint>
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {Object.entries(options).map(([value, text]) => (
          <label
            key={value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border bg-white px-3.5 py-2.5 text-[0.95rem] text-plum-900 transition-colors hover:border-plum-300 has-[:checked]:border-plum-500 has-[:checked]:bg-plum-50",
              f.error ? "border-rose-400" : "border-cream-300",
            )}
          >
            <input
              type={type}
              name={name}
              value={value}
              defaultChecked={selected.has(value)}
              className="mt-1 h-4 w-4 shrink-0 accent-plum-700"
            />
            <span>{text}</span>
          </label>
        ))}
      </div>
      <ErrorText id={f.errorId} error={f.error} />
    </fieldset>
  )
}

/** A single required acknowledgement checkbox. */
export function Acknowledge({
  name,
  children,
  className,
  defaultChecked,
}: {
  name: string
  children: React.ReactNode
  className?: string
  defaultChecked?: boolean
}) {
  const f = useField(name)
  const checked = f.value !== undefined ? f.value === "on" : defaultChecked
  return (
    <div className={className}>
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border bg-white px-4 py-3",
          f.error ? "border-rose-400" : "border-cream-300",
        )}
      >
        <input
          id={f.id}
          type="checkbox"
          name={name}
          defaultChecked={checked}
          aria-invalid={f.error ? true : undefined}
          aria-describedby={f.error ? f.errorId : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-plum-700"
        />
        <label htmlFor={f.id} className="text-[0.95rem] leading-relaxed text-plum-900">
          {children}
        </label>
      </div>
      <ErrorText id={f.errorId} error={f.error} />
    </div>
  )
}
