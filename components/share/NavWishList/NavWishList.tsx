"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppSelector } from "@/lib/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const Wishlist = ({ css }: { css: string }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.authSlices);

  const useAxios = useAxiosPublic();
  const { data = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await useAxios.get(`/wishlist/${user?.id}`);
      return res.data.wishlistProducts;
    },
    enabled: !!user,
  });

  return (
    <div className="relative">
      <FaHeart
        className={`${pathname === "/wishlist" ? "!text-nav" : ""} ${css} `}
      />
      <span
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        className="absolute text-xs font-bold tabular-nums leading-none text-primary"
      >
        {user ? data.length : 0}
      </span>
    </div>
  );
};

export default Wishlist;
