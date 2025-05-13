import { createSlice } from '@reduxjs/toolkit';
import {
  submitReview,
  getReviewsByPostId,
  deleteReview,
} from './reviewThunk';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  success: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviewState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 리뷰 조회
      .addCase(getReviewsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 리뷰 등록 또는 수정
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Update if exists, else push
        const existingIndex = state.reviews.findIndex(
          (review) => review.accountId === action.payload.accountId
        );
        if (existingIndex !== -1) {
          state.reviews[existingIndex] = action.payload;
        } else {
          state.reviews.push(action.payload);
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 리뷰 삭제
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Remove review by postId (only one review per post per user)
        state.reviews = state.reviews.filter(
          (review) => review.postId !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;