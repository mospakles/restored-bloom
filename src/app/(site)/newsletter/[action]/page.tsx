import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { connection } from "next/server"
import { Container } from "@/components/ui/misc"
import { Button, buttonVariants } from "@/components/ui/button"
import { confirmSubscription, unsubscribe } from "@/server/newsletter"

export const metadata: Metadata = { title: "Newsletter", robots: { index: false } }

type Props = {
  params: Promise<{ action: string }>
  searchParams: Promise<{ token?: string; result?: string }>
}

const RESULTS = {
  confirmed: { title: "You're subscribed", body: "Thank you. You'll receive occasional updates from Restored Bloom." },
  unsubscribed: { title: "You've been unsubscribed", body: "You won't receive any more newsletter emails from us." },
  invalid: { title: "This link isn't valid", body: "It may have expired or already been used." },
} as const

/**
 * Confirmation and unsubscribe require a button press (POST), so automated
 * email link scanners cannot subscribe or unsubscribe people by visiting the link.
 */
export default async function NewsletterActionPage({ params, searchParams }: Props) {
  await connection()
  const { action } = await params
  const { token = "", result } = await searchParams
  if (action !== "confirm" && action !== "unsubscribe") notFound()

  if (result && result in RESULTS) {
    const copy = RESULTS[result as keyof typeof RESULTS]
    return (
      <Container className="max-w-xl py-24 text-center">
        <h1 className="text-4xl text-plum-900">{copy.title}</h1>
        <p className="mt-4 text-lg text-plum-700">{copy.body}</p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Back to the homepage
        </Link>
      </Container>
    )
  }

  async function perform(formData: FormData) {
    "use server"
    const t = String(formData.get("token") ?? "")
    const outcome = action === "confirm" ? await confirmSubscription(t) : await unsubscribe(t)
    redirect(`/newsletter/${action}?result=${outcome}`)
  }

  return (
    <Container className="max-w-xl py-24 text-center">
      <h1 className="text-4xl text-plum-900">{action === "confirm" ? "Confirm your subscription" : "Unsubscribe"}</h1>
      <p className="mt-4 text-lg text-plum-700">
        {action === "confirm"
          ? "Press the button below to start receiving occasional updates from Restored Bloom."
          : "Press the button below to stop receiving newsletter emails from Restored Bloom."}
      </p>
      <form action={perform} className="mt-8">
        <input type="hidden" name="token" value={token} />
        <Button type="submit" size="lg">
          {action === "confirm" ? "Confirm subscription" : "Unsubscribe"}
        </Button>
      </form>
    </Container>
  )
}
