"use client"

import { useEffect, useState } from "react"

const announcements = [
  { title: "Makaut Calender", date: "Today", icon: "📢", file: "/docs/calender.jpeg" },
  { title: "Upcomming Holiday", date: "Jan 15", icon: "✨", file: "/docs/Holiday.pdf" },
  { title: "GDSC Hackathon", date: "Jan 20", icon: "🤖", file: "/docs/GDSC.png" },
  { title: "Sports Trails", date: "Jan 25", icon: "🏆", file: "/docs/Sports Trial.pdf" },
]

export function AnnouncementsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openPdf, setOpenPdf] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-foreground">
            Latest Announcements
          </h2>

          <div className="relative overflow-hidden rounded-2xl border">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {announcements.map((announcement, index) => (
                <button
                  key={index}
                  onClick={() => setOpenPdf(announcement.file)}
                  className="w-full flex-shrink-0 p-8 md:p-12 text-left bg-card hover:bg-muted transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="text-5xl">{announcement.icon}</div>

                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground">
                      {announcement.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {announcement.date}
                    </p>

                    <p className="text-sm text-primary mt-2">
                      Click to view document →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 mt-6 justify-center">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-border w-2 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 📄 PDF MODAL VIEWER */}
      {openPdf && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenPdf(null)}
              className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-4 py-1 rounded hover:opacity-90 transition"
            >
              Close
            </button>

            <iframe src={openPdf} className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  )
}
