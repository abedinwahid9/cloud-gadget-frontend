import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppSelector } from "@/lib/redux/hooks";
import { redirect } from "next/navigation";

import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import ToastCustom from "../ToastCustom/ToastCustom";

const WishlistIcon = ({
  productId,
  title,
}: {
  productId: string;
  title: string;
}) => {
  const isWishlist = false;
  const user = useAppSelector((state) => state.authSlices.user);
  const axiosPublic = useAxiosPublic();

  const handleWishlist = async () => {
    if (!user?.email) return redirect("/login");
    const data = {
      userId: user?.id,
      productId: productId,
    };
    try {
      const res = await axiosPublic.post("/wishlist", data);

      if (res.status === 201) {
        ToastCustom(`${res.data.message} is ${title}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={handleWishlist}>
      {!isWishlist ? (
        <IoMdHeartEmpty className="text-badge size-8 border-[1px] rounded-full  border-badge cursor-pointer  p-1 transition" />
      ) : (
        <IoMdHeart className="text-badge size-8 border-[1px] rounded-full  border-badge cursor-pointer  p-1 transition" />
      )}
    </div>
  );
};

export default WishlistIcon;
