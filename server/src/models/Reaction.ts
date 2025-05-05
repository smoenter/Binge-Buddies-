import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the comment interface
export interface IComment {
  _id?: Types.ObjectId;
  commentText: string;
  createdAt?: Date;
  user: Types.ObjectId;
}

// Extend IReaction to include comments
export interface IReaction extends Document {
  user: Types.ObjectId;
  media: Types.ObjectId;
  comment: string;
  season?: number;
  episode?: number;
  rating?: number;
  createdAt: Date;
  comments: IComment[];
}

// Define the comment subdocument schema
const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    commentText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // MongoDB will automatically generate _id for each comment
);

// Define the main Reaction schema
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
    comments: [commentSchema], // 👈 Add the embedded comments array here
  },
  {
    versionKey: false,
  }
);

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);

export default Reaction;

