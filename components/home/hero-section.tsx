"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-24 pb-32 min-h-[90vh] flex items-center">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/college.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ✨ Glow Effects (optional – your existing ones) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight text-white">
              Everything You Need,
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Right Inside Your Campus
              </span>
            </h1>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Navigate your campus, discover amazing places, connect with events, and stay informed. Your ultimate
              college companion.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center pt-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/navigate"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              Navigate Campus
            </Link>

            <Link
              href="/explore"
              className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Explore Nearby
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
