"use client"

import { GeminiChat } from "@/components/gemini-chat"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { HighlightsSection } from "@/components/home/highlights-section"
import { AnnouncementsSection } from "@/components/home/announcements-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <HighlightsSection />
        <AnnouncementsSection />
      </main>
      <Footer />
      {/* AI Assistant */}
      <GeminiChat />
    </>
  )
}

<GeminiChat />
