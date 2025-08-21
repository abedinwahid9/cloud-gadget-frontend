import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";

const Cart = ({ css }: { css: string }) => {
  return (
    <div className="relative">
      {" "}
      <Link href="/">
        <FaCartArrowDown className={css} />
      </Link>
      <Badge className="h-5 w-5 absolute -top-2 -right-2 bg-badge text-secondary rounded-full font-bold tabular-nums">
        10
      </Badge>
    </div>
  );
};

export default Cart;
