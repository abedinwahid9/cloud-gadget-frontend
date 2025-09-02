"use client";

import ProductCard from "@/components/share/ProductCard/ProductCard";
import img2 from "@/app/assets/img3.png";
import { useState, useEffect } from "react";

const ProductsSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
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
      console.log(window.innerHeight);
      console.log(document.documentElement.scrollTop);
      console.log(document.documentElement.scrollHeight);
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

      {loading && (
        <p className="col-span-full text-center py-4">Loading more...</p>
      )}
    </div>
  );
};

export default ProductsSection;
