import { Separator } from "@/components/ui/separator";
import Options from "@/components/share/Options/Options";
import Range from "@/components/share/Range/Range";
import CheckBoxCustom from "@/components/share/CheckBoxCustom/CheckBoxCustom";
import ProductsSection from "../ProductsSection/ProductsSection";

const option = [
  { value: "relevance", label: "Relevance" },
  { value: "price", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

const brands = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

const mobileBrands = [
  {
    id: "apple",
    label: "Apple",
  },
  {
    id: "samsung",
    label: "Samsung",
  },
  {
    id: "google",
    label: "Google",
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
  },
  {
    id: "oneplus",
    label: "OnePlus",
  },
  {
    id: "huawei",
    label: "Huawei",
  },
  {
    id: "oppo",
    label: "Oppo",
  },
  {
    id: "vivo",
    label: "Vivo",
  },
  {
    id: "motorola",
    label: "Motorola",
  },
  {
    id: "nokia",
    label: "Nokia",
  },
];

const Shop = () => {
  return (
    <main className="pb-5 px-1.5">
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
            <div className="my-4">
              {/* price range */}
              <Range className="bg-secondary h-[1px]" />
            </div>
            <div>
              {/* select brand name */}
              <CheckBoxCustom title="Brand" items={brands} />
            </div>
            <div className="my-4">
              {/* select categories name */}
              <CheckBoxCustom title="Categories" items={mobileBrands} />
            </div>
          </div>
        </div>
        {/* products section */}
        <div className="lg:col-span-9 col-span-12 ">
          {/* top */}
          <div className="flex justify-between lg:items-end items-start  py-2  flex-col lg:flex-row gap-2">
            <div>
              <h2 className="text-3xl  font-semibold text-secondary dark:text-nav">
                All Products
              </h2>
              <p className="md:text-base text-xs text-secondary dark:text-nav">
                search result (244 items)
              </p>
            </div>
            <div className="relative pr-1.5">
              <Options items={option} />
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
