// server/routes/matchRoutes.js
const express = require('express');
const { calculateMatchScores } = require('../utils/matcher');
const neighborhoods = require('../data/neighborhoods.json');

const router = express.Router();

router.post('/', (req, res) => {
  const userPrefs = req.body;

  try {
    const results = calculateMatchScores(userPrefs, neighborhoods);
    res.status(200).json({ results });
  } catch (err) {
    console.error('Matching failed:', err);
    res.status(500).json({ error: 'Failed to calculate match scores' });
  }
});

module.exports = router;
