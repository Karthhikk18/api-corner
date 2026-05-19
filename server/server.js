import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import publicApis from './routes/publicApis.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/directory', apiRoutes);
app.use('/api/public', publicApis);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Free API Marketplace Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
