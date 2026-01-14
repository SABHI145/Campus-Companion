"use client"

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
          selectedCategory === null
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
            : "bg-card border border-border text-foreground/70 hover:border-primary/50"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
            selectedCategory === category
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
              : "bg-card border border-border text-foreground/70 hover:border-primary/50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
