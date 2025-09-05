"use client";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button
import { FaHeart, FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";
import Link from "next/link";
import { toast } from "sonner";
import ToastCustom from "../ToastCustom/ToastCustom";

interface ProductCardProps {
  id: number;
  title: string;
  imageUrl: StaticImageData;
  price: number;
  oldPrice?: number;
  category?: string;
}

const ProductCard = ({
  id,
  title,
  imageUrl,
  price,
  oldPrice,
  category,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleBtn = () => {
    dispatch(addToCart({ id: id, name: title, qnt: 1, price: 100 * id }));
  };

  return (
    <div className="rounded-xl border-[1px] hover:border-0 border-secondary dark:border-nav p-2 hover:shadow-[0px_0px_5px_2px_#00a8a8] relative flex flex-col items-center gap-1 select-none">
      <Link href={`/shop/${id}`}>
        <Image
          src={imageUrl}
          alt={title}
          className="object-contain  w-full h-16  md:h-[200px]"
        />{" "}
        <div className="md:text-base text-sm font-semibold w-full text-center hover:underline">
          {title.slice(0, 20)}
          {title.length > 20 && "..."}
        </div>
      </Link>{" "}
      <div className="bg-primary/25 capitalize text-xs md:text-base font-medium rounded-4xl px-2 text-secondary dark:text-nav">
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
        onClick={() => handleBtn()}
        className="w-full mt-2 rounded-b-xl rounded-t-none bg-primary  hover:bg-secondary hover:text-nav text-secondary font-semibold md:text-lg text-sm
      "
      >
        Add to Cart
      </Button>
    </div>
  );
};
export default ProductCard;
