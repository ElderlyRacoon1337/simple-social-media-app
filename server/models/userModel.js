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
    additionalInfo: {
      status: { type: String, default: '' },
      city: { type: String, default: '' },
      country: { type: String, default: '' },
      invitesToMe: { type: [mongoose.Schema.Types.ObjectId], default: [] },
      invitesFromMe: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
