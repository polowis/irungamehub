"use client"

import { useState } from "react"
import { games, categories } from "@/lib/game-data"
import { GameCard } from "./game-card"
import { Button } from "@/components/ui/button"

export function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGames = selectedCategory === "All" 
    ? games 
    : games.filter(game => game.category === selectedCategory)

  return (
    <section id="games" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Choose Your Game
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pick from our collection of games designed to challenge and entertain you
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "border-border/50 hover:border-primary/50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Games grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}
