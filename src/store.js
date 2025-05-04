import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './hooks/reducer/account/accountSlice';
import postReducer from './hooks/reducer/post/postSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    posts: postReducer,
  },
});
