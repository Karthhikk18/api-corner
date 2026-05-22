import express from 'express';
import { saveHistory, getHistoryByUserId, clearHistoryByUserId } from '../utils/db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// All history routes are private
router.use(authMiddleware);

// @route   POST /api/history
// @desc    Add a request history log
router.post('/', async (req, res) => {
  const { apiId, apiName, endpoint, method, parameters, status } = req.body;

  if (!apiId || !apiName || !endpoint || !method) {
    return res.status(400).json({ error: 'Missing required history parameters.' });
  }

  try {
    const historyItem = await saveHistory({
      userId: req.user.id,
      apiId,
      apiName,
      endpoint,
      method,
      parameters: parameters || {},
      status: status || 200
    });
    res.status(201).json(historyItem);
  } catch (err) {
    console.error('Save history error:', err);
    res.status(500).json({ error: 'Server error saving request history.' });
  }
});

// @route   GET /api/history
// @desc    Get user request logs
router.get('/', async (req, res) => {
  try {
    const logs = await getHistoryByUserId(req.user.id);
    res.json(logs);
  } catch (err) {
    console.error('Fetch history error:', err);
    res.status(500).json({ error: 'Server error fetching request history.' });
  }
});

// @route   DELETE /api/history
// @desc    Clear user request logs
router.delete('/', async (req, res) => {
  try {
    await clearHistoryByUserId(req.user.id);
    res.json({ success: true, message: 'Request history cleared successfully.' });
  } catch (err) {
    console.error('Clear history error:', err);
    res.status(500).json({ error: 'Server error clearing request history.' });
  }
});

export default router;
