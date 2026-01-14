"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import dynamic from "next/dynamic"

const MapSection = dynamic(
  () => import("@/components/navigate/map-section").then((m) => m.MapSection),
  { ssr: false }
)
import { SearchBar } from "@/components/navigate/search-bar"
import { RouteInfo } from "@/components/navigate/route-info"
import { Footer } from "@/components/footer"
import { useState } from "react"

function NavigateContent() {
  const [selectedRoute, setSelectedRoute] = useState(null)

  return (
    <main className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Campus Navigation</h1>
          <p className="text-foreground/60">Find your way around campus with ease</p>
        </div>

        <SearchBar onRouteSelect={setSelectedRoute} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <MapSection route={selectedRoute} />
          </div>
          <div className="lg:col-span-1">
            <RouteInfo route={selectedRoute} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default function NavigatePage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <NavigateContent />
      </Suspense>
      <Footer />
    </>
  )
}
