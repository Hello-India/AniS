const express = require('express');
const Anime = require('../models/Anime');
const auth = require('../middleware/Auth');
const router = express.Router();

// Get all anime
router.get('/', async (req, res) => {
  const anime = await Anime.find({});
  res.json(anime);
});

// Get anime by ID
router.get('/:id', async (req, res) => {
  const anime = await Anime.findById(req.params.id);
  res.json(anime);
});

// Add new anime (admin)
router.post('/', auth, async (req, res) => {
  // Only admin allowed
  if (!req.user.isAdmin) return res.status(403).json({ error: "Forbidden" });
  const anime = new Anime(req.body);
  await anime.save();
  res.json(anime);
});

// Update anime (admin)
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Forbidden" });
  const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(anime);
});

// Search anime
router.get('/search/:q', async (req, res) => {
  const q = req.params.q;
  const results = await Anime.find({ title: new RegExp(q, "i") });
  res.json(results);
});

module.exports = router;
