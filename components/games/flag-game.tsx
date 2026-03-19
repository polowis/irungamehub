"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Flag, ArrowLeft, RotateCcw, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { flagsData } from "@/lib/game-data"

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function FlagGame() {
  const [flags, setFlags] = useState(flagsData)
  const [currentFlag, setCurrentFlag] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const totalFlags = 5
  const progress = ((currentFlag + 1) / totalFlags) * 100

  useEffect(() => {
    const shuffled = shuffleArray(flagsData)
    setFlags(shuffled)
    generateOptions(shuffled[0].country, shuffled)
  }, [])

  const generateOptions = (correctCountry: string, flagList: typeof flagsData) => {
    const otherCountries = flagList
      .filter((f) => f.country !== correctCountry)
      .map((f) => f.country)
    const shuffledOthers = shuffleArray(otherCountries).slice(0, 3)
    const allOptions = shuffleArray([correctCountry, ...shuffledOthers])
    setOptions(allOptions)
  }

  const handleAnswer = (country: string) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(country)
    setShowResult(true)

    if (country === flags[currentFlag].country) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentFlag < totalFlags - 1) {
        const nextFlag = currentFlag + 1
        setCurrentFlag(nextFlag)
        generateOptions(flags[nextFlag].country, flags)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 1500)
  }

  const resetGame = () => {
    const shuffled = shuffleArray(flagsData)
    setFlags(shuffled)
    setCurrentFlag(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
    generateOptions(shuffled[0].country, shuffled)
  }

  if (gameComplete) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20 mx-auto">
              <Flag className="h-10 w-10 text-orange-400" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Game Complete!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You identified <span className="font-bold text-orange-400">{score}</span> out of{" "}
              <span className="font-bold">{totalFlags}</span> flags correctly
            </p>
            <div className="mb-6 text-6xl">
              {score === totalFlags ? "🌍" : score >= totalFlags / 2 ? "🗺️" : "🧭"}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={resetGame} className="gap-2 bg-orange-500 hover:bg-orange-600">
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

  const flag = flags[currentFlag]

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
          <Flag className="h-5 w-5 text-orange-400" />
          <span className="font-semibold text-foreground">Flag Guesser</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Score: <span className="font-bold text-orange-400">{score}</span>
        </div>
      </div>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Flag {currentFlag + 1} of {totalFlags}</span>
          </div>
          <Progress value={progress} className="mb-6 h-2" />

          <div className="mb-8 flex justify-center">
            <div className="text-9xl">{flag.emoji}</div>
          </div>

          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
            Which country does this flag belong to?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {options.map((country) => {
              let buttonStyle = "border-border/50 bg-secondary/50 hover:bg-secondary hover:border-orange-500/50"
              
              if (showResult) {
                if (country === flag.country) {
                  buttonStyle = "border-green-500/50 bg-green-500/20 text-green-400"
                } else if (country === selectedAnswer && country !== flag.country) {
                  buttonStyle = "border-red-500/50 bg-red-500/20 text-red-400"
                }
              } else if (selectedAnswer === country) {
                buttonStyle = "border-orange-500 bg-orange-500/20 text-orange-400"
              }

              return (
                <button
                  key={country}
                  onClick={() => handleAnswer(country)}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all ${buttonStyle}`}
                >
                  <span>{country}</span>
                  {showResult && country === flag.country && (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  )}
                  {showResult && country === selectedAnswer && country !== flag.country && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
