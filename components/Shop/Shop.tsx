import Options from "@/components/share/Options/Options";

import ProductsSection from "../ProductsSection/ProductsSection";
import FilterSideBar from "../share/FilterSideBar/FilterSideBar";
import { Button } from "../ui/button";
import { BsSliders } from "react-icons/bs";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

const option = [
  { value: "relevance", label: "Relevance" },
  { value: "price", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

const Shop = () => {
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
            <div className="pr-1.5 flex gap-1 justify-between">
              <div className="relative ">
                <Options items={option} />
              </div>
              <div className="overflow-auto">
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button className="bg-primary/35 text-secondary dark:text-nav">
                      <span className=" font-semibold ">Filter</span>
                      <BsSliders className=" font-semibold" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <FilterSideBar />
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
          {/* all card */}
          <ProductsSection />
        </div>
      </div>
    </main>
  );
};

export default Shop;
