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
      .skip(startIndex)
      .populate('user')
      .populate('comments.user');

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
    });
    await newPost.save();
    res.json({ ...newPost._doc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать пост' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(404).send(`No post with id: ${postId}`);
    const post = await postModel.findById(postId);
    await postModel.findByIdAndDelete(postId);
    res.json(post);
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
      // _id: req.body.id,
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
      text,
      avatarUrl: user.avatarUrl,
      createdAt: new Date(),
      user: userId,
    };
    post.comments.push(comment);

    await postModel.findByIdAndUpdate(postId, post);

    const updatedPost = await postModel
      .findById(postId)
      .populate('comments.user');
    const upDatedComment =
      updatedPost.comments[updatedPost.comments.length - 1];

    res.json({ ...upDatedComment._doc, postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось добавить комментарий' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.body.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId).populate('comments.user');
    const postCopy = { ...post._doc };
    if (!post.comments.find((el) => el._id == commentId)) {
      return res.status(404).json('Не удалось найти комментарий');
    }
    const commentsAfterDelete = post.comments.filter(
      (el) => String(el._id) !== commentId
    );
    post.comments = [...commentsAfterDelete];

    await postModel.findByIdAndUpdate(postId, post);

    res.json({ ...post, postId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось удалить комментарий' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { postId, commentId, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(404).send(`No post with id: ${id}`);

    const post = await postModel.findById(postId);
    const comments = post._doc.comments;
    const oldComment = post._doc.comments.find((el) => el._id == commentId);

    const updatedComment = { ...oldComment._doc, text };

    const anotherComments = comments?.filter(
      (comm) => String(comm._id) !== commentId
    );

    let updatedComments = [updatedComment, ...(anotherComments || [])];

    updatedComments = updatedComments.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const updatedPost = post._doc;
    updatedPost.comments = updatedComments;

    await postModel.findByIdAndUpdate(postId, updatedPost);

    res.json({ comment: 'ura' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось обновить комментарий' });
  }
};
