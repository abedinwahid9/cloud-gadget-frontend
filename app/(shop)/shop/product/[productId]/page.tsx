import ProductPage from "@/components/ProductPage/ProductPage";
import CustomBreadCrumb from "@/components/share/CustomBreadCrumb/CustomBreadCrumb";
import React from "react";

const Page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="container mx-auto md:px-5 px-2">
        <p className="text-red-500">Failed to load product details.</p>
      </main>
    );
  }

  const data = await res.json();
  const product = data.productById;

  return (
    <main className="container mx-auto md:px-5 px-2">
      <CustomBreadCrumb />
      <ProductPage product={product} />
    </main>
  );
};

export default Page;
