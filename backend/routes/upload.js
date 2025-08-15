const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Cloudflare R2 stub integration
router.post('/video', auth, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Forbidden" });
  // Here you would handle video file uploads to R2.
  res.json({ message: 'Video upload endpoint (Cloudflare R2 integration stub)' });
});

module.exports = router;
