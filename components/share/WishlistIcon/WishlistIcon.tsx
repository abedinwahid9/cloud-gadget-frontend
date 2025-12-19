"use client";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getWishList } from "@/lib/redux/thunks/wishlistThunks";
import ToastCustom from "../ToastCustom/ToastCustom";

const WishlistIcon = ({
  productId,
  title,
}: {
  productId: string;
  title: string;
}) => {
  const user = useAppSelector((state) => state.authSlices.user);
  const { wishlist } = useAppSelector((state) => state.wishlistSlices);
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const wishlistSet = React.useMemo(
    () => new Set(wishlist?.map((item) => item.id)),
    [wishlist]
  );

  const isWishlist = wishlistSet.has(productId);

  const handleWishlist = async () => {
    if (loading) return;

    if (!user?.email) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosPublic.post("/wishlist", {
        userId: user.id,
        productId,
      });

      if (res.status === 201) {
        ToastCustom(`${title} ${res.data.message}`);
        dispatch(getWishList());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleWishlist}>
      {!isWishlist ? (
        <IoMdHeartEmpty className="text-badge size-8 border-[0.2px] rounded-full border-badge cursor-pointer p-1 transition" />
      ) : (
        <IoMdHeart className="text-badge size-8 border-[1px] rounded-full border-badge cursor-pointer p-1 transition" />
      )}
    </div>
  );
};

export default WishlistIcon;
