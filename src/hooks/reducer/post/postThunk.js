import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

// 백엔드 API 기본 주소
const API_BASE_URL = '/api/posts';

// 게시글 생성
export const createPost = createAsyncThunk(
  'post/create',
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log("response.data from postThunk.js: ", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || '게시글 생성 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


// 전체 게시글 조회
export const getAllPosts = createAsyncThunk('post/getAll', async ({ category, search }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API_BASE_URL, {
      params: {category, search },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// 단일 게시글 조회
export const getPostById = createAsyncThunk('post/getById', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/find/${id}`);
    console.log("from postThunk, post is:", response.data)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 상세 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// 게시글 수정
export const updatePost = createAsyncThunk(
  'post/update',
  async ({ postId, formData }, thunkAPI) => {
    console.log("postId:", postId)
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      const response = await axiosInstance.patch(`${API_BASE_URL}/update/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || '게시글 수정 실패';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 게시글 삭제
export const deletePost = createAsyncThunk('post/delete', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`, { withCredentials: true });
    return id;
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 삭제 실패';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// 신고 처리
export const reportPost = createAsyncThunk("post/reportPost", async (postId) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/${postId}/reportAdd`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || '뷰 처리 실패';
    return errorMessage;
  }
});

// 뷰 처리
export const viewPost = createAsyncThunk("posts/viewPost", async (postId) => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/${postId}/view`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || '뷰 처리 실패';
    return errorMessage;
  }
});
