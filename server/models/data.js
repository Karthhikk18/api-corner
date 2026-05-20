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
  }
];

// Mock Data for the public APIs
export const quotesData = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
];
