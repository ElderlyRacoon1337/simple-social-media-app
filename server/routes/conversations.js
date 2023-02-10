import express from 'express';
import {
  createConversation,
  getConversations,
} from '../controllers/conversationController.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuth, createConversation);
router.get('/:userId', isAuth, getConversations);

export default router;
