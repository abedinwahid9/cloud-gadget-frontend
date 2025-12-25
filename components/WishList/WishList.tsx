"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import ProductCard from "../share/ProductCard/ProductCard";
import NotFound from "../share/NotFound/NotFound";
import ProductSkeleton from "../share/CustomSkeleton/ProductSkeleton";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { WishlistItem } from "@/types/wishlist";
import { addToCart } from "@/lib/redux/slices/cartSlices";

const WishList = () => {
  const { wishlist = [], loading } = useAppSelector(
    (state) => state.wishlistSlices
  );
  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:pr-1 pr-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!wishlist) {
    return <NotFound />;
  }

  const wishListHandle = () => {
    wishlist.forEach((item) => {
      dispatch(addToCart({ ...item, qnt: 1 }));
    });
  };

  return (
    <div className="space-y-3 flex  flex-col items-center">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 px-2 h-auto">
        {wishlist?.map((item: WishlistItem) => (
          <div key={item.id} className="relative">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <CustomBtn
          handleBtn={wishListHandle}
          className="w-full"
          title="all add to cart"
        />
      </div>
    </div>
  );
};

export default WishList;
