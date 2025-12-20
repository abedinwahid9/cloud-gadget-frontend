import { Product } from "./product";

export interface WishlistItem extends Product {
  userId: string;
}
