"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button
import { FaHeart, FaStar } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  imageUrl: StaticImageData;
  price: number;
  oldPrice?: number;
  category?: string;
}

const ProductCard = ({
  title,
  imageUrl,
  price,
  oldPrice,
  category,
}: ProductCardProps) => {
  // shadow-[0px_0px_50px_15px_00A8A8]
  return (
    <div className="rounded-xl border-2 border-secondary dark:border-nav p-2 hover:shadow-['0px_0px_50px_15px_#00A8A8'] relative flex flex-col items-center gap-1 select-none">
      <Image
        src={imageUrl}
        alt={title}
        className="object-contain  w-full h-16  md:h-[200px]"
      />

      <div className="text-sm font-semibold truncate w-full text-center">
        {title}
      </div>
      <div className="bg-primary/25 capitalize text-xs md:text-base font-medium rounded-4xl px-2 text-secondary">
        {category}
      </div>
      <div className="text-center">
        <span className="md:text-lg text-sm font-bold">
          ৳{price.toFixed(2)}
        </span>
        {oldPrice && (
          <span className="md:text-sm text-[10px] text-gray-500 line-through ml-2">
            ৳{oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} className="text-red-500 md:text-sm text-xs" />
          ))}
      </div>

      <div className="absolute top-4 right-4">
        <FaHeart className=" md:text-xl  text-lg cursor-pointer text-red-500 transition" />
      </div>

      <Button
        className="w-full mt-2 rounded-b-xl rounded-t-none bg-primary  hover:bg-secondary hover:text-nav text-secondary font-semibold md:text-lg text-sm
      "
      >
        Add to Cart
      </Button>
    </div>
  );
};
export default ProductCard;
