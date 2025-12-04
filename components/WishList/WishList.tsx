"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppSelector } from "@/lib/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../share/ProductCard/ProductCard";
import { Product } from "@/types/product";
import NotFound from "../share/NotFound/NotFound";

const WishList = () => {
  const { user } = useAppSelector((state) => state.authSlices);
  const useAxios = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await useAxios.get(`/wishlist/${user?.id}`);
      return res.data.wishlistProducts;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (data.length === 0) {
    return <NotFound />;
  }
  console.log(data);
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 px-2 h-auto">
      {data?.map((item: Product) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default WishList;
