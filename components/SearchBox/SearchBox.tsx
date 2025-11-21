"use client";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { CardStyle } from "@/lib/utils/customCss";
import Title from "../share/Title/Title";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import ProductSkeleton from "../share/CustomSkeleton/ProductSkeleton";
import ProductCard from "../share/ProductCard/ProductCard";
import { Product } from "../ProductsSection/ProductsSection";

const SearchBox = () => {
  const userIcons = "w-6 h-6 text-primary group-hover:text-nav";

  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: ["trending-collection-search"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/product/collections/trending_collections`
      );
      return res.data.allProduct;
    },
  });

  console.log(data);

  return (
    <div
      className={`${CardStyle} backdrop:backdrop-blur-3xl bg-transparent dark:bg-transparent w-4/5 max-w-7xl  mx-auto my-20 p-5 rounded-2xl`}
    >
      <div className="flex w-full ">
        <Input
          placeholder="search product..."
          className="h-10 w-4/5 rounded-r-none focus-visible:ring-[0px] placeholder:text-lg text-lg font-serif"
        />
        <button className="  bg-secondary hover:border-l-0 cursor-pointer  hover:border-[1px] border-secondary w-1/5 group  rounded-r-md flex justify-center items-center">
          <FaSearch className={userIcons} />
        </button>
      </div>
      <div className="pt-5 ">
        <Title text="Trending collection" />
        <div className="h-[400px] overflow-x-scroll py-5 mt-5 px-2  rounded-2xl">
          {isLoading ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0 ">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0 ">
              {data?.map((product: Product) => {
                return <ProductCard {...product} key={product.id} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
