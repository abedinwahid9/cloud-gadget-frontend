"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import type { RefObject } from "react";
import { Skeleton } from "../ui/skeleton";
import ProductSkeleton from "../share/CustomSkeleton/ProductSkeleton";

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
          <ProductSkeleton key={i} />
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
