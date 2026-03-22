import { notFound } from "next/navigation"
import { games } from "@/lib/game-data"
import { QuizGame } from "@/components/games/quiz-game"
import { FlagGame } from "@/components/games/flag-game"
import { TriviaGame } from "@/components/games/trivia-game"
import { MathGame } from "@/components/games/math-game"
import { WordGame } from "@/components/games/word-game"
import { MemoryGame } from "@/components/games/memory-game"
import { QuordleGame } from "@/components/games/quordle-game"
import { WordRevealGame } from "@/components/games/word-reveal-game"
import { LocationEmojiGame } from "@/components/games/location-emoji-game"

interface GamePageProps {
  params: Promise<{ id: string }>
}

const gameComponents: Record<string, React.ComponentType> = {
  quiz: QuizGame,
  flags: FlagGame,
  trivia: TriviaGame,
  math: MathGame,
  word: WordGame,
  memory: MemoryGame,
  quordle: QuordleGame,
  "word-reveal": WordRevealGame,
  "location-emoji": LocationEmojiGame,
}

export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }))
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  const game = games.find((g) => g.id === id)

  if (!game) {
    notFound()
  }

  const GameComponent = gameComponents[id]

  if (!GameComponent) {
    notFound()
  }

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <GameComponent />
      </div>
    </main>
  )
}
