"use client"

import { useEffect, useState } from "react"

export function EventCard({ event, index }: { event: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInterested, setIsInterested] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), index * 100)
  }, [index])

  return (
    <div className={`transition-all duration-500 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"}`}>
      <div className="relative group h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary group-hover:via-accent group-hover:to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

        <div className="relative bg-card rounded-2xl border border-border overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
          <div
            className={`h-32 bg-gradient-to-br ${event.color} relative overflow-hidden flex items-center justify-center`}
          >
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{event.icon}</div>
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
              {event.date}
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>

            <div className="space-y-2 mb-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>{event.attendees} interested</span>
              </div>
            </div>

            {isExpanded && (
              <div className="mb-4 pb-4 border-t border-border pt-4 text-sm text-foreground/60">
                <p>Join us for an amazing event with great opportunities to meet new people and learn.</p>
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setIsInterested(!isInterested)}
                className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isInterested ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {isInterested ? "✓ Interested" : "Interested"}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-2 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                {isExpanded ? "−" : "+"}
              </button>
            </div>

            <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              Navigate to Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
