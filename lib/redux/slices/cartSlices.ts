import { createSlice } from "@reduxjs/toolkit";
//  "id": "p1",
//         "title": "Wireless Earbuds",
//         "price": 49.99,
//         "qnt": 2,
//         "imageUrl": "/images/earbuds.png",
//         "category": "electronics",
//         "variant": "black",
// "addedAt": 1693640183521

interface CartItem {
  id: number;
  name: string;
  qnt: number;
  price: number;
  imageUrl?: string;
  category: string;
  variant: string;
  addedAt?: number;
}
interface PersistedData<T> {
  data: T;
  totalQuantity: number;
  totalPrice: number;
  expiry: number;
}

const EXPIRY_DAYS = 30;
const EXPIRY_MS = 1000 * 60 * 60 * 24 * EXPIRY_DAYS;

const calculateTotals = (items: CartItem[]) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.qnt, 0);

  return { totalPrice, totalQuantity };
};

const saveCart = (cart: CartItem[]) => {
  const { totalPrice, totalQuantity } = calculateTotals(cart);
  const payload: PersistedData<CartItem[]> = {
    data: cart,
    totalPrice,
    totalQuantity,
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
    // add to cart
    addToCart: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.qnt += action.payload.qnt;
      } else {
        state.push(action.payload);
      }
      saveCart(state);
    },
    // remover cart
    removeCart: (state, action) => {},
    // increment quantity by id
    incrementQnt: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.qnt += 1;
      }
      saveCart(state);
    },
    // decrement quantity by id
    decrementQnt: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);

      if (exists && exists.qnt <= 1) {
        const updated = state.filter((item) => item.id !== action.payload.id);
        saveCart(updated);
        return updated;
      }

      if (exists) {
        exists.qnt -= 1;
      }

      saveCart(state);
    },
  },
});

export const { addToCart, incrementQnt, decrementQnt } = cartSlices.actions;

export default cartSlices.reducer;
