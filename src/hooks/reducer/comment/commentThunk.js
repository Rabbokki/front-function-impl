import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const API_BASE_URL = '/api/comment';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/api/comment/posts/${postId}/comment`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || '댓글 생성 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 특정 게시글의 댓글 가져오기
export const getCommentsByPostId = createAsyncThunk(
  'comment/getByPostId',
  async (postId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/posts/${postId}/comments`);
      console.log('getting comments')
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || '댓글 조회 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (commentId, thunkAPI) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/delete/${commentId}`, {
        withCredentials: true,
      });
      return commentId;
    } catch (error) {
      const errorMessage = error.response?.data?.error || '댓글 삭제 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
