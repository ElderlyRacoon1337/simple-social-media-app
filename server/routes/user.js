import express from 'express';
import {
  getUser,
  signIn,
  signUp,
  getPostsByUser,
  getMe,
} from '../controllers/userController.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', isAuth, getMe);
router.get('/:id', getUser);
router.get('/:id/posts', getPostsByUser);

export default router;
