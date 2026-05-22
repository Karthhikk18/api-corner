import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './utils/db.js';
import apiRoutes from './routes/apiRoutes.js';
import publicApis from './routes/publicApis.js';
import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database (MongoDB Atlas or Fallback JSON Database)
initDb();

app.use(cors());
app.use(express.json());

// Artificial delay middleware to showcase frontend loading states
app.use('/api', (req, res, next) => {
  // Don't delay auth routes to ensure responsive login/signup experience
  if (req.path.startsWith('/auth')) {
    return next();
  }
  setTimeout(next, 800); // 800ms delay for APIs
});

// Routes
app.use('/api/directory', apiRoutes);
app.use('/api/public', publicApis);
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../Client/dist')));

// Catch-all route to serve the React app for any other requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
