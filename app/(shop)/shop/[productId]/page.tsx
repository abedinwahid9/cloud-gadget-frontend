import ProductPage from "@/components/ProductPage/ProductPage";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import React from "react";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  return (
    <div>
      <CustomBreadCrumb />
      page :{productId}
      <ProductPage />
    </div>
  );
};

export default page;
