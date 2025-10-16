import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageSelected: [],
};

const imageSelectedSlices = createSlice({
  name: "imageSelected",
  initialState: initialState,
  reducers: {
    setImageSeleted: (state, action) => {
      state.imageSelected = action.payload;
    },
  },
});

export const { setImageSeleted } = imageSelectedSlices.actions;

export default imageSelectedSlices.reducer;
