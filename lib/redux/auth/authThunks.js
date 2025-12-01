import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuthMe = createAsyncThunk(
  "auth/getAuthMe",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );

      return res.data.payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data.payload || "Auth failed"
      );
    }
  }
);
