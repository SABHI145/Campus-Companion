"use client"

import { useState } from "react"

const locations = [
  "Library",
  "Cafeteria",
  "Sports Complex",
  "Science Lab",
  "Admin Building",
  "Auditorium",
  "Dormitory A",
  "Health Center",
]

export function SearchBar({ onRouteSelect }: { onRouteSelect: (route: any) => void }) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const handleSearch = () => {
    if (from && to) {
      onRouteSelect({
        from,
        to,
        distance: "0.8 km",
        eta: "12 mins",
        steps: 4,
      })
    }
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="text-sm font-semibold text-foreground/60 mb-2 block">From</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Starting point"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setFromOpen(true)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {fromOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {locations
                  .filter((loc) => loc.toLowerCase().includes(from.toLowerCase()))
                  .map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setFrom(loc)
                        setFromOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-semibold text-foreground/60 mb-2 block">To</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setToOpen(true)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {toOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {locations
                  .filter((loc) => loc.toLowerCase().includes(to.toLowerCase()))
                  .map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setTo(loc)
                        setToOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={handleSearch}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
        >
          Find Route
        </button>
        <button className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
            />
          </svg>
          Voice
        </button>
      </div>
    </div>
  )
}
