import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './hooks/reducer/account/accountSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
