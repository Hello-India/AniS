const mongoose = require('mongoose');
const EpisodeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  title: String,
  number: Number,
  videoUrl: String,
  releaseDate: Date
});
module.exports = mongoose.model('Episode', EpisodeSchema);
