import messageModel from '../models/messageModel.js';
import conversationModel from '../models/conversationModel.js';

export const createMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMessage = new messageModel({ conversationId, sender, text });

    const conversation = await conversationModel.findById(conversationId);
    conversation.lastMessage = newMessage;
    const own = conversation.members.find((el) => el._id == req.userId);
    if (own) {
      await conversationModel.findByIdAndUpdate(conversationId, conversation);
      const savedMessage = await newMessage.save();

      res.json(savedMessage);
    } else {
      res.json({ message: 'No)' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать сообщение' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({
        conversationId: req.params.conversationId,
      })
      .populate('sender');
    const conversation = await conversationModel.findById(
      req.params.conversationId
    );
    const own = conversation.members.find((el) => el._id == req.userId);
    if (own) {
      res.json(messages);
    } else {
      res.json({ message: 'no' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить сообщения' });
  }
};
