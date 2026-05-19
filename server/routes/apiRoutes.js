import express from 'express';
import { apiListings } from '../models/data.js';

const router = express.Router();

// Get all API listings
router.get('/', (req, res) => {
  res.json(apiListings);
});

// Get specific API details
router.get('/:id', (req, res) => {
  const api = apiListings.find(a => a.id === req.params.id);
  if (api) {
    res.json(api);
  } else {
    res.status(404).json({ error: "API not found" });
  }
});

export default router;
