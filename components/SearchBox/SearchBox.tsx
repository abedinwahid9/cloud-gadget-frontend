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
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import useDebounce from "@/hooks/useDebounce";

interface SearchBoxProps {
  searchToggle: boolean;
  setSearchToggle: Dispatch<SetStateAction<boolean>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchToggle,
  setSearchToggle,
}) => {
  const axiosPublic = useAxiosPublic();
  const [searchBar, setSearchBar] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchBar, 500);

  const { data: trendingData = [], isLoading: trendingLoading } = useQuery({
    queryKey: ["trending-collection-search"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/product/collections/trending_collections`
      );
      return res.data.allProduct;
    },
  });

  // Fetch search results
  const {
    data: searchItem = [],
    isLoading: searchLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["search-item", debouncedSearch],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product?search=${debouncedSearch}`);
      return res.data.allProduct;
    },
    enabled: !!debouncedSearch,
  });

  // Combined product list based on search or trending
  const productList = useMemo(
    () => (debouncedSearch ? searchItem : trendingData),
    [debouncedSearch, searchItem, trendingData]
  );

  // Handle click outside to close search box
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchToggle &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setSearchToggle(false);
        setSearchBar("");
        return;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchToggle]);

  return (
    <AnimatePresence>
      {searchToggle && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 inset-0 z-20 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 overflow-y-auto"
        >
          <motion.div
            key="search-container"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background w-full md:w-4/5 max-w-5xl rounded-2xl shadow-lg overflow-hidden"
          >
            <div
              ref={ref}
              className="shadow-[0px_0px_2px_0.5px_#00a8a8] border-primary bg-background border-2 rounded-2xl flex flex-col max-h-full"
            >
              {/* Search Input */}
              <div className="p-4 border-b border-primary/20">
                <div className="flex w-full">
                  <Input
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="h-10 w-4/5 rounded-r-none focus-visible:ring-0 placeholder:text-lg text-lg font-serif"
                  />
                  <button
                    className="bg-secondary cursor-pointer w-1/5 group rounded-r-md flex justify-center items-center"
                    onClick={() => {}}
                    aria-label="Search button"
                  >
                    <FaSearch className="w-6 h-6 text-primary group-hover:text-nav" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 max-h-[550px] overflow-y-auto">
                <Title text="Trending collection" />
                <div className="py-10 px-2 rounded-2xl">
                  {trendingLoading || searchLoading ? (
                    <motion.div
                      layout
                      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2"
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                      ))}
                    </motion.div>
                  ) : isError ? (
                    <p>Error: {(error as Error).message}</p>
                  ) : productList.length > 0 ? (
                    <motion.div
                      layout
                      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2"
                    >
                      {productList.map((product: Product) => (
                        <ProductCard {...product} key={product.id} />
                      ))}
                    </motion.div>
                  ) : (
                    <h3 className="font-semibold font-mono text-nav">
                      No products found for &quot;{debouncedSearch}&quot;
                    </h3>
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
