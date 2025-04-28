import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducer/account/accountSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
