"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Type, ArrowLeft, RotateCcw, Lightbulb, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { wordList } from "@/lib/game-data"

function shuffleString(str: string): string {
  const arr = str.split("")
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join("")
}

export function WordGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [scrambledWord, setScrambledWord] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [revealedLetters, setRevealedLetters] = useState<number[]>([])
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [gameComplete, setGameComplete] = useState(false)

  const currentWord = wordList[currentWordIndex]
  const totalWords = 5

  useEffect(() => {
    setScrambledWord(shuffleString(currentWord))
  }, [currentWord])

  const handleSubmit = useCallback(() => {
    if (userAnswer.toUpperCase() === currentWord) {
      setScore((prev) => prev + Math.max(10 - hintsUsed * 2, 2))
      setFeedback("correct")
      
      setTimeout(() => {
        setFeedback(null)
        if (currentWordIndex < totalWords - 1) {
          setCurrentWordIndex((prev) => prev + 1)
          setUserAnswer("")
          setHintsUsed(0)
          setRevealedLetters([])
        } else {
          setGameComplete(true)
        }
      }, 1000)
    } else {
      setFeedback("wrong")
      setTimeout(() => setFeedback(null), 500)
    }
  }, [userAnswer, currentWord, currentWordIndex, hintsUsed])

  const handleHint = () => {
    const unrevealed = currentWord
      .split("")
      .map((_, i) => i)
      .filter((i) => !revealedLetters.includes(i))
    
    if (unrevealed.length > 0) {
      const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)]
      setRevealedLetters([...revealedLetters, randomIndex])
      setHintsUsed((prev) => prev + 1)
    }
  }

  const handleReshuffle = () => {
    setScrambledWord(shuffleString(currentWord))
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setScrambledWord(shuffleString(wordList[0]))
    setUserAnswer("")
    setScore(0)
    setHintsUsed(0)
    setRevealedLetters([])
    setFeedback(null)
    setGameComplete(false)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit()
      }
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [handleSubmit])

  if (gameComplete) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mx-auto">
              <Type className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Word Scramble Complete!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You scored <span className="font-bold text-green-400">{score}</span> points
            </p>
            <div className="mb-6 text-6xl">
              {score >= 40 ? "📚" : score >= 25 ? "✍️" : "🔤"}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={resetGame} className="gap-2 bg-green-500 hover:bg-green-600">
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
          <Type className="h-5 w-5 text-green-400" />
          <span className="font-semibold text-foreground">Word Scramble</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Score: <span className="font-bold text-green-400">{score}</span>
        </div>
      </div>

      <Card className={`border-border/50 bg-card transition-all ${
        feedback === "correct" ? "border-green-500/50 bg-green-500/5" : 
        feedback === "wrong" ? "border-red-500/50 bg-red-500/5" : ""
      }`}>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Word {currentWordIndex + 1} of {totalWords}</span>
            <span>Hints: {hintsUsed}</span>
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {scrambledWord.split("").map((letter, i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-xl font-bold text-foreground"
              >
                {letter}
              </div>
            ))}
          </div>

          {revealedLetters.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {currentWord.split("").map((letter, i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-lg font-bold ${
                    revealedLetters.includes(i)
                      ? "border-green-500/50 bg-green-500/20 text-green-400"
                      : "border-border/50 bg-muted text-muted-foreground"
                  }`}
                >
                  {revealedLetters.includes(i) ? letter : "?"}
                </div>
              ))}
            </div>
          )}

          <div className="mb-4 flex gap-3">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
              placeholder="Type the word"
              className="flex-1 text-center text-xl font-bold uppercase h-12"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleHint}
              className="flex-1 gap-2"
              disabled={revealedLetters.length >= currentWord.length - 1}
            >
              <Lightbulb className="h-4 w-4" />
              Hint
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReshuffle}
              className="flex-1 gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Reshuffle
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
