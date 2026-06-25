import { HeroSection } from "@/components/home/hero-section"
import { StatisticsSection } from "@/components/home/statistics-section"
import { MissionSection } from "@/components/home/mission-section"
import { SupportCategoriesSection } from "@/components/home/support-categories"
import { HowWeHelpSection } from "@/components/home/how-we-help"
import { FeaturedStoriesSection } from "@/components/home/featured-stories"
import { ResourceHighlightsSection } from "@/components/home/resource-highlights"
import { VolunteerCTASection } from "@/components/home/volunteer-cta"
import { ContactSection } from "@/components/home/contact-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <MissionSection />
      <SupportCategoriesSection />
      <HowWeHelpSection />
      <FeaturedStoriesSection />
      <ResourceHighlightsSection />
      <VolunteerCTASection />
      <ContactSection />
    </>
  )
}
