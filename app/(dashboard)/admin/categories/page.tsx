import AddCategories from "@/components/dashboard/(admin)/CategoryPage/AddCategories/AddCategories";
import AddSubCate from "@/components/dashboard/(admin)/CategoryPage/AddSubCate/AddSubCate";

import CategoryTable from "@/components/share/CategoryTable/CategoryTable";

import Title from "@/components/share/Title/Title";

const page = () => {
  return (
    <div className="space-y-3">
      <Title text="Categories" />
      <div className="space-y-3">
        <AddCategories />
        <AddSubCate />
        <CategoryTable />
      </div>
    </div>
  );
};

export default page;
