const mongoose = require('mongoose');
const EpisodeSchema = new mongoose.Schema({
  title: String,
  number: Number,
  videoUrl: String,
  releaseDate: Date
});
const AnimeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  coverImage: String,
  genres: [String],
  episodes: [EpisodeSchema],
  year: Number,
  status: { type: String, default: "Ongoing" }
});
module.exports = mongoose.model('Anime', AnimeSchema);
