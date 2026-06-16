import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <Features />
      <HowItWorks />
      <SiteFooter />
    </main>
  )
}
