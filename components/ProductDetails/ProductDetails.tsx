"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const dispatch = useAppDispatch();

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="lg:w-1/2 w-full space-y-2">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-secondary dark:text-nav">
        JBL Tune Flex 2 Ghost Edition ANC True Wireless Earbuds
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-primary">11,990৳</span>
        <span className="text-lg text-gray-400 line-through">13,990৳</span>
      </div>

      {/* Wishlist + Share */}
      <div className="flex items-center gap-4">
        <button className="border rounded-full p-2 hover:bg-gray-100">
          ❤️
        </button>
        <span className="text-secondary dark:text-nav">Share :</span>
        <div className="flex gap-2">
          <FaFacebookF className="cursor-pointer text-gray-600 hover:text-blue-600" />
          <FaTwitter className="cursor-pointer text-gray-600 hover:text-sky-500" />
          <FaLinkedinIn className="cursor-pointer text-gray-600 hover:text-blue-700" />
        </div>
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
      <div className="flex items-center gap-2 text-primary font-medium">
        <span className="w-3 h-3 bg-primary rounded-full"></span> In Stock
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-1">Color:</h4>
        <div className="flex gap-3">
          {["black", "white", "purple"].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded border ${
                selectedColor === color ? "ring-2 ring-black" : ""
              }`}
              style={{
                backgroundColor:
                  color === "black"
                    ? "#000"
                    : color === "white"
                    ? "#fff"
                    : "purple",
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Quantity + Actions */}
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
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

        {/* Buttons */}
        <Button
          onClick={() =>
            dispatch(
              addToCart({ id: 0, name: "title", qnt: quantity, price: 100 * 1 })
            )
          }
          className="   rounded-md bg-primary/50 py-5  hover:bg-secondary hover:text-nav text-secondary font-semibold md:text-lg text-sm
      "
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
