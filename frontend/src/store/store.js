import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/slices/loginReducer';

export const store = configureStore({
  reducer: {
    auth,
  }
});

