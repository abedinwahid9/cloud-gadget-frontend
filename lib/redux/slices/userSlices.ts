import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// State type
interface UserState {
  user: User | null;
  loading: boolean;
}

// Initial state
const initialState: UserState = {
  user: null,
  loading: true,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
