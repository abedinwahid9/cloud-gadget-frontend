/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import img2 from "@/app/assets/img3.png";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { data } from "@/public/data";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ProductsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const proructs = data;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // const getData = async () => {
  //   setLoading(true);
  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=8`
  //   );
  //   const data = await res.json();

  //   setPosts((prev) => [...prev, ...data]); // append data
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getData();
  // }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 } // 100% visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  // ✅ Show skeleton on first load
  if (posts.length === 0 && loading) {
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
      {proructs?.map((post, i) => (
        <ProductCard {...post} key={i} />
      ))}

      {/* ✅ Sentinel div for IntersectionObserver */}
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
