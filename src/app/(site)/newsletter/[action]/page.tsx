import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { connection } from "next/server"
import { Container } from "@/components/ui/misc"
import { PageHero } from "@/components/site/blocks"
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
      <>
        <PageHero accent="sage" art="letter" eyebrow="Newsletter" title={copy.title}>
          <p>{copy.body}</p>
        </PageHero>
        <Container className="max-w-xl py-16">
          <Link href="/" className={buttonVariants()}>
            Back to the homepage
          </Link>
        </Container>
      </>
    )
  }

  async function perform(formData: FormData) {
    "use server"
    const t = String(formData.get("token") ?? "")
    const outcome = action === "confirm" ? await confirmSubscription(t) : await unsubscribe(t)
    redirect(`/newsletter/${action}?result=${outcome}`)
  }

  return (
    <>
      <PageHero accent="sage" art="letter" eyebrow="Newsletter" title={action === "confirm" ? "Confirm your subscription" : "Unsubscribe"}>
        <p>
          {action === "confirm"
            ? "Press the button below to start receiving occasional updates from Restored Bloom."
            : "Press the button below to stop receiving newsletter emails from Restored Bloom."}
        </p>
      </PageHero>
      <Container className="max-w-xl py-16">
        <form action={perform}>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" size="lg">
            {action === "confirm" ? "Confirm subscription" : "Unsubscribe"}
          </Button>
        </form>
      </Container>
    </>
  )
}
