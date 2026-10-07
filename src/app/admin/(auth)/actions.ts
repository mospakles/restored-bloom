"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { auth, PASSWORD_MIN_LENGTH } from "@/lib/auth"
import { env } from "@/lib/env"
import { clientFingerprint, sha256 } from "@/lib/security"
import { echoValues, type FormState } from "@/lib/form-state"
import { flattenErrors } from "@/lib/validation"
import { hit } from "@/server/throttle"
import { prisma } from "@/lib/db"

const emailField = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address"))

export async function signInAction(prev: FormState, formData: FormData): Promise<FormState> {
  const submission = (prev.submission ?? 0) + 1
  const parsed = z
    .object({ email: emailField, password: z.string().min(1, "Enter your password").max(128) })
    .safeParse({ email: formData.get("email"), password: formData.get("password") })
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", errors: flattenErrors(parsed.error), values: echoValues(formData), submission }
  }
  const { email, password } = parsed.data
  const fp = await clientFingerprint()
  const allowed =
    (await hit(`signin:ip:${fp}`, 10, 900)) && (await hit(`signin:email:${sha256(email)}`, 5, 900))
  if (!allowed) {
    return {
      status: "error",
      message: "Too many sign-in attempts. Please wait 15 minutes and try again.",
      errors: {},
      values: echoValues(formData),
      submission,
    }
  }
  try {
    await auth.api.signInEmail({ body: { email, password, rememberMe: false }, headers: await headers() })
  } catch {
    return {
      status: "error",
      message: "Email or password is incorrect, or the account is not active.",
      errors: {},
      values: echoValues(formData),
      submission,
    }
  }
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  await prisma.auditLog.create({
    data: { actorId: user?.id, actorEmail: email, action: "auth.sign-in", entityType: "User", entityId: user?.id },
  })
  redirect("/admin")
}

export async function forgotPasswordAction(prev: FormState, formData: FormData): Promise<FormState> {
  const submission = (prev.submission ?? 0) + 1
  const parsed = emailField.safeParse(formData.get("email"))
  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email address.", errors: { email: "Enter a valid email address" }, values: echoValues(formData), submission }
  }
  const fp = await clientFingerprint()
  if (await hit(`reset:ip:${fp}`, 5, 900)) {
    try {
      await auth.api.requestPasswordReset({
        body: { email: parsed.data, redirectTo: `${env.siteUrl}/admin/reset-password` },
        headers: await headers(),
      })
    } catch {
      // Same response either way, so the form can't be used to discover accounts.
    }
  }
  return {
    status: "success",
    title: "Check your email",
    message:
      "If an account exists for that address, we've sent a link to reset the password. The link is valid for one hour.",
    submission,
  }
}

const newPasswordSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`).max(128),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "The passwords don't match" })

export async function resetPasswordAction(prev: FormState, formData: FormData): Promise<FormState> {
  const submission = (prev.submission ?? 0) + 1
  const token = String(formData.get("token") ?? "")
  const parsed = newPasswordSchema.safeParse({ password: formData.get("password"), confirm: formData.get("confirm") })
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", errors: flattenErrors(parsed.error), values: {}, submission }
  }
  try {
    await auth.api.resetPassword({ body: { newPassword: parsed.data.password, token } })
  } catch {
    return {
      status: "error",
      message: "This reset link is invalid or has expired. Please request a new one.",
      errors: {},
      values: {},
      submission,
    }
  }
  return {
    status: "success",
    title: "Password updated",
    message: "Your password has been changed and other sessions have been signed out. You can now sign in.",
    submission,
  }
}

export async function changePasswordAction(prev: FormState, formData: FormData): Promise<FormState> {
  const submission = (prev.submission ?? 0) + 1
  const current = String(formData.get("currentPassword") ?? "")
  const parsed = newPasswordSchema.safeParse({ password: formData.get("password"), confirm: formData.get("confirm") })
  if (!parsed.success || !current) {
    const errors = parsed.success ? {} : flattenErrors(parsed.error)
    if (!current) errors.currentPassword = "Enter your current password"
    return { status: "error", message: "Please check the highlighted fields.", errors, values: {}, submission }
  }
  try {
    await auth.api.changePassword({
      body: { currentPassword: current, newPassword: parsed.data.password, revokeOtherSessions: true },
      headers: await headers(),
    })
  } catch {
    return { status: "error", message: "Your current password is incorrect.", errors: { currentPassword: "Incorrect password" }, values: {}, submission }
  }
  return { status: "success", title: "Password changed", message: "Your password has been changed. Other sessions were signed out.", submission }
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() })
  redirect("/admin/sign-in")
}
