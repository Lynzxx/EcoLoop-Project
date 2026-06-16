import Link from "next/link"
import { Camera, MapPin, MessagesSquare, BookOpen, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

const FEATURES = [
  {
    href: "/scan",
    icon: Camera,
    title: "Image recognition",
    desc: "Upload a photo of an item and AI tells you instantly whether it's recyclable and how to prep it.",
  },
  {
    href: "/map",
    icon: MapPin,
    title: "Recycling bin map",
    desc: "An interactive map of blue bins, e-waste points, textile and cash-for-trash spots across Singapore.",
  },
  {
    href: "/chat",
    icon: MessagesSquare,
    title: "Ask EcoBot",
    desc: "Chat through a tricky item — describe it or attach a picture and get a clear answer.",
  },
  {
    href: "/guide",
    icon: BookOpen,
    title: "Recycling guide",
    desc: "A quick reference of what can and can't go in the bin, organised by material type.",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight">
          Three ways to recycle right
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Whatever's in your hand, EcoLoop helps you make the right call in
          seconds.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const Icon = f.icon
          return (
            <Link key={f.href} href={f.href} className="group">
              <Card className="h-full p-5 transition-all hover:border-primary/40 hover:shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
