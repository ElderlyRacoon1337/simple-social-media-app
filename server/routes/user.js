import express from 'express';
import {
  getUser,
  signIn,
  signUp,
  getPostsByUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/:id', getUser);
router.get('/:id/posts', getPostsByUser);

export default router;
