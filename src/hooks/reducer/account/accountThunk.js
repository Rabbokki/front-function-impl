import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 회원가입 요청 thunk
export const registerAccount = createAsyncThunk(
  'account/register',
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/accounts/register', signupData);
      return response.data; // 성공했을 때 서버 응답
    } catch (error) {
      return rejectWithValue(error.response.data); // 실패했을 때 에러 내용
    }
  }
);

// 로그인 요청 추가 ✨
export const loginAccount = createAsyncThunk(
  'account/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/accounts/login', loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
