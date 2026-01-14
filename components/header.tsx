"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/navigate", label: "Navigate" },
  { href: "/explore", label: "Explore" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
  { href: "/report", label: "Report" },
  { href: "/profile", label: "Profile" },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">CC</span>
          </div>
          <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campus Companion
          </span>
        </Link>

        <nav className="hidden md:flex gap-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent animate-slide-up" />
              )}
            </Link>
          ))}
        </nav>

        <button className="md:hidden w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
