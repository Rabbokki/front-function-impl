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

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ accountId, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${API_BASE_URL}/users/update/${accountId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data; // 수정된 account 데이터 반환
    } catch (error) {
      const errorMessage = error.response?.data || '유저 수정 실패';
      return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
    }
  }
);

export const deleteUser = createAsyncThunk('admin/deleteUser', async (accountId, thunkAPI) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/users/delete/${accountId}`, { withCredentials: true });
    return accountId; // 삭제된 게시글 ID 반환
  } catch (error) {
    const errorMessage = error.response?.data || '유저 삭제 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});

export const getPostsByUserId = createAsyncThunk('admin/getPostsByUserId', async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/users/posts/${id}`);
    return response.data; // 단일 게시글 반환
  } catch (error) {
    const errorMessage = error.response?.data || '게시글 상세 조회 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});

export const deletePostByUserId = createAsyncThunk('admin/deletePostByUserId', async ({ postId, accountId}, thunkAPI) => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/posts/delete/${postId}?accountId=${accountId}`);
    return accountId; // 삭제된 게시글 ID 반환
  } catch (error) {
    const errorMessage = error.response?.data || '유저 삭제 실패';
    return thunkAPI.rejectWithValue(errorMessage); // 실패 시 에러 메시지 반환
  }
});