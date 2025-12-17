import { createSlice } from "@reduxjs/toolkit";
import { getAuthMe } from "../thunks/authThunks";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const initialState = {
  user: null as User | null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getAuthMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
