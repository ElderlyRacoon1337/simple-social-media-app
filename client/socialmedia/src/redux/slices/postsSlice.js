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

const initialState = {
  posts: [],
  postsByUser: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
    });

    builder.addCase(fetchPostsByUser.pending, (state) => {
      state.postsByUser = [];
    });
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.postsByUser = action.payload;
    });
    builder.addCase(fetchPostsByUser.rejected, (state) => {
      state.postsByUser = [];
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.postsByUser = state.postsByUser.filter(
        (el) => el._id !== action.payload._id
      );
    });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
