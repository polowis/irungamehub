"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Calculator, ArrowLeft, RotateCcw, Timer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface Problem {
  num1: number
  num2: number
  operator: "+" | "-" | "×"
  answer: number
}

function generateProblem(): Problem {
  const operators: ("+" | "-" | "×")[] = ["+", "-", "×"]
  const operator = operators[Math.floor(Math.random() * operators.length)]
  
  let num1: number, num2: number, answer: number
  
  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 50) + 1
      num2 = Math.floor(Math.random() * 50) + 1
      answer = num1 + num2
      break
    case "-":
      num1 = Math.floor(Math.random() * 50) + 20
      num2 = Math.floor(Math.random() * 20) + 1
      answer = num1 - num2
      break
    case "×":
      num1 = Math.floor(Math.random() * 12) + 1
      num2 = Math.floor(Math.random() * 12) + 1
      answer = num1 * num2
      break
  }

  return { num1, num2, operator, answer }
}

export function MathGame() {
  const [problem, setProblem] = useState<Problem>(generateProblem)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

  const startGame = () => {
    setGameActive(true)
    setGameComplete(false)
    setScore(0)
    setTimeLeft(60)
    setProblem(generateProblem())
    setUserAnswer("")
  }

  const handleSubmit = useCallback(() => {
    if (!gameActive || userAnswer === "") return

    const numAnswer = parseInt(userAnswer)
    if (numAnswer === problem.answer) {
      setScore((prev) => prev + 1)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }

    setTimeout(() => {
      setFeedback(null)
      setProblem(generateProblem())
      setUserAnswer("")
    }, 300)
  }, [gameActive, userAnswer, problem.answer])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          setGameComplete(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

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
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 mx-auto">
              <Calculator className="h-10 w-10 text-blue-400" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Time&apos;s Up!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You solved <span className="font-bold text-blue-400">{score}</span> problems in 60 seconds
            </p>
            <div className="mb-6 text-6xl">
              {score >= 20 ? "🧠" : score >= 10 ? "📊" : "➕"}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={startGame} className="gap-2 bg-blue-500 hover:bg-blue-600">
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

  if (!gameActive) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 mx-auto">
              <Calculator className="h-10 w-10 text-blue-400" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Math Sprint</h2>
            <p className="mb-6 text-muted-foreground">
              Solve as many math problems as you can in 60 seconds!
            </p>
            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <p>• Addition, subtraction, and multiplication</p>
              <p>• Type your answer and press Enter</p>
              <p>• Be fast and accurate!</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={startGame} className="gap-2 bg-blue-500 hover:bg-blue-600">
                <Zap className="h-4 w-4" />
                Start Game
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
          <Calculator className="h-5 w-5 text-blue-400" />
          <span className="font-semibold text-foreground">Math Sprint</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-400" : "text-foreground"}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Score: <span className="font-bold text-blue-400">{score}</span>
          </div>
        </div>
      </div>

      <Card className={`border-border/50 bg-card transition-all ${
        feedback === "correct" ? "border-green-500/50" : 
        feedback === "wrong" ? "border-red-500/50" : ""
      }`}>
        <CardContent className="p-6">
          <Progress value={(timeLeft / 60) * 100} className="mb-6 h-2" />

          <div className="mb-8 text-center">
            <div className="text-5xl font-bold text-foreground sm:text-6xl">
              {problem.num1} {problem.operator} {problem.num2} = ?
            </div>
          </div>

          <div className="flex gap-3">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="flex-1 text-center text-2xl font-bold h-14"
              autoFocus
            />
            <Button 
              onClick={handleSubmit}
              className="h-14 px-8 bg-blue-500 hover:bg-blue-600"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
