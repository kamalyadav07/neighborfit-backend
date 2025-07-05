const express = require('express');
const cors = require('cors');
const matchRoutes = require('./routes/matchRoutes');

const app = express();

// ✅ Allow all origins OR set specifically for Vercel frontend
app.use(cors({
  origin: 'https://neighborfit-umber.vercel.app', 
}));

app.use(express.json());
app.use('/api/match', matchRoutes);

module.exports = app;
