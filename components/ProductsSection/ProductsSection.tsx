"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import { useState, useEffect, useRef } from "react";
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
}

const ProductsSection = ({ data, isLoading }: ProductsSectionProps) => {
  // const [posts, setPosts] = useState<Product[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [loading, setLoading] = useState<boolean>(false);

  // const loaderRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   setPosts(data); // seed initial posts
  // }, [data]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && !loading) {
  //         setPage((prev) => prev + 1);
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (loaderRef.current) observer.observe(loaderRef.current);

  //   return () => {
  //     if (loaderRef.current) observer.unobserve(loaderRef.current);
  //   };
  // }, [loading]);

  if (isLoading) {
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

      {/* <div ref={loaderRef} className="col-span-full">
        {loading && (
          <p className="text-center py-4 text-secondary dark:text-nav font-semibold">
            Loading more...
          </p>
        )} */}
      {/* </div> */}
    </div>
  );
};

export default ProductsSection;
