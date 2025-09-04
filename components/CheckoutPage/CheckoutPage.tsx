"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = useAppSelector((state) => state.cart.totalPrice);

  const [shipping, setShipping] = useState<{ id: string; price: number }>({
    id: "insideDhaka",
    price: 70,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (value: string) => {
    setShipping(
      value === "insideDhaka"
        ? { id: "insideDhaka", price: 70 }
        : { id: "outsideDhaka", price: 130 }
    );
  };

  const total = subtotal + shipping.price;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Here you can integrate your payment gateway or redirect to payment page
    alert(`Order placed! Total: ৳ ${total.toFixed(2)}`);
    router.push("/"); // redirect to home or order confirmation
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
      {/* Billing Form */}
      <Card className="lg:w-2/3 w-full">
        <CardHeader>
          <CardTitle>Billing & Shipping Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleInputChange}
            />
            <Input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleInputChange}
            />
            <Input
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleInputChange}
            />
          </div>
          <Input
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="lg:w-1/3 w-full bg-primary/10">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳ {shipping.price}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳ {total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" onClick={handleCheckout}>
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
