import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
  },

  {
    timestamps: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    members: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    lastMessage: {
      type: messageSchema,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Conversation', conversationSchema);
