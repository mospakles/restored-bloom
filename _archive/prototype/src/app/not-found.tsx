import Link from "next/link"
import { Home, Search, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/layout/section-wrapper"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center">
      <PageContainer narrow>
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-teal-300" />
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Page Not Found</h1>
          <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            We couldn't find the page you're looking for. If you need help, please don't hesitate to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/"><Home className="h-4 w-4" />Go Home</Link></Button>
            <Button variant="outline" asChild><Link href="/get-help"><Shield className="h-4 w-4" />Get Help</Link></Button>
            <Button variant="outline" asChild><Link href="/resources"><ArrowRight className="h-4 w-4" />Browse Resources</Link></Button>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
