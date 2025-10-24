import React from "react";
import ProductCarosul from "../share/ProductCarosul/ProductCarosul";
import ProductDetails from "../ProductDetails/ProductDetails";
import SpecificationSection from "../share/SpecificationSection/SpecificationSection";
import Feature from "../share/Feature/Feature";

interface Variant {
  name: "color" | "size" | "material" | string;
  options: string[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  stock_quantity: number;
  collections: string;
  description: string;
  images: string[];
  variants?: Variant[];
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const { images, description, collections } = product;

  console.log(product);

  return (
    <>
      <div className="flex justify-between lg:flex-row flex-col items-center gap-5 py-4">
        <ProductCarosul images={images} />
        <ProductDetails product={product} />
      </div>

      <div className="pb-5">
        <SpecificationSection title="Specifications" content={description} />
      </div>

      <div className="py-3">
        <Feature collection={collections} title="Relevant Collection" />
      </div>
    </>
  );
};

export default ProductPage;
