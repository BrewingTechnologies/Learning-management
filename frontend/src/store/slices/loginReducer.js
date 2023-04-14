import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register, verifyOtp } from './loginService'

export const userSignup = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const userVerifyOtp = createAsyncThunk(
  'auth/verify',
  async (otp, thunkAPI) => {
    try {
      return await verifyOtp(otp)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const userLogin = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  message: '',
  isError: false,
}

const userLoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.pending, (state) => {
      state.isLoading = true;
    }).addCase(userSignup.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = '';
      state.isError = false
    }).addCase(userSignup.rejected, (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
      state.isError = true
    }).addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    }).addCase(userLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = '';
      state.isError = false
    }).addCase(userLogin.rejected, (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
      state.isError = true
    }).addCase(userVerifyOtp.pending, (state) => {
      state.isLoading = true;
    }).addCase(userVerifyOtp.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = '';
      state.isError = false
    }).addCase(userVerifyOtp.rejected, (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
      state.isError = true
    })
  }
})

export const { reset } = userLoginSlice.actions;

export default userLoginSlice.reducer;