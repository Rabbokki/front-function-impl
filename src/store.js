import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './hooks/reducer/account/accountSlice';
import postReducer from './hooks/reducer/post/postSlice';
import commentReducer from './hooks/reducer/comment/commentSlice';
import likeReducer from './hooks/reducer/like/likeSlice';
import flightReducer from "./hooks/reducer/flight/flightSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    posts: postReducer,
    comments: commentReducer,
    likes: likeReducer,
    flight: flightReducer,
  },
});
