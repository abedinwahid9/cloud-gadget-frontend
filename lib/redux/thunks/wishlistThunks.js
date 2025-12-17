import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWishList = createAsyncThunk(
  "wishlist/user",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/me`,
        {
          withCredentials: true,
        }
      );
      return res.data.wishlistProducts;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data.payload || "wishlist failed"
      );
    }
  }
);
