import { prisma } from "@/lib/db"

/**
 * Health check for the hosting platform: confirms the app is serving and the
 * database is reachable. Returns no internal details.
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
