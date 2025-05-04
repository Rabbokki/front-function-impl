import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './hooks/reducer/account/accountSlice';
import flightReducer from "./hooks/reducer/flight/flightSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    flight: flightReducer,
  },
});
