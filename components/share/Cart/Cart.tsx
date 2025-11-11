"use client";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/redux/hooks";
import { FaCartArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";

const Cart = ({ css }: { css: string }) => {
  const cartLength = useAppSelector((state) => state.cart.totalQuantity);
  const [mounted, setMounted] = useState(false);

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
      <FaCartArrowDown className={css} />
      <Badge className="h-5 w-5 absolute -top-2 -right-2 bg-badge text-primary rounded-full font-bold tabular-nums">
        {cartLength}
      </Badge>
    </div>
  );
};

export default Cart;
