import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

export const saveTravelPlan = createAsyncThunk(
  'travelPlan/save',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/travel-plans', planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 여행 목록 불러오기
export const fetchMyTravelPlans = createAsyncThunk(
  'travelPlan/fetchMyPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/travel-plans/mine'); // 경로는 백엔드에 맞게 수정
      return response.data; // [{id, title, startDate, endDate, city, status}, ...]
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
