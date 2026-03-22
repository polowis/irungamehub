"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Delete, RotateCcw, Trophy, X } from "lucide-react"
import { quordleWords } from "@/lib/game-data"

const MAX_ATTEMPTS = 9

type LetterStatus = "correct" | "present" | "absent" | "empty"

interface LetterCell {
  letter: string
  status: LetterStatus
}

function getRandomWords(): string[] {
  const shuffled = [...quordleWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 4)
}

function checkGuess(guess: string, target: string): LetterCell[] {
  const result: LetterCell[] = []
  const targetLetters = target.split("")
  const guessLetters = guess.split("")
  const used = new Array(5).fill(false)

  // First pass: mark correct letters
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = { letter: guessLetters[i], status: "correct" }
      used[i] = true
    }
  }

  // Second pass: mark present/absent letters
  for (let i = 0; i < 5; i++) {
    if (result[i]) continue

    const letterIndex = targetLetters.findIndex(
      (l, idx) => l === guessLetters[i] && !used[idx]
    )

    if (letterIndex !== -1) {
      result[i] = { letter: guessLetters[i], status: "present" }
      used[letterIndex] = true
    } else {
      result[i] = { letter: guessLetters[i], status: "absent" }
    }
  }

  return result
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
]

export function QuordleGame() {
  const [targetWords, setTargetWords] = useState<string[]>([])
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [solvedBoards, setSolvedBoards] = useState<boolean[]>([false, false, false, false])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, LetterStatus>>({})

  const initGame = useCallback(() => {
    setTargetWords(getRandomWords())
    setGuesses([])
    setCurrentGuess("")
    setSolvedBoards([false, false, false, false])
    setGameOver(false)
    setWon(false)
    setKeyboardStatus({})
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameOver) return

      if (key === "DEL" || key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (key === "ENTER") {
        if (currentGuess.length === 5) {
          const newGuesses = [...guesses, currentGuess]
          setGuesses(newGuesses)

          // Update keyboard status
          const newKeyboardStatus = { ...keyboardStatus }
          targetWords.forEach((target, boardIndex) => {
            if (solvedBoards[boardIndex]) return
            const result = checkGuess(currentGuess, target)
            result.forEach((cell) => {
              const current = newKeyboardStatus[cell.letter]
              if (cell.status === "correct") {
                newKeyboardStatus[cell.letter] = "correct"
              } else if (cell.status === "present" && current !== "correct") {
                newKeyboardStatus[cell.letter] = "present"
              } else if (!current) {
                newKeyboardStatus[cell.letter] = cell.status
              }
            })
          })
          setKeyboardStatus(newKeyboardStatus)

          // Check for solved boards
          const newSolvedBoards = [...solvedBoards]
          targetWords.forEach((target, idx) => {
            if (currentGuess === target) {
              newSolvedBoards[idx] = true
            }
          })
          setSolvedBoards(newSolvedBoards)

          // Check game over conditions
          if (newSolvedBoards.every((s) => s)) {
            setGameOver(true)
            setWon(true)
          } else if (newGuesses.length >= MAX_ATTEMPTS) {
            setGameOver(true)
            setWon(false)
          }

          setCurrentGuess("")
        }
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      }
    },
    [currentGuess, gameOver, guesses, keyboardStatus, solvedBoards, targetWords]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      handleKeyPress(key)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyPress])

  const getLetterStyle = (status: LetterStatus) => {
    switch (status) {
      case "correct":
        return "bg-green-600 text-white border-green-600"
      case "present":
        return "bg-yellow-600 text-white border-yellow-600"
      case "absent":
        return "bg-muted text-muted-foreground border-muted"
      default:
        return "bg-card border-border"
    }
  }

  const renderBoard = (boardIndex: number) => {
    const target = targetWords[boardIndex]
    const isSolved = solvedBoards[boardIndex]
    const solvedAtGuess = isSolved ? guesses.findIndex((g) => g === target) + 1 : null

    return (
      <div className={`p-2 rounded-lg ${isSolved ? "bg-green-900/20" : "bg-card"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Board {boardIndex + 1}</span>
          {isSolved && (
            <Badge variant="outline" className="text-xs bg-green-600/20 text-green-400 border-green-600">
              Solved in {solvedAtGuess}
            </Badge>
          )}
        </div>
        <div className="grid gap-0.5">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
            const guess = guesses[rowIndex]
            const isCurrentRow = rowIndex === guesses.length && !isSolved
            const cells = guess
              ? checkGuess(guess, target)
              : isCurrentRow
              ? currentGuess.padEnd(5, " ").split("").map((l) => ({ letter: l.trim(), status: "empty" as LetterStatus }))
              : Array(5).fill({ letter: "", status: "empty" as LetterStatus })

            // Skip rendering rows after board is solved
            if (isSolved && rowIndex > guesses.findIndex((g) => g === target)) {
              return null
            }

            return (
              <div key={rowIndex} className="flex gap-0.5">
                {cells.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold border rounded ${getLetterStyle(
                      cell.status
                    )} ${isCurrentRow && cellIndex === currentGuess.length ? "border-primary" : ""}`}
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const solvedCount = solvedBoards.filter(Boolean).length

  if (targetWords.length === 0) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">Quordle</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {solvedCount}/4 Solved
            </Badge>
            <Badge variant="outline">
              {guesses.length}/{MAX_ATTEMPTS} Guesses
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {gameOver ? (
          <div className="text-center py-8 space-y-4">
            {won ? (
              <>
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold text-green-400">Congratulations!</h2>
                <p className="text-muted-foreground">
                  You solved all 4 words in {guesses.length} guesses!
                </p>
              </>
            ) : (
              <>
                <X className="w-16 h-16 mx-auto text-destructive" />
                <h2 className="text-2xl font-bold text-destructive">Game Over</h2>
                <p className="text-muted-foreground">
                  You solved {solvedCount}/4 words. Better luck next time!
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {targetWords.map((word, idx) => (
                    <Badge
                      key={idx}
                      variant={solvedBoards[idx] ? "default" : "destructive"}
                      className="text-sm"
                    >
                      {word}
                    </Badge>
                  ))}
                </div>
              </>
            )}
            <Button onClick={initGame} className="mt-4">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            {/* Four game boards */}
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>{renderBoard(idx)}</div>
              ))}
            </div>

            {/* Keyboard */}
            <div className="space-y-1 pt-4">
              {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                  {row.map((key) => {
                    const status = keyboardStatus[key]
                    const isSpecial = key === "ENTER" || key === "DEL"
                    return (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        className={`${isSpecial ? "px-2 sm:px-3" : "w-7 sm:w-9"} h-10 font-semibold text-xs sm:text-sm ${getLetterStyle(
                          status || "empty"
                        )}`}
                        onClick={() => handleKeyPress(key)}
                      >
                        {key === "DEL" ? <Delete className="w-4 h-4" /> : key}
                      </Button>
                    )
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
