"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlices";
import Link from "next/link";
import CustomBtn from "../CustomBtn/CustomBtn";
import style from "./productcard.module.css";
import WishlistIcon from "../WishlistIcon/WishlistIcon";
import { Product } from "@/types/product";

const ProductCard: React.FC<Product> = ({
  id,
  title,
  images,
  price,
  discount = 0,
  category,
}) => {
  const dispatch = useAppDispatch();

  const handleBtn = () => {
    dispatch(
      addToCart({ id, title: title, qnt: 1, price, imageUrl: images[0] })
    );
  };

  return (
    <div className="relative w-full max-w-[250px] mx-auto rounded-xl shadow-sm bg-gradient-to-tr from-text/20 to-secondary/20  transition flex flex-col group">
      {/* Category Badge */}
      <div className="relative">
        <div
          className={`${style.tag} relative inline-block -top-1 -left-1 bg-gradient-to-tr from-nav/20 to-secondary/20  text-[10px] sm:text-xs md:text-base rounded-xl border-8 border-background py-0.5 px-3 text-primary dark:text-nav font-semibold uppercase tracking-wide`}
        >
          {category && category}
        </div>
        {discount > 0 && (
          <span className="border-2 bg-text/10 border-dashed border-nav relative md:left-5 md:-top-1 top-0 left-8 text-xs px-3 py-0.5 text-nav font-semibold rounded-xl font-mono">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Image with hover effect */}
      <Link
        href={`/shop/product/${id}`}
        className="flex-1 flex items-center justify-center p-2 relative"
      >
        {/* Image 1 */}
        <Image
          src={images[0] || "/placeholder.png"}
          alt={title}
          width={500}
          height={500}
          className={`object-contain w-full h-28 sm:h-36 md:h-44 transition-opacity duration-500 ease-in-out ${
            images.length > 1 && "group-hover:opacity-0"
          }`}
        />

        {/* Image 2 (hover) */}
        {images[1] && (
          <Image
            src={images[1] || "/placeholder.png"}
            alt={title}
            width={500}
            height={500}
            className="object-contain w-full h-28 sm:h-36 md:h-44 absolute top-2 left-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="px-2 flex flex-col gap-1">
        {/* Title */}
        <Link href={`/shop/product/${id}`}>
          <p className="text-xs sm:text-sm md:text-base font-medium hover:underline truncate text-primary dark:text-nav">
            {title}
          </p>
        </Link>

        {/* Price + Rating */}
        <div className="flex items-start flex-col w-full">
          <div className="text-primary dark:text-secondary ">
            <span className="text-sm sm:text-base md:text-lg font-bold">
              ৳ {(price * (1 - discount / 100)).toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-base sm:text-xs text-gray-500 line-through ml-3">
                ৳ {price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex w-full justify-end gap-1">
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
      <div className="flex items-center justify-between w-full pt-1 ">
        {/* Wishlist Heart */}
        <div className="w-1/4  flex items-center justify-center ">
          <WishlistIcon productId={id} />
        </div>

        {/* Add to Cart Button */}
        <div
          className={`${style.tag_btn} inline-block border-8 relative -bottom-1 -right-1 border-background w-3/4 rounded-xl`}
        >
          <div className="rounded-[6px] overflow-hidden">
            <CustomBtn
              title="Add To Cart"
              className="  text-xs sm:text-sm md:text-base font-semibold shadow-md hover:opacity-90 w-full rounded-none"
              handleBtn={handleBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
