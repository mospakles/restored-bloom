import { getActor } from "@/server/session"
import { getDownloadableFile } from "@/server/resources"

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const actor = await getActor()
  const file = await getDownloadableFile(id, actor)
  if (!file) return new Response("Not found", { status: 404 })

  const isPublic = file.resource?.status === "PUBLISHED"
  return new Response(Buffer.from(file.data), {
    headers: {
      "Content-Type": file.mimeType,
      "Content-Length": String(file.size),
      "Content-Disposition": `attachment; filename="${file.filename.replace(/"/g, "")}"`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Cache-Control": isPublic ? "public, max-age=300" : "private, no-store",
    },
  })
}
