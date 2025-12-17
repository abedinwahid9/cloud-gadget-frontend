import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getWishList } from "./wishlistThunks";

export const getAuthMe = createAsyncThunk(
  "auth/getAuthMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );

      dispatch(getWishList());

      return res.data.payload;
    } catch (err) {
      return rejectWithValue(err.response?.data.payload || "Auth failed");
    }
  }
);
