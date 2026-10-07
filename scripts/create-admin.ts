/**
 * Creates a staff account from the command line. Use this to create the first
 * administrator — there is no public registration.
 *
 *   npm run admin:create
 *
 * Non-interactive (e.g. CI): set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD and
 * optionally ADMIN_ROLE. Avoid leaving the password in shell history.
 */
import "dotenv/config"
import { z } from "zod"
import { ask, askHidden } from "./prompt"

async function main() {
  const { createAccount } = await import("../src/server/users")
  const { prisma } = await import("../src/lib/db")
  const { PASSWORD_MIN_LENGTH } = await import("../src/lib/auth")
  const { ROLES } = await import("../src/lib/permissions")

  const name = process.env.ADMIN_NAME ?? (await ask("Full name: "))
  const email = (process.env.ADMIN_EMAIL ?? (await ask("Email: "))).toLowerCase()
  const role = process.env.ADMIN_ROLE ?? "ADMIN"
  let password = process.env.ADMIN_PASSWORD
  if (!password) {
    password = await askHidden(`Password (min ${PASSWORD_MIN_LENGTH} characters): `)
    const confirm = await askHidden("Confirm password: ")
    if (password !== confirm) throw new Error("Passwords do not match")
  }

  const parsed = z
    .object({
      name: z.string().min(2),
      email: z.email(),
      role: z.enum(ROLES),
      password: z.string().min(PASSWORD_MIN_LENGTH).max(128),
    })
    .safeParse({ name, email, role, password })
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "))
  }
  if (await prisma.user.findUnique({ where: { email } })) throw new Error(`A user with email ${email} already exists`)

  const user = await createAccount(parsed.data)
  await prisma.auditLog.create({
    data: { action: "user.create.cli", entityType: "User", entityId: user.id, metadata: { role } },
  })
  console.log(`✔ Created ${role} account for ${email}`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(`✖ ${e instanceof Error ? e.message : e}`)
  process.exit(1)
})
