import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from '../models/User.js';
import History from '../models/History.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DB_DIR = path.join(__dirname, '../data');
const JSON_DB_PATH = path.join(JSON_DB_DIR, 'db.json');

let isMongoConnected = false;

// Initialize MongoDB or fallback JSON database
export async function initDb() {
  const mongoUri = process.env.MONGODB_URI;
  
  if (mongoUri) {
    try {
      console.log('Attempting to connect to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      isMongoConnected = true;
      console.log('Successfully connected to MongoDB Atlas.');
    } catch (err) {
      console.error('Failed to connect to MongoDB Atlas. Falling back to local JSON database.', err);
      await initLocalJsonDb();
    }
  } else {
    console.log('No MONGODB_URI found. Initializing local JSON database (Fallback Mode).');
    await initLocalJsonDb();
  }
}

// Local JSON DB utilities
async function initLocalJsonDb() {
  try {
    await fs.mkdir(JSON_DB_DIR, { recursive: true });
    try {
      await fs.access(JSON_DB_PATH);
    } catch {
      // File doesn't exist, create it
      const defaultData = { users: [], history: [] };
      await fs.writeFile(JSON_DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
      console.log('Created local JSON database file at:', JSON_DB_PATH);
    }
  } catch (err) {
    console.error('Error initializing local JSON database:', err);
  }
}

async function readJsonDb() {
  try {
    const data = await fs.readFile(JSON_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, returning empty database structure.', err);
    return { users: [], history: [] };
  }
}

async function writeJsonDb(data) {
  try {
    await fs.writeFile(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to JSON DB:', err);
  }
}

// Unified Database Interface Functions

export async function saveUser(userData) {
  if (isMongoConnected) {
    const user = new User(userData);
    const saved = await user.save();
    return { id: saved._id.toString(), email: saved.email };
  } else {
    const db = await readJsonDb();
    
    // Check if user already exists
    const existing = db.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      email: userData.email.toLowerCase(),
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    await writeJsonDb(db);
    return { id: newUser.id, email: newUser.email };
  }
}

export async function getUserByEmail(email) {
  if (isMongoConnected) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return null;
    return { id: user._id.toString(), email: user.email, password: user.password };
  } else {
    const db = await readJsonDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    return user;
  }
}

export async function getUserById(id) {
  if (isMongoConnected) {
    const user = await User.findById(id);
    if (!user) return null;
    return { id: user._id.toString(), email: user.email };
  } else {
    const db = await readJsonDb();
    const user = db.users.find(u => u.id === id);
    if (!user) return null;
    return { id: user.id, email: user.email };
  }
}

export async function saveHistory(historyItem) {
  if (isMongoConnected) {
    const history = new History(historyItem);
    const saved = await history.save();
    return saved;
  } else {
    const db = await readJsonDb();
    const newItem = {
      id: Math.random().toString(36).substring(2, 11),
      ...historyItem,
      timestamp: new Date().toISOString()
    };
    db.history.push(newItem);
    await writeJsonDb(db);
    return newItem;
  }
}

export async function getHistoryByUserId(userId) {
  if (isMongoConnected) {
    // Sort by timestamp descending
    return await History.find({ userId }).sort({ timestamp: -1 });
  } else {
    const db = await readJsonDb();
    const userHistory = db.history.filter(h => h.userId === userId);
    // Sort by timestamp descending
    return userHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}

export async function clearHistoryByUserId(userId) {
  if (isMongoConnected) {
    await History.deleteMany({ userId });
    return true;
  } else {
    const db = await readJsonDb();
    db.history = db.history.filter(h => h.userId !== userId);
    await writeJsonDb(db);
    return true;
  }
}
