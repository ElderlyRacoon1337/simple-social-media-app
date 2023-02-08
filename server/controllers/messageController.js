import messageModel from '../models/messageModel.js';

export const createMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMessage = new messageModel({ conversationId, sender, text });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
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

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить сообщения' });
  }
};
