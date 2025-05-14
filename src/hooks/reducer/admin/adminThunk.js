import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const API_BASE_URL = '/api/admin';

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/users`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
       },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});