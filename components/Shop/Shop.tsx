"use client";
import Options from "@/components/share/Options/Options";

import ProductsSection from "../ProductsSection/ProductsSection";
import FilterSideBar from "../share/FilterSideBar/FilterSideBar";
import { Button } from "../ui/button";
import { BsSliders } from "react-icons/bs";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";

export interface Products {
  id: number | boolean;
  price: number | boolean;
  title: string | boolean;
  images: string[] | boolean;
  category: string | boolean;
  discount: number | boolean;
}

const option = [
  { value: "relevance", label: "Relevance" },
  { value: "price", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

const Shop = () => {
  const axiosPublic = useAxiosPublic();

  const query: Products = {
    id: true,
    price: true,
    title: true,
    images: true,
    category: true,
    discount: true,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products1"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product", { params: query });
      return res.data.allProduct;
    },
  });

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
              <h2 className="text-3xl  font-semibold text-secondary dark:text-nav">
                All Products
              </h2>
              <p className="md:text-base text-xs text-secondary dark:text-nav">
                search result (244 items)
              </p>
            </div>
            <div className="lg:pr-1.5 pr-0 flex lg:gap-1 gap-2  justify-between lg:w-auto w-full">
              <div className="relative basis-full w-full">
                <Options items={option} />
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
          <ProductsSection data={data} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
};

export default Shop;
