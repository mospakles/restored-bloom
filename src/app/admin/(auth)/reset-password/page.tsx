import type { Metadata } from "next"
import Link from "next/link"
import { ActionForm, SubmitButton } from "@/components/forms/form"
import { TextField } from "@/components/forms/fields"
import { Notice } from "@/components/ui/misc"
import { PASSWORD_MIN_LENGTH } from "@/lib/auth"
import { resetPasswordAction } from "../actions"

export const metadata: Metadata = { title: "Choose a new password" }

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string; error?: string }> }) {
  const { token, error } = await searchParams
  if (!token || error) {
    return (
      <>
        <h1 className="text-3xl text-plum-900">Link not valid</h1>
        <Notice tone="warning" className="mt-4">
          This password reset link is invalid or has expired.
        </Notice>
        <Link href="/admin/forgot-password" className="mt-6 inline-block font-semibold text-rose-700 underline underline-offset-4">
          Request a new link
        </Link>
      </>
    )
  }
  return (
    <>
      <h1 className="text-3xl text-plum-900">Choose a new password</h1>
      <ActionForm
        action={resetPasswordAction}
        id="reset"
        className="mt-6 space-y-5"
        successExtra={
          <Link href="/admin/sign-in" className="mt-4 inline-block font-semibold text-rose-700 underline underline-offset-4">
            Sign in
          </Link>
        }
      >
        <input type="hidden" name="token" value={token} />
        <TextField
          name="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          hint={`At least ${PASSWORD_MIN_LENGTH} characters. A memorable phrase of several words works well.`}
          required
        />
        <TextField name="confirm" label="Confirm new password" type="password" autoComplete="new-password" required />
        <SubmitButton className="w-full">Update password</SubmitButton>
      </ActionForm>
    </>
  )
}
