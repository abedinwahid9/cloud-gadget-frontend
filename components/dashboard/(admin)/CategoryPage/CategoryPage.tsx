"use client";
import { useState } from "react";

import AddCategories from "../AddCategories/AddCategories";

const CategoryPage = () => {
  const [category, setCategory] = useState<string[]>([]);
  console.log("cate", category);

  return (
    <div>
      <AddCategories setCategory={setCategory} />
    </div>
  );
};

export default CategoryPage;
