import type { FieldErrors } from "@/lib/validation"

export type FormValues = Record<string, string | string[]>

export type FormState =
  | { status: "idle"; submission?: number }
  | { status: "error"; message: string; errors: FieldErrors; values: FormValues; submission: number }
  | { status: "success"; title: string; message: string; reference?: string; submission: number }

export const initialFormState: FormState = { status: "idle" }

/** Echo submitted values back so fields keep their contents after a failed submission. Never echo passwords or tokens. */
export function echoValues(formData: FormData): FormValues {
  const out: FormValues = {}
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key.startsWith("_") || /password|token/i.test(key)) continue
    const all = formData.getAll(key).filter((v): v is string => typeof v === "string")
    out[key] = all.length > 1 ? all : (all[0] ?? "")
  }
  return out
}
