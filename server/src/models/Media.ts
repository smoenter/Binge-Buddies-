import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: String,
  type: String,
  genre: [String],
  description: String,
  trailerUrl: String,
  posterUrl: String,
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
