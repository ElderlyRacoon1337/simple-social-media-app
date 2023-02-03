import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const signUp = createAsyncThunk('user/signup', async (values) => {
  const { data } = await axios.post('/user/signup', values);
  localStorage.setItem('token', data.token);
  return data;
});

export const signIn = createAsyncThunk('user/signin', async (values) => {
  const { data } = await axios.post('/user/signin', values);
  localStorage.setItem('token', data.token);
  return data;
});

export const getMe = createAsyncThunk('user/', async () => {
  const { data } = await axios.get('/user');
  return data;
});

const initialState = {
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.userData = [];
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.userData = [];
    });

    builder.addCase(signIn.pending, (state) => {
      state.userData = [];
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.userData = [];
    });

    builder.addCase(getMe.pending, (state) => {
      state.userData = [];
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.userData = [];
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
