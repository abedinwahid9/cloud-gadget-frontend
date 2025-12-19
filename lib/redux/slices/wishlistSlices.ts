import { createSlice } from "@reduxjs/toolkit";
import { getWishList } from "../thunks/wishlistThunks";
import { WishlistItem } from "@/types/wishlist";

interface WishlistState {
  wishlist: WishlistItem[] | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: WishlistState = {
  wishlist: null,
  loading: true,
  error: null,
};

const wishlistSlices = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(getWishList.rejected, (state) => {
        state.loading = false;
        state.wishlist = null;
      });
  },
});

export const {} = wishlistSlices.actions;

export default wishlistSlices.reducer;
