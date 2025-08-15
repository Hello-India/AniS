const express = require('express');
const Episode = require('../models/Episode');
const auth = require('../middleware/auth');
const router = express.Router();

// Get episodes for an anime
router.get('/:animeId', async (req, res) => {
  const episodes = await Episode.find({ animeId: req.params.animeId });
  res.json(episodes);
});

// Add episode (admin)
router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Forbidden" });
  const episode = new Episode(req.body);
  await episode.save();
  res.json(episode);
});

module.exports = router;
