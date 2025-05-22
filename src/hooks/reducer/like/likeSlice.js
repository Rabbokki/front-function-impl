import { createSlice } from '@reduxjs/toolkit';
import { addLike, removeLike, getLikeStatus } from './likeThunk';

const initialState = {
  likes: {}, // e.g. { [postId]: true/false }
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, isLiked } = action.payload;
        state.likes[postId] = isLiked;
      })
      .addCase(getLikeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        const { postId } = action.payload;
        state.likes[postId] = true;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        const { postId } = action.payload;
        state.likes[postId] = false;
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
