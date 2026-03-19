import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { GamesSection } from "@/components/games-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <GamesSection />
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>GameHub - Have fun and learn something new every day</p>
        </div>
      </footer>
    </main>
  )
}
