import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

// 백엔드 API 기본 주소
const API_BASE_URL = '/api/posts';

// 게시글 생성
export const createPost = createAsyncThunk(
  'post/create',
  async (formData, thunkAPI) => {
    try {
      // Send the already built FormData directly to the backend
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
export const getAllPosts = createAsyncThunk('post/getAll', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API_BASE_URL);
    return response.data; // 게시글 목록 반환
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});

// 단일 게시글 조회
export const getPostById = createAsyncThunk('post/getById', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/find/${id}`);
    return response.data; // 단일 게시글 반환
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 상세 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});

// 게시글 수정
export const updatePost = createAsyncThunk(
  'post/update',
  async ({ id, dto, postImg }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
      postImg?.forEach((file) => formData.append('postImg', file));

      const response = await axiosInstance.patch(`${API_BASE_URL}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data; // 수정된 게시글 데이터 반환
    } catch (error) {
      const errorMessage = error.response?.data || '게시글 수정 실패';
      return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
    }
  }
);

// 게시글 삭제
export const deletePost = createAsyncThunk('post/delete', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`, { withCredentials: true });
    return id; // 삭제된 게시글 ID 반환
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 삭제 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});
