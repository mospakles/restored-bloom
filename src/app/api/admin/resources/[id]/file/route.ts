import { ForbiddenError, NotFoundError } from "@/server/actor"
import { requireActor } from "@/server/session"
import { attachResourceFile, MAX_UPLOAD_BYTES } from "@/server/resources"

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  // Same-origin check (server actions get this automatically; route handlers do not).
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Cross-origin request rejected" }, { status: 403 })
  }
  const length = Number(request.headers.get("content-length") ?? 0)
  if (length > MAX_UPLOAD_BYTES + 64 * 1024) {
    return Response.json({ error: "Files must be 8 MB or smaller" }, { status: 413 })
  }
  try {
    const actor = await requireActor("resources:manage")
    const { id } = await ctx.params
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) return Response.json({ error: "No file received" }, { status: 400 })
    await attachResourceFile(actor, id, file)
    return Response.json({ ok: true })
  } catch (error) {
    if (error instanceof ForbiddenError) return Response.json({ error: "Not permitted" }, { status: 403 })
    if (error instanceof NotFoundError) return Response.json({ error: error.message }, { status: 404 })
    const message = error instanceof Error && error.message.length < 120 ? error.message : "Upload failed"
    return Response.json({ error: message }, { status: 400 })
  }
}
