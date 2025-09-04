"use client";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/redux/hooks";
import { FaCartArrowDown } from "react-icons/fa";

const Cart = ({ css }: { css: string }) => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className="relative">
      <FaCartArrowDown className={css} />

      <Badge className="h-5 w-5 absolute -top-2 -right-2 bg-badge text-secondary rounded-full font-bold tabular-nums">
        {cart.length}
      </Badge>
    </div>
  );
};

export default Cart;
