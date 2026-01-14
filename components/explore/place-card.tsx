"use client"

import { useEffect, useState } from "react"

export function PlaceCard({ place, index }: { place: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showRating, setShowRating] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), index * 100)
  }, [index])

  return (
    <div
      className={`group transition-all duration-500 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-lg hover:shadow-primary/20">
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
          <div className={`text-6xl transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
            {place.image === "Cafe"
              ? "☕"
              : place.image === "Print"
                ? "🖨️"
                : place.image === "Books"
                  ? "📚"
                  : place.image === "Medical"
                    ? "⚕️"
                    : place.image === "Hostel"
                      ? "🏠"
                      : "🍕"}
          </div>
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
            {place.distance}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-1">{place.name}</h3>
          <p className="text-sm text-foreground/60 mb-3 flex-1">{place.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">{place.rating}</span>
            </div>
            <button
              onClick={() => setShowRating(!showRating)}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Rate
            </button>
          </div>

          {showRating && (
            <div className="flex gap-1 mb-3 pb-3 border-t border-border pt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-lg hover:scale-110 transition-transform">
                  ★
                </button>
              ))}
            </div>
          )}

          <button className="w-full px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
