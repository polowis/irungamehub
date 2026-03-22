"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, RotateCcw, Trophy, X, Lightbulb, HelpCircle } from "lucide-react"
import { wordRevealPassages } from "@/lib/game-data"

const TOTAL_HINTS = 5

export function WordRevealGame() {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set())
  const [hintsRemaining, setHintsRemaining] = useState(TOTAL_HINTS)
  const [guess, setGuess] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const currentPassage = wordRevealPassages[currentPassageIndex]
  const maskedKeys = Object.keys(currentPassage.maskedWords)

  const initGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordRevealPassages.length)
    setCurrentPassageIndex(randomIndex)
    setRevealedWords(new Set())
    setHintsRemaining(TOTAL_HINTS)
    setGuess("")
    setGameOver(false)
    setWon(false)
    setShowCategory(false)
    setAttempts(0)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  const handleRevealWord = (key: string) => {
    if (hintsRemaining <= 0 || revealedWords.has(key)) return
    setRevealedWords((prev) => new Set([...prev, key]))
    setHintsRemaining((prev) => prev - 1)
  }

  const handleSubmitGuess = () => {
    if (!guess.trim()) return
    setAttempts((prev) => prev + 1)

    const normalizedGuess = guess.toLowerCase().trim()
    const normalizedTopic = currentPassage.topic.toLowerCase()

    if (normalizedGuess === normalizedTopic || normalizedTopic.includes(normalizedGuess)) {
      setGameOver(true)
      setWon(true)
    } else if (attempts >= 2) {
      setGameOver(true)
      setWon(false)
    }
    setGuess("")
  }

  const renderPassage = () => {
    let passage = currentPassage.passage
    maskedKeys.forEach((key) => {
      const word = currentPassage.maskedWords[key as keyof typeof currentPassage.maskedWords]
      const isRevealed = revealedWords.has(key)
      const replacement = isRevealed
        ? `<span class="text-green-400 font-semibold">${word}</span>`
        : `<button data-key="${key}" class="masked-word inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer border border-border transition-colors">${hintsRemaining > 0 ? '<span class="text-xs">?</span>' : '???'}</button>`
      passage = passage.replace(`[${key}]`, replacement)
    })
    return passage
  }

  const handlePassageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.classList.contains("masked-word") || target.parentElement?.classList.contains("masked-word")) {
      const button = target.classList.contains("masked-word") ? target : target.parentElement
      const key = button?.getAttribute("data-key")
      if (key) {
        handleRevealWord(key)
      }
    }
  }

  const revealedCount = revealedWords.size
  const totalMasked = maskedKeys.length

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-primary" />
            <span className="text-2xl">Word Reveal</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              {hintsRemaining} Hints
            </Badge>
            <Badge variant="outline">
              {revealedCount}/{totalMasked} Revealed
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {gameOver ? (
          <div className="text-center py-8 space-y-4">
            {won ? (
              <>
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold text-green-400">Correct!</h2>
                <p className="text-muted-foreground">
                  The answer was <span className="text-primary font-semibold">{currentPassage.topic}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  You used {TOTAL_HINTS - hintsRemaining} hints and {attempts} {attempts === 1 ? "attempt" : "attempts"}
                </p>
              </>
            ) : (
              <>
                <X className="w-16 h-16 mx-auto text-destructive" />
                <h2 className="text-2xl font-bold text-destructive">Game Over</h2>
                <p className="text-muted-foreground">
                  The correct answer was <span className="text-primary font-semibold">{currentPassage.topic}</span>
                </p>
              </>
            )}
            <Button onClick={initGame} className="mt-4">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            {/* Category hint */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCategory(!showCategory)}
                className="text-xs"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                {showCategory ? "Hide" : "Show"} Category
              </Button>
              {showCategory && (
                <Badge variant="secondary">{currentPassage.category}</Badge>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  Read the passage below. Click on masked words (shown as <span className="bg-muted px-1 rounded">?</span>) to reveal them using your hints.
                  You have {hintsRemaining} hints remaining and 3 guesses to identify the topic.
                </span>
              </p>
            </div>

            {/* Passage */}
            <div
              className="bg-card border rounded-lg p-6 text-lg leading-relaxed"
              onClick={handlePassageClick}
              dangerouslySetInnerHTML={{ __html: renderPassage() }}
            />

            {/* Guess input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Attempts remaining: {3 - attempts}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your guess for the topic..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitGuess()}
                  className="flex-1"
                />
                <Button onClick={handleSubmitGuess} disabled={!guess.trim()}>
                  Submit Guess
                </Button>
              </div>
              {attempts > 0 && !gameOver && (
                <p className="text-sm text-destructive">
                  Incorrect! Try again. ({3 - attempts} attempts left)
                </p>
              )}
            </div>

            {/* Word reveal status */}
            <div className="flex flex-wrap gap-2">
              {maskedKeys.map((key) => {
                const isRevealed = revealedWords.has(key)
                return (
                  <Button
                    key={key}
                    variant={isRevealed ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRevealWord(key)}
                    disabled={isRevealed || hintsRemaining <= 0}
                    className={`text-xs ${isRevealed ? "bg-green-600 hover:bg-green-700" : ""}`}
                  >
                    {isRevealed ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        {currentPassage.maskedWords[key as keyof typeof currentPassage.maskedWords]}
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Word {key.replace("MASKED", "")}
                      </>
                    )}
                  </Button>
                )
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
