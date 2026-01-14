"use client"

import { useEffect, useState } from "react"

export function RouteInfo({ route }: { route: any }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (route) {
      setIsVisible(true)
    }
  }, [route])

  if (!route) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-foreground/60 text-sm">Select a route to see directions</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-card rounded-2xl p-6 border border-border transition-all duration-500 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
    >
      <h3 className="font-bold mb-4">Route Details</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-foreground/60">From</p>
            <p className="font-semibold">{route.from}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-accent" />
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-foreground/60">To</p>
            <p className="font-semibold">{route.to}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Distance</span>
            <span className="font-semibold">{route.distance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Estimated Time</span>
            <span className="font-semibold">{route.eta}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Steps</span>
            <span className="font-semibold">{route.steps}</span>
          </div>
        </div>

        <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
          Start Navigation
        </button>
      </div>
    </div>
  )
}
