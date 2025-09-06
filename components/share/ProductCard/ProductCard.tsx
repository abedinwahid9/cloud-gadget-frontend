"use client";
import Image, { StaticImageData } from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";
import Link from "next/link";
import CustomBtn from "../CustomBtn/CustomBtn";

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
      <Link className="w-full" href={`/shop/${id}`}>
        <Image
          src={imageUrl}
          alt={title}
          className="object-contain  w-full h-20  md:h-[200px] border-amber-300 border-2 "
        />

        <div className="md:text-base text-xs font-semibold w-full text-center hover:underline h-8">
          {title.slice(0, 20)}
          {title.length > 20 && "..."}
        </div>
      </Link>{" "}
      <div className="bg-primary/25 capitalize text-xs md:text-base font-medium rounded-4xl px-2 md:my-1 my-0 text-secondary dark:text-nav">
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
      <CustomBtn
        title="add to cart"
        className="w-full rounded-t-none"
        handleBtn={() => handleBtn()}
      />
    </div>
  );
};
export default ProductCard;
