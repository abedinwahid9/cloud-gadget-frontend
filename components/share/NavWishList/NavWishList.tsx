"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const Wishlist = ({ css }: { css: string }) => {
  const pathname = usePathname();
  const { wishlist = [] } = useAppSelector((state) => state.wishlistSlices);

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
        className="absolute text-xs font-bold tabular-nums leading-none text-primary pointer-events-none"
      >
        {wishlist ? wishlist.length : 0}
      </span>
    </div>
  );
};

export default Wishlist;
