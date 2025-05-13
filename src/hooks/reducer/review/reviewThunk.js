import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const API_BASE_URL = '/reviews';

// 리뷰 생성 또는 수정
export const submitReview = createAsyncThunk(
  'review/submit',
  async ({ postId, review }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/${postId}`, review, {
        withCredentials: true,
      });
      return response.data.data; // Backend ResponseDto.data contains the actual review
    } catch (error) {
      const errorMessage = error.response?.data?.message || '리뷰 등록 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 특정 게시글의 모든 리뷰 가져오기
export const getReviewsByPostId = createAsyncThunk(
  'review/getByPostId',
  async (postId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/${postId}`);
      return response.data.data; // Assuming list of reviews is in ResponseDto.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || '리뷰 조회 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 리뷰 삭제
export const deleteReview = createAsyncThunk(
  'review/delete',
  async (postId, thunkAPI) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/${postId}`, {
        withCredentials: true,
      });
      return postId; // return postId so we know which one to remove
    } catch (error) {
      const errorMessage = error.response?.data?.message || '리뷰 삭제 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);