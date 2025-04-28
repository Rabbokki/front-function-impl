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
