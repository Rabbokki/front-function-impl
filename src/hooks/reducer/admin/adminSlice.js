import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, updateUser, deleteUser, getPostsByUserId } from "./adminThunk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    userPosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.accountId === updatedUser.accountId ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.users = state.users.filter((user) => user.accountId !== deletedId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get posts by user
      .addCase(getPostsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
        },
      });

export default adminSlice.reducer;
