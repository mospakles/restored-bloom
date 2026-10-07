import "server-only"
import { prisma } from "@/lib/db"

/**
 * Atomic fixed-window counter stored in Postgres, so limits hold across
 * multiple server instances. Returns true when the request is allowed.
 */
export async function hit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const rows = await prisma.$queryRaw<{ count: number }[]>`
    INSERT INTO "FormThrottle" ("key", "count", "windowStart")
    VALUES (${key}, 1, now())
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "FormThrottle"."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN 1
        ELSE "FormThrottle"."count" + 1
      END,
      "windowStart" = CASE
        WHEN "FormThrottle"."windowStart" < now() - make_interval(secs => ${windowSeconds}::int) THEN now()
        ELSE "FormThrottle"."windowStart"
      END
    RETURNING "count"
  `
  return (rows[0]?.count ?? 0) <= limit
}

/** Removes expired throttle rows. Safe to run at any time. */
export async function pruneThrottle(olderThanSeconds = 60 * 60 * 24) {
  await prisma.$executeRaw`
    DELETE FROM "FormThrottle" WHERE "windowStart" < now() - make_interval(secs => ${olderThanSeconds}::int)
  `
}
