import ProductPage from "@/components/ProductPage/ProductPage";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import React from "react";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  return (
    <main className="container mx-auto md:px-5 px-2 ">
      <CustomBreadCrumb />
      page :{productId}
      <ProductPage />
    </main>
  );
};

export default page;
