"use client";
import Options from "@/components/share/Options/Options";
import ProductsSection from "../ProductsSection/ProductsSection";
import FilterSideBar from "../share/FilterSideBar/FilterSideBar";
import { Button } from "../ui/button";
import { BsSliders } from "react-icons/bs";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import useDebounce from "@/hooks/useDebounce";
import Title from "../share/Title/Title";

const option = [
  { value: "default", label: "Default" },
  { value: "asc", label: "Sort by price: low to high" },
  { value: "desc", label: "Sort by price: high to low" },
];

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  // const [posts, setPosts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // price ranga filter
  const priceRange = useAppSelector((state) => state.filterSlices.price_range);
  const maxPrice = useDebounce(priceRange.max_Price, 600);
  const minPrice = useDebounce(priceRange.min_Price, 600);

  // 👇 useInfiniteQuery instead of useQuery
  // const {
  //   data: filters,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading: filterLoading,
  //   error,
  // } = useInfiniteQuery({
  //   queryKey: ["products", { filter, sort }],
  //   queryFn: async ({ pageParam = 1 }) => {
  //     const res = await axiosPublic.get(
  //       `/product?page=${pageParam}&limit=10&${filter}&${sort}`
  //     );
  //     return res.data;
  //   },
  //   getNextPageParam: (lastPage, allPages) => {
  //     // Example: API returns something like { data: [...], nextPage: 3, hasMore: true }
  //     return lastPage.hasMore ? allPages.length + 1 : undefined;
  //   },
  //   keepPreviousData: true,
  // });
  // console.log(filters);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 👇 Infinite scroll observer
  // useEffect(() => {
  //   if (!hasNextPage || isFetchingNextPage) return;

  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       fetchNextPage();
  //     }
  //   });

  //   const el = loadMoreRef.current;
  //   if (el) observer.observe(el);

  //   return () => {
  //     if (el) observer.unobserve(el);
  //   };
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const query = {
    fields: "id,title,price,images,category,discount",
    sortBy: "price",
    orderSort: sort === "default" ? "" : sort,
    maxPrice,
    minPrice,
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["products1", query],
    queryFn: async () => {
      const res = await axiosPublic.get("/product", { params: query });
      return res.data.allProduct;
    },
  });

  // infinite scroll observe

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
  //     if (loaderRef.current) observer.unobserve(loaderRef?.current);
  //   };
  // }, [loading]);

  return (
    <main className="pb-5 px-1.5">
      <div className="grid grid-cols-12 w-full h-full gap-1">
        {/* filter section */}
        <div className="col-span-3 hidden lg:block">
          <FilterSideBar />
        </div>
        {/* products section */}
        <div className="lg:col-span-9 col-span-12 ">
          {/* top */}
          <div className="flex justify-between lg:items-end items-start  py-2  flex-col md:flex-row gap-2">
            <div>
              {/* <Title text="All Products" /> */}
              <p className="md:text-base text-xs text-secondary dark:text-nav">
                search result ({data.length} items)
              </p>
            </div>
            <div className="lg:pr-1.5 pr-0 flex lg:gap-1 gap-2  justify-between lg:w-auto w-full">
              <div className="relative basis-full w-full">
                <Options onChange={(val) => setSort(val)} items={option} />
              </div>

              <div className="lg:hidden block basis-full w-full">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-primary/35 text-secondary dark:text-nav w-full rounded-md">
                      <SheetTitle className=" font-semibold ">
                        Filter
                      </SheetTitle>
                      <BsSliders className=" font-semibold" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[300px] h-auto   overflow-y-auto ">
                    <FilterSideBar />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          {/* all card */}
          <ProductsSection
            data={data}
            loading={loading}
            loaderRef={loaderRef}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default Shop;
