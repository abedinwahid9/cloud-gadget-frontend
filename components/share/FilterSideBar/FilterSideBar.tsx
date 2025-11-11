import Range from "@/components/share/Range/Range";
import CheckBoxCustom from "@/components/share/CheckBoxCustom/CheckBoxCustom";
import { Separator } from "@/components/ui/separator";
import Title from "../Title/Title";

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

const FilterSideBar = () => {
  return (
    <div className="my-2 mx-4">
      <Title text="filter" />
      <p className="md:text-base text-xs text-primary font-medium dark:text-secondary capitalize">
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
  );
};

export default FilterSideBar;
