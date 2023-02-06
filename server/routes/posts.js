import express from 'express';
import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getPost,
  likePost,
  updateComment,
  updatePost,
} from '../controllers/postController.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuth, createPost);
router.get('/', getAllPosts);

router.get('/:id', getPost);
router.patch('/:id', isAuth, updatePost);
router.delete('/:id', isAuth, deletePost);

router.patch('/:id/likePost', isAuth, likePost);
router.post('/:id/commentPost', isAuth, commentPost);
router.patch('/:id/commentPost', isAuth, deleteComment);
router.patch('/:id/updateComment', updateComment);

export default router;
