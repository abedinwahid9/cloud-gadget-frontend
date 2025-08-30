import AdsBanner from "@/components/share/AdsBanner/AdsBanner";
import img from "@/app/assets/cover5.png";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

import Options from "@/components/share/Options/Options";
import Range from "@/components/share/Range/Range";
import ProductCard from "@/components/share/ProductCard/ProductCard";
import img2 from "@/app/assets/img3.png";
import CheckBoxCustom from "@/components/share/CheckBoxCustom/CheckBoxCustom";

const option = [
  { value: "relevance", label: "Relevance" },
  { value: "price", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

const page = () => {
  const image = [img];
  return (
    <div className="w-full  container mx-auto ">
      <div className="">
        <AdsBanner images={image} />
      </div>
      <CustomBreadCrumb />
      <main className="pb-5 px-1">
        <div className="grid grid-cols-12 w-full h-full gap-1">
          {/* filter section */}
          <div className="col-span-3 hidden lg:block">
            <div className="my-2 mx-4">
              <h2 className="text-3xl  font-semibold text-secondary dark:text-nav">
                Filter
              </h2>
              <p className="md:text-base text-xs text-secondary dark:text-nav">
                get own custom items
              </p>
              <Separator className=" bg-secondary dark:bg-nav w-full h-[1px] " />
              <div className="my-2">
                {/* price range */}
                <Range className="bg-secondary h-[1px]" />
              </div>
              <div>
                {/* select brand name */}
                <CheckBoxCustom />
              </div>
            </div>
          </div>
          {/* products section */}
          <div className="lg:col-span-9 col-span-12 ">
            {/* top */}
            <div className="flex justify-between lg:items-end items-start my-2 lg:mx-2 mx-1 flex-col lg:flex-row gap-2">
              <div>
                <h2 className="text-3xl  font-semibold text-secondary dark:text-nav">
                  All Products
                </h2>
                <p className="md:text-base text-xs text-secondary dark:text-nav">
                  search result (244 items)
                </p>
              </div>
              <div className="relative">
                <Options items={option} />
              </div>
            </div>
            {/* all card */}
            <div className="grid lg:grid-cols-3 grid-cols-2  gap-2 lg:pr-1 pr-0">
              {Array.from({ length: 20 }).map((_, i) => {
                return (
                  <ProductCard
                    title="Transparent power bank with headset"
                    imageUrl={img2} // make sure this exists in public/
                    price={45}
                    oldPrice={45}
                    category="headphone"
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
