"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SAMPLE_FAQS } from "@/lib/data"

interface FAQAccordionProps {
  faqs?: typeof SAMPLE_FAQS
}

export function FAQAccordion({ faqs = SAMPLE_FAQS }: FAQAccordionProps) {
  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <Accordion type="single" collapsible className="divide-y divide-stone-100">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="px-6">
            <AccordionTrigger className="text-base font-semibold text-stone-900 py-5 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-stone-600 leading-relaxed pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
