"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, RotateCcw, Trophy, X, Lightbulb, ArrowRight } from "lucide-react"
import { locationEmojiData } from "@/lib/game-data"

interface LocationRound {
  location: string
  emojis: string
  hint: string
  revealedIndex: number
}

function generateRound(): LocationRound {
  const randomLocation = locationEmojiData[Math.floor(Math.random() * locationEmojiData.length)]
  const revealedIndex = Math.floor(Math.random() * randomLocation.location.length)
  return {
    ...randomLocation,
    revealedIndex,
  }
}

export function LocationEmojiGame() {
  const [round, setRound] = useState<LocationRound | null>(null)
  const [userInput, setUserInput] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const initRound = useCallback(() => {
    const newRound = generateRound()
    setRound(newRound)
    setUserInput(new Array(newRound.location.length).fill(""))
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
    inputRefs.current = new Array(newRound.location.length).fill(null)
  }, [])

  useEffect(() => {
    initRound()
  }, [initRound])

  const handleInputChange = (index: number, value: string) => {
    if (!round || index === round.revealedIndex) return

    const newValue = value.toUpperCase().slice(-1)
    const newInput = [...userInput]
    newInput[index] = newValue
    setUserInput(newInput)

    // Auto-focus next empty input
    if (newValue) {
      const nextIndex = newInput.findIndex((v, i) => i > index && i !== round.revealedIndex && !v)
      if (nextIndex !== -1 && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!round) return

    if (e.key === "Backspace" && !userInput[index]) {
      // Find previous editable input
      for (let i = index - 1; i >= 0; i--) {
        if (i !== round.revealedIndex) {
          inputRefs.current[i]?.focus()
          break
        }
      }
    } else if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (!round) return

    // Build the user's answer
    const userAnswer = userInput
      .map((char, idx) => (idx === round.revealedIndex ? round.location[idx] : char))
      .join("")
      .toUpperCase()

    const correct = userAnswer === round.location.toUpperCase()
    setIsCorrect(correct)
    setShowResult(true)
    setTotalRounds((prev) => prev + 1)

    if (correct) {
      setScore((prev) => prev + 1)
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }

    if (totalRounds >= 9) {
      setGameOver(true)
    }
  }

  const handleNextRound = () => {
    if (totalRounds >= 10) {
      setGameOver(true)
    } else {
      initRound()
    }
  }

  const handlePlayAgain = () => {
    setScore(0)
    setTotalRounds(0)
    setGameOver(false)
    setStreak(0)
    initRound()
  }

  if (!round) {
    return <div className="text-center py-8">Loading...</div>
  }

  const filledCount = userInput.filter((v, i) => v || i === round.revealedIndex).length
  const totalInputs = round.location.length

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-2xl">Location Guesser</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              Round {totalRounds + 1}/10
            </Badge>
            <Badge variant="default">
              Score: {score}
            </Badge>
            {streak >= 2 && (
              <Badge className="bg-orange-500 text-white">
                {streak} Streak
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {gameOver ? (
          <div className="text-center py-8 space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold">
              {score >= 8 ? "Amazing!" : score >= 5 ? "Great Job!" : "Good Try!"}
            </h2>
            <p className="text-4xl font-bold text-primary">
              {score}/10
            </p>
            <p className="text-muted-foreground">
              You correctly guessed {score} out of 10 locations!
            </p>
            <Button onClick={handlePlayAgain} size="lg" className="mt-4">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            {/* Emoji display */}
            <div className="text-center py-8 bg-muted/30 rounded-xl">
              <div className="text-6xl sm:text-7xl mb-4">{round.emojis}</div>
              <p className="text-sm text-muted-foreground">
                Guess the location based on these emojis!
              </p>
            </div>

            {/* Hint button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? round.hint : "Show Hint"}
              </Button>
            </div>

            {/* Letter input grid */}
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Fill in the missing letters. One letter is revealed for you!
              </p>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {round.location.split("").map((char, index) => {
                  const isRevealed = index === round.revealedIndex
                  const isSpace = char === " "

                  if (isSpace) {
                    return <div key={index} className="w-4" />
                  }

                  return (
                    <div key={index} className="relative">
                      <Input
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        value={isRevealed ? char.toUpperCase() : userInput[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={isRevealed || showResult}
                        maxLength={1}
                        className={`w-10 h-12 text-center text-xl font-bold uppercase ${
                          isRevealed
                            ? "bg-primary/20 border-primary text-primary cursor-default"
                            : showResult
                            ? userInput[index].toUpperCase() === char.toUpperCase()
                              ? "bg-green-600/20 border-green-600 text-green-400"
                              : "bg-destructive/20 border-destructive text-destructive"
                            : ""
                        }`}
                      />
                      {isRevealed && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-primary-foreground font-bold">!</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {filledCount}/{totalInputs} letters filled
              </p>
            </div>

            {/* Result message */}
            {showResult && (
              <div
                className={`text-center p-4 rounded-lg ${
                  isCorrect ? "bg-green-600/20" : "bg-destructive/20"
                }`}
              >
                {isCorrect ? (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">Correct!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-destructive">
                      <X className="w-5 h-5" />
                      <span className="font-bold">Not quite!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The answer was <span className="text-primary font-semibold">{round.location}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-center gap-3">
              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={filledCount < totalInputs}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextRound} size="lg">
                  {totalRounds >= 9 ? "See Results" : "Next Location"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
