"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

/* ✅ Fix default marker icon issue */
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export function MapSection({ route }: { route: any }) {
  return (
    <div className="relative w-full h-96 md:h-full md:min-h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border overflow-hidden">

      {/* ✅ REAL MAP (replaces placeholder but keeps layout) */}
      <MapContainer
        center={[23.685, 86.983]} // 🔴 change to your campus coords
        zoom={17}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker position={[23.685, 86.983]}>
          <Popup>Main Campus</Popup>
        </Marker>
      </MapContainer>

      {/* ✅ ROUTE INFO BADGE (kept as-is) */}
      {route && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-primary">Route Found</div>
          <div className="text-xs text-foreground/60 mt-1">
            {route.from} to {route.to}
          </div>
        </div>
      )}
    </div>
  )
}
