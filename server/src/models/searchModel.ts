import mongoose, { Document, Schema } from 'mongoose';

export interface ISearch extends Document {
  title: string;
  content: string;
  score: number;
  createdAt: Date;
}

const searchSchema: Schema<ISearch> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score must be non-negative']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

searchSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<ISearch>('Search', searchSchema, 'AI-Search');