"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppSelector } from "@/lib/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../share/ProductCard/ProductCard";
import { Product } from "@/types/product";
import NotFound from "../share/NotFound/NotFound";
import ProductSkeleton from "../share/CustomSkeleton/ProductSkeleton";
import DeleteBtn from "../share/DeleteBtn/DeleteBtn";

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
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return <NotFound />;
  }
  const handleDelete = (id: string) => {
    console.log(id);
  };
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 px-2 h-auto">
      {data?.map((item: Product) => (
        <div className="space-y-1 " key={item.id}>
          <div className="backdrop-blur-3xl group hover:bg-nav/20 bg-secondary/20 rounded-lg w-full flex justify-center border-2 border-badge">
            <DeleteBtn action={() => handleDelete(item.id)} />
          </div>
          <ProductCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default WishList;
