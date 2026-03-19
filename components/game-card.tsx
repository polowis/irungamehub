"use client"

import Link from "next/link"
import { Brain, Flag, Trophy, Calculator, Type, Grid3X3, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/lib/game-data"

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="h-8 w-8" />,
  flag: <Flag className="h-8 w-8" />,
  trophy: <Trophy className="h-8 w-8" />,
  calculator: <Calculator className="h-8 w-8" />,
  text: <Type className="h-8 w-8" />,
  grid: <Grid3X3 className="h-8 w-8" />,
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-5 transition-opacity group-hover:opacity-10`} />
        <CardContent className="relative flex h-full flex-col p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${game.color} text-background`}>
              {iconMap[game.icon]}
            </div>
            <Badge variant="outline" className={difficultyColors[game.difficulty]}>
              {game.difficulty}
            </Badge>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
            {game.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{game.playTime}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Play Now
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
