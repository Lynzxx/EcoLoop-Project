import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { MapExplorer } from "@/components/map/map-explorer"
import { BIN_TYPE_META, type BinType } from "@/lib/recycling-data"

export const metadata: Metadata = {
  title: "Recycling bin map — EcoLoop",
  description: "Find recycling bins, e-waste points, textile and cash-for-trash spots across Singapore.",
}

export default function MapPage() {
  const types = Object.entries(BIN_TYPE_META) as [BinType, { color: string; description: string }][]

  return (
    <main className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Find a recycling bin near you
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Explore recycling points across Singapore. Filter by bin type and tap a
            location to see details. Data is structured to match the OneMap /
            Data.gov.sg recycling datasets.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {types.map(([type, meta]) => (
            <div
              key={type}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3"
            >
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              <div>
                <p className="text-sm font-medium">{type}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {meta.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <MapExplorer />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
