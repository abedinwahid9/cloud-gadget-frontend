"use client";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import Title from "../share/Title/Title";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../share/CustomSkeleton/ProductSkeleton";
import ProductCard from "../share/ProductCard/ProductCard";
import { Product } from "../ProductsSection/ProductsSection";
import { motion, AnimatePresence } from "framer-motion";

const SearchBox = ({ searchToggle }: { searchToggle: boolean }) => {
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

  return (
    <AnimatePresence>
      {searchToggle && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 overflow-y-auto"
        >
          <motion.div
            key="search-container"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background w-full md:w-4/5 max-w-5xl rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="shadow-[0px_0px_2px_0.5px_#00a8a8] border-primary bg-background border-2 rounded-2xl flex flex-col max-h-full">
              {/* Search Input */}
              <div className="p-4 border-b border-primary/20">
                <div className="flex w-full">
                  <Input
                    placeholder="search product..."
                    className="h-10 w-4/5 rounded-r-none focus-visible:ring-0 placeholder:text-lg text-lg font-serif"
                  />
                  <button className="bg-secondary cursor-pointer w-1/5 group rounded-r-md flex justify-center items-center">
                    <FaSearch className={userIcons} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 max-h-[550px] overflow-y-auto">
                <Title text="Trending collection" />
                <div className="py-10 px-2 rounded-2xl">
                  {isLoading ? (
                    <motion.div
                      layout
                      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2"
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      layout
                      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2"
                    >
                      {data?.map((product: Product) => (
                        <ProductCard {...product} key={product.id} />
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBox;
