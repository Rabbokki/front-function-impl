import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const LIKE_API_BASE_URL = '/api/like';

export const addLike = createAsyncThunk('like/add', async (postId, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${LIKE_API_BASE_URL}/${postId}`, {}, { withCredentials: true });
    return { postId };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 추가 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const addCommentLike = createAsyncThunk('like/commentAdd', async (commentId, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${LIKE_API_BASE_URL}/comment/${commentId}`, {}, { withCredentials: true });
    console.log('from likeThunk: addCommentLike called')
    return { commentId };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 추가 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const removeLike = createAsyncThunk('like/remove', async (postId, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${LIKE_API_BASE_URL}/${postId}`, { withCredentials: true });
    return { postId };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 제거 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const removeCommentLike = createAsyncThunk('like/commentRemove', async (commentId, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${LIKE_API_BASE_URL}/comment/${commentId}`, { withCredentials: true });
    console.log('from likeThunk: removeCommentLike called')
    return { commentId };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 제거 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getLikeStatus = createAsyncThunk('like/status', async (postId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${LIKE_API_BASE_URL}/status/${postId}`, { withCredentials: true });
    return { postId, isLiked: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 상태 확인 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getCommentLikeStatus = createAsyncThunk('like/commentStatus', async (commentId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${LIKE_API_BASE_URL}/commentStatus/${commentId}`, { withCredentials: true });
    return { commentId, isLiked: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 상태 확인 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
