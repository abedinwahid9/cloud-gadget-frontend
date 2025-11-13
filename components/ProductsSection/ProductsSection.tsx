"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import type { RefObject } from "react";
import { Skeleton } from "../ui/skeleton";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
  discount?: number;
}
interface ProductsSectionProps {
  data: Product[];
  isLoading: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
  loading: boolean;
}

const ProductsSection = ({
  data,
  isLoading,
  loaderRef,
  loading,
}: ProductsSectionProps) => {
  if (isLoading || data.length === 0) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex flex-col gap-0.5" key={i}>
            <Skeleton className="h-[300px] rounded-t-md rounded-b-none bg-primary/25" />
            <div className="space-y-2">
              <Skeleton className="h-[50px] rounded-b-md rounded-t-none bg-primary/25" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0 h-auto">
      {data?.map((product: Product) => (
        <ProductCard {...product} key={product.id} />
      ))}

      <div ref={loaderRef} className="col-span-full">
        {loading && (
          <p className="text-center py-4 text-secondary dark:text-nav font-semibold">
            Loading more...
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;
