"use client"

import { Header } from "@/components/header"
import { CategoryFilter } from "@/components/explore/category-filter"
import { PlaceCard } from "@/components/explore/place-card"
import { Footer } from "@/components/footer"
import { useState } from "react"

const places = [
  {
    id: 1,
    name: "Campus Cafe",
    category: "Food",
    rating: 4.5,
    distance: "0.2 km",
    image: "Cafe",
    description: "Best coffee and snacks on campus",
  },
  {
    id: 2,
    name: "Print Center",
    category: "Print/Xerox",
    rating: 4.2,
    distance: "0.4 km",
    image: "Print",
    description: "Fast printing and copying services",
  },
  {
    id: 3,
    name: "Book Store",
    category: "Books & Stationery",
    rating: 4.7,
    distance: "0.3 km",
    image: "Books",
    description: "Wide selection of books and supplies",
  },
  {
    id: 4,
    name: "Health Center",
    category: "Medical",
    rating: 4.6,
    distance: "0.5 km",
    image: "Medical",
    description: "24/7 medical services and consultation",
  },
  {
    id: 5,
    name: "Royal Hostel",
    category: "Hostels / PGs",
    rating: 4.3,
    distance: "1.2 km",
    image: "Hostel",
    description: "Clean and comfortable accommodation",
  },
  {
    id: 6,
    name: "Pizza House",
    category: "Food",
    rating: 4.4,
    distance: "0.6 km",
    image: "Food",
    description: "Delicious pizzas and Italian cuisine",
  },
]

const categories = ["Food", "Print/Xerox", "Books & Stationery", "Medical", "Hostels / PGs"]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPlaces = selectedCategory ? places.filter((place) => place.category === selectedCategory) : places

  return (
    <>
      <Header />
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Explore Nearby</h1>
            <p className="text-foreground/60">Discover amazing places around your campus</p>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
