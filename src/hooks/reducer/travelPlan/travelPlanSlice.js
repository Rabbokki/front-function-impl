import { createSlice } from '@reduxjs/toolkit';
import { saveTravelPlan, fetchMyTravelPlans } from './travelPlanThunk';

const initialState = {
  loading: false,
  success: false,
  error: null,
  myPlans: [],
};

const travelPlanSlice = createSlice({
  name: 'travelPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveTravelPlan.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(saveTravelPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveTravelPlan.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || '여행 일정 저장 실패';
      })
      .addCase(fetchMyTravelPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTravelPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.myPlans = action.payload;
      })
      .addCase(fetchMyTravelPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '여행 일정 불러오기 실패';
      });

      
  },
});



export default travelPlanSlice.reducer;
