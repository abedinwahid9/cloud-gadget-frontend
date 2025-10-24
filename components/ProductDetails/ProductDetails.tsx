"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";

// Types
interface Variant {
  name: "color" | "size" | "material" | string;
  options: string[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  stock_quantity: number;
  variants?: Variant[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dispatch = useAppDispatch();

  const { id, price, discount = 0, title, stock_quantity, variants } = product;

  const handleQuantity = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };

  return (
    <div className="lg:w-1/2 w-full space-y-2">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-secondary dark:text-nav capitalize">
        {title}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-primary">{price}৳</span>
        {discount > 0 && (
          <span className="text-lg text-gray-400 line-through">
            {discount}৳
          </span>
        )}
      </div>

      {/* Wishlist */}
      <div className="flex items-center gap-4">
        <button className="border rounded-full p-2 hover:bg-gray-100">
          ❤️
        </button>
        {/* <span className="text-secondary dark:text-nav">Share :</span> */}
        {/* <div className="flex gap-2">
          <FaFacebookF className="cursor-pointer text-gray-600 hover:text-blue-600" />
          <FaTwitter className="cursor-pointer text-gray-600 hover:text-sky-500" />
          <FaLinkedinIn className="cursor-pointer text-gray-600 hover:text-blue-700" />
        </div> */}
      </div>

      {/* Highlights */}
      <div className="space-y-1 text-sm text-secondary dark:text-nav">
        <h3 className="font-semibold">Product Highlights</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Brand: JBL</li>
          <li>Model: Tune Flex 2 Ghost Edition</li>
          <li>Driver size: 12 mm / 0.47” Dynamic Driver</li>
          <li>6 Mics for Perfect Calls, Adaptive noise cancelling</li>
          <li>Up to 48 Hours total playback</li>
          <li>IP54 Rating, Pure Bass Sound, Multi-point Connection</li>
          <li>
            <strong>6 Months Brand Warranty</strong>
          </li>
        </ul>
      </div>

      {/* Stock */}
      {stock_quantity > 0 ? (
        <div className="flex items-center gap-2 text-primary font-medium">
          <span className="w-3 h-3 bg-primary rounded-full"></span>
          In Stock
        </div>
      ) : (
        <div className="flex items-center gap-2 text-badge font-medium">
          <span className="w-3 h-3 bg-badge rounded-full"></span>
          Out of Stock
        </div>
      )}

      {/* Variants */}
      {variants?.map((vari, i) => {
        if (vari.name === "color") {
          return (
            <div key={i}>
              <h4 className="font-medium mb-1">Color:</h4>
              <div className="flex gap-3">
                {vari.options?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedOption(color)}
                    className={`w-8 h-8 rounded border ${
                      selectedOption === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          );
        }

        if (vari.name === "size") {
          return (
            <div key={i}>
              <h4 className="font-medium mb-1">Size:</h4>
              <div className="flex gap-3">
                {vari.options?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedOption(size)}
                    className={`py-1 px-3 rounded border ${
                      selectedOption === size ? "ring-2 ring-black" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        if (vari.name === "material") {
          return (
            <div key={i}>
              <h4 className="font-medium mb-1">Material:</h4>
              <div className="flex gap-3">
                {vari.options?.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedOption(material)}
                    className={`py-1 px-3 rounded border ${
                      selectedOption === material ? "ring-2 ring-black" : ""
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => handleQuantity("dec")}
            className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => handleQuantity("inc")}
            className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <Button
          onClick={() =>
            dispatch(
              addToCart({
                id,
                title,
                qnt: quantity,
                price: price * quantity,
              })
            )
          }
          className="rounded-md bg-primary/50 py-5 hover:bg-secondary hover:text-nav text-secondary font-semibold md:text-lg text-sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
