import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Cart item type
export interface CartItem {
  id: number;
  name: string;
  qnt: number;
  price: number;
  imageUrl?: string;
  category?: string;
  variant?: string;
  addedAt?: number;
}

// Cart state with totals
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Persisted data in localStorage
interface PersistedData {
  data: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  expiry: number;
}

const EXPIRY_DAYS = 30;
const EXPIRY_MS = 1000 * 60 * 60 * 24 * EXPIRY_DAYS;

// Calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.qnt,
    0
  );
  const totalQuantity = items.reduce((acc, item) => acc + item.qnt, 0);
  return { totalPrice, totalQuantity };
};

// Save cart to localStorage
const saveCart = (state: CartState) => {
  const payload: PersistedData = {
    data: state.items,
    totalPrice: state.totalPrice,
    totalQuantity: state.totalQuantity,
    expiry: Date.now() + EXPIRY_MS,
  };
  localStorage.setItem("cart", JSON.stringify(payload));
};

// Load initial state from localStorage
const loadInitialState = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }

  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return { items: [], totalQuantity: 0, totalPrice: 0 };

    const parsed: PersistedData = JSON.parse(raw);

    if (Date.now() > parsed.expiry) {
      localStorage.removeItem("cart");
      return { items: [], totalQuantity: 0, totalPrice: 0 };
    }

    return {
      items: parsed.data,
      totalQuantity: parsed.totalQuantity,
      totalPrice: parsed.totalPrice,
    };
  } catch {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

// Initial state
const initialState: CartState = loadInitialState();

// Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.qnt += action.payload.qnt;
      } else {
        state.items.push(action.payload);
      }

      // Update totals
      const totals = calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;

      saveCart(state);
    },

    removeCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;

      saveCart(state);
    },

    incrementQnt: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qnt += 1;

      const totals = calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;

      saveCart(state);
    },

    decrementQnt: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.qnt <= 1) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.qnt -= 1;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;

      saveCart(state);
    },
  },
});

export const { addToCart, removeCart, incrementQnt, decrementQnt } =
  cartSlice.actions;
export default cartSlice.reducer;
