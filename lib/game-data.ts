export interface Game {
  id: string
  title: string
  description: string
  icon: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  playTime: string
  color: string
}

export const games: Game[] = [
  {
    id: "quiz",
    title: "General Quiz",
    description: "Test your knowledge across various topics with challenging questions",
    icon: "brain",
    category: "Knowledge",
    difficulty: "Medium",
    playTime: "5-10 min",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "flags",
    title: "Flag Guesser",
    description: "Identify countries by their flags from around the world",
    icon: "flag",
    category: "Geography",
    difficulty: "Easy",
    playTime: "3-5 min",
    color: "from-orange-500 to-amber-600",
  },
  {
    id: "trivia",
    title: "Trivia Challenge",
    description: "Answer fun trivia questions and climb the leaderboard",
    icon: "trophy",
    category: "Entertainment",
    difficulty: "Medium",
    playTime: "5-10 min",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "math",
    title: "Math Sprint",
    description: "Solve math problems as fast as you can before time runs out",
    icon: "calculator",
    category: "Math",
    difficulty: "Hard",
    playTime: "2-3 min",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "word",
    title: "Word Scramble",
    description: "Unscramble letters to form words and score points",
    icon: "text",
    category: "Language",
    difficulty: "Easy",
    playTime: "3-5 min",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "memory",
    title: "Memory Match",
    description: "Find matching pairs of cards to test your memory skills",
    icon: "grid",
    category: "Puzzle",
    difficulty: "Easy",
    playTime: "3-5 min",
    color: "from-yellow-500 to-orange-600",
  },
]

export const categories = ["All", "Knowledge", "Geography", "Entertainment", "Math", "Language", "Puzzle"]

// Quiz questions
export const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    correct: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
]

// Flags data
export const flagsData = [
  { country: "Japan", code: "JP", emoji: "🇯🇵" },
  { country: "Brazil", code: "BR", emoji: "🇧🇷" },
  { country: "Canada", code: "CA", emoji: "🇨🇦" },
  { country: "Australia", code: "AU", emoji: "🇦🇺" },
  { country: "Germany", code: "DE", emoji: "🇩🇪" },
  { country: "France", code: "FR", emoji: "🇫🇷" },
  { country: "Italy", code: "IT", emoji: "🇮🇹" },
  { country: "Spain", code: "ES", emoji: "🇪🇸" },
  { country: "United Kingdom", code: "GB", emoji: "🇬🇧" },
  { country: "United States", code: "US", emoji: "🇺🇸" },
]

// Trivia questions
export const triviaQuestions = [
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Horse", "Gazelle"],
    correct: 1,
  },
  {
    question: "How many strings does a standard guitar have?",
    options: ["4", "5", "6", "7"],
    correct: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2,
  },
  {
    question: "Which country has the most time zones?",
    options: ["USA", "Russia", "China", "France"],
    correct: 3,
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: 1,
  },
]

// Word scramble words
export const wordList = [
  "PROGRAMMING",
  "JAVASCRIPT",
  "DEVELOPER",
  "ALGORITHM",
  "DATABASE",
  "FUNCTION",
  "VARIABLE",
  "COMPUTER",
  "KEYBOARD",
  "INTERNET",
]

// Memory card icons
export const memoryIcons = ["star", "heart", "moon", "sun", "cloud", "bolt", "fire", "leaf"]
