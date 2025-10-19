import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the state type
interface ImageSelectedState {
  imageSelected: string[];
}

// ✅ Initial state
const initialState: ImageSelectedState = {
  imageSelected: [],
};

// ✅ Create slice
const imageSelectedSlice = createSlice({
  name: "imageSelected",
  initialState,
  reducers: {
    setImageSeleted: (state, action: PayloadAction<string[]>) => {
      state.imageSelected = action.payload;
    },
    removeSeletedImageAll: (state) => {
      state.imageSelected = [];
    },
    removeSingleImage: (state, action: PayloadAction<string>) => {
      state.imageSelected = state.imageSelected.filter(
        (img) => img !== action.payload
      );
    },
  },
});

// ✅ Export actions and reducer
export const { setImageSeleted, removeSeletedImageAll, removeSingleImage } =
  imageSelectedSlice.actions;

export default imageSelectedSlice.reducer;
