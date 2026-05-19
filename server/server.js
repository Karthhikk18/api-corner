import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/apiRoutes.js';
import publicApis from './routes/publicApis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/directory', apiRoutes);
app.use('/api/public', publicApis);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../Client/dist')));

// Catch-all route to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
