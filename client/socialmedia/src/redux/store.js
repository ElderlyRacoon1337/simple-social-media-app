import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: { posts: postReducer, user: userReducer },
});
