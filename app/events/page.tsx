"use client"

import { Header } from "@/components/header"
import { EventCard } from "@/components/events/event-card"
import { Footer } from "@/components/footer"

const events = [
  {
    id: 1,
    title: "Welcome to Campus",
    date: "Jan 15",
    time: "10:00 AM",
    location: "Main Auditorium",
    attendees: 250,
    icon: "🎓",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Annual Fest 2025",
    date: "Jan 20",
    time: "4:00 PM",
    location: "Campus Grounds",
    attendees: 1200,
    icon: "🎉",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Scholarship Program",
    date: "Jan 25",
    time: "2:00 PM",
    location: "Admin Building",
    attendees: 150,
    icon: "💰",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Sports Day",
    date: "Feb 1",
    time: "8:00 AM",
    location: "Sports Complex",
    attendees: 800,
    icon: "🏃",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Tech Showcase",
    date: "Feb 5",
    time: "11:00 AM",
    location: "Innovation Lab",
    attendees: 300,
    icon: "💻",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    title: "Cultural Night",
    date: "Feb 10",
    time: "7:00 PM",
    location: "Auditorium",
    attendees: 600,
    icon: "🎭",
    color: "from-rose-500 to-pink-500",
  },
]

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Campus Events</h1>
            <p className="text-foreground/60">Discover exciting events happening on campus</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
