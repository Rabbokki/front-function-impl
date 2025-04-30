import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from './postThunk';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPostState(state) {
      state.post = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 전체 게시글 가져오기
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 단일 게시글 가져오기
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 게시글 생성
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts.unshift(action.payload); // 리스트에 바로 추가
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 게시글 수정
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // 수정된 게시글을 기존 게시글 목록에 반영
        state.posts = state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 게시글 삭제
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPostState } = postSlice.actions;

export default postSlice.reducer;
