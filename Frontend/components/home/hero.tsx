import Image from "next/image"
import Link from "next/link"
import { Camera, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI recycling assistant for Singapore
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Not sure if it can be recycled? Let EcoLoop check.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Upload a photo, find your nearest recycling bin, or just ask. EcoLoop
            uses AI to tell you exactly what goes in the blue bin and how to
            prepare it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/scan" />} nativeButton={false} size="lg">
              <Camera className="h-4 w-4" />
              Scan an item
            </Button>
            <Button
              render={<Link href="/map" />}
              nativeButton={false}
              size="lg"
              variant="outline"
            >
              <MapPin className="h-4 w-4" />
              Find a bin
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Image
              src="/hero-recycling.png"
              alt="Neatly sorted recyclable items including a plastic bottle, can, glass jar and cardboard"
              width={720}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
