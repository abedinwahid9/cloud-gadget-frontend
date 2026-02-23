"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import CustomBtn from "../share/CustomBtn/CustomBtn";
import { CardStyle } from "@/lib/utils/customCss";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { deliveryCharge } from "@/lib/redux/slices/cartSlices";

export interface ZoneCharge {
  id: string;
  zone: string;
  charge: number;
}

const CartTotals = () => {
  const subtotal = useAppSelector((state) => state.cart.totalPrice);
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();

  const [shipping, setShipping] = useState<ZoneCharge | null>(null);

  const { data = [], isLoading } = useQuery<ZoneCharge[]>({
    queryKey: ["delivery-charge"],
    queryFn: async () => {
      const res = await axiosPublic("/charge");
      return res.data.zone;
    },
  });

  // ✅ Auto select first zone
  useEffect(() => {
    if (data.length > 0 && !shipping) {
      setShipping(data[0]);
      dispatch(deliveryCharge(data[0]));
    }
  }, [data, shipping]);

  const handleShippingChange = (id: string) => {
    const selected = data.find((item) => item.id === id);
    if (selected) {
      setShipping(selected);
      dispatch(deliveryCharge(selected));
    }
  };

  const total = subtotal + (shipping?.charge ?? 0);

  return (
    <Card className={`lg:w-1/3 w-full ${CardStyle}`}>
      <CardHeader>
        <CardTitle className="text-secondary">CART TOTALS</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-primary">
        {/* Subtotal */}
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>৳ {subtotal.toFixed(2)}</span>
        </div>

        <hr />

        {/* Shipping */}
        <div>
          <span className="block mb-2 font-semibold">Shipping</span>

          {isLoading ? (
            <p className="text-sm">Loading shipping...</p>
          ) : (
            <RadioGroup
              value={shipping?.id}
              onValueChange={handleShippingChange}
              className="space-y-2"
            >
              {data.map((charge) => (
                <div
                  key={charge.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={charge.id} id={charge.id} />
                    <Label htmlFor={charge.id}>{charge.zone}</Label>
                  </div>
                  <span>৳ {charge.charge}</span>
                </div>
              ))}
            </RadioGroup>
          )}

          {shipping && (
            <p className="mt-2 text-sm text-right">
              Shipping to <strong>{shipping.zone}</strong>
            </p>
          )}
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>৳ {total.toFixed(2)}</span>
        </div>

        {/* Checkout */}
        <Link href="/cart/checkout">
          <CustomBtn title="Proceed to checkout" className="w-full" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default CartTotals;
