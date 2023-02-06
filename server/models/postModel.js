import mongoose from 'mongoose';

const comment = new mongoose.Schema({
  text: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postSchema = new mongoose.Schema(
  {
    text: { type: String },
    imageUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    likes: { type: [String], default: [] },
    comments: { type: [comment], default: [], ref: 'User' },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
