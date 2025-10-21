import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the state type

interface ImageSelectedState {
  imageSelected: Record<string, string>;
}

// ✅ Initial state
const initialState: ImageSelectedState = {
  imageSelected: {},
};

// ✅ Create slice
const imageSelectedSlice = createSlice({
  name: "imageSelected",
  initialState,
  reducers: {
    setImageSeleted: (
      state,
      action: PayloadAction<{ key: string; image: string }>
    ) => {
      const { key, image } = action.payload;
      state.imageSelected[key] = image;
    },
    removeSeletedImageAll: (state) => {
      state.imageSelected = {};
    },
    removeSingleImage: (state, action: PayloadAction<string>) => {
      delete state.imageSelected[action.payload];
    },
  },
});

// ✅ Export actions and reducer
export const { setImageSeleted, removeSeletedImageAll, removeSingleImage } =
  imageSelectedSlice.actions;

export default imageSelectedSlice.reducer;
