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

export default router;
