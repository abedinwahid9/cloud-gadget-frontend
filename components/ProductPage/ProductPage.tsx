import React from "react";
import ProductCarosul from "../share/ProductCarosul/ProductCarosul";
import ProductDetails from "../ProductDetails/ProductDetails";
import SpecificationSection from "../share/SpecificationSection/SpecificationSection";
import Feature from "../share/Feature/Feature";
import { Product } from "@/types/product";

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <div className="flex justify-between lg:flex-row flex-col items-center gap-5 py-4">
        <ProductCarosul images={product.images} />
        <ProductDetails product={product} />
      </div>

      <div className="pb-5">
        <SpecificationSection
          title="Specifications"
          content={product.description}
        />
      </div>

      <div className="py-3">
        <Feature collection={product.collections} title="Relevant Collection" />
      </div>
    </>
  );
};

export default ProductPage;
