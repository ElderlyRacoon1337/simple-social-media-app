import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchMyPosts',
  async (id) => {
    const { data } = await axios.get(`${id}/posts`);
    return data;
  }
);

export const deletePost = createAsyncThunk('posts/delete', async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
});

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ id, value }) => {
    const { data } = await axios.post(`/posts/${id}/commentPost`, {
      text: value,
    });
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId }) => {
    const { data } = await axios.patch(`/posts/${postId}/commentPost`, {
      id: commentId,
    });
    return data;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ text, imageUrl }) => {
    const { data } = await axios.post(`/posts`, {
      text,
      imageUrl,
    });
    return data;
  }
);

const initialState = {
  posts: [],
  postsByUser: [],
  isPostsLoading: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsLoading(state, action) {
      state.isPostsLoading = action.payload;
    },
    changeComment(state, action) {
      state.postsByUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.isPostsLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isPostsLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.isPostsLoading = true;
    });

    builder.addCase(fetchPostsByUser.pending, (state) => {
      state.postsByUser = [];
      state.isPostsLoading = true;
    });
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.postsByUser = action.payload;
      state.isPostsLoading = false;
    });
    builder.addCase(fetchPostsByUser.rejected, (state) => {
      state.postsByUser = [];
      state.isPostsLoading = true;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.postsByUser = state.postsByUser.filter(
        (el) => el._id !== action.payload._id
      );

      if (state.posts.data?.length) {
        state.posts.data = state.posts.data.filter(
          (el) => el._id !== action.payload._id
        );
      }
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const existsInUser = state.postsByUser.find(
        (post) => post._id == action.payload.postId
      );
      const existsInAll = state.posts?.data?.find(
        (post) => post._id == action.payload.postId
      );

      if (existsInUser) {
        existsInUser.comments.push(action.payload);
      }

      if (existsInAll) {
        existsInAll.comments.push(action.payload);
      }
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.postsByUser.unshift(action.payload);
      state.isPostsLoading = false;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const existsInUser = state.postsByUser.find(
        (post) => post._id == action.payload.postId
      );
      const existsInAll = state.posts?.data?.find(
        (post) => post._id == action.payload.postId
      );

      if (existsInUser) {
        existsInUser.comments = action.payload._doc.comments;
      }

      if (existsInAll) {
        existsInAll.comments = action.payload._doc.comments;
      }
    });
  },
});

export const { setPostsLoading, changeComment } = postsSlice.actions;

export default postsSlice.reducer;
