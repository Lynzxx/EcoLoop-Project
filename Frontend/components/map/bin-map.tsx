"use client"

import { useMemo } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { BIN_TYPE_META, type RecyclingBin } from "@/lib/recycling-data"

interface BinMapProps {
  bins: RecyclingBin[]
  activeId: string | null
  onSelect: (id: string) => void
}

const SINGAPORE_CENTER: [number, number] = [1.3521, 103.8198]

export default function BinMap({ bins, activeId, onSelect }: BinMapProps) {
  // recompute marker styles when active changes
  const markers = useMemo(() => bins, [bins])

  return (
    <MapContainer
      center={SINGAPORE_CENTER}
      zoom={11}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "var(--muted)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {markers.map((bin) => {
        const color = BIN_TYPE_META[bin.type].color
        const active = bin.id === activeId
        return (
          <CircleMarker
            key={bin.id}
            center={[bin.lat, bin.lng]}
            radius={active ? 12 : 8}
            pathOptions={{
              color: "#ffffff",
              weight: active ? 3 : 2,
              fillColor: color,
              fillOpacity: active ? 1 : 0.85,
            }}
            eventHandlers={{ click: () => onSelect(bin.id) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              {bin.name}
            </Tooltip>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong>{bin.name}</strong>
                <div style={{ color, fontWeight: 600, fontSize: 12, marginTop: 2 }}>
                  {bin.type}
                </div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{bin.address}</div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
