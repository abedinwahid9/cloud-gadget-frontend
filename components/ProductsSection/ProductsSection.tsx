/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import img2 from "@/app/assets/img3.png";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

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

  const getData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=8`
    );
    const data = await res.json();

    setPosts((prev) => [...prev, ...data]); // append, don’t replace
    setLoading(false);
  };

  // fetch posts when page changes
  useEffect(() => {
    getData();
  }, [page]);

  // detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Show skeleton only on initial load (no posts yet)
  if (posts.length === 0) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex flex-col gap-0.5 " key={i}>
            <Skeleton className="h-[300px]  rounded-t-md rounded-b-none bg-primary/25" />
            <div className="space-y-2">
              <Skeleton className=" h-[50px] rounded-b-md rounded-t-none bg-primary/25" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0">
      {posts.map((post, i) => (
        <ProductCard
          title={post.title}
          imageUrl={img2}
          price={45}
          oldPrice={50}
          category="headphone"
          key={post.id || i}
        />
      ))}

      {/* ✅ Show loader only when fetching next page */}
      {loading && (
        <p className="col-span-full text-center py-4 text-secondary dark:text-nav font-semibold">
          Loading more...
        </p>
      )}
    </div>
  );
};

export default ProductsSection;
