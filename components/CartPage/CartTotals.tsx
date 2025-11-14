"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { CardStyle } from "@/lib/utils/customCss";

const CartTotals = () => {
  const subtotal = useAppSelector((state) => state.cart.totalPrice);

  // Shipping state
  const [shipping, setShipping] = useState<{ id: string; price: number }>({
    id: "insideDhaka",
    price: 70,
  });

  const handleShippingChange = (value: string) => {
    if (value === "insideDhaka") {
      setShipping({ id: "insideDhaka", price: 70 });
    } else if (value === "outsideDhaka") {
      setShipping({ id: "outsideDhaka", price: 130 });
    }
  };

  const total = subtotal + shipping.price;

  return (
    <Card className={`lg:w-1/3 w-full  ${CardStyle}`}>
      <CardHeader>
        <CardTitle className="text-secondary ">CART TOTALS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-secondary dark:text-nav font-semibold">
          <span className="text-secondary dark:text-nav">Subtotal</span>
          <span>৳ {subtotal.toFixed(2)}</span>
        </div>
        <hr className="my-2" />

        {/* Shipping */}
        <div>
          <span className=" block mb-2 font-semibold text-secondary dark:text-nav">
            Shipping
          </span>
          <RadioGroup
            defaultValue="insideDhaka"
            className="space-y-2 text-secondary dark:text-nav"
            onValueChange={handleShippingChange}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="insideDhaka" id="inside-dhaka" />
                <Label htmlFor="inside-dhaka" className="font-normal">
                  Inside Dhaka
                </Label>
              </div>
              <span>৳ 70</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outsideDhaka" id="outside-dhaka" />
                <Label htmlFor="outside-dhaka" className="font-normal">
                  Outside Dhaka
                </Label>
              </div>
              <span>৳ 130</span>
            </div>
          </RadioGroup>
          <div className="mt-2 text-sm text-right">
            <h4>
              Shipping to{" "}
              {shipping.id === "insideDhaka" ? "Dhaka" : "Outside Dhaka"}.
            </h4>
          </div>
        </div>
        <hr className="my-2" />

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg text-secondary dark:text-nav">
          <span>Total</span>
          <span>৳ {total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Link href="/cart/checkout">
          <CustomBtn
            title="proceed to checkout"
            className="w-full rounded-md"
          />
        </Link>
      </CardContent>
    </Card>
  );
};

export default CartTotals;
