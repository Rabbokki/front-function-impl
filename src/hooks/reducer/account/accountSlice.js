import { createSlice } from '@reduxjs/toolkit';
import { registerAccount, loginAccount, getAccountDetails } from './accountThunk';

const initialState = {
  loading: false,
  success: false,
  error: null,
  account: null,
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
      })
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || '로그인 실패';
      })
      .addCase(getAccountDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.account = action.payload;
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || '로그인 실패';
      });
  },
});

export default accountSlice.reducer;