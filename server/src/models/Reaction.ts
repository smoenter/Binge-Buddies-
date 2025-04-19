import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReaction extends Document {
  user: Types.ObjectId;
  media: Types.ObjectId;
  comment: string;
  season?: number;
  episode?: number;
  rating?: number;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    media: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    season: {
      type: Number,
    },
    episode: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);

export default Reaction;

