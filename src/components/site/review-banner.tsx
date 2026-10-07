import { Notice } from "@/components/ui/misc"

export function ReviewBanner({ reviewed }: { reviewed: boolean }) {
  if (reviewed) return null
  return (
    <Notice tone="pending" title="Draft — awaiting review" className="mb-8">
      This page is a draft and has not yet been reviewed by the founder and an appropriately qualified professional.
      It will be updated before Restored Bloom launches its programmes.
    </Notice>
  )
}
