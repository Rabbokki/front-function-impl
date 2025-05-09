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
    // If you want to add a post manually to the posts list, you can use this action.
    addPostToList(state, action) {
      state.posts.unshift(action.payload); // Adds the post at the beginning of the list
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
        state.posts = action.payload; // Stores the list of posts
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
        if (!state.posts.some(post => post.id === action.payload.id)) {
          state.posts.unshift(action.payload);
        }
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
        state.posts.unshift(action.payload); // Adds the newly created post to the top of the list
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
        // Updates the post in the posts list
        state.posts = state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        );
        if (state.post && state.post.id === action.payload.id) {
          state.post = action.payload; // Updates the single post if it's being viewed
        }
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
        state.posts = state.posts.filter((p) => p.id !== action.payload); // Remove post from list
        if (state.post && state.post.id === action.payload) {
          state.post = null; // If the deleted post was the one being viewed, clear it
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPostState, addPostToList } = postSlice.actions;

export default postSlice.reducer;
