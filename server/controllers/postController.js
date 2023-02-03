import postModel from '../models/postModel.js';
import mongoose from 'mongoose';
import userModel from '../models/userModel.js';

export const getAllPosts = async (req, res) => {
  try {
    const page = req.query.page || '1';

    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await postModel.countDocuments({});
    const posts = await postModel
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить посты' });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new postModel({
      ...post,
      user: req.userId,
      createdAt: new Date().toLocaleString(),
    });
    await newPost.save();
    res.json({ messgage: 'Пост создан' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать пост' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await postModel.findByIdAndDelete(postId);
    res.json('Пост успешно удален');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось удалить пост' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      _id: req.body.id,
      title,
      text,
      imageUrl,
    };
    await postModel.findByIdAndUpdate(postId, updatedPost);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить статью' });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить статью' });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    const index = post.likes.findIndex(
      (userId) => userId === String(req.userId)
    );
    console.log(index);

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    await postModel.findByIdAndUpdate(postId, post);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось оценить пост' });
  }
};

export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const text = req.body.text;
    const userId = req.userId;
    const user = await userModel.findById(userId);

    const post = await postModel.findById(postId);
    const comment = {
      user: user.fullName,
      text,
      createdAt: new Date().toLocaleString(),
    };
    post.comments.push(comment);

    await postModel.findByIdAndUpdate(postId, post);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось добавить комментарий' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.body.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId);
    if (!post.comments.find((el) => el._id == commentId)) {
      return res.status(404).json('Не удалось найти комментарий');
    }
    const commentsAfterDelete = post.comments.filter(
      (el) => String(el._id) !== commentId
    );
    post.comments = [...commentsAfterDelete];

    await postModel.findByIdAndUpdate(postId, post);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить комментарий' });
  }
};
