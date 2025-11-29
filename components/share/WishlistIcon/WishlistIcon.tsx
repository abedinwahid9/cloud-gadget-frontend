import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const WishlistIcon = () => {
  const isWishlist = false;
  return (
    <div>
      {!isWishlist ? (
        <IoMdHeartEmpty className="text-badge size-8 border-[1px] rounded-full  border-badge cursor-pointer  p-1 transition" />
      ) : (
        <IoMdHeart className="text-badge size-8 border-[1px] rounded-full  border-badge cursor-pointer  p-1 transition" />
      )}
    </div>
  );
};

export default WishlistIcon;
