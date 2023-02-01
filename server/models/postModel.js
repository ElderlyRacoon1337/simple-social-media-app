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
  title: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  likes: { type: [String], default: [] },
  comments: { type: [comment], default: [] },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString(),
  },
});

export default mongoose.model('Post', postSchema);
