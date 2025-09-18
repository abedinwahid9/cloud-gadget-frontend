"use client";
import Image, { StaticImageData } from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";
import Link from "next/link";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import img from "../../app/assets/img4.png";
import style from "./customdemo.module.css";

interface ProductCardProps {
  id: number;
  title: string;
  imageUrl: StaticImageData;
  price: number;
  oldPrice?: number;
  category?: string;
}

const ProductCard = ({
  id = 1,
  title = "hfdhsfhjd",
  imageUrl = img,
  price = 20,
  oldPrice = 30,
  category = "headphones",
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleBtn = () => {
    dispatch(addToCart({ id, name: title, qnt: 1, price }));
  };

  return (
    <div className="relative w-full mx-auto rounded-md  shadow-sm bg-[#f9f9f9] hover:shadow-[0px_0px_5px_2px_#00a8a8] transition flex flex-col">
      {/* Category Badge */}
      {category && (
        <div>
          <div
            className={`${style.tag} relative inline-block -top-1 -left-1 bg-gradient-to-r from-primary/60 via-secondary/60 to-badge/60 text-[10px] sm:text-xs md:text-base rounded-xl border-8  border-background py-0.5 px-3 text-secondary dark:text-nav font-semibold uppercase tracking-wide shadow-sm`}
          >
            {category}
          </div>
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/shop/${id}`}
        className="flex-1 flex items-center justify-center p-4"
      >
        <Image
          src={imageUrl}
          alt={title}
          className="object-contain h-28 sm:h-36 md:h-44"
        />
      </Link>

      {/* Product Info */}
      <div className="px-3 py-2 flex flex-col gap-1">
        {/* Title */}
        <Link href={`/shop/${id}`}>
          <p className="text-xs sm:text-sm md:text-base font-medium hover:underline">
            {title.slice(0, 25)}
            {title.length > 25 && "..."}
          </p>
        </Link>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm sm:text-base md:text-lg font-bold">
              ৳{price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 line-through ml-1.5">
                ৳{oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className="text-red-500 text-[10px] sm:text-xs md:text-sm"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Footer (Wishlist + Button) */}
      <div className="flex items-center justify-between  w-full">
        {/* Wishlist Heart */}
        <div className="w-1/4 flex items-center justify-center">
          <FaHeart className="text-red-500 cursor-pointer text-lg sm:text-2xl transition" />
        </div>

        {/* Add to Cart Button */}
        <div
          className={`${style.tag_btn} inline-block border-8 relative -bottom-1 -right-1 border-background   w-3/4 rounded-xl`}
        >
          <div className="rounded-[6px] overflow-hidden">
            <CustomBtn
              title="Add To Cart"
              className="bg-gradient-to-r from-primary/70 via-secondary/70 to-badge/70 text-white  text-xs sm:text-sm md:text-base font-semibold shadow-md  hover:opacity-90 w-full rounded-none"
              handleBtn={handleBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
