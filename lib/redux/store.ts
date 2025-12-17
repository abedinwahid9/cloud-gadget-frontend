import cartReducer from "./slices/cartSlices";
import imageSeletedReducer from "./slices/imageSeletedSlices";
import filterSlices from "./slices/filterSlices";
import authSlices from "./slices/authSlices";
import wishlistSlices from "./slices/wishlistSlices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  //add all your reducers here
  cart: cartReducer,
  imageSelete: imageSeletedReducer,
  filterSlices: filterSlices,
  wishlistSlices: wishlistSlices,
  authSlices: authSlices,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
