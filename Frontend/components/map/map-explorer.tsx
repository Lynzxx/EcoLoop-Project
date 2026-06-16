"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BIN_TYPE_META,
  SINGAPORE_BINS,
  type BinType,
} from "@/lib/recycling-data"

// Leaflet touches `window`, so the map must be client-only.
const BinMap = dynamic(() => import("@/components/map/bin-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
})

const BIN_TYPES = Object.keys(BIN_TYPE_META) as BinType[]

export function MapExplorer() {
  const [activeType, setActiveType] = useState<BinType | "All">("All")
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)

  const bins = useMemo(() => {
    return SINGAPORE_BINS.filter((b) => {
      const typeOk = activeType === "All" || b.type === activeType
      const q = query.trim().toLowerCase()
      const queryOk =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q)
      return typeOk && queryOk
    })
  }, [activeType, query])

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, area or address"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={activeType === "All"}
            onClick={() => setActiveType("All")}
          />
          {BIN_TYPES.map((type) => (
            <FilterChip
              key={type}
              label={type}
              color={BIN_TYPE_META[type].color}
              active={activeType === type}
              onClick={() => setActiveType(type)}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {bins.length} {bins.length === 1 ? "location" : "locations"} found
        </p>

        <ScrollArea className="h-[300px] rounded-xl border border-border lg:h-[420px]">
          <div className="flex flex-col gap-2 p-2">
            {bins.map((bin) => {
              const color = BIN_TYPE_META[bin.type].color
              const active = bin.id === activeId
              return (
                <button
                  key={bin.id}
                  type="button"
                  onClick={() => setActiveId(bin.id)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-muted/40 hover:bg-muted",
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{bin.name}</p>
                      <p className="text-xs font-medium" style={{ color }}>
                        {bin.type}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {bin.address}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
            {bins.length === 0 && (
              <p className="p-6 text-center text-sm text-muted-foreground">
                No bins match your search.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Map */}
      <Card className="overflow-hidden p-0">
        <div className="h-[420px] w-full lg:h-[560px]">
          <BinMap bins={bins} activeId={activeId} onSelect={setActiveId} />
        </div>
      </Card>
    </div>
  )
}

function FilterChip({
  label,
  color,
  active,
  onClick,
}: {
  label: string
  color?: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {color ? (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      ) : (
        <MapPin className="h-3 w-3" />
      )}
      {label}
    </button>
  )
}
