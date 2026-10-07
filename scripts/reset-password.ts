/**
 * Server-side account recovery for when email is not configured, or when the
 * last administrator is locked out. Signs the user out everywhere.
 *
 *   npm run admin:reset-password
 */
import "dotenv/config"
import { ask, askHidden } from "./prompt"

async function main() {
  const { setAccountPassword } = await import("../src/server/users")
  const { prisma } = await import("../src/lib/db")
  const { PASSWORD_MIN_LENGTH } = await import("../src/lib/auth")

  const email = (process.env.ADMIN_EMAIL ?? (await ask("Account email: "))).toLowerCase()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error(`No account found for ${email}`)

  const password = process.env.ADMIN_PASSWORD ?? (await askHidden(`New password (min ${PASSWORD_MIN_LENGTH} characters): `))
  if (!process.env.ADMIN_PASSWORD && password !== (await askHidden("Confirm password: "))) throw new Error("Passwords do not match")
  if (password.length < PASSWORD_MIN_LENGTH || password.length > 128) {
    throw new Error(`Password must be ${PASSWORD_MIN_LENGTH}–128 characters`)
  }

  await setAccountPassword(user.id, password)
  const reactivate = process.argv.includes("--reactivate")
  if (reactivate) await prisma.user.update({ where: { id: user.id }, data: { active: true } })
  await prisma.auditLog.create({
    data: { action: "user.password-reset.cli", entityType: "User", entityId: user.id, metadata: { reactivate } },
  })
  console.log(`✔ Password reset for ${email}${reactivate ? " (account reactivated)" : ""}. All sessions signed out.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(`✖ ${e instanceof Error ? e.message : e}`)
  process.exit(1)
})
