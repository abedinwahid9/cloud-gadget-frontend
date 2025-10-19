import cartReducer from "./slices/cartSlices";
import imageSeletedReducer from "./slices/imageSeletedSlices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  //add all your reducers here
  cart: cartReducer,
  imageSelete: imageSeletedReducer,
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
