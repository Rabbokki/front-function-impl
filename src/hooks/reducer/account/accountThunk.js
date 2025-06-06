import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

// 회원가입 요청 
export const registerAccount = createAsyncThunk(
  'account/register',
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/accounts/register', signupData);
      return response.data; // 성공했을 때 서버 응답
    } catch (error) {
      return rejectWithValue(error.response.data); // 실패했을 때 에러 내용
    }
  }
);

// 로그인 요청
export const loginAccount = createAsyncThunk(
  'account/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/accounts/login', loginData);
      return response.data; 
    } catch (error) {
      console.log("login error is: ", error)
      return rejectWithValue(error.response.data.error.message);
    }
  }
);


// 유저 디태일
export const getAccountDetails = createAsyncThunk(
  'account/getDetails',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/accounts/mypage', {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// 로그아웃 요청

export const logoutAccount = () => {
  ["accessToken", "refreshToken", "user"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};