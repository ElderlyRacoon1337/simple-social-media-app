import express from 'express';
import {
  createMessage,
  getMessages,
} from '../controllers/messageController.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuth, createMessage);
router.get('/:conversationId', isAuth, getMessages);

export default router;
