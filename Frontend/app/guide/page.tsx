import type { Metadata } from "next"
import { Check, X } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { GUIDE } from "@/lib/recycling-data"

export const metadata: Metadata = {
  title: "Recycling guide — EcoLoop",
  description: "What can and can't be recycled in Singapore, organised by material type.",
}

export default function GuidePage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            What can and can't be recycled
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            A quick reference based on Singapore's NEA blue bin rules. When in
            doubt, keep recyclables clean and dry — and don't bag them in plastic.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {GUIDE.map((cat) => (
            <Card key={cat.id} className="p-6">
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {cat.blurb}
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Check className="h-4 w-4" />
                    Accepted
                  </p>
                  <ul className="mt-2 space-y-2">
                    {cat.accepted.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
                    <X className="h-4 w-4" />
                    Not accepted
                  </p>
                  <ul className="mt-2 space-y-2">
                    {cat.rejected.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
