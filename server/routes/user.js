import express from 'express';
import {
  getUser,
  signIn,
  signUp,
  getPostsByUser,
  getMe,
  updateProfile,
  inviteToFriends,
  confirmFriendship,
} from '../controllers/userController.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', isAuth, getMe);
router.get('/:id', getUser);
router.get('/:id/posts', getPostsByUser);
router.patch('/:id', isAuth, updateProfile);
router.post('/inviteToFriends', isAuth, inviteToFriends);
router.post('/confirmFriendship', isAuth, confirmFriendship);

export default router;
