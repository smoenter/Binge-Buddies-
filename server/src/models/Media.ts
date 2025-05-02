import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMedia extends Document {
  title: string;
  imdbID: string
  type: 'movie' | 'series';
  genre: string[];
  description?: string;
  posterUrl?: string;
  trailerUrl?: string;
  savedBy: Types.ObjectId[];
}

const mediaSchema = new Schema<IMedia>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imdbID: {
      type: String,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['movie', 'series'],
      required: true,
    },
    genre: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
    savedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Media = mongoose.model<IMedia>('Media', mediaSchema);

export default Media;
