import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    avatarUrl: {
      type: String,
      default: 'http://localhost:5000/uploads/avatarPlaceholder.jpeg',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
