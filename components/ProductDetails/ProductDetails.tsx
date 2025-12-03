"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";
import WishlistIcon from "../share/WishlistIcon/WishlistIcon";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { Product } from "@/types/product";

// Types

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dispatch = useAppDispatch();

  const {
    id,
    price,
    discount = 0,
    title,
    images,
    stock_quantity,
    variants,
  } = product;

  const handleQuantity = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };
  const handleBtn = () => {
    dispatch(
      addToCart({ id, title: title, qnt: 1, price, imageUrl: images[0] })
    );
  };

  return (
    <div className="lg:w-1/2 w-full space-y-2">
      {/* Title */}
      <h1 className="text-2xl font-mono md:text-3xl font-semibold text-primary tracking-tighter dark:text-nav capitalize">
        {title}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <div className="text-primary dark:text-secondary ">
          <span className="text-sm sm:text-base md:text-2xl font-bold">
            ৳ {(price * (1 - discount / 100)).toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-base sm:text-xs text-gray-500 line-through ml-3">
              ৳ {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Wishlist */}
      <div className="flex items-center gap-4">
        <WishlistIcon productId={id} />
        {/* <span className="text-secondary dark:text-nav">Share :</span> */}
        {/* <div className="flex gap-2">
          <FaFacebookF className="cursor-pointer text-gray-600 hover:text-blue-600" />
          <FaTwitter className="cursor-pointer text-gray-600 hover:text-sky-500" />
          <FaLinkedinIn className="cursor-pointer text-gray-600 hover:text-blue-700" />
        </div> */}
      </div>

      {/* Highlights */}
      <div className="space-y-1 text-sm text-nav dark:text-nav">
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
        <div className="flex items-center gap-2 text-nav font-medium">
          <span className="w-3 h-3 bg-nav rounded-full"></span>({stock_quantity}
          ) In Stock
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
        <div className="flex items-center border overflow-hidden rounded-md">
          <button
            onClick={() => handleQuantity("dec")}
            className="px-3 py-1 text-lg font-bold cursor-pointer hover:bg-secondary/50"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => handleQuantity("inc")}
            className="px-3 py-1 text-lg cursor-pointer font-bold hover:bg-secondary/50"
          >
            +
          </button>
        </div>
        <div className=" w-1/3">
          <CustomBtn
            title="Add To Cart"
            className=" text-xs sm:text-sm md:text-base font-semibold shadow-md hover:opacity-90 w-full rounded-none"
            handleBtn={handleBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
