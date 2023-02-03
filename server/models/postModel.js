import mongoose from 'mongoose';

const comment = new mongoose.Schema({
  text: { type: String },
  user: { type: String },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString(),
  },
});

const postSchema = new mongoose.Schema({
  text: { type: String },
  imageUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  likes: { type: [String], default: [] },
  comments: { type: [comment], default: [] },
  viewsCount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString('ru'),
  },
});

export default mongoose.model('Post', postSchema);
