import express from 'express';
import { quotesData } from '../models/data.js';

const router = express.Router();

// Mock Weather API
router.get('/weather', (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  // Generate some semi-random weather data based on the city string length
  const temp = 15 + (city.length * 2) % 20;
  const conditions = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"];
  const condition = conditions[city.length % conditions.length];

  res.json({
    city: city,
    temperature: temp,
    unit: "Celsius",
    condition: condition,
    humidity: 40 + (city.length * 3) % 40
  });
});

// Mock Quotes API
router.get('/quotes', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  res.json(quotesData[randomIndex]);
});

// Mock Users API
router.get('/users', (req, res) => {
  let count = parseInt(req.query.count) || 1;
  if (count > 10) count = 10;

  const users = [];
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
  const roles = ["Developer", "Designer", "Manager", "Tester"];

  for (let i = 0; i < count; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    users.push({
      id: `u${Math.floor(Math.random() * 10000)}`,
      name: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)]
    });
  }

  res.json(users);
});

// Mock AI Text Generation API
router.get('/ai/generate', (req, res) => {
  const { prompt } = req.query;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt parameter is required" });
  }

  const responses = [
    `Based on your prompt "${prompt}", I can tell you that the future of IT is heavily dependent on scalable infrastructure and AI.`,
    `Here is a generated response for "${prompt}": The integration of machine learning algorithms is revolutionizing how we approach data analysis.`,
    `Responding to "${prompt}": Security remains a paramount concern in modern software architecture.`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  res.json({
    success: true,
    prompt: prompt,
    completion: randomResponse,
    tokensUsed: Math.floor(Math.random() * 100) + 20
  });
});

// Mock Remote Code Execution API
router.get('/code/execute', (req, res) => {
  const { language, code } = req.query;
  
  if (!language || !code) {
    return res.status(400).json({ error: "Both language and code parameters are required" });
  }

  // Simulate execution
  const executionTime = Math.floor(Math.random() * 500) + 50;
  
  res.json({
    language: language,
    status: "success",
    output: `Simulated execution of ${language} code:\n> ${code.substring(0, 50)}${code.length > 50 ? '...' : ''}\n\nProgram finished successfully.`,
    executionTimeMs: executionTime
  });
});

// Mock Threat Intelligence API
router.get('/security/threats', (req, res) => {
  const { ip } = req.query;
  
  if (!ip) {
    return res.status(400).json({ error: "IP parameter is required" });
  }

  const riskLevels = ["Low", "Medium", "High", "Critical", "Clean"];
  const threatTypes = ["Botnet", "Malware", "Phishing", "Spam", "None"];
  
  // Use IP string to deterministically (but seemingly randomly) assign risk
  const ipScore = ip.split('.').reduce((acc, val) => acc + parseInt(val || 0), 0);
  
  const riskIndex = ipScore % riskLevels.length;
  const typeIndex = ipScore % threatTypes.length;

  res.json({
    ip: ip,
    riskLevel: riskLevels[riskIndex],
    threatType: threatTypes[typeIndex],
    lastSeen: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  });
});
// Mock AI ROI Performance Analyzer API
router.get('/ai/roi-analyzer', (req, res) => {
  const { investment, returns, timeframe } = req.query;

  if (!investment || !returns) {
    return res.status(400).json({ error: "Both investment and returns parameters are required" });
  }

  const investNum = parseFloat(investment);
  const returnsNum = parseFloat(returns);

  if (isNaN(investNum) || isNaN(returnsNum)) {
    return res.status(400).json({ error: "Investment and returns must be valid numbers" });
  }

  const netProfit = returnsNum - investNum;
  const roiPercentage = (netProfit / investNum) * 100;
  
  let recommendation = "";
  let prediction = "";
  let efficiencyGain = "";

  if (roiPercentage > 100) {
    recommendation = "Highly profitable. Scale AI operations and explore new automation opportunities.";
    prediction = "Strong positive growth trend expected for the next quarter.";
    efficiencyGain = `${Math.min(Math.floor(roiPercentage / 5), 80)}% increase in operational efficiency.`;
  } else if (roiPercentage > 0) {
    recommendation = "Profitable but with room for optimization. Review current workflows.";
    prediction = "Steady growth with potential for higher returns if optimized.";
    efficiencyGain = `${Math.min(Math.floor(roiPercentage / 5), 30)}% increase in operational efficiency.`;
  } else {
    recommendation = "Negative ROI. Re-evaluate AI tools and implementation strategy.";
    prediction = "Risk of continued losses without strategic adjustments.";
    efficiencyGain = "0% - No measurable efficiency gains detected.";
  }

  res.json({
    analyzedAt: new Date().toISOString(),
    timeframe: timeframe || 'all-time',
    investment: investNum,
    returns: returnsNum,
    netProfit: netProfit,
    roiPercentage: parseFloat(roiPercentage.toFixed(2)),
    efficiencyGain: efficiencyGain,
    prediction: prediction,
    recommendation: recommendation
  });
});

// Mock AI Image Generation API
router.get('/ai/image', (req, res) => {
  const { prompt, resolution } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt parameter is required" });
  }

  // Simulate heavy processing time (handled by global delay, but we can add a little extra)
  const seed = Math.floor(Math.random() * 100000000);
  const fakeId = Math.random().toString(36).substring(2, 9);
  
  res.json({
    success: true,
    prompt: prompt,
    resolution: resolution || "1024x1024",
    imageUrl: `https://example.com/generated-images/${fakeId}.png`,
    generationTimeMs: Math.floor(Math.random() * 2000) + 1000,
    seed: seed
  });
});

// Mock Blockchain Analytics API
router.get('/crypto/analytics', (req, res) => {
  const { walletAddress, chain } = req.query;

  if (!walletAddress || !chain) {
    return res.status(400).json({ error: "Both walletAddress and chain parameters are required" });
  }

  const riskScores = ["Low", "Medium", "High", "Critical"];
  
  res.json({
    wallet: walletAddress,
    chain: chain,
    balanceUsd: parseFloat((Math.random() * 50000).toFixed(2)),
    totalTransactions: Math.floor(Math.random() * 500),
    riskScore: riskScores[Math.floor(Math.random() * riskScores.length)],
    lastActive: new Date(Date.now() - Math.random() * 1000000000).toISOString()
  });
});

// Mock Study Buddy: Generate Roadmap
router.get('/study-buddy/generate-roadmap', (req, res) => {
  const { branch, year, goals, level } = req.query;

  if (!branch || !year || !goals) {
    return res.status(400).json({ error: "Parameters 'branch', 'year', and 'goals' are required" });
  }

  const selectedLevel = level || "Beginner";
  
  // Custom response based on input
  const roadmap = [
    {
      week: 1,
      focus: `Foundations of ${branch} - Year ${year}`,
      topics: [`Core Concepts of ${branch}`, "Basic Architecture", "Fundamentals Overview"],
      milestone: `Complete introductory project on ${goals}`
    },
    {
      week: 2,
      focus: "Applied Practical Application",
      topics: ["Hands-on lab", "Code Integration", "Debugging & Testing"],
      milestone: `Deploy first functional prototype tailored for ${goals}`
    },
    {
      week: 3,
      focus: "Advanced Optimization & Mastery",
      topics: ["Performance tuning", "Security best practices", "Complexity minimization"],
      milestone: `Perform comprehensive review of ${branch} systems targeting ${goals}`
    }
  ];

  res.json({
    success: true,
    studentProfile: { branch, year, goals, level: selectedLevel },
    roadmap: roadmap,
    placementStrategy: `Given your target for ${goals}, focus on algorithmic problems, key concepts in ${branch}, and build 2 portfolio projects.`
  });
});

// Mock Study Buddy: Explain Topic
router.get('/study-buddy/explain-topic', (req, res) => {
  const { topic, level } = req.query;

  if (!topic) {
    return res.status(400).json({ error: "Parameter 'topic' is required" });
  }

  const selectedLevel = level || "Beginner";
  let explanation = "";
  let analogy = "";
  let codeSnippet = "";

  if (topic.toLowerCase().includes("scheduling") || topic.toLowerCase().includes("os")) {
    explanation = "OS Scheduling is how the operating system manages CPU execution time among multiple competing processes. It prevents starvation and optimizes CPU utilization.";
    analogy = "A single cashier at a busy grocery store managing a queue of customers.";
    codeSnippet = "class CPU_Scheduler {\n  List<Process> queue;\n  void runNext() {\n    Process p = queue.remove(0);\n    execute(p);\n  }\n}";
  } else if (topic.toLowerCase().includes("oop") || topic.toLowerCase().includes("java")) {
    explanation = "Object-Oriented Programming (OOP) is a model organized around objects rather than actions. Key concepts include Abstraction, Encapsulation, Inheritance, and Polymorphism.";
    analogy = "Blueprints (classes) used to manufacture actual cars (objects).";
    codeSnippet = "public class Car extends Vehicle {\n  private String model;\n  public void drive() {\n    System.out.println(\"Driving \" + model);\n  }\n}";
  } else {
    explanation = `The topic '${topic}' represents an important area of study. At a ${selectedLevel} level, it is essential to understand the core structures, syntax rules, and practical use cases of this technology.`;
    analogy = "Building with modular blocks where each block has a specific role.";
    codeSnippet = `// Simulated code representation for ${topic}\nfunction initialize() {\n  console.log("Analyzing ${topic}...");\n}`;
  }

  res.json({
    success: true,
    topic,
    level: selectedLevel,
    explanation,
    keyConcepts: [
      { term: "Abstraction", definition: "Hiding internal complexity and showing only the essential features." },
      { term: "Efficiency", definition: "Optimizing code execution speed and memory footprints." }
    ],
    analogy,
    codeSnippet
  });
});

// Mock Study Buddy: Resume Analyzer
router.get('/study-buddy/analyze-resume', (req, res) => {
  const { skills, experience } = req.query;

  if (!skills) {
    return res.status(400).json({ error: "Parameter 'skills' is required" });
  }

  const skillList = skills.split(',').map(s => s.trim().toLowerCase());
  let atsScore = 65;
  const missingKeywords = [];

  // Simulate ATS matching
  if (skillList.includes("react")) atsScore += 10;
  else missingKeywords.push("React.js");

  if (skillList.includes("node") || skillList.includes("node.js")) atsScore += 10;
  else missingKeywords.push("Node.js / Express");

  if (skillList.includes("java") || skillList.includes("python")) atsScore += 10;
  else missingKeywords.push("Python/Java (OOP Core)");

  if (skillList.includes("docker")) atsScore += 5;
  else missingKeywords.push("Docker / Containers");

  atsScore = Math.min(atsScore, 100);

  const strengths = [];
  if (skillList.length >= 4) {
    strengths.push("Broad technical skillset matching industry profiles");
  } else {
    strengths.push("Clear, focused technical skillset");
  }
  if (experience && experience.length > 20) {
    strengths.push("Detailed project/work descriptions help parsing accuracy");
  }

  res.json({
    success: true,
    atsScore,
    missingKeywords,
    strengths,
    recommendation: atsScore < 85 
      ? `Try acquiring skills in ${missingKeywords.slice(0, 2).join(" and ")} to boost ATS match rating.` 
      : "Excellent resume layout. Focus on adding quantifiable project metrics (e.g. 'boosted speeds by 25%')."
  });
});

// Mock Study Buddy: Quiz Generator
router.get('/study-buddy/generate-quiz', (req, res) => {
  const { topic, count } = req.query;

  if (!topic) {
    return res.status(400).json({ error: "Parameter 'topic' is required" });
  }

  const quizCount = Math.min(parseInt(count) || 2, 5);
  const pool = [
    {
      question: `Which of the following is a primary characteristic of ${topic}?`,
      options: ["High execution overhead", "Modular reusable design", "Lack of concurrency support", "Strict memory constraints"],
      answer: "Modular reusable design"
    },
    {
      question: `What is the typical time complexity for searching within a standard ${topic} structure?`,
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      answer: "O(log N)"
    },
    {
      question: `In production environments, how should errors in ${topic} components be handled?`,
      options: ["Ignored silently", "Logged via standard output", "Caught with custom exception handlers", "Restart the service immediately"],
      answer: "Caught with custom exception handlers"
    },
    {
      question: `Which design pattern is most commonly associated with ${topic} instances?`,
      options: ["Singleton Pattern", "Factory Pattern", "Observer Pattern", "Adapter Pattern"],
      answer: "Factory Pattern"
    },
    {
      question: `What is the primary vulnerability risks associated with unvalidated inputs in ${topic} APIs?`,
      options: ["CPU starvation", "Memory leak", "Injection vulnerability", "Buffer overflow"],
      answer: "Injection vulnerability"
    }
  ];

  res.json({
    success: true,
    topic,
    quiz: pool.slice(0, quizCount)
  });
});

// Mock Study Buddy: Code Reviewer
router.get('/study-buddy/code-review', (req, res) => {
  const { language, code } = req.query;

  if (!language || !code) {
    return res.status(400).json({ error: "Both 'language' and 'code' parameters are required" });
  }

  let bugsFound = 0;
  let optimizations = "No critical performance issues identified.";
  let refactoredCode = code;

  if (code.includes("for") && code.includes("for") && (code.includes("[i]") || code.includes("[j]"))) {
    bugsFound = 1;
    optimizations = "Detected nested loops. If checking for duplicates or matching entries, consider using a Hash Set or Map to reduce time complexity from O(N^2) to O(N).";
    refactoredCode = `// Optimised Code snippet in ${language}:\n// Uses a Set to achieve linear execution time\nconst seen = new Set();\nfor (let item of data) {\n  if (seen.has(item)) return item;\n  seen.add(item);\n}`;
  } else if (code.toLowerCase().includes("eval") || code.toLowerCase().includes("sql") || code.includes("SELECT * FROM")) {
    bugsFound = 2;
    optimizations = "Security hazard: Potential code/SQL injection risk detected. Always use parameterized queries or strict sanitization.";
    refactoredCode = `// Secure parameterized representation\ndb.query('SELECT * FROM users WHERE id = ?', [userId]);`;
  } else {
    optimizations = "Code structure looks clean. Ensure you add comprehensive unit test suites and docstring comments.";
  }

  res.json({
    success: true,
    language,
    bugsFound,
    optimizations,
    refactoredCode
  });
});

// Mock Study Buddy: Progress Tracker
router.get('/study-buddy/track-progress', (req, res) => {
  const { hours, topic, streak } = req.query;

  if (!hours || !topic) {
    return res.status(400).json({ error: "Parameters 'hours' and 'topic' are required" });
  }

  const hoursLogged = parseFloat(hours);
  if (isNaN(hoursLogged) || hoursLogged <= 0) {
    return res.status(400).json({ error: "'hours' must be a valid positive number" });
  }

  const currentStreak = parseInt(streak) || 1;
  const xpGained = Math.round(hoursLogged * 50);
  const totalXp = 1000 + xpGained;
  const currentLevel = Math.floor(totalXp / 300);

  const achievements = [];
  if (currentStreak >= 5) {
    achievements.push("Consistency Champion (5+ Days)");
  }
  if (hoursLogged >= 4) {
    achievements.push("Deep Focus Session (4+ Hours)");
  }

  res.json({
    success: true,
    streak: currentStreak + 1,
    hoursLogged,
    xpGained,
    currentLevel,
    totalXp,
    unlockedAchievements: achievements.length > 0 ? achievements : ["Regular Study Logged"]
  });
});

// Mock Study Buddy: Mock Interview
router.get('/study-buddy/mock-interview', (req, res) => {
  const { role, difficulty } = req.query;

  if (!role) {
    return res.status(400).json({ error: "Parameter 'role' is required" });
  }

  const selectedDiff = difficulty || "Medium";
  let questions = [];
  let tips = "";

  if (role.toLowerCase().includes("front") || role.toLowerCase().includes("react") || role.toLowerCase().includes("web")) {
    questions = [
      "What are the differences between client-side rendering (CSR) and server-side rendering (SSR)?",
      "Explain the event delegation model in JavaScript and how bubbles work.",
      "How does the React virtual DOM reconcile changes efficiently?"
    ];
    tips = "Ensure you explain browser rendering lifecycles (Critical Rendering Path) and CSS re-flows.";
  } else if (role.toLowerCase().includes("backend") || role.toLowerCase().includes("node") || role.toLowerCase().includes("system")) {
    questions = [
      "Explain horizontal vs vertical scaling and how database indexing works.",
      "What is event loop lag in Node.js and how can you prevent blocking operations?",
      "How do you secure REST APIs against common security attacks like CSRF or replay attacks?"
    ];
    tips = "Emphasize practical experiences with caching (Redis) and DB optimizations.";
  } else {
    questions = [
      `Describe a challenging problem you solved in relation to ${role} development.`,
      `Explain the core lifecycle and execution pipeline in ${role} systems.`,
      `What methodologies do you use to test code reliability and performance in ${role} apps?`
    ];
    tips = "Focus on structuring your answers using the STAR method (Situation, Task, Action, Result).";
  }

  res.json({
    success: true,
    role,
    difficulty: selectedDiff,
    questions,
    tips
  });
});

export default router;

