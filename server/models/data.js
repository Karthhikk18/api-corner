export const apiListings = [
  {
    id: "weather-api",
    name: "Global Weather API",
    description: "Get real-time weather information for any location in the world.",
    category: "Weather",
    method: "GET",
    endpoint: "/api/public/weather",
    parameters: [
      { name: "city", type: "string", required: true, description: "The name of the city" }
    ],
    exampleResponse: {
      temperature: 24,
      condition: "Sunny",
      humidity: 45
    }
  },
  {
    id: "quotes-api",
    name: "Inspirational Quotes API",
    description: "Fetch random inspirational quotes to display in your application.",
    category: "Entertainment",
    method: "GET",
    endpoint: "/api/public/quotes",
    parameters: [],
    exampleResponse: {
      quote: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    }
  },
  {
    id: "random-user-api",
    name: "Random User Generator",
    description: "Generate random user profiles for testing and prototyping.",
    category: "Development",
    method: "GET",
    endpoint: "/api/public/users",
    parameters: [
      { name: "count", type: "number", required: false, description: "Number of users to generate (max 10)" }
    ],
    exampleResponse: {
      id: "u123",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Developer"
    }
  },
  {
    id: "ai-text-api",
    name: "AI Text Generation API",
    description: "Generate human-like text responses using advanced LLM models. Perfect for chatbots and content creation.",
    category: "Artificial Intelligence",
    method: "GET",
    endpoint: "/api/public/ai/generate",
    parameters: [
      { name: "prompt", type: "string", required: true, description: "The input text prompt for the AI" }
    ],
    exampleResponse: {
      success: true,
      completion: "Artificial Intelligence is transforming the modern IT landscape...",
      tokensUsed: 42
    }
  },
  {
    id: "code-compiler-api",
    name: "Remote Code Execution API",
    description: "Compile and run code snippets in various languages securely within isolated containers.",
    category: "Development",
    method: "GET",
    endpoint: "/api/public/code/execute",
    parameters: [
      { name: "language", type: "string", required: true, description: "Programming language (e.g., python, javascript)" },
      { name: "code", type: "string", required: true, description: "The code to execute" }
    ],
    exampleResponse: {
      output: "Hello, World!\n",
      executionTimeMs: 120,
      status: "success"
    }
  },
  {
    id: "threat-intel-api",
    name: "Threat Intelligence API",
    description: "Check IP addresses, domains, and hashes against our constantly updated malware and threat database.",
    category: "Cybersecurity",
    method: "GET",
    endpoint: "/api/public/security/threats",
    parameters: [
      { name: "ip", type: "string", required: true, description: "The IP address to check" }
    ],
    exampleResponse: {
      ip: "192.168.1.1",
      riskLevel: "High",
      threatType: "Botnet",
      lastSeen: "2026-05-18T14:32:00Z"
    }
  },
  {
    id: "ai-roi-analyzer-api",
    name: "AI ROI Performance Analyzer",
    description: "An intelligent analytics endpoint that calculates the Return on Investment (ROI) of AI tools and automations using performance metrics and predictive insights.",
    category: "Analytics",
    method: "GET",
    endpoint: "/api/public/ai/roi-analyzer",
    parameters: [
      { name: "investment", type: "number", required: true, description: "Total cost of AI investment in USD" },
      { name: "returns", type: "number", required: true, description: "Total returns or cost savings in USD" },
      { name: "timeframe", type: "string", required: false, description: "Timeframe of analysis (e.g., 'monthly', 'yearly')" }
    ],
    exampleResponse: {
      roiPercentage: 250,
      netProfit: 150000,
      efficiencyGain: "40%",
      prediction: "Positive growth trend detected.",
      recommendation: "Scale AI operations."
    }
  },
  {
    id: "img-gen-api",
    name: "AI Image Generation API",
    description: "Generate stunning, high-resolution images from text descriptions using our latest diffusion models.",
    category: "Artificial Intelligence",
    method: "GET",
    endpoint: "/api/public/ai/image",
    parameters: [
      { name: "prompt", type: "string", required: true, description: "Detailed description of the image to generate" },
      { name: "resolution", type: "string", required: false, description: "Output resolution (e.g. 1024x1024)" }
    ],
    exampleResponse: {
      success: true,
      imageUrl: "https://example.com/generated-images/x8f92ma.png",
      generationTimeMs: 2450,
      seed: 98453210
    }
  },
  {
    id: "blockchain-analytics-api",
    name: "Blockchain Analytics API",
    description: "Real-time analytics, wallet tracking, and transaction verification across 20+ blockchains.",
    category: "Finance",
    method: "GET",
    endpoint: "/api/public/crypto/analytics",
    parameters: [
      { name: "walletAddress", type: "string", required: true, description: "The wallet address to analyze" },
      { name: "chain", type: "string", required: true, description: "Blockchain network (e.g. ethereum, solana)" }
    ],
    exampleResponse: {
      wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      balanceUsd: 14523.50,
      totalTransactions: 142,
      riskScore: "Low",
      lastActive: "2026-05-19T08:12:00Z"
    }
  },
  {
    id: "study-roadmap-api",
    name: "AI Study Roadmap Generator",
    description: "Generates a personalized daily/weekly study plan and roadmap based on the student's branch, year, goal, and skill level.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/generate-roadmap",
    parameters: [
      { name: "branch", type: "string", required: true, description: "Academic branch (e.g. CSE, AI, ECE)" },
      { name: "year", type: "string", required: true, description: "Current year of study (e.g. 1, 2, 3, 4)" },
      { name: "goals", type: "string", required: true, description: "Target goals (e.g. 'Product-based companies')" },
      { name: "level", type: "string", required: false, description: "Current skill level (Beginner, Intermediate, Advanced)" }
    ],
    exampleResponse: {
      success: true,
      studentProfile: { branch: "CSE", year: "3", goals: "Product-based companies", level: "Beginner" },
      roadmap: [
        {
          week: 1,
          focus: "Data Structures & Algorithms Foundations",
          topics: ["Space/Time Complexity", "Arrays & Vectors", "Linked Lists"],
          milestone: "Implement a custom Singly Linked List in Java/C++"
        },
        {
          week: 2,
          focus: "OOP Concepts & Java Core",
          topics: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
          milestone: "Design a text-based bank simulation application"
        }
      ],
      placementStrategy: "Focus on daily LeetCode (easy-medium) and review OS Scheduling algorithms."
    }
  },
  {
    id: "study-explain-api",
    name: "AI Concept Explainer",
    description: "Explains complex academic and programming concepts step-by-step with analogies and simplified code snippets.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/explain-topic",
    parameters: [
      { name: "topic", type: "string", required: true, description: "Topic to explain (e.g. 'OS Scheduling' or 'Java OOPs')" },
      { name: "level", type: "string", required: false, description: "Target explanation complexity (Beginner, Intermediate, Advanced)" }
    ],
    exampleResponse: {
      success: true,
      topic: "OS Scheduling",
      explanation: "Imagine a single billing counter at a busy fast-food restaurant (the CPU) and a queue of hungry customers waiting to order (processes). OS Scheduling decides who gets served next based on different queueing algorithms.",
      keyConcepts: [
        { term: "FIFO (First In First Out)", definition: "First process to arrive is served first. Simplest, but can cause long waits if the first customer has a huge order." },
        { term: "Round Robin", definition: "Each process gets a tiny slice of CPU time (quantum), then moves to the back of the queue." }
      ],
      analogy: "A fast-food billing line.",
      codeSnippet: "class Process {\n  String name;\n  int burstTime;\n}"
    }
  },
  {
    id: "study-resume-api",
    name: "AI Resume Feedback Tool",
    description: "Analyzes professional skills and projects to provide ATS-compatibility feedback and optimization recommendations.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/analyze-resume",
    parameters: [
      { name: "skills", type: "string", required: true, description: "Comma-separated list of skills (e.g. 'Java, React, Node')" },
      { name: "experience", type: "string", required: false, description: "Brief description of projects or work history" }
    ],
    exampleResponse: {
      success: true,
      atsScore: 78,
      missingKeywords: ["Docker", "Unit Testing", "System Design"],
      strengths: ["Strong foundational skills in Full Stack Web Development", "Relevant React/Node.js project exposure"],
      recommendation: "Incorporate metrics into your project descriptions (e.g., 'Optimized query execution by 30%')."
    }
  },
  {
    id: "study-quiz-api",
    name: "AI Quiz Generator",
    description: "Generates multiple-choice questions for placement preparation or academic revision.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/generate-quiz",
    parameters: [
      { name: "topic", type: "string", required: true, description: "Quiz topic (e.g. 'Binary Search' or 'DBMS')" },
      { name: "count", type: "number", required: false, description: "Number of questions to generate (max 5)" }
    ],
    exampleResponse: {
      success: true,
      quiz: [
        {
          question: "Which OOP concept is achieved by function overloading?",
          options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
          answer: "Polymorphism"
        }
      ]
    }
  },
  {
    id: "study-code-review-api",
    name: "AI Code Reviewer",
    description: "Reviews source code snippets for logical bugs, security hazards, and code style improvements.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/code-review",
    parameters: [
      { name: "language", type: "string", required: true, description: "Programming language of the snippet" },
      { name: "code", type: "string", required: true, description: "Source code to review" }
    ],
    exampleResponse: {
      success: true,
      bugsFound: 0,
      optimizations: "Your loop has O(N^2) complexity. You can optimize it to O(N) using a HashSet or HashMap.",
      refactoredCode: "// Refactored version using a HashSet for O(N) lookup"
    }
  },
  {
    id: "study-progress-api",
    name: "Student Progress Tracker",
    description: "Updates logged study hours, tracks streaks, and updates gamified RPG experience points (XP).",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/track-progress",
    parameters: [
      { name: "hours", type: "number", required: true, description: "Number of study hours to log" },
      { name: "topic", type: "string", required: true, description: "Topic completed" },
      { name: "streak", type: "number", required: false, description: "Current consecutive days of studying" }
    ],
    exampleResponse: {
      success: true,
      streak: 5,
      hoursLogged: 3,
      xpGained: 150,
      currentLevel: 4,
      totalXp: 1250,
      unlockedAchievements: ["Consistent Learner (5-day streak)"]
    }
  },
  {
    id: "study-mock-interview-api",
    name: "Mock Interview Simulator",
    description: "Simulates placement HR or technical interview questions tailored for a specific role and difficulty level.",
    category: "Academic AI",
    method: "GET",
    endpoint: "/api/public/study-buddy/mock-interview",
    parameters: [
      { name: "role", type: "string", required: true, description: "Target job role (e.g. 'Frontend Developer')" },
      { name: "difficulty", type: "string", required: false, description: "Interview difficulty (Easy, Medium, Hard)" }
    ],
    exampleResponse: {
      success: true,
      role: "Frontend Developer",
      difficulty: "Medium",
      questions: [
        "What is the difference between Virtual DOM and Shadow DOM?",
        "Explain how closures work in JavaScript and write a code example.",
        "How do you optimize page load performance in a React application?"
      ],
      tips: "Focus on detailing how the React diffing algorithm and browser paint loops interact."
    }
  }
];


// Mock Data for the public APIs
export const quotesData = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
];
