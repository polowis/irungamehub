"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Grid3X3, ArrowLeft, RotateCcw, Star, Heart, Moon, Sun, Cloud, Zap, Flame, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MemoryCard {
  id: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

const iconComponents: Record<string, React.ReactNode> = {
  star: <Star className="h-8 w-8" />,
  heart: <Heart className="h-8 w-8" />,
  moon: <Moon className="h-8 w-8" />,
  sun: <Sun className="h-8 w-8" />,
  cloud: <Cloud className="h-8 w-8" />,
  bolt: <Zap className="h-8 w-8" />,
  fire: <Flame className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function createCards(): MemoryCard[] {
  const icons = ["star", "heart", "moon", "sun", "cloud", "bolt", "fire", "leaf"]
  const pairs = [...icons, ...icons]
  const shuffled = shuffleArray(pairs)
  return shuffled.map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false,
  }))
}

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>(createCards)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const totalPairs = 8

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true)
      const [first, second] = flippedCards
      
      if (cards[first].icon === cards[second].icon) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          )
          setMatchedPairs((prev) => {
            const newMatched = prev + 1
            if (newMatched === totalPairs) {
              setGameComplete(true)
            }
            return newMatched
          })
          setFlippedCards([])
          setIsChecking(false)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  const handleCardClick = (id: number) => {
    if (isChecking) return
    if (flippedCards.length === 2) return
    if (cards[id].isFlipped || cards[id].isMatched) return

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    )
    setFlippedCards((prev) => [...prev, id])
  }

  const resetGame = () => {
    setCards(createCards())
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setIsChecking(false)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 mx-auto">
              <Grid3X3 className="h-10 w-10 text-yellow-400" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Congratulations!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You found all pairs in <span className="font-bold text-yellow-400">{moves}</span> moves
            </p>
            <div className="mb-6 text-6xl">
              {moves <= 12 ? "🏆" : moves <= 18 ? "🎯" : "🧩"}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={resetGame} className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-background">
                <RotateCcw className="h-4 w-4" />
                Play Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Games
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-yellow-400" />
          <span className="font-semibold text-foreground">Memory Match</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Pairs: <span className="font-bold text-yellow-400">{matchedPairs}/{totalPairs}</span></span>
          <span>Moves: <span className="font-bold">{moves}</span></span>
        </div>
      </div>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || isChecking}
                className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
                  card.isMatched
                    ? "border-green-500/50 bg-green-500/20"
                    : card.isFlipped
                    ? "border-yellow-500/50 bg-yellow-500/20"
                    : "border-border/50 bg-secondary hover:border-yellow-500/30 hover:bg-secondary/80"
                }`}
              >
                <div
                  className={`flex h-full w-full items-center justify-center transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                >
                  <div className={card.isMatched ? "text-green-400" : "text-yellow-400"}>
                    {iconComponents[card.icon]}
                  </div>
                </div>
                {!card.isFlipped && !card.isMatched && (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <span className="text-2xl">?</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button variant="outline" onClick={resetGame} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset Game
        </Button>
      </div>
    </div>
  )
}
