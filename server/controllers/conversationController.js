import conversationModel from '../models/conversationModel.js';

export const createConversation = async (req, res) => {
  try {
    const oldConversation = await conversationModel.findOne({
      members: [req.body.senderId, req.body.recieverId],
    });
    if (!oldConversation) {
      const oldConversation = await conversationModel.findOne({
        members: [req.body.recieverId, req.body.senderId],
      });
      if (oldConversation) {
        res.json(oldConversation);
        return;
      }
    }
    if (oldConversation) {
      res.json(oldConversation);
      return;
    }

    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.recieverId],
    });

    const savedConversatoin = await newConversation.save();
    res.json(savedConversatoin);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать переписку' });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await conversationModel
      .find({
        members: { $in: [req.params.userId] },
      })
      .populate('members')
      .populate('lastMessage.sender');

    res.json(conversations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить переписки' });
  }
};
