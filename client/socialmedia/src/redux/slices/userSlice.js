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

export const getMe = createAsyncThunk('user', async () => {
  const { data } = await axios.get('/user');
  return data;
});

export const fetchProfileData = createAsyncThunk('user/data', async (id) => {
  const { data } = await axios.get(`${id}`);
  return data;
});

const initialState = {
  userData: {},
  currentProfileData: {},
  isOwn: false,
  isProfileLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userData = {};
    },
    setOwn(state) {
      state.isOwn = true;
    },
    setNotOwn(state) {
      state.isOwn = false;
    },
    clearProfileData(state) {
      state.currentProfileData = {};
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
      // state.currentProfileData = action.payload;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.userData = [];
    });

    builder.addCase(fetchProfileData.pending, (state) => {
      state.currentProfileData = [];
      state.isProfileLoading = true;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.currentProfileData = action.payload;
      state.isProfileLoading = false;
    });
    builder.addCase(fetchProfileData.rejected, (state) => {
      state.currentProfileData = [];
      state.isProfileLoading = true;
    });
  },
});

export const { logout, setOwn, setNotOwn, clearProfileData } =
  userSlice.actions;

export default userSlice.reducer;
