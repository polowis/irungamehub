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
  {
    id: "quordle",
    title: "Quordle",
    description: "Guess four 5-letter words at once with limited attempts",
    icon: "grid-2x2",
    category: "Language",
    difficulty: "Hard",
    playTime: "10-15 min",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "word-reveal",
    title: "Word Reveal",
    description: "Uncover masked words in a passage to guess the mystery topic",
    icon: "eye",
    category: "Knowledge",
    difficulty: "Medium",
    playTime: "5-8 min",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "location-emoji",
    title: "Location Guesser",
    description: "Decode emoji clues and fill in missing letters to guess locations",
    icon: "map-pin",
    category: "Geography",
    difficulty: "Medium",
    playTime: "5-7 min",
    color: "from-rose-500 to-pink-600",
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

// Word Reveal passages
export const wordRevealPassages = [
  {
    topic: "Albert Einstein",
    category: "Scientist",
    passage: "This brilliant [MASKED1] was born in [MASKED2] in 1879. He developed the theory of [MASKED3] and won the [MASKED4] Prize in Physics. His famous equation [MASKED5] changed our understanding of the universe. He worked at [MASKED6] University and later fled to America due to the rise of [MASKED7]. His wild [MASKED8] and absent-minded personality made him an icon of genius. He played the [MASKED9] as a hobby and was known for his [MASKED10] thought experiments.",
    maskedWords: {
      MASKED1: "physicist",
      MASKED2: "Germany",
      MASKED3: "relativity",
      MASKED4: "Nobel",
      MASKED5: "E=mc²",
      MASKED6: "Princeton",
      MASKED7: "Nazism",
      MASKED8: "hair",
      MASKED9: "violin",
      MASKED10: "creative",
    },
  },
  {
    topic: "Eiffel Tower",
    category: "Landmark",
    passage: "This iconic [MASKED1] structure stands in the heart of [MASKED2]. Built for the 1889 World's [MASKED3], it was designed by Gustave [MASKED4]. Standing at 330 [MASKED5] tall, it was the world's tallest structure for 41 years. Millions of [MASKED6] visit it annually. It's located near the [MASKED7] River and is often called the Iron [MASKED8]. At night, it sparkles with thousands of [MASKED9] every hour. It's the most visited paid [MASKED10] in the world.",
    maskedWords: {
      MASKED1: "iron",
      MASKED2: "Paris",
      MASKED3: "Fair",
      MASKED4: "Eiffel",
      MASKED5: "meters",
      MASKED6: "tourists",
      MASKED7: "Seine",
      MASKED8: "Lady",
      MASKED9: "lights",
      MASKED10: "monument",
    },
  },
  {
    topic: "Morse Code",
    category: "Technology",
    difficulty: "Easy",
    maxReveals: 5,
  
    passage: "____ refers to either of MASKED1 for representing MASKED2 of the MASKED3, MASKED4, and MASKED5 marks by an arrangement of MASKED6, MASKED7, and MASKED8. The codes are transmitted as MASKED11 pulses of varied MASKED12 or analogous MASKED13 or MASKED9, such as MASKED10. One of the MASKED14 was invented in the MASKED15 by American MASKED16 and inventor MASKED17 during the MASKED18 for MASKED19. This version was further improved by American MASKED20 and MASKED21 Alfred Lewis Vail, Morse’s MASKED22 and MASKED23.",
  
    maskedWords: {
      MASKED1: "two systems",
      MASKED2: "letters",
      MASKED3: "alphabet",
      MASKED4: "numerals",
      MASKED5: "punctuation",
      MASKED6: "dots",
      MASKED7: "dashes",
      MASKED8: "spaces",
      MASKED9: "visual signals",
      MASKED10: "flashing lights",
  
      // NEW (middle difficulty)
      MASKED11: "electrical",
      MASKED12: "lengths",
      MASKED13: "mechanical",
  
      // NEW (end section — important!)
      MASKED14: "systems",
      MASKED15: "United States",
      MASKED16: "artist",
      MASKED17: "Samuel F.B. Morse",
      MASKED18: "1830s",
      MASKED19: "electrical telegraphy",
      MASKED20: "scientist",
      MASKED21: "businessman",
      MASKED22: "assistant",
      MASKED23: "partner"
    },
    acceptedAnswers: [
      "morse code",
      "morse",
      "international morse code",
      "american morse code",
      "morse signalling",
      "morse signaling"
    ],
  },
  {
    topic: "Frida Kahlo",
    category: "Art & Culture",
    difficulty: "Medium",
    maxReveals: 5,
  
    passage: "____ was a MASKED1 painter known for her many MASKED2 and works inspired by the MASKED3 and culture of her home country. Her paintings often explore themes of MASKED4, identity, and MASKED5. She is associated with MASKED6 and is recognized for her distinctive MASKED7 style.",
  
    maskedWords: {
      MASKED1: "Mexican",
      MASKED2: "self-portraits",
      MASKED3: "nature",
      MASKED4: "pain",
      MASKED5: "postcolonialism",
      MASKED6: "surrealism",
      MASKED7: "symbolic"
    },
  
    acceptedAnswers: [
      "frida kahlo",
      "kahlo"
    ]
  },
  {
    topic: "The Moon Landing",
    category: "Historical Event",
    passage: "On July 20, [MASKED1], humanity achieved the impossible. The [MASKED2] 11 mission landed on the [MASKED3]. Neil [MASKED4] became the first human to walk on its surface. Buzz [MASKED5] joined him shortly after. They planted an American [MASKED6] and collected rock samples. Millions watched on [MASKED7] around the world. The mission was launched from [MASKED8] in Florida. Michael [MASKED9] remained in orbit above. Armstrong's famous words about a giant [MASKED10] for mankind echoed through history.",
    maskedWords: {
      MASKED1: "1969",
      MASKED2: "Apollo",
      MASKED3: "Moon",
      MASKED4: "Armstrong",
      MASKED5: "Aldrin",
      MASKED6: "flag",
      MASKED7: "television",
      MASKED8: "Kennedy",
      MASKED9: "Collins",
      MASKED10: "leap",
    },
  },
  {
    topic: "Leonardo da Vinci",
    category: "Artist",
    passage: "This Renaissance [MASKED1] was born in Italy in 1452. He painted the famous [MASKED2] Lisa and The Last [MASKED3]. Beyond art, he was an inventor, designing flying [MASKED4] and war machines. His notebooks were written in mirror [MASKED5] to keep them secret. He studied human [MASKED6] by dissecting bodies. He worked for powerful patrons including the [MASKED7] of Milan. His unfinished works show his [MASKED8] nature. He is considered a true [MASKED9] genius. He spent his final years in [MASKED10] serving King Francis I.",
    maskedWords: {
      MASKED1: "master",
      MASKED2: "Mona",
      MASKED3: "Supper",
      MASKED4: "machines",
      MASKED5: "writing",
      MASKED6: "anatomy",
      MASKED7: "Duke",
      MASKED8: "perfectionist",
      MASKED9: "universal",
      MASKED10: "France",
    },
  },
]

// Location emoji data
export const locationEmojiData = [
  { location: "Paris", emojis: "🗼🥐🇫🇷", hint: "City of Love" },
  { location: "Tokyo", emojis: "🗾🍣🌸", hint: "Land of the Rising Sun" },
  { location: "New York", emojis: "🗽🍎🏙️", hint: "The Big Apple" },
  { location: "London", emojis: "🎡💂🇬🇧", hint: "Home of Big Ben" },
  { location: "Sydney", emojis: "🦘🏖️🎭", hint: "Down Under City" },
  { location: "Rome", emojis: "🏛️🍝🇮🇹", hint: "Eternal City" },
  { location: "Cairo", emojis: "🏜️🐫🔺", hint: "Land of Pyramids" },
  { location: "Dubai", emojis: "🏗️🌴💰", hint: "City of Gold" },
  { location: "Venice", emojis: "🚣🌉🎭", hint: "City of Canals" },
  { location: "Hawaii", emojis: "🌺🏄🌴", hint: "Aloha Paradise" },
  { location: "Mexico", emojis: "🌮🎺🌵", hint: "Land of Tacos" },
  { location: "Brazil", emojis: "⚽🎉🌴", hint: "Carnival Country" },
  { location: "India", emojis: "🕌🐘🍛", hint: "Land of Spices" },
  { location: "China", emojis: "🐉🏯🥢", hint: "Middle Kingdom" },
  { location: "Alaska", emojis: "🐻‍❄️❄️🏔️", hint: "Frozen Frontier" },
]

// Quordle word list (5-letter words)
export const quordleWords = [
  "CRANE", "SLATE", "CRATE", "TRACE", "PLATE",
  "BREAD", "DREAM", "STEAM", "CREAM", "GREAT",
  "PLANT", "GRANT", "TRAIN", "BRAIN", "GRAIN",
  "HOUSE", "MOUSE", "LOUSE", "GROUT", "SHOUT",
  "LIGHT", "MIGHT", "NIGHT", "FIGHT", "SIGHT",
  "WORLD", "WOULD", "COULD", "SHOULD", "MOULD",
  "HEART", "EARTH", "NORTH", "WORTH", "BIRTH",
  "WATER", "LATER", "CATER", "HATER", "RATER",
  "MUSIC", "BASIC", "MAGIC", "LOGIC", "TOPIC",
  "POWER", "TOWER", "LOWER", "MOWER", "SOWER",
]
