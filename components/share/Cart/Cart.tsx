"use client";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/redux/hooks";
import { FaCartArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Cart = ({ css }: { css: string }) => {
  const cartLength = useAppSelector((state) => state.cart.totalQuantity);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // prevent mismatch on SSR
    return (
      <div className="relative">
        <FaCartArrowDown className={css} />
      </div>
    );
  }

  return (
    <div className="relative">
      <FaCartArrowDown
        className={`${pathname === "/cart" ? "!text-nav" : ""} ${css} `}
      />
      <Badge className="h-5 w-5 absolute -top-2 -right-2 bg-badge text-primary rounded-full font-bold tabular-nums pointer-events-none">
        {cartLength}
      </Badge>
    </div>
  );
};

export default Cart;
