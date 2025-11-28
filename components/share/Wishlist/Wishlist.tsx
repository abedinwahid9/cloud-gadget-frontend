"use client";

import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const Wishlist = ({ css }: { css: string }) => {
  const pathname = usePathname();

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
        5
      </span>
    </div>
  );
};

export default Wishlist;
