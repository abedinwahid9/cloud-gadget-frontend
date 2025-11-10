import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price_range: {
    max_Price: 0,
    min_Price: 0,
  },
};

const filterSlices = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    priceMax: (state, { payload }) => {
      state.price_range.max_Price = payload;
    },
    priceMin: (state, { payload }) => {
      state.price_range.min_Price = payload;
    },
  },
});

export const { priceMin, priceMax } = filterSlices.actions;

export default filterSlices.reducer;
