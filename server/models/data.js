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
  }
];

// Mock Data for the public APIs
export const quotesData = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
];
