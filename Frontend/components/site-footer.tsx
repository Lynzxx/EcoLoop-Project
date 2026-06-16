import Link from "next/link"
import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold">EcoLoop</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An AI recycling companion for Singapore. Scan, locate a bin, and ask
            questions so more things end up in the right loop.
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Explore</span>
            <Link href="/scan" className="text-muted-foreground hover:text-foreground">
              Scan an item
            </Link>
            <Link href="/map" className="text-muted-foreground hover:text-foreground">
              Bin map
            </Link>
            <Link href="/guide" className="text-muted-foreground hover:text-foreground">
              Recycling guide
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground">
              Ask EcoBot
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Data</span>
            <span className="text-muted-foreground">NEA Recycle Right</span>
            <span className="text-muted-foreground">OneMap API</span>
            <span className="text-muted-foreground">Data.gov.sg</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          EcoLoop gives guidance only — always follow local NEA rules. Built as a
          demonstration project.
        </p>
      </div>
    </footer>
  )
}
