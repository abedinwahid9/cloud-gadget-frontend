interface Variant {
  name: "color" | "size" | "material" | string;
  options: string[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  productId: string;
  discount: number;
  stock_quantity: number;
  collections: string;
  description: string;
  images: string[];
  variants?: Variant[];
  category?: string;
  status: boolean;
}
