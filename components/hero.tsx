"use client"

import { Sparkles, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Multiple games, one platform</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Play, Learn, and{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Challenge Yourself
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Discover a collection of engaging games including quizzes, flag guessing, trivia, 
            math challenges, and more. Test your knowledge and have fun!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Play className="h-5 w-5" />
              Start Playing
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Browse Games
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">6+</div>
              <div className="text-sm">Games</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">Free</div>
              <div className="text-sm">To Play</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">Fun</div>
              <div className="text-sm">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
