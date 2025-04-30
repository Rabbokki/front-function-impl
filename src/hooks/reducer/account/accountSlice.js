import { createSlice } from '@reduxjs/toolkit';
import { registerAccount } from './accountThunk';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || '회원가입 실패';
      });
  },
});

export default accountSlice.reducer;