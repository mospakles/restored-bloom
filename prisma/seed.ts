/**
 * DEVELOPMENT-ONLY synthetic data. Refuses to run in production.
 * Everything created here is clearly fictional ("Example", "Sample", @example.com)
 * so it can never be mistaken for genuine records.
 *
 *   npm run db:seed
 */
import "dotenv/config"

async function main() {
  if (process.env.NODE_ENV === "production" || process.env.ALLOW_SEED !== "true") {
    console.error("✖ Seeding is for local development only. Set ALLOW_SEED=true (never in production) to continue.")
    process.exit(1)
  }
  const { prisma } = await import("../src/lib/db")
  const { createAccount } = await import("../src/server/users")

  const staff = [
    { name: "Dev Admin", email: "admin@example.com", role: "ADMIN" },
    { name: "Dev Editor", email: "editor@example.com", role: "EDITOR" },
    { name: "Dev Coordinator", email: "coordinator@example.com", role: "COORDINATOR" },
  ]
  const password = process.env.SEED_PASSWORD ?? "development-only-password"
  for (const s of staff) {
    if (!(await prisma.user.findUnique({ where: { email: s.email } }))) await createAccount({ ...s, password })
  }

  const now = Date.now()
  const day = 24 * 60 * 60 * 1000

  if ((await prisma.enquiry.count()) === 0) {
    await prisma.enquiry.createMany({
      data: [
        {
          reference: "RB-OUT-DEV001",
          type: "OUTREACH",
          name: "Sample Coordinator",
          email: "outreach@example.com",
          phone: "+234 800 000 0000",
          organisation: "Example Community Church (synthetic)",
          details: {
            hostType: "faith",
            contactRole: "Youth coordinator",
            location: "Example area, Lagos",
            audiences: ["teenagers", "parents"],
            involvesChildren: true,
            participants: "101–250",
            support: "teen-session",
            preferredDates: "Next month",
          },
          message: "Synthetic development record.",
          consentVersion: "dev",
          consentAt: new Date(),
        },
        {
          reference: "RB-VOL-DEV002",
          type: "VOLUNTEER",
          name: "Sample Volunteer",
          email: "volunteer@example.com",
          details: { location: "Lagos", areas: ["events", "design"], background: null, availability: "Weekends" },
          consentVersion: "dev",
          consentAt: new Date(),
        },
        {
          reference: "RB-GEN-DEV003",
          type: "CONTACT",
          status: "CLOSED",
          closedAt: new Date(),
          name: "Sample Contact",
          email: "contact@example.com",
          details: { topic: "general" },
          message: "Synthetic development record.",
          consentVersion: "dev",
          consentAt: new Date(),
        },
      ],
    })
  }

  if ((await prisma.event.count()) === 0) {
    await prisma.event.create({
      data: {
        title: "Sample parent workshop (development data)",
        slug: "sample-parent-workshop",
        summary: "A synthetic event used to test registration and capacity in development.",
        description: "## About this sample\n\nThis event exists only in development databases.",
        startsAt: new Date(now + 14 * day),
        endsAt: new Date(now + 14 * day + 2 * 60 * 60 * 1000),
        location: "Example venue, Lagos",
        audience: "Parents and caregivers",
        capacity: 3,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    })
    await prisma.event.create({
      data: {
        title: "Sample draft event (development data)",
        slug: "sample-draft-event",
        summary: "A draft event that should not appear publicly.",
        description: "Draft.",
        startsAt: new Date(now + 30 * day),
        location: "Online",
        isOnline: true,
      },
    })
  }

  if ((await prisma.resource.count()) === 0) {
    await prisma.resource.create({
      data: {
        title: "Sample resource (development data)",
        slug: "sample-resource",
        summary: "A synthetic published resource used to test the resource hub.",
        body: "## Sample\n\nThis is placeholder content for development only. Replace with reviewed material.",
        category: "PARENTS",
        status: "PUBLISHED",
        publishedAt: new Date(),
        reviewNote: "Development data, not reviewed",
      },
    })
    await prisma.resource.create({
      data: {
        title: "Sample draft resource",
        slug: "sample-draft",
        summary: "A draft that should not appear publicly.",
        body: "Draft.",
        category: "EDUCATORS",
      },
    })
  }

  console.log("✔ Development data seeded. Staff accounts:")
  for (const s of staff) console.log(`   ${s.role.padEnd(12)} ${s.email}`)
  console.log(`   Password: ${process.env.SEED_PASSWORD ? "(from SEED_PASSWORD)" : password}`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
