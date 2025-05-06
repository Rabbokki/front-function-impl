import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const LIKE_API_BASE_URL = '/like';

export const addLike = createAsyncThunk('like/add', async (postId, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${LIKE_API_BASE_URL}/${postId}`, {}, { withCredentials: true });
    return { postId };
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

export const getLikeStatus = createAsyncThunk('like/status', async (postId, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${LIKE_API_BASE_URL}/status/${postId}`, { withCredentials: true });
    return { postId, isLiked: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.error || '좋아요 상태 확인 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
