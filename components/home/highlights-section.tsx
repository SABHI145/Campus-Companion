"use client"

import { useEffect, useRef, useState } from "react"

const highlights = [
  { icon: "🏆", label: "Top Ranked", value: "#1 in Excellence" },
  { icon: "✅", label: "Accredited", value: "Globally Certified" },
  { icon: "🎓", label: "Achievement", value: "95% Success Rate" },
  { icon: "💼", label: "Placements", value: "1000+ Offers/Year" },
]

export function HighlightsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = ref.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h2>
        <div ref={ref} className="grid md:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 ${
                visibleItems.includes(index) ? "animate-slide-up" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <p className="text-sm text-foreground/60 mb-2">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
