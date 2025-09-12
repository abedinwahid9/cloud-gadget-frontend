"use client";
import { useState } from "react";
import AddCategories, { Cats } from "./AddCategories/AddCategories";
import AddSubCate from "./AddSubCate/AddSubCate";
import CategoryTable from "@/components/share/CategoryTable/CategoryTable";

const CategoryPage = () => {
  const [category, setCategory] = useState<Cats[]>([]);

  const categoriesData = [
    {
      id: "cat1",
      name: "Phones & Tablets",
      subCategories: [
        { id: "sub1", name: "Smartphones" },
        { id: "sub2", name: "Tablets" },
      ],
    },
    {
      id: "cat2",
      name: "Laptops",
      subCategories: [{ id: "sub3", name: "Gaming Laptops" }],
    },
    {
      id: "cat3",
      name: "Laptops",
      subCategories: [],
    },
    {
      id: "cat4",
      name: "Laptops",
      subCategories: [],
    },
  ];

  return (
    <div className="space-y-3">
      <AddCategories setCategory={setCategory} />
      <AddSubCate category={category} />
      <CategoryTable
        data={categoriesData}
        onEditCategory={(id) => console.log("Edit Category", id)}
        onDeleteCategory={(id) => console.log("Delete Category", id)}
        onEditSubCategory={(catId, subId) =>
          console.log("Edit SubCategory", catId, subId)
        }
        onDeleteSubCategory={(catId, subId) =>
          console.log("Delete SubCategory", catId, subId)
        }
      />
      ;
    </div>
  );
};

export default CategoryPage;
