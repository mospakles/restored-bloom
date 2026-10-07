import type { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { ActionForm, SubmitButton } from "@/components/forms/form"
import { TextField } from "@/components/forms/fields"
import { Notice } from "@/components/ui/misc"
import { isEmailConfigured } from "@/lib/env"
import { forgotPasswordAction } from "../actions"

export const metadata: Metadata = { title: "Reset password" }

export default async function ForgotPasswordPage() {
  await connection()
  const emailReady = isEmailConfigured()
  return (
    <>
      <h1 className="text-3xl text-plum-900">Reset your password</h1>
      <p className="mt-2 text-plum-700">Enter your account email and we&apos;ll send you a reset link.</p>
      {!emailReady && (
        <Notice tone="warning" className="mt-4">
          Email delivery isn&apos;t configured yet, so reset emails can&apos;t be sent. Ask an administrator to reset your
          password using <code className="font-mono">npm run admin:reset-password</code> on the server.
        </Notice>
      )}
      <ActionForm action={forgotPasswordAction} id="forgot" className="mt-6 space-y-5">
        <TextField name="email" label="Email" type="email" autoComplete="username" required />
        <SubmitButton className="w-full">Send reset link</SubmitButton>
      </ActionForm>
      <p className="mt-6 text-center text-sm">
        <Link href="/admin/sign-in" className="font-semibold text-rose-700 underline underline-offset-4">
          Back to sign in
        </Link>
      </p>
    </>
  )
}
