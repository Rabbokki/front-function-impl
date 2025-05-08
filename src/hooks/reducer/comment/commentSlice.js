import { createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getCommentsByPostId,
  deleteComment,
} from './commentThunk';

const initialState = {
  comments: [],
  loading: false,
  error: null,
  success: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearCommentState(state) {
      state.comments = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 댓글 가져오기
      .addCase(getCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 댓글 생성
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 댓글 삭제
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments = state.comments.filter(c => c.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCommentState } = commentSlice.actions;
export default commentSlice.reducer;
