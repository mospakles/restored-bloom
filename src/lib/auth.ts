import "server-only"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { prisma } from "@/lib/db"
import { env } from "@/lib/env"
import { emailBody, sendEmail } from "@/lib/email"

export const PASSWORD_MIN_LENGTH = 12

export const auth = betterAuth({
  appName: "Restored Bloom",
  baseURL: env.siteUrl,
  secret: env.authSecret,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // There is no public administrator registration. Accounts are created by
    // an administrator in the dashboard or with `npm run admin:create`.
    disableSignUp: true,
    minPasswordLength: PASSWORD_MIN_LENGTH,
    maxPasswordLength: 128,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Restored Bloom dashboard password",
        text: emailBody([
          "A password reset was requested for your Restored Bloom dashboard account.",
          "",
          `Choose a new password (link valid for 1 hour): ${url}`,
          "",
          "If you did not request this, you can ignore this email and your password will stay the same.",
        ]),
      })
    },
  },
  session: {
    expiresIn: 60 * 60 * 12, // 12 hours
    updateAge: 60 * 60, // refresh at most hourly
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, input: false, defaultValue: "COORDINATOR" },
      active: { type: "boolean", required: false, input: false, defaultValue: true },
    },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/request-password-reset": { window: 300, max: 3 },
      "/reset-password": { window: 300, max: 5 },
    },
  },
  databaseHooks: {
    session: {
      create: {
        // Deactivated staff cannot start new sessions.
        before: async (session) => {
          const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { active: true } })
          if (!user?.active) return false
        },
      },
    },
  },
  advanced: {
    database: { generateId: () => crypto.randomUUID() },
  },
  telemetry: { enabled: false },
  plugins: [nextCookies()],
})
