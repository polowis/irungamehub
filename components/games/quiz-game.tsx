"use client"

import { useState } from "react"
import Link from "next/link"
import { Brain, ArrowLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizQuestions } from "@/lib/game-data"

export function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowResult(true)

    if (index === question.correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 1500)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mx-auto">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Quiz Complete!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You scored <span className="font-bold text-primary">{score}</span> out of{" "}
              <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="mb-6 text-6xl">
              {score === quizQuestions.length ? "🏆" : score >= quizQuestions.length / 2 ? "🎉" : "💪"}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={resetGame} className="gap-2">
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
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">General Quiz</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Score: <span className="font-bold text-primary">{score}</span>
        </div>
      </div>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          </div>
          <Progress value={progress} className="mb-6 h-2" />

          <h2 className="mb-6 text-xl font-semibold text-foreground">{question.question}</h2>

          <div className="grid gap-3">
            {question.options.map((option, index) => {
              let buttonStyle = "border-border/50 bg-secondary/50 hover:bg-secondary hover:border-primary/50"
              
              if (showResult) {
                if (index === question.correct) {
                  buttonStyle = "border-green-500/50 bg-green-500/20 text-green-400"
                } else if (index === selectedAnswer && index !== question.correct) {
                  buttonStyle = "border-red-500/50 bg-red-500/20 text-red-400"
                }
              } else if (selectedAnswer === index) {
                buttonStyle = "border-primary bg-primary/20 text-primary"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {showResult && index === question.correct && (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
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
