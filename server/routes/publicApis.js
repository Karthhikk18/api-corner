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

export default router;
