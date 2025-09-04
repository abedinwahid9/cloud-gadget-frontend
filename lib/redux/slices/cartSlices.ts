import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  qnt: number;
}
interface PersistedData<T> {
  data: T;
  expiry: number;
}

const EXPIRY_DAYS = 30;
const EXPIRY_MS = 1000 * 60 * 60 * 24 * EXPIRY_DAYS;

const saveCart = (cart: CartItem[]) => {
  const payload: PersistedData<CartItem[]> = {
    data: cart,
    expiry: Date.now() + EXPIRY_MS,
  };
  localStorage.setItem("cart", JSON.stringify(payload));
};

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem("cart");

    if (!raw) return [];
    const parsed: PersistedData<CartItem[]> = JSON.parse(raw);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem("cart");
      return [];
    }
    return parsed.data;
  } catch {
    return [];
  }
};

const initialState: CartItem[] =
  typeof window !== "undefined" ? loadCart() : [];

const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.qnt += action.payload.qnt;
      } else {
        state.push(action.payload);
      }
      saveCart(state);
    },
    removeCart: (state, action) => {},
  },
});

export const { addToCart } = cartSlices.actions;

export default cartSlices.reducer;
