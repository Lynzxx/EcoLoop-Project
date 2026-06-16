import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Scanner } from "@/components/scan/scanner"

export const metadata: Metadata = {
  title: "Scan an item — EcoLoop",
  description: "Upload a photo or use your camera to check if an item can be recycled in Singapore.",
}

export default function ScanPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Check if it can be recycled
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Upload a photo or use your camera. EcoLoop's image recognition will
            identify the item and tell you whether it belongs in the blue bin —
            and how to prepare it.
          </p>
        </div>

        <div className="mt-8">
          <Scanner />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
