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
  const wishlist = useAppSelector(
    (state) => state.wishlistSlices.wishlist ?? []
  );
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const wishlistSet = React.useMemo(
    () => new Set(wishlist.map((item) => item.id)),
    [wishlist]
  );

  const isWishlist = wishlistSet.has(productId);

  const handleWishlist = React.useCallback(async () => {
    if (loading) return;

    if (!user?.email) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = isWishlist
        ? await axiosPublic.delete(`/wishlist/${productId}`)
        : await axiosPublic.post("/wishlist", {
            userId: user.id,
            productId,
          });

      if ([200, 201, 204].includes(res.status)) {
        ToastCustom(`${title} ${res.data?.message || "updated"}`);
        dispatch(getWishList());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    user,
    isWishlist,
    productId,
    title,
    axiosPublic,
    dispatch,
    router,
  ]);

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={loading}
      aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className="disabled:opacity-50"
    >
      {isWishlist ? (
        <IoMdHeart className="text-badge size-8 border rounded-full border-badge p-1 transition" />
      ) : (
        <IoMdHeartEmpty className="text-badge size-8 border rounded-full border-badge p-1 transition" />
      )}
    </button>
  );
};

export default WishlistIcon;
