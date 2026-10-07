import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ActionForm, SubmitButton } from "@/components/forms/form"
import { TextField } from "@/components/forms/fields"
import { getActor } from "@/server/session"
import { signInAction } from "../actions"

export const metadata: Metadata = { title: "Sign in" }

export default async function SignInPage() {
  if (await getActor()) redirect("/admin")
  return (
    <>
      <h1 className="text-3xl text-plum-900">Sign in</h1>
      <p className="mt-2 text-plum-700">Sign in to the Restored Bloom dashboard.</p>
      <ActionForm action={signInAction} id="signin" className="mt-6 space-y-5">
        <TextField name="email" label="Email" type="email" autoComplete="username" required />
        <TextField name="password" label="Password" type="password" autoComplete="current-password" required />
        <SubmitButton className="w-full" pendingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </ActionForm>
      <p className="mt-6 text-center text-sm">
        <Link href="/admin/forgot-password" className="font-semibold text-rose-700 underline underline-offset-4">
          Forgotten your password?
        </Link>
      </p>
    </>
  )
}
